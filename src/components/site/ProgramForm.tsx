"use client";

import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { PROGRAMAS } from "@/content/programas";
import { enviarRegistro, leerTrampa, EMAIL_RE } from "@/lib/registro";
import { whatsappUrl } from "@/content/sitio";
import { Aviso } from "./ui";
import Trampa from "./Trampa";

const COUNTRIES = ["Perú", "México", "Colombia", "Chile", "Otro país"];

/** Postulación a un programa. Se preselecciona con el ancla #postular-<id>. */
export default function ProgramForm() {
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
  const [country, setCountry] = useState(COUNTRIES[0]);
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
      { programa: p.name, nivel: String(p.level), nombre: name.trim(), correo: email.trim(), pais: country, mensaje: msg.trim().slice(0, 500) },
      trampa
    );
    setState(r.ok ? "ok" : "error");
  }

  if (state === "ok")
    return (
      <div role="status" className="border border-ink bg-paper p-6 lg:p-8">
        <p className="ws text-figura">Recibimos tu postulación a {p.name}.</p>
        <p className="text-cuerpo text-ink2 mt-3">Te escribimos a {email.trim()} con las fechas, los cupos y las condiciones de la próxima convocatoria.</p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} noValidate className="relative border border-ink bg-paper px-5 py-7 lg:p-9 grid gap-[18px]">
      <Trampa />
      <div>
        <label htmlFor={`${id}-p`} className="wm block text-ink2 mb-2">
          Programa
        </label>
        <select id={`${id}-p`} className="field" value={prog} onChange={(e) => setProg(e.target.value)}>
          {PROGRAMAS.map((x) => (
            <option key={x.id} value={x.id}>
              {x.tag}: {x.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-[18px] sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-n`} className="wm block text-ink2 mb-2">
            Nombre
          </label>
          <input id={`${id}-n`} className="field" autoComplete="name" placeholder="Tu nombre" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={state === "invalid" && !name.trim()} />
        </div>
        <div>
          <label htmlFor={`${id}-e`} className="wm block text-ink2 mb-2">
            Correo
          </label>
          <input
            id={`${id}-e`}
            type="email"
            className="field"
            autoComplete="email"
            placeholder="nombre@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={state === "invalid" && !EMAIL_RE.test(email.trim())}
          />
        </div>
      </div>
      <div>
        <label htmlFor={`${id}-c`} className="wm block text-ink2 mb-2">
          País
        </label>
        <select id={`${id}-c`} className="field" value={country} onChange={(e) => setCountry(e.target.value)}>
          {COUNTRIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor={`${id}-m`} className="wm block text-ink2 mb-2">
          Tu situación en dos líneas (opcional)
        </label>
        <textarea id={`${id}-m`} className="field" rows={3} value={msg} onChange={(e) => setMsg(e.target.value)} placeholder="Cargo, años de carrera y en qué nivel de la escalera crees que estás" />
      </div>
      <button type="submit" className="btn w-full" disabled={state === "sending"}>
        {state === "sending" ? "Enviando..." : p.cta === "Ver fechas" ? "Quiero ver las fechas" : "Enviar postulación"}
      </button>
      <div aria-live="polite">
        {state === "invalid" && <Aviso>Escribe tu nombre y un correo válido.</Aviso>}
        {state === "error" && (
          <Aviso>
            No pudimos registrar tu postulación en este momento. Escríbenos por{" "}
            <a className="ul font-bold" href={whatsappUrl(`Hola, soy ${name.trim()}. Quiero postular a ${p.name}.`)} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>{" "}
            y te respondemos con las fechas.
          </Aviso>
        )}
      </div>
      <p className="text-recuadro text-ink2">Usamos tu correo solo para responderte sobre este programa.</p>
    </form>
  );
}
