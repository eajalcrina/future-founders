"use client";

import { useId, useState } from "react";
import { sendLead, EMAIL_RE } from "@/lib/leads";
import { whatsappUrl } from "@/content/sitio";
import { Arrow } from "./ui";

const SIT = ["Tengo empleo", "Acabo de salir", "Tengo un proyecto"];
const COUNTRIES = ["Perú", "México", "Colombia", "Chile", "Otro país"];

export type Producto = "kit" | "workbook";

const COPY: Record<Producto, { h: string; intro: string; lead: string; button: string; next: string; wa: string }> = {
  kit: {
    h: "Descarga el kit",
    intro: "Las cinco plantillas del kit, con los ejemplos de Carmen y Javier y la regla de cada país, en un PDF que puedes llenar.",
    lead: "Kit Plan de salida",
    button: "Descargar el kit",
    next: "Empieza por la K.1: son 20 minutos y te deja el dato del que parte todo el método.",
    wa: "el kit «Plan de salida»",
  },
  workbook: {
    h: "Descarga el workbook",
    intro: "Las 31 plantillas del libro en un PDF que puedes llenar en una tableta o una computadora, o imprimir.",
    lead: "Workbook",
    button: "Descargar el workbook",
    next: "Abre primero «Tu nivel en la escalera», al comienzo del workbook, y anota tu nivel con la fecha.",
    wa: "el workbook de Doble Agente",
  },
};

/**
 * Formulario de descarga del kit o del workbook: nombre, correo, situación y país.
 * Con o sin respuesta de Brevo, al enviar muestra el enlace al PDF.
 * `file` es la ruta pública del PDF; `fallback` se usa si ese PDF todavía no está publicado.
 */
export default function DownloadForm({
  producto,
  file,
  fallback,
}: {
  producto: Producto;
  file: string;
  fallback?: { file: string; label: string; note: string };
}) {
  const c = COPY[producto];
  const id = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sit, setSit] = useState(SIT[0]);
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const er: typeof errors = {};
    if (!name.trim()) er.name = "Escribe tu nombre.";
    if (!EMAIL_RE.test(email.trim())) er.email = "Revisa el correo: falta algo para que sea válido.";
    setErrors(er);
    if (er.name || er.email) {
      document.getElementById(`${id}-${er.name ? "name" : "email"}`)?.focus();
      return;
    }
    setState("sending");
    const [firstName, ...rest] = name.trim().split(/\s+/);
    const r = await sendLead({ firstName, lastName: rest.join(" "), email: email.trim(), country, situacion: sit, archetype: c.lead });
    setSent(r.ok);
    setState("done");
  }

  return (
    <div className="border border-ink bg-paper px-5 py-7 lg:px-9 lg:pt-9 lg:pb-[34px]">
      <h2 className="ws text-[26px] lg:text-[30px] leading-[1.1]">{c.h}</h2>
      <p className="text-[16px] leading-[1.45] text-ink2 mt-2.5">{c.intro}</p>

      {state === "done" ? (
        <div role="status" className="mt-7 border-t-2 border-ink pt-5">
          <p className="text-[20px] font-bold">
            Listo, {name.trim().split(/\s+/)[0]}. Aquí está tu PDF.{sent ? ` También te lo enviamos a ${email.trim()}.` : ""}
          </p>
          <a href={fallback ? fallback.file : file} download className="btn w-full mt-5">
            <span>{fallback ? fallback.label : "Descargar el PDF"}</span>
            <Arrow />
          </a>
          {fallback && <p className="text-[15px] leading-[1.45] mt-3">{fallback.note}</p>}
          <p className="text-[16px] text-ink2 mt-3">{c.next}</p>
          {!sent && (
            <p className="text-[15px] leading-[1.45] mt-3 border-l-2 border-magt pl-3">
              No pudimos registrar tu correo en este momento. Si quieres recibir las novedades del libro, escríbenos por{" "}
              <a className="ul font-bold" href={whatsappUrl(`Hola, soy ${name.trim()}. Descargué ${c.wa} y quiero recibir las novedades en ${email.trim()}.`)} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              .
            </p>
          )}
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="grid gap-[18px] mt-6 lg:mt-[26px]">
          <div>
            <label htmlFor={`${id}-name`} className="wm block text-ink2 mb-2">
              Nombre
            </label>
            <input
              id={`${id}-name`}
              className="field"
              autoComplete="name"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${id}-name-e` : undefined}
            />
            {errors.name && (
              <p id={`${id}-name-e`} className="text-[14px] text-magt mt-1.5">
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <label htmlFor={`${id}-email`} className="wm block text-ink2 mb-2">
              Correo
            </label>
            <input
              id={`${id}-email`}
              type="email"
              className="field"
              autoComplete="email"
              placeholder="nombre@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? `${id}-email-e` : undefined}
            />
            {errors.email && (
              <p id={`${id}-email-e`} className="text-[14px] text-magt mt-1.5">
                {errors.email}
              </p>
            )}
          </div>
          <fieldset className="m-0 p-0 border-0">
            <legend className="wm text-ink2 mb-2">¿En qué situación estás?</legend>
            <div className="grid grid-cols-3">
              {SIT.map((t, i) => (
                <label
                  key={t}
                  className={`relative min-h-[52px] flex items-center justify-center text-center px-1.5 border border-ink cursor-pointer text-[14px] sm:text-[15px] font-semibold leading-tight ${i ? "border-l-0" : ""} has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-mag has-[:focus-visible]:z-10`}
                  style={sit === t ? { background: "var(--color-ink)", color: "var(--color-paper)" } : undefined}
                >
                  <input type="radio" name={`${id}-sit`} value={t} checked={sit === t} onChange={() => setSit(t)} className="sr-only" />
                  {t}
                </label>
              ))}
            </div>
          </fieldset>
          <div>
            <label htmlFor={`${id}-country`} className="wm block text-ink2 mb-2">
              País
            </label>
            <select id={`${id}-country`} className="field" value={country} onChange={(e) => setCountry(e.target.value)} autoComplete="country-name">
              {COUNTRIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn w-full mt-2" disabled={state === "sending"}>
            <span>{state === "sending" ? "Enviando..." : c.button}</span>
            <Arrow />
          </button>
          <p className="text-[14px] leading-[1.45] text-ink2">Al enviar, descargas el PDF aquí mismo y te lo enviamos a este correo. Puedes darte de baja con un clic.</p>
        </form>
      )}
    </div>
  );
}
