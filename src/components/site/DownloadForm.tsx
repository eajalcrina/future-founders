"use client";

import { useId, useState } from "react";
import { enviarRegistro, leerTrampa, EMAIL_RE } from "@/lib/registro";
import { whatsappUrl } from "@/content/sitio";
import type { Dict } from "@/i18n/es";
import { f } from "@/i18n/f";
import type { Locale } from "@/i18n/rutas";
import { Aviso, ConWa, PrivacidadLinea, type Comun } from "./ui";
import Trampa from "./Trampa";

export type Producto = "kit" | "workbook";

/** Etiquetas en español que se envían a /api/registro (situación corta y país), en el mismo orden que las del idioma. */
export type Canon = { situaciones: string[]; paises: string[] };

/**
 * Origen del registro en la hoja: dato interno en español (lo lee apps-script/Code.gs), con la ruta
 * de la página para saber el idioma. No se muestra.
 */
const ORIGEN: Record<Producto, string> = { kit: "Página del kit", workbook: "Página del workbook" };

/**
 * Formulario de descarga del kit o del workbook: nombre, correo, situación y país.
 * Con o sin registro en la hoja, al enviar muestra el enlace al PDF.
 * `file` es la ruta pública del PDF; `fallback` se usa si ese PDF todavía no está publicado.
 */
export default function DownloadForm({
  locale,
  t,
  c: cm,
  situaciones,
  canon,
  producto,
  file,
  fallback,
}: {
  locale: Locale;
  t: Dict["descarga"];
  c: Comun;
  /** Situaciones del idioma de la página; `canon` trae las españolas, que son las que se envían. */
  situaciones: { corto: string }[];
  canon: Canon;
  producto: Producto;
  file: string;
  fallback?: { file: string; label: string; note: string };
}) {
  const c = t[producto];
  const id = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // Se guarda el índice: lo que se envía es la etiqueta española (canon), sea cual sea el idioma.
  const [sit, setSit] = useState(0);
  const [country, setCountry] = useState(0);
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const er: typeof errors = {};
    if (!name.trim()) er.name = t.escribeNombre;
    if (!EMAIL_RE.test(email.trim())) er.email = cm.correoInvalido;
    setErrors(er);
    if (er.name || er.email) {
      document.getElementById(`${id}-${er.name ? "name" : "email"}`)?.focus();
      return;
    }
    const trampa = leerTrampa(e.currentTarget);
    setState("sending");
    const origen = locale === "es" ? ORIGEN[producto] : `${ORIGEN[producto]} (${locale})`;
    const r = await enviarRegistro(producto, { origen, nombre: name.trim(), correo: email.trim(), situacion: canon.situaciones[sit], pais: canon.paises[country], idioma: locale }, trampa);
    setSent(r.ok);
    setState("done");
  }

  return (
    <div className="border border-ink bg-paper px-5 py-7 lg:px-9 lg:pt-9 lg:pb-[34px]">
      <h2 className="ws text-figura">{c.h}</h2>
      <p className="text-recuadro leading-[1.45] text-ink2 mt-2.5">{c.intro}</p>

      {state === "done" ? (
        <div role="status" className="mt-7 border-t border-ink pt-5">
          <p className="text-h3 font-bold">
            {f(t.listo, { nombre: name.trim().split(/\s+/)[0] })}
            {sent ? f(t.tambien, { correo: email.trim() }) : ""}
          </p>
          <a href={fallback ? fallback.file : file} download className="btn w-full mt-5">
            {fallback ? fallback.label : t.descargarPdf}
          </a>
          {fallback && <p className="text-recuadro leading-[1.45] mt-3">{fallback.note}</p>}
          <p className="text-recuadro text-ink2 mt-3">{c.next}</p>
          {!sent && (
            <Aviso className="mt-4">
              <ConWa texto={t.error} wa={cm.whatsapp} href={whatsappUrl(f(t.waMensaje, { nombre: name.trim(), producto: c.wa, correo: email.trim() }))} />
            </Aviso>
          )}
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="relative grid gap-[18px] mt-6 lg:mt-[26px]">
          <Trampa />
          <div>
            <label htmlFor={`${id}-name`} className="wm block text-ink2 mb-2">
              {cm.nombre}
            </label>
            <input
              id={`${id}-name`}
              className="field"
              autoComplete="name"
              placeholder={cm.tuNombre}
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? `${id}-name-e` : undefined}
            />
            {errors.name && (
              <Aviso id={`${id}-name-e`} className="mt-1.5">
                {errors.name}
              </Aviso>
            )}
          </div>
          <div>
            <label htmlFor={`${id}-email`} className="wm block text-ink2 mb-2">
              {cm.correo}
            </label>
            <input
              id={`${id}-email`}
              type="email"
              className="field"
              autoComplete="email"
              placeholder={cm.correoEjemplo}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? `${id}-email-e` : undefined}
            />
            {errors.email && (
              <Aviso id={`${id}-email-e`} className="mt-1.5">
                {errors.email}
              </Aviso>
            )}
          </div>
          <fieldset className="m-0 p-0 border-0">
            <legend className="wm text-ink2 mb-2">{t.situacion}</legend>
            <div className="grid grid-cols-1 sm:grid-cols-3">
              {situaciones.map((s, i) => (
                <label
                  key={s.corto}
                  className={`opt relative min-h-[48px] flex items-center justify-center text-center px-1 border border-ink cursor-pointer text-recuadro font-semibold leading-tight whitespace-nowrap ${i ? "border-t-0 sm:border-t sm:border-l-0" : ""}`}
                  style={sit === i ? { background: "var(--color-ink)", color: "var(--color-paper)" } : undefined}
                >
                  <input type="radio" name={`${id}-sit`} value={s.corto} checked={sit === i} onChange={() => setSit(i)} className="sr-only" />
                  {s.corto}
                </label>
              ))}
            </div>
          </fieldset>
          <div>
            <label htmlFor={`${id}-country`} className="wm block text-ink2 mb-2">
              {cm.pais}
            </label>
            <select id={`${id}-country`} className="field" value={country} onChange={(e) => setCountry(Number(e.target.value))} autoComplete="country-name">
              {cm.paises.map((p, i) => (
                <option key={p} value={i}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn w-full mt-2" disabled={state === "sending"}>
            {state === "sending" ? cm.enviando : c.button}
          </button>
          <PrivacidadLinea c={cm} locale={locale} className="text-ink2" />
        </form>
      )}
    </div>
  );
}
