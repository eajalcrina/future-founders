"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { fmtNum, parseNum } from "@/lib/format";
import { readSaved, writeSaved } from "@/lib/saved";
import { Arrow, Icon, Lectura, Nota, Scene } from "./ui";

type Ej = { key: "carmen" | "javier"; name: string; a: string; b: string; bio: string; lectura: React.ReactNode };
const EJ: Ej[] = [
  {
    key: "carmen",
    name: "Carmen",
    a: "61.600",
    b: "8.800",
    bio: "47 años, gerenta de finanzas en Lima. Tiene empleo y empieza el kit por la K.1.",
    lectura: (
      <>
        El capítulo 2 afina el costo de vida. Si Carmen suma lo que hoy paga la minera, como la <span className="sc">EPS</span>, el celular y el seguro de vida, su costo sube a{" "}
        <span className="sc">USD</span>&nbsp;9.400 y su runway baja a 6,6 meses.
      </>
    ),
  },
  {
    key: "javier",
    name: "Javier",
    a: "61.150",
    b: "12.500",
    bio: "52 años, ex VP Comercial en Bogotá. Acaba de salir de su empresa y hace la K.1 con la indemnización incluida.",
    lectura: (
      <>
        Con el recorte que acordó en casa, el costo de vida de Javier baja a <span className="sc">USD</span>&nbsp;10.000 y su runway sube a 6,1 meses.
      </>
    ),
  },
];
const MIN = 6;

