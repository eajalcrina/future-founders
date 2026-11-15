"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { CHAPS, DO_NOW, LEVELS, LOOK, SIGNAL, WITH, agendaUrl, whatsappUrl } from "@/content/sitio";
import { sendLead, EMAIL_RE } from "@/lib/leads";
import { Arrow, Jn, Lvl, Mono, Sc } from "./ui";

type Q = { id: string; text: string; help?: string; options: string[] };

const QS: Q[] = [
  { id: "situacion", text: "¿Cuál describe tu situación hoy?", options: ["Tengo empleo", "Acabo de salir de mi empresa", "Tengo un proyecto o una pyme propia"] },
  {
    id: "comprobante",
    text: "¿Ya emitiste o recibiste tu primer comprobante por un rol parcial, una asesoría o un proyecto con un cliente propio?",
    help: "Comprobante es la factura, el recibo por honorarios, el CFDI o la boleta de honorarios, según tu país.",
    options: ["No", "Sí, a un cliente", "Sí, a más de un cliente"],
  },
  { id: "roles", text: "¿Cuántos roles, clientes o productos propios te pagan hoy de forma recurrente?", options: ["Ninguno", "Uno", "De 2 a 4", "Más de 4"] },
  {
    id: "cobertura",
    text: "En cada uno de los últimos tres meses, ¿cuánto de tu costo de vida mensual sin empleo cubrieron tus ingresos propios netos?",
    help: "Ingresos propios son los que no vienen de un empleador: roles parciales, clientes, productos o tu empresa. Usa tu costo de vida sin empleo: lo que gastas hoy más lo que paga tu empleador y tendrías que pagar tú (plantilla 2.1). Si ya saliste, es lo que gastas hoy.",
    options: ["Nada o casi nada", "Menos de la mitad", "Entre la mitad y casi todo", "Todo, pero menos de 1,2 veces", "1,2 veces o más"],
  },
  {
    id: "colchon",
    text: "¿Cuántos meses de tu costo de vida cubre hoy tu ahorro líquido?",
    help: "Es tu runway: el dinero que puedes usar en una semana sin una penalidad grande, dividido entre tu costo de vida mensual. Usa tu costo de vida sin empleo: lo que gastas hoy más lo que paga tu empleador y tendrías que pagar tú (plantilla 2.1). Si ya saliste, es lo que gastas hoy.",
    options: ["Menos de 3", "De 3 a menos de 6", "6 o más", "No lo he calculado"],
  },
];

function levelOf(ans: number[]): { level: number; why: string } {
  const [, comp, roles, cob, col] = ans;
  const hasClient = comp > 0 || roles > 0;
  if (!hasClient)
    return {
      level: 0,
      why:
        ans[0] === 1
          ? "Si ya saliste, tu nivel lo marcan tus ingresos propios: sin un comprobante emitido estás en el 0, aunque ya no tengas sueldo."
          : "Todavía no emites un comprobante a un cliente propio, así que todo tu ingreso viene de un empleador.",
    };
  if (cob < 3) return { level: 1, why: "Ya cobraste a un cliente propio, pero tus ingresos propios todavía no cubren tu costo de vida tres meses seguidos." };
  if (cob === 4 && col === 3)
    return {
      level: 2,
      why: "Tus ingresos propios llegan a 1,2 veces tu costo de vida. Para saber si estás en el nivel 3 te falta calcular tu colchón: es la K.1, 20 minutos.",
    };
  if (cob < 4 || col !== 2)
    return {
      level: 2,
      why:
        cob < 4
          ? "Tus ingresos propios cubren tu costo de vida, pero todavía no llegan a 1,2 veces durante tres meses."
          : "Tus ingresos propios llegan a 1,2 veces tu costo de vida, pero tu colchón todavía no cubre 6 meses.",
    };
  return { level: 3, why: "Cumples las dos condiciones del punto de no retorno: 1,2 veces tu costo de vida tres meses seguidos y un colchón de al menos 6 meses." };
}

const NEXT: { label: string; href: string; ext?: boolean }[] = [
  { label: "Descarga el kit «Plan de salida»", href: "/kit" },
  { label: "Ver fechas del taller", href: "/programas#taller" },
  { label: "Postular al mastermind", href: "/programas#mastermind" },
  { label: "Agenda 30 minutos", href: "", ext: true },
];

