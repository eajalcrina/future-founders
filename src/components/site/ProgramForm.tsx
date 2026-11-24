"use client";

import { useEffect, useId, useState, useSyncExternalStore } from "react";
import type { ProgramaId } from "@/content/programas";
import { enviarRegistro, leerTrampa, EMAIL_RE } from "@/lib/registro";
import { whatsappUrl } from "@/content/sitio";
import type { Dict } from "@/i18n/es";
import { f } from "@/i18n/f";
import type { Locale } from "@/i18n/rutas";
import type { Canon } from "./DownloadForm";
import { Aviso, ConWa, PrivacidadLinea, type Comun } from "./ui";
import Trampa from "./Trampa";

type Prog = { id: ProgramaId; level: number; cta: "fechas" | "postular" | "agenda"; tag: string; name: string };

/**
 * Postulación a un programa. Se preselecciona con el ancla #postular-<id>.
 * Lo que se envía va en español (canon): nombre del programa y país, como los lee apps-script/Code.gs.
 */
export default function ProgramForm({
  locale,
  t,
  c,
  programas: PROGRAMAS,
  canon,
}: {
  locale: Locale;
  t: Dict["programas"]["form"];
  c: Comun;
  programas: Prog[];
  canon: Canon & { programas: Record<string, string> };
}) {
  const id = useId();
  const hashProg = useSyncExternalStore(
    (cb) => {
      window.addEventListener("hashchange", cb);
      return () => window.removeEventListener("hashchange", cb);
    },
    () => {
      const m = window.location.hash.match(/^#postular-(.+)$/);
      return m && PROGRAMAS.some((p) => p.id === m[1]) ? m[1] : null;
    },
    () => null
  );
  const [picked, setProg] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState(0);
  const [msg, setMsg] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error" | "invalid">("idle");

  // Un ancla nueva (#postular-<id>) manda sobre la elección anterior.
  useEffect(() => {
    const clear = () => setProg(null);
    window.addEventListener("hashchange", clear);
    return () => window.removeEventListener("hashchange", clear);
  }, []);
  const prog = picked ?? hashProg ?? PROGRAMAS[0].id;

  const p = PROGRAMAS.find((x) => x.id === prog)!;

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !EMAIL_RE.test(email.trim())) return setState("invalid");
    const trampa = leerTrampa(e.currentTarget);
    setState("sending");
    const r = await enviarRegistro(
      "programa",
      { programa: canon.programas[p.id], nivel: String(p.level), nombre: name.trim(), correo: email.trim(), pais: canon.paises[country], mensaje: msg.trim().slice(0, 500), idioma: locale },
      trampa
    );
    setState(r.ok ? "ok" : "error");
  }

  if (state === "ok")
    return (
      <div role="status" className="border border-ink bg-paper p-6 lg:p-8">
        <p className="ws text-figura">{f(t.recibida, { nombre: p.name })}</p>
        <p className="text-cuerpo text-ink2 mt-3">{f(t.teEscribimos, { correo: email.trim() })}</p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} noValidate className="relative border border-ink bg-paper px-5 py-7 lg:p-9 grid gap-[18px]">
      <Trampa label={c.trampa} />
      <div>
        <label htmlFor={`${id}-p`} className="wm block text-ink2 mb-2">
          {t.programa}
        </label>
        <select id={`${id}-p`} className="field" value={prog} onChange={(e) => setProg(e.target.value)}>
          {PROGRAMAS.map((x) => (
            <option key={x.id} value={x.id}>
              {f(t.opcion, { tag: x.tag, nombre: x.name })}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-[18px] sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-n`} className="wm block text-ink2 mb-2">
            {c.nombre}
          </label>
          <input id={`${id}-n`} className="field" autoComplete="name" placeholder={c.tuNombre} value={name} onChange={(e) => setName(e.target.value)} aria-invalid={state === "invalid" && !name.trim()} />
        </div>
        <div>
          <label htmlFor={`${id}-e`} className="wm block text-ink2 mb-2">
            {c.correo}
          </label>
          <input
            id={`${id}-e`}
            type="email"
            className="field"
            autoComplete="email"
            placeholder={c.correoEjemplo}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={state === "invalid" && !EMAIL_RE.test(email.trim())}
          />
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-c`} className="wm block text-ink2 mb-2">
          {c.pais}
        </label>
        <select id={`${id}-c`} className="field" value={country} onChange={(e) => setCountry(Number(e.target.value))}>
          {c.paises.map((x, i) => (
            <option key={x} value={i}>
              {x}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={`${id}-m`} className="wm block text-ink2 mb-2">
          {t.mensaje}
        </label>
        <textarea id={`${id}-m`} className="field" rows={3} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder={t.mensajePh} />
      </div>
      <button type="submit" className="btn w-full" disabled={state === "sending"}>
        {state === "sending" ? c.enviando : p.cta === "fechas" ? t.verFechas : t.enviar}
      </button>
      <div aria-live="polite">
        {state === "invalid" && <Aviso>{t.invalido}</Aviso>}
        {state === "error" && (
          <Aviso>
            <ConWa texto={t.error} wa={c.whatsapp} href={whatsappUrl(f(t.waMensaje, { nombre: name.trim(), programa: p.name }))} />
          </Aviso>
        )}
      </div>
      <PrivacidadLinea c={c} locale={locale} className="text-ink2" aviso={t.enEspanol} />
    </form>
  );
}
