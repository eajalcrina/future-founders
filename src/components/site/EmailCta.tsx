"use client";

import { useId, useState } from "react";
import { enviarRegistro, leerTrampa, EMAIL_RE } from "@/lib/registro";
import { whatsappUrl } from "@/content/sitio";
import { Aviso } from "./ui";
import Trampa from "./Trampa";

/** Formulario de correo de la llamada final (sobre tinta). Pide el kit «Plan de salida». */
export default function EmailCta({ button = "Recibir el kit" }: { button?: string }) {
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
    const r = await enviarRegistro("kit", { origen: `Cierre de página (${window.location.pathname})`, correo: email.trim() }, trampa);
    setState(r.ok ? "ok" : "error");
  }

  if (state === "ok")
    return (
      <div role="status" className="border border-paper p-5">
        <p className="text-h3 font-bold">Listo. Te enviamos el kit a {email}.</p>
        <p className="text-recuadro text-ink20 mt-2">Si no lo ves en unos minutos, revisa la carpeta de promociones.</p>
      </div>
    );

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby={`${id}-help`} className="relative">
      <Trampa />
      <label htmlFor={`${id}-email`} className="wm block text-ink20 mb-2">
        Tu correo
      </label>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder="nombre@correo.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state !== "sending") setState("idle");
          }}
          aria-invalid={state === "invalid"}
          className="field sm:flex-1 min-w-0"
        />
        <button type="submit" className="btn" disabled={state === "sending"}>
          {state === "sending" ? "Enviando..." : button}
        </button>
      </div>
      <div aria-live="polite">
        {state === "invalid" && <Aviso className="mt-3">Revisa el correo: falta algo para que sea válido.</Aviso>}
        {state === "error" && (
          <Aviso className="mt-3">
            No pudimos registrar tu correo en este momento. Pídenos el kit por{" "}
            <a className="ul font-bold" href={whatsappUrl("Hola, quiero recibir el kit «Plan de salida».")} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>{" "}
            y te lo enviamos.
          </Aviso>
        )}
      </div>
      <p id={`${id}-help`} className="text-recuadro leading-[1.45] text-ink20 mt-3.5">
        Te enviamos el kit a este correo. Puedes darte de baja con un clic.
      </p>
    </form>
  );
}
