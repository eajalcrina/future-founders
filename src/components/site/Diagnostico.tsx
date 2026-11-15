"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { LEVELS, SIGNAL, WITH, agendaUrl, whatsappUrl } from "@/content/sitio";
import { colchonCorto, nivelDe, pasoDe, registroDe, visibles, type Respuestas } from "@/lib/diagnostico";
import { enviarRegistro, leerTrampa, EMAIL_RE } from "@/lib/registro";
import { Aviso, Icon, Lvl, Mono, PrivacidadLinea, Sc } from "./ui";
import Trampa from "./Trampa";

/** Cuestionario de cuatro preguntas (tres si todavía no hay comprobante). Las preguntas y la regla viven en src/lib/diagnostico.ts. */
export default function Diagnostico() {
  const id = useId();
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState<Respuestas>({});
  const [done, setDone] = useState(false);
  const head = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    head.current?.focus();
  }, [step, done]);

  const qs = visibles(ans);
  const q = qs[Math.min(step, qs.length - 1)];
  const cur = ans[q.id] ?? null;

  function choose(i: number) {
    setAns((a) => {
      const n = { ...a, [q.id]: i };
      if (q.id === "comprobante" && i === 0) delete n.cobertura;
      return n;
    });
  }
  function next() {
    if (cur === null) return;
    if (step < qs.length - 1) setStep(step + 1);
    else setDone(true);
  }
  function restart() {
    setAns({});
    setStep(0);
    setDone(false);
  }

  if (done) return <Result ans={ans} onRestart={restart} headRef={head} />;

  return (
    <div className="border border-ink bg-paper">
      <div className="flex justify-between items-center gap-4 px-5 lg:px-8 py-4 border-b border-ink">
        <span className="wm">
          Pregunta {step + 1} de {qs.length}
        </span>
        <span className="flex gap-1" aria-hidden="true">
          {qs.map((_, k) => (
            <span key={k} className="block h-[3px] w-6 sm:w-8" style={{ background: k <= step ? "var(--color-ink)" : "var(--color-ink20)" }} />
          ))}
        </span>
      </div>
      <form
        key={q.id}
        className="xfade px-5 lg:px-8 pt-6 pb-7 lg:pt-8 lg:pb-9"
        onSubmit={(e) => {
          e.preventDefault();
          next();
        }}
      >
        <fieldset className="m-0 p-0 border-0" aria-describedby={q.help ? `${id}-help` : undefined}>
          <legend className="w-full">
            <h2 ref={head} tabIndex={-1} className="ws text-figura outline-none">
              {q.text}
            </h2>
          </legend>
          {q.help && (
            <p id={`${id}-help`} className="text-recuadro leading-[1.45] text-ink2 mt-3">
              {q.help}
            </p>
          )}
          <div className="grid gap-2.5 mt-6">
            {q.options.map((o, i) => (
              <label
                key={o}
                className="opt flex items-center gap-4 min-h-[56px] px-4 py-3 border cursor-pointer transition-colors"
                style={
                  cur === i
                    ? { background: "var(--color-ink)", color: "var(--color-paper)", borderColor: "var(--color-ink)" }
                    : { borderColor: "var(--color-ink)", background: "var(--color-paper)" }
                }
              >
                <input type="radio" name={`${id}-${q.id}`} className="sr-only" checked={cur === i} onChange={() => choose(i)} />
                <span
                  aria-hidden="true"
                  className="w-4 h-4 shrink-0 border"
                  style={{ borderColor: cur === i ? "var(--color-paper)" : "var(--color-ink)", background: cur === i ? "var(--color-paper)" : "transparent" }}
                />
                <span className="text-cuerpo font-semibold leading-[1.3]">
                  <Sc text={o} />
                </span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-7">
          <button type="button" className={`btn2 ${step === 0 ? "max-sm:hidden sm:invisible" : ""}`} onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
            Anterior
          </button>
          <button type="submit" className="btn" disabled={cur === null}>
            {step < qs.length - 1 ? "Siguiente" : "Ver mi nivel"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Result({ ans, onRestart, headRef }: { ans: Respuestas; onRestart: () => void; headRef: React.RefObject<HTMLHeadingElement | null> }) {
  const { level: k, why } = nivelDe(ans);
  const paso = pasoDe(k, ans);
  const conK1 = paso.plantillas.some((p) => p.code === "K.1");
  const avisoColchon = k < 3 && colchonCorto(ans) && !conK1;
  const acompana = WITH.flat().filter((w) => paso.acompana.includes(w.href));
  const dark = k === 3;
  return (
    <div className="grid gap-6">
      <div className="border border-ink bg-paper">
        <div
          className="px-5 lg:px-8 py-5 lg:py-6 border-b border-ink flex justify-between items-center gap-4"
          style={{ background: dark ? "var(--color-ink)" : ["var(--color-paper)", "var(--color-warm)", "var(--color-ink20)"][k], color: dark ? "var(--color-paper)" : undefined }}
        >
          <div>
            <Mono tone={dark ? "papel" : "ink"}>Tu resultado</Mono>
            <h2 ref={headRef} tabIndex={-1} className="wh2 text-display-md mt-2 outline-none">
              Nivel {k}: {LEVELS[k]}
            </h2>
          </div>
          <span className="llena inline-flex">
            <Lvl
              on={Array.from({ length: k + 1 }, (_, i) => i)}
              size={12}
              fg={dark ? "var(--color-paper)" : "var(--color-ink)"}
              off={dark ? "var(--color-ink20)" : "var(--color-ink3)"}
              label={`Nivel ${k} de 3`}
            />
          </span>
        </div>
        <div className="px-5 lg:px-8 pt-6 pb-8 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div>
            <p className="lead">{why}</p>
            <Mono className="mt-7">Tu siguiente paso</Mono>
            <ul className="mt-2">
              {paso.plantillas.map((p) => (
                <li key={p.code} className="ws text-figura">
                  <Link href={p.href} className="group">
                    <span className="lnk">
                      {p.code} <Sc text={p.title} />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-recuadro text-ink2 mt-1.5">{paso.capitulo} del libro</p>
            <p className="wt mt-3">
              <Sc text={paso.body} />
            </p>
            {avisoColchon && (
              <p className="text-recuadro leading-[1.45] mt-4 px-3 py-2.5 bg-warm">
                Tu colchón no llega a 6 meses o no lo has calculado. Llena primero la K.1 del kit, son 20 minutos.
              </p>
            )}
            <div className="mt-6">
              {paso.boton === "agenda" ? (
                <a href={agendaUrl()} target="_blank" rel="noopener noreferrer" className="btn">
                  <Icon name="calendario" size={18} />
                  <span>Agenda 30 minutos</span>
                  <span className="sr-only"> (se abre en otra pestaña)</span>
                </a>
              ) : (
                <Link href={paso.boton.href} className="btn">
                  {paso.boton.label}
                </Link>
              )}
            </div>
            <p className="text-recuadro leading-[1.45] text-ink2 mt-5">Anota tu nivel con la fecha en «Tu nivel en la escalera», al comienzo del workbook.</p>
          </div>
          <div>
            <div className="wm text-ink2">{k < 3 ? "Para pasar al nivel siguiente" : "Para sostener el nivel 3"}</div>
            <p className="text-h3 leading-[1.35] font-bold mt-2">{SIGNAL[k]}</p>
            <div className="wm text-ink2 mt-6 mb-1.5">Te acompaña</div>
            <ul>
              {acompana.map((w) => (
                <li key={w.name}>
                  <Link href={w.href} className="group block py-3 border-t border-ink">
                    <span className="block text-cuerpo font-bold leading-[1.3]">
                      <span className="lnk">{w.name}</span>
                    </span>
                    <span className="wm block text-ink2 mt-1">{w.meta}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <SendResult k={k} ans={ans} />
      <button type="button" onClick={onRestart} className="ul justify-self-start text-recuadro font-semibold">
        Volver a empezar el diagnóstico
      </button>
    </div>
  );
}

function SendResult({ k, ans }: { k: number; ans: Respuestas }) {
  const id = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error" | "invalid">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) return setState("invalid");
    const trampa = leerTrampa(e.currentTarget);
    setState("sending");
    const r = await enviarRegistro("diagnostico", { nombre: name.trim(), correo: email.trim(), ...registroDe(k, ans) }, trampa);
    setState(r.ok ? "ok" : "error");
  }

  return (
    <div className="bg-warm px-5 lg:px-8 py-6 lg:py-7">
      <h3 className="ws text-figura">Recibe tu resultado y el kit en tu correo</h3>
      {state === "ok" ? (
        <p role="status" className="text-cuerpo mt-3">
          Listo. Te enviamos tu nivel y el kit «Plan de salida» a {email.trim()}.
        </p>
      ) : (
        <form onSubmit={onSubmit} noValidate className="relative grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-end mt-4">
          <Trampa />
          <div>
            <label htmlFor={`${id}-n`} className="wm block text-ink2 mb-2">
              Nombre
            </label>
            <input id={`${id}-n`} className="field" autoComplete="name" placeholder="Tu nombre" value={name} onChange={(e) => setName(e.target.value)} />
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
              aria-invalid={state === "invalid"}
            />
          </div>
          <button type="submit" className="btn2" disabled={state === "sending"}>
            {state === "sending" ? "Enviando..." : "Enviar"}
          </button>
        </form>
      )}
      <div aria-live="polite">
        {state === "invalid" && <Aviso className="mt-3">Revisa el correo: falta algo para que sea válido.</Aviso>}
        {state === "error" && (
          <Aviso className="mt-3">
            No pudimos registrar tus datos en este momento. Escríbenos por{" "}
            <a className="ul font-bold" href={whatsappUrl(`Hola, hice el diagnóstico y salí en el nivel ${k}, ${LEVELS[k]}.`)} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>{" "}
            y te respondemos con tu siguiente paso.
          </Aviso>
        )}
      </div>
      <PrivacidadLinea className="text-ink2 mt-3" />
    </div>
  );
}

