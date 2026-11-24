"use client";

import { useId, useState } from "react";
import { enviarRegistro, leerTrampa, EMAIL_RE } from "@/lib/registro";
import { whatsappUrl } from "@/content/sitio";
import type { Dict } from "@/i18n/es";
import { f } from "@/i18n/f";
import type { Locale } from "@/i18n/rutas";
import { Aviso, ConWa, PrivacidadLinea, type Comun } from "./ui";
import Trampa from "./Trampa";

/** Formulario de correo de la llamada final (sobre tinta). Pide el kit «Plan de salida». */
export default function EmailCta({ locale, button, t, c }: { locale: Locale; button: string; t: Dict["cierre"]; c: Comun }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error" | "invalid">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setState("invalid");
      return;
    }
    const trampa = leerTrampa(e.currentTarget);
    setState("sending");
    const r = await enviarRegistro("kit", { origen: `Cierre de página (${window.location.pathname})`, correo: email.trim(), idioma: locale }, trampa);
    setState(r.ok ? "ok" : "error");
  }

  if (state === "ok")
    return (
      <div role="status" className="border border-paper p-5">
        <p className="text-h3 font-bold">{f(t.listo, { correo: email })}</p>
        <p className="text-recuadro text-ink20 mt-2">{t.promociones}</p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby={`${id}-help`} className="relative">
      <Trampa label={c.trampa} />
      <label htmlFor={`${id}-email`} className="wm block text-ink20 mb-2">
        {t.tuCorreo}
      </label>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder={c.correoEjemplo}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state !== "sending") setState("idle");
          }}
          aria-invalid={state === "invalid"}
          className="field sm:flex-1 min-w-0"
        />
        <button type="submit" className="btn" disabled={state === "sending"}>
          {state === "sending" ? c.enviando : button}
        </button>
      </div>
      <div aria-live="polite">
        {state === "invalid" && <Aviso className="mt-3">{c.correoInvalido}</Aviso>}
        {state === "error" && (
          <Aviso className="mt-3">
            <ConWa texto={t.error} wa={c.whatsapp} href={whatsappUrl(t.waMensaje)} />
          </Aviso>
        )}
      </div>
      <PrivacidadLinea c={c} locale={locale} id={`${id}-help`} className="text-ink20 mt-3.5" aviso={t.enEspanol} />
    </form>
  );
}