/** Calculadora K.1: runway = ahorro líquido ÷ costo de vida mensual, con el mínimo de 6 meses marcado. */
export default function RunwayCalc() {
  const id = useId();
  const [ej, setEj] = useState<Ej>(EJ[0]);
  const [a, setA] = useState(EJ[0].a);
  const [b, setB] = useState(EJ[0].b);
  const [m, setM] = useState(["", "", "", ""]);
  const [loaded, setLoaded] = useState(false);
  const aRef = useRef<HTMLInputElement>(null);

  const A = parseNum(a);
  const B = parseNum(b);
  const valid = Number.isFinite(A) && Number.isFinite(B) && A >= 0 && B > 0;
  const runway = valid ? Math.round((A / B) * 10) / 10 : null;
  const isEj = a === ej.a && b === ej.b;

  // Tus números guardados en este navegador, si los hay. Se leen después de montar para no romper el HTML estático.
  useEffect(() => {
    const s = readSaved("k1");
    if (s?.v.A || s?.v.B) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setA(s.v.A ?? "");
      setB(s.v.B ?? "");
    }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded || EJ.some((e) => e.a === a && e.b === b)) return;
    writeSaved("k1", { v: { A: a, B: b }, out: runway !== null ? { runway } : {} });
  }, [loaded, a, b, runway]);

  // Estimar B: (mes 1 + mes 2 + mes 3) ÷ 3 + gastos anuales ÷ 12, como en la K.1 del workbook.
  const mv = m.map(parseNum);
  const estB = mv.slice(0, 3).every(Number.isFinite) ? (mv[0] + mv[1] + mv[2]) / 3 + (Number.isFinite(mv[3]) ? mv[3] : 0) / 12 : null;

  const scale = Math.max(12, runway !== null ? Math.ceil(runway / 2) * 2 : 12);
  const pct = (m: number) => (Math.min(m, scale) / scale) * 100;
  const ticks = Array.from({ length: scale / 2 + 1 }, (_, i) => i * 2).filter((m, _, arr) => arr.length <= 9 || m % 4 === 0);

  const words = ["", "uno", "dos", "tres", "cuatro", "cinco", "seis"];
  const amount = (d: number) => (Number.isInteger(d) && d < words.length ? words[d] : fmtNum(d, 1));
  let title = "Escribe tus dos números para ver tu runway";
  if (runway !== null) {
    const diff = Math.round((runway - MIN) * 10) / 10;
    const who = isEj ? `${ej.name} cubre` : "Cubres";
    if (diff > 0) title = `${who} ${fmtNum(runway, 1)} meses sin sueldo, ${amount(diff)} más que el colchón mínimo de 6`;
    else if (diff === 0) title = `${who} ${fmtNum(runway, 1)} meses sin sueldo, justo el colchón mínimo de 6`;
    else title = `${who} ${fmtNum(runway, 1)} meses sin sueldo, ${amount(-diff)} menos que el colchón mínimo de 6`;
  }

  function mine() {
    setA("");
    setB("");
    aRef.current?.focus();
  }
  function pick(e: Ej) {
    setEj(e);
    setA(e.a);
    setB(e.b);
  }

  const field = (label: string, val: string, set: (v: string) => void, key: string, ref?: React.Ref<HTMLInputElement>) => (
    <div>
      <label htmlFor={`${id}-${key}`} className="wm block text-ink2 mb-2" style={{ whiteSpace: "pre" }}>
        {label}
      </label>
      <input
        id={`${id}-${key}`}
        ref={ref}
        className="field tab"
        inputMode="decimal"
        autoComplete="off"
        placeholder="0"
        value={val}
        onChange={(e) => set(e.target.value.replace(/[^\d.,\s]/g, ""))}
        onBlur={() => {
          const n = parseNum(val);
          if (Number.isFinite(n)) set(fmtNum(n, n % 1 ? 2 : 0));
        }}
      />
    </div>
  );

  return (
    <div className="grid gap-10 lg:gap-[72px] lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] items-start">
      <div className="crop">
        <div className="border border-ink bg-paper">
          <div className="flex justify-between items-center px-5 lg:px-6 py-4 border-b border-ink">
            <div className="flex gap-2.5 items-center">
              <Icon name="formula" size={20} />
              <span className="wm">Calculadora K.1</span>
            </div>
            <span className="wm text-ink2" aria-live="polite">{isEj ? `Ejemplo con ${ej.name}` : "Tus números"}</span>
          </div>
          <div className="px-5 lg:px-6 pt-[26px] pb-7 grid gap-5">
            <fieldset className="m-0 p-0 border-0">
              <legend className="wm text-ink2 mb-2">Ejemplo</legend>
              <div className="grid grid-cols-2">
                {EJ.map((e, i) => (
                  <label
                    key={e.key}
                    className={`relative min-h-[44px] flex items-center justify-center border border-ink cursor-pointer text-[15px] font-semibold ${i ? "border-l-0" : ""} has-[:focus-visible]:outline has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-mag has-[:focus-visible]:z-10`}
                    style={ej.key === e.key && isEj ? { background: "var(--color-ink)", color: "var(--color-paper)" } : undefined}
                  >
                    <input type="radio" name={`${id}-ej`} value={e.key} checked={ej.key === e.key && isEj} onChange={() => pick(e)} className="sr-only" />
                    {e.name}
                  </label>
                ))}
              </div>
            </fieldset>
            {field("A  Ahorro líquido", a, setA, "a", aRef)}
            {field("B  Costo de vida mensual", b, setB, "b")}
            <p className="text-[14px] text-ink2 -mt-2">En dólares o en tu moneda, la misma en las dos.</p>
            <details className="border-t border-ink20 pt-3 group/est">
              <summary className="cursor-pointer text-[15px] font-semibold ul inline">Estimar B con tres meses</summary>
              <div className="grid grid-cols-2 gap-3 mt-3">
                {["Mes 1", "Mes 2", "Mes 3", "Gastos anuales del último año"].map((l, i) => (
                  <div key={l} className={i === 3 ? "col-span-2" : ""}>
                    <label htmlFor={`${id}-m${i}`} className="text-[14px] block text-ink2 mb-1.5">
                      {l}
                    </label>
                    <input
                      id={`${id}-m${i}`}
                      className="field tab"
                      style={{ height: 44 }}
                      inputMode="decimal"
                      autoComplete="off"
                      value={m[i]}
                      onChange={(e) => setM((o) => o.map((x, k) => (k === i ? e.target.value.replace(/[^\d.,\s]/g, "") : x)))}
                    />
                  </div>
                ))}
              </div>
              <p className="text-[14px] text-ink2 mt-2">B = (mes 1 + mes 2 + mes 3) ÷ 3 + gastos anuales ÷ 12</p>
              <button
                type="button"
                className="btn2 w-full mt-3"
                style={{ minHeight: 44 }}
                disabled={estB === null}
                onClick={() => estB !== null && setB(fmtNum(estB, 0))}
              >
                {estB === null ? "Escribe los tres meses" : `Usar ${fmtNum(estB, 0)} como B`}
              </button>
            </details>
            <div className="border-t-2 border-ink pt-4 flex justify-between items-end gap-4">
              <div>
                <div className="wm text-ink2">Runway = A ÷ B</div>
                <div className="text-[15px] text-ink2 mt-1.5">Meses que vives sin sueldo</div>
              </div>
              <output htmlFor={`${id}-a ${id}-b`} aria-live="polite" className="wh tab whitespace-nowrap" style={{ fontSize: "clamp(64px, 7vw, 96px)", lineHeight: 0.8 }}>
                {runway !== null ? fmtNum(runway, 1) : "–"}
                <span className="text-[26px] lg:text-[32px] ml-2">meses</span>
              </output>
            </div>
            {!valid && (a || b) && <p className="text-[14px] text-magt">El costo de vida tiene que ser mayor que cero.</p>}
            <div className="flex flex-col gap-3">
              <button type="button" onClick={mine} className="btn2 w-full">
                <span>Calcular con mis números</span>
                <Arrow />
              </button>
              {!isEj && (
                <button type="button" onClick={() => pick(ej)} className="ul self-center text-[15px] font-semibold">
                  Volver al ejemplo de {ej.name}
                </button>
              )}
            </div>
          </div>
        </div>
        <span className="cm tl" aria-hidden="true" />
        <span className="cm br" aria-hidden="true" />
      </div>

      <div>
        <div className="pt-3.5 border-t-2 border-ink">
          <h3 className="ws text-[22px] lg:text-[26px] leading-[1.18]" aria-live="polite">
            {title}
          </h3>
          <p className="text-[15px] lg:text-[16px] text-ink2 mt-1.5">
            {isEj ? `Runway de ${ej.name} en meses, con su costo de vida actual, frente al colchón mínimo de 6 meses` : "Tu runway en meses frente al colchón mínimo de 6 meses"}
          </p>
        </div>

        <div className="relative mt-7 h-[124px] max-w-[620px]" role="img" aria-label={runway !== null ? `Barra: ${fmtNum(runway, 1)} meses de runway; el mínimo recomendado es 6.` : "Barra sin datos"}>
          <span className="wm absolute top-0 text-magt text-right" style={{ right: `calc(${100 - pct(MIN)}% + 8px)` }}>
            Mínimo 6
          </span>
          <div className="absolute left-0 right-0 top-[34px] h-10 border border-ink bg-paper">
            <div className="h-full bg-ink transition-[width] duration-300 ease-out" style={{ width: `${runway !== null ? pct(runway) : 0}%` }} />
          </div>
          <span className="absolute top-[20px] w-[2px] h-[68px] bg-mag" style={{ left: `calc(${pct(MIN)}% - 1px)` }} />
          {runway !== null && (
            <span
              className="wm absolute top-[45px] whitespace-nowrap"
              style={
                pct(runway) > 78
                  ? { right: `calc(${100 - pct(runway)}% + 10px)`, color: "var(--color-paper)" }
                  : { left: `calc(${pct(runway)}% + 10px)`, color: "var(--color-ink)" }
              }
            >
              {fmtNum(runway, 1)} meses
            </span>
          )}
          {ticks.map((m) => (
            <span key={m}>
              <span className="absolute top-[74px] w-px h-1.5 bg-ink" style={{ left: `${pct(m)}%` }} />
              <span className="wm absolute top-[86px] w-[30px] -ml-[15px] text-center text-ink2" style={{ left: `${pct(m)}%` }}>
                {m}
              </span>
            </span>
          ))}
        </div>

        <div className="grid gap-5 lg:gap-7 xl:grid-cols-[minmax(0,1fr)_300px] mt-7">
          <Lectura bg="var(--color-paper)" text={ej.lectura} />
          <div className="bg-sal px-[18px] pt-[18px] pb-5" style={{ borderLeft: "2px solid var(--color-sald)" }}>
            <div className="flex gap-3.5 items-start">
              <Scene who={ej.key} className="w-[96px] shrink-0" />
              <div>
                <div className="wm" style={{ color: "var(--color-sald)" }}>
                  {ej.name}
                </div>
                <p className="text-[15px] leading-[1.4] mt-1.5" style={{ color: "var(--color-sald)" }}>
                  {ej.bio}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Nota className="mt-5 lg:mt-[22px]">
          Ahorro líquido es el dinero que puedes usar en una semana sin una penalidad grande. Tu fondo de pensiones, tu casa y tu auto quedan fuera.
        </Nota>
        <Link href="/workbook/1-1" className="group inline-flex gap-2 items-center mt-6 text-[17px] font-bold">
          <span className="lnk">Siguiente: tus tres runways (plantilla 1.1)</span>
          <Arrow />
        </Link>
      </div>
    </div>
  );
}