export default function Diagnostico() {
  const id = useId();
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState<(number | null)[]>(QS.map(() => null));
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

  const q = QS[step];
  const cur = ans[step];

  function choose(i: number) {
    setAns((a) => a.map((v, k) => (k === step ? i : v)));
  }
  function next() {
    if (cur === null) return;
    if (step < QS.length - 1) setStep(step + 1);
    else setDone(true);
  }
  function restart() {
    setAns(QS.map(() => null));
    setStep(0);
    setDone(false);
  }

  if (done) return <Result ans={ans as number[]} onRestart={restart} headRef={head} />;

  return (
    <div className="border border-ink bg-paper">
      <div className="flex justify-between items-center gap-4 px-5 lg:px-8 py-4 border-b border-ink">
        <span className="wm">
          Pregunta {step + 1} de {QS.length}
        </span>
        <span className="flex gap-1" aria-hidden="true">
          {QS.map((_, k) => (
            <span key={k} className="block h-[3px] w-6 sm:w-8" style={{ background: k <= step ? "var(--color-ink)" : "var(--color-ink20)" }} />
          ))}
        </span>
      </div>
      <form
        className="px-5 lg:px-8 pt-6 pb-7 lg:pt-8 lg:pb-9"
        onSubmit={(e) => {
          e.preventDefault();
          next();
        }}
      >
        <fieldset className="m-0 p-0 border-0" aria-describedby={q.help ? `${id}-help` : undefined}>
          <legend className="w-full">
            <h2 ref={head} tabIndex={-1} className="ws text-[24px] lg:text-[30px] leading-[1.15] outline-none">
              {q.text}
            </h2>
          </legend>
          {q.help && (
            <p id={`${id}-help`} className="text-[15px] lg:text-[16px] leading-[1.45] text-ink2 mt-3">
              {q.help}
            </p>
          )}
          <div className="grid gap-2.5 mt-6">
            {q.options.map((o, i) => (
              <label
                key={o}
                className="flex items-center gap-4 min-h-[56px] px-4 py-3 border cursor-pointer transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-mag"
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
                  style={{ borderColor: cur === i ? "var(--color-paper)" : "var(--color-ink)", background: cur === i ? "var(--color-mag)" : "transparent" }}
                />
                <span className="text-[17px] font-semibold leading-[1.3]">{o}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-7">
          <button type="button" className={`btn2 ${step === 0 ? "max-sm:hidden sm:invisible" : ""}`} onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
            Anterior
          </button>
          <button type="submit" className="btn" disabled={cur === null} style={cur === null ? { opacity: 0.45, cursor: "not-allowed" } : undefined}>
            <span>{step < QS.length - 1 ? "Siguiente" : "Ver mi nivel"}</span>
            <Arrow />
          </button>
        </div>
      </form>
    </div>
  );
}

function Result({ ans, onRestart, headRef }: { ans: number[]; onRestart: () => void; headRef: React.RefObject<HTMLHeadingElement | null> }) {
  const { level: k, why } = levelOf(ans);
  const nx = NEXT[k];
  const noCalc = ans[4] !== 2;
  const justOut = ans[0] === 1 && k === 0;
  const project = ans[0] === 2;
  const doNow = justOut
    ? {
        head: "Revisa tu salida antes de firmar.",
        body: "Antes de firmar tu salida, llena la K.3 y anota la fecha límite para impugnar o reclamar. Revisa tu liquidación con un abogado laboral, después recalcula tu runway con la K.1 y lee el capítulo 5.",
      }
    : DO_NOW[k];
  const btn = justOut ? { label: "Abrir la K.3 Tu salida en números", href: "/workbook/k3", ext: false } : nx;
  return (
    <div className="grid gap-6">
      <div className="border border-ink bg-paper">
        <div className="px-5 lg:px-8 py-5 lg:py-6 border-b border-ink flex justify-between items-center gap-4" style={{ background: k === 3 ? "var(--color-ink)" : ["var(--color-paper)", "var(--color-warm)", "var(--color-ink20)"][k], color: k === 3 ? "var(--color-paper)" : undefined }}>
          <div>
            <Mono color={k === 3 ? "var(--color-magl)" : "var(--color-magt)"}>Tu resultado</Mono>
            <h2 ref={headRef} tabIndex={-1} className="wh text-[44px] lg:text-[64px] mt-2 outline-none">
              Nivel {k}: {LEVELS[k]}
            </h2>
          </div>
          <Lvl on={Array.from({ length: k + 1 }, (_, i) => i)} size={14} fg={k === 3 ? "var(--color-paper)" : "var(--color-ink)"} off={k === 3 ? "var(--color-ink20)" : "var(--color-ink3)"} label={`Nivel ${k} de 3`} />
        </div>
        <div className="px-5 lg:px-8 pt-6 pb-8 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <div>
            <p className="text-[17px] leading-[1.45]">
              <b>Cómo se ve:</b> {justOut ? "" : `${LOOK[k]} `}{why}
            </p>
            <h3 className="ws text-[24px] lg:text-[28px] mt-6">{doNow.head}</h3>
            <p className="wt mt-3">
              <Sc text={doNow.body} />
            </p>
            {project && (
              <p className="text-[16px] leading-[1.45] mt-4">
                Tu capítulo de referencia es el 13, la unidad económica, con el ejemplo de Rodrigo.{" "}
                <Link href="/workbook/13-1" className="ul font-semibold">
                  Ver la plantilla 13.1
                </Link>
              </p>
            )}
            {noCalc && k < 3 && !justOut && (
              <p className="text-[15px] leading-[1.45] mt-4 px-3 py-2.5 bg-warm">
                Tu colchón todavía no cubre 6 meses o no lo has calculado. Antes de cualquier paso, llena la K.1 del kit: son 20 minutos.
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-3 mt-7">
              {btn.ext ? (
                <a href={agendaUrl()} target="_blank" rel="noopener noreferrer" className="btn">
                  <span>{btn.label}</span>
                  <Arrow />
                </a>
              ) : (
                <Link href={btn.href} className="btn">
                  <span>{btn.label}</span>
                  <Arrow />
                </Link>
              )}
              <Link href="/#metodo" className="btn2">
                Ver la escalera
              </Link>
            </div>
            <p className="text-[15px] leading-[1.45] text-ink2 mt-5">Anota tu nivel con la fecha en «Tu nivel en la escalera», al comienzo del workbook.</p>
          </div>
          <div>
            <div className="wm text-ink2">Señal para pasar al siguiente</div>
            <p className="text-[19px] leading-[1.35] font-bold mt-2">{SIGNAL[k]}</p>
            <div className="wm text-ink2 mt-5">En el libro</div>
            <p className="text-[17px] mt-1.5">{CHAPS[k]}</p>
            <div className="wm text-ink2 mt-5 mb-1.5">Te acompaña</div>
            <ul>
              {WITH[k].map((w) => (
                <li key={w.name}>
                  <Link href={w.href} className="group flex justify-between items-baseline gap-4 py-3 border-t border-ink">
                    <span className="text-[17px] font-bold">
                      <span className="lnk">{w.name}</span>
                    </span>
                    <span className="wm text-ink2 text-right">{w.meta}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <SendResult k={k} ans={ans} />
      <button type="button" onClick={onRestart} className="ul self-start text-[16px] font-semibold">
        Volver a empezar el diagnóstico
      </button>
    </div>
  );
}

function SendResult({ k, ans }: { k: number; ans: number[] }) {
  const id = useId();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error" | "invalid">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) return setState("invalid");
    setState("sending");
    const [firstName, ...rest] = name.trim().split(/\s+/);
    const r = await sendLead({
      firstName,
      lastName: rest.join(" "),
      email: email.trim(),
      archetype: `Nivel ${k}: ${LEVELS[k]}`,
      archetypeNumber: k,
      score: k,
      maxScore: 3,
      situacion: QS[0].options[ans[0]],
      disposicionInversion: `Colchón: ${QS[4].options[ans[4]]}`,
      urgencia: `Cobertura: ${QS[3].options[ans[3]]}`,
    });
    setState(r.ok ? "ok" : "error");
  }

  return (
    <div className="bg-warm px-5 lg:px-8 py-6 lg:py-7">
      <h3 className="ws text-[22px] lg:text-[24px]">Recibe tu resultado y el kit en tu correo</h3>
      {state === "ok" ? (
        <p role="status" className="text-[17px] mt-3">
          Listo. Te enviamos tu nivel y el kit «Plan de salida» a {email.trim()}.
        </p>
      ) : (
        <form onSubmit={onSubmit} noValidate className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] sm:items-end mt-4">
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
          <button type="submit" className="btn" disabled={state === "sending"} style={{ minHeight: 56 }}>
            <span>{state === "sending" ? "Enviando..." : "Enviar"}</span>
            <Arrow />
          </button>
        </form>
      )}
      <div aria-live="polite">
        {state === "invalid" && <p className="text-[15px] text-magt mt-3">Revisa el correo: falta algo para que sea válido.</p>}
        {state === "error" && (
          <p className="text-[15px] mt-3">
            No pudimos registrar tus datos en este momento. Escríbenos por{" "}
            <a className="ul font-bold" href={whatsappUrl(`Hola, hice el diagnóstico y salí en el nivel ${k}, ${LEVELS[k]}.`)} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>{" "}
            y te respondemos con tu siguiente paso.
          </p>
        )}
      </div>
      <p className="text-[14px] text-ink2 mt-3">
        <Jn parts={["Sin costo", "Puedes darte de baja con un clic"]} />
      </p>
    </div>
  );
}
