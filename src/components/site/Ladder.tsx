"use client";

import { useState, type KeyboardEvent } from "react";
import type { Dict } from "@/i18n/es";
import { f } from "@/i18n/f";
import { Figure, Jn, Lvl, Mono, Sc } from "./ui";

type S = Pick<Dict["sitio"], "levels" | "look" | "signal" | "chaps" | "doNow" | "here">;
type T = Dict["ladder"];

// Colores de los tokens (globals.css). En el SVG van por la propiedad style, que admite variables.
const PAPER = "var(--color-paper)", WARM = "var(--color-warm)", INK = "var(--color-ink)", INK2 = "var(--color-ink2)", INK3 = "var(--color-ink3)", INK20 = "var(--color-ink20)", MAG = "var(--color-mag)";
const FILL = [PAPER, WARM, INK20, INK];
const TXT = [INK, INK, INK, PAPER];

// Geometría del tablero Web-01 (1312 × 420), en porcentajes para que escale.
const CW = 1312, SH = 420, SW = 328, BASE = 400;
const TOPS = [284, 202, 120, 38];
const RY = TOPS.map((t) => t + 88);
const XS = [0, 328, 656, 984];
const FX = 3 * SW + 270;
const px = (x: number) => `${(x / CW) * 100}%`;
const py = (y: number) => `${(y / SH) * 100}%`;

const ROUTE_INK = `M28 ${RY[0]} L${XS[1] - 16} ${RY[0]} L${XS[1] - 16} ${RY[1]} L${XS[2] - 16} ${RY[1]} L${XS[2] - 16} ${RY[2]} L${XS[3] - 16} ${RY[2]} L${XS[3] - 16} ${RY[3]} L${XS[3]} ${RY[3]}`;
const ROUTE_PAPER = `M${XS[3]} ${RY[3]} L${FX} ${RY[3]} L${FX} ${TOPS[3]}`;
const ROUTE_ALL = `${ROUTE_INK} L${FX} ${RY[3]} L${FX} ${TOPS[3]}`;
const STATIONS: [number, number][] = [
  ...Array.from({ length: 17 }, (_, i) => [150 + i * 10, RY[0]] as [number, number]),
  [XS[1] + 200, RY[1]],
  [XS[2] + 170, RY[2]],
  [XS[2] + 230, RY[2]],
  [XS[3] + 200, RY[3]],
];
/** Rótulos de capítulos sobre la ruta; el primero («Cap. 1 a 17») sale del diccionario. */
const CHLABELS: [number, number, string, string][] = [
  [150, RY[0] + 10, "", INK2],
  [XS[1] + 200, RY[1] + 10, "18", INK2],
  [XS[2] + 170, RY[2] + 10, "19", INK2],
  [XS[2] + 230, RY[2] + 10, "20", INK2],
  [XS[3] + 200, RY[3] + 10, "21", INK20],
];

function Panel({ k, mobile, t, s, nivel }: { k: number; mobile?: boolean; t: T; s: S; nivel: string }) {
  const { head, body } = s.doNow[k];
  const tag = (
    <Mono>
      <Jn parts={[f(nivel, { k }), s.levels[k]]} />
    </Mono>
  );
  const sig = (
    <div>
      <div className="wm text-ink2">{k < 3 ? t.senal : t.sostener}</div>
      <p className="text-h3 leading-[1.35] font-bold mt-2">{s.signal[k]}</p>
      <div className="wm text-ink2 mt-[22px]">{t.enLibro}</div>
      <p className="text-cuerpo mt-1.5">{s.chaps[k]}</p>
    </div>
  );
  // Los programas de cada nivel van una sola vez, en la sección Programas de la portada (R6).
  const items = (
    <p className="bg-sage text-recuadro leading-[1.45] px-3 py-2.5" style={{ borderTop: "var(--filete-fino) solid var(--color-saged)" }}>
      {s.here[k]}
    </p>
  );
  if (mobile)
    return (
      <div className="xfade bg-warm px-5 pt-6 pb-[26px]">
        {tag}
        <h3 className="ws text-figura mt-3">{head}</h3>
        <p className="wt mt-3">
          <Sc text={body} />
        </p>
        <div className="mt-[22px]">{sig}</div>
        <div className="mt-[22px]">{items}</div>
      </div>
    );
  return (
    <div className="xfade bg-warm grid gap-10 xl:gap-14 grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] px-10 pt-9 pb-10">
      <div>
        {tag}
        <h3 className="ws text-figura mt-3.5">{head}</h3>
        <p className="wt mt-3.5">
          <Sc text={body} />
        </p>
      </div>
      <div>
        {sig}
        <div className="mt-[22px]">{items}</div>
      </div>
    </div>
  );
}

export default function Ladder({ t, sitio: s, nivel }: { t: T; sitio: S; nivel: string }) {
  const [sel, setSel] = useState(0);
  function onKey(e: KeyboardEvent<HTMLButtonElement>, v: string) {
    const keys: Record<string, number> = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    let n: number | null = null;
    if (e.key in keys) n = (sel + keys[e.key] + 4) % 4;
    if (e.key === "Home") n = 0;
    if (e.key === "End") n = 3;
    if (n === null) return;
    e.preventDefault();
    setSel(n);
    document.getElementById(`lv-${v}-${n}`)?.focus();
  }

  const radio = (k: number, v: string, ctrl: string) => ({
    id: `lv-${v}-${k}`,
    role: "radio" as const,
    "aria-checked": sel === k,
    tabIndex: sel === k ? 0 : -1,
    onClick: () => setSel(k),
    onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => onKey(e, v),
    "aria-controls": ctrl,
  });

  return (
    <div>
      {/* ------------------------------------------------ escritorio */}
      <div className="hidden lg:block">
        <div className="draw relative w-full" style={{ aspectRatio: `${CW} / ${SH}`, containerType: "inline-size" }}>
          <div role="radiogroup" aria-label={t.elige}>
            {[0, 1, 2, 3].map((k) => (
              <button
                key={k}
                type="button"
                {...radio(k, "d", "panel-nivel")}
                className="absolute text-left cursor-pointer transition-[box-shadow] duration-200"
                style={{
                  left: px(XS[k]),
                  top: py(TOPS[k]),
                  width: px(SW + (k === 3 ? 0 : 1)),
                  height: py(BASE - TOPS[k]),
                  background: FILL[k],
                  color: TXT[k],
                  border: `1px solid ${INK}`,
                  borderBottom: "none",
                  boxShadow: sel === k ? `inset 0 6px 0 ${MAG}` : undefined,
                }}
              >
                <span className="wm absolute" style={{ left: "6.1%", top: "18px", color: k === 3 ? INK20 : INK2, fontSize: "max(10px, 0.92cqw)" }}>
                  {f(nivel, { k })}
                </span>
                <span className="wh2 absolute whitespace-nowrap" style={{ left: "6.1%", top: "40px", fontSize: "2.6cqw" }}>
                  {s.levels[k]}
                </span>
              </button>
            ))}
          </div>
          <svg viewBox={`0 0 ${CW} ${SH}`} className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" aria-hidden="true">
            <defs>
              <mask id="route-mask" maskUnits="userSpaceOnUse" x="-20" y="-20" width={CW + 40} height={SH + 40}>
                <path className="route-mask" d={ROUTE_ALL} fill="none" stroke="white" strokeWidth="8" pathLength={1} strokeDasharray="1 1" />
              </mask>
            </defs>
            <g mask="url(#route-mask)">
              <path d={ROUTE_INK} fill="none" style={{ stroke: INK }} strokeWidth="1.3" strokeDasharray="4 3" />
              <path d={ROUTE_PAPER} fill="none" style={{ stroke: PAPER }} strokeWidth="1.3" strokeDasharray="4 3" />
            </g>
            {STATIONS.map(([x, y], n) => {
              const dark = x >= XS[3];
              return <circle key={n} cx={x} cy={y} r={n < 17 ? 2.4 : 3.6} style={{ fill: dark ? INK : PAPER, stroke: dark ? PAPER : INK }} strokeWidth="1.2" />;
            })}
            <g className="flag" style={{ transformBox: "fill-box" }}>
              <line x1={FX} y1={TOPS[3]} x2={FX} y2={TOPS[3] - 36} style={{ stroke: INK }} strokeWidth="1.4" />
              <path d={`M${FX} ${TOPS[3] - 36} L${FX + 28} ${TOPS[3] - 28} L${FX} ${TOPS[3] - 20}z`} style={{ fill: MAG }} />
            </g>
            <line x1="-10" y1={BASE} x2={CW + 10} y2={BASE} style={{ stroke: INK }} strokeWidth="1.5" />
          </svg>
          {CHLABELS.map(([x, y, rot, c], i) => (
            <span
              key={i}
              aria-hidden="true"
              className="wm absolute pointer-events-none"
              style={{
                left: px(i === 0 ? x : x - 20),
                top: py(y),
                width: i === 0 ? undefined : px(40),
                textAlign: i === 0 ? "left" : "center",
                color: c,
                letterSpacing: ".06em",
                fontSize: "max(10px, 0.92cqw)",
              }}
            >
              {i === 0 ? t.capitulos : rot}
            </span>
          ))}
          {(["carmen", "andrea", "javier"] as const).map((who, i) => (
            <div key={who} className="absolute pointer-events-none" style={{ left: px(104 + i * 70), top: py(TOPS[0] - 104), width: px(50) }}>
              <span className="wm block text-center text-ink2 absolute left-1/2 -translate-x-1/2 -top-6" style={{ letterSpacing: ".06em", fontSize: "max(10px, 0.92cqw)" }}>
                {who[0].toUpperCase() + who.slice(1)}
              </span>
              <Figure who={who} />
            </div>
          ))}
          <div className="absolute pointer-events-none" style={{ left: px(XS[2] + 40), top: py(TOPS[2] - 104), width: px(50) }}>
            <span className="wm block text-center text-ink2 absolute left-1/2 -translate-x-1/2 -top-6" style={{ letterSpacing: ".06em", fontSize: "max(10px, 0.92cqw)" }}>
              Rodrigo
            </span>
            <Figure who="rodrigo" />
          </div>
        </div>
        {/* «Cómo se ve» va una vez, como cabecera de la fila (no se repite en cada columna). */}
        <div className="border-t border-ink pt-2.5">
          <div className="wm text-ink2">{t.comoSeVe}</div>
          <div className="grid grid-cols-4">
            {s.look.map((l, k) => (
              <p key={k} className="text-recuadro leading-[1.4] mt-1.5 pr-5">
                <span className="sr-only">{f(t.nivelNombre, { k, nombre: s.levels[k] })}: </span>
                {l}
              </p>
            ))}
          </div>
        </div>
        <div id="panel-nivel" className="mt-9" role="region" aria-live="polite" aria-label={f(t.nivelNombre, { k: sel, nombre: s.levels[sel] })}>
          <Panel key={sel} k={sel} t={t} s={s} nivel={nivel} />
        </div>
      </div>

      {/* ------------------------------------------------ móvil */}
      <div className="lg:hidden">
        <svg viewBox="0 0 350 150" className="block w-full h-auto" aria-hidden="true">
          {[0, 1, 2, 3].map((k) => {
            const h = 34 + k * 30;
            return <rect key={k} x={k * 87.5 + 0.5} y={148 - h} width={87.5 - (k === 3 ? 1 : 0)} height={h} style={{ fill: FILL[k], stroke: INK }} strokeWidth="1" />;
          })}
          <line x1="0" y1="148.5" x2="350" y2="148.5" style={{ stroke: INK }} strokeWidth="1.5" />
          <line x1="326" y1="24" x2="326" y2="2" style={{ stroke: INK }} strokeWidth="1.4" />
          <path d="M326 2 L344 7 L326 12z" style={{ fill: MAG }} />
        </svg>
        <div role="radiogroup" aria-label={t.elige} className="mt-4">
          {[0, 1, 2, 3].map((k) => (
            <button
              key={k}
              type="button"
              {...radio(k, "m", "panel-nivel-m")}
              className="w-full grid grid-cols-[44px_minmax(0,1fr)_auto] items-center gap-2 px-4 py-3.5 text-left"
              style={{
                background: FILL[k],
                color: TXT[k],
                border: `1px solid ${INK}`,
                borderTop: k === 0 ? `1px solid ${INK}` : "none",
                boxShadow: sel === k ? `inset 0 5px 0 ${MAG}` : undefined,
              }}
            >
              <span className="num text-kpi">{k}</span>
              <span className="min-w-0">
                <span className="wm block" style={{ color: k === 3 ? INK20 : INK2 }}>
                  {f(nivel, { k })}
                </span>
                <span className="block text-h3 font-bold mt-0.5">{s.levels[k]}</span>
                <span className="block text-recuadro leading-[1.35] mt-1" style={{ color: k === 3 ? INK20 : INK2 }}>
                  {s.look[k]}
                </span>
              </span>
              <Lvl on={Array.from({ length: k + 1 }, (_, i) => i)} size={8} fg={k === 3 ? PAPER : INK} off={k === 3 ? INK20 : INK3} />
            </button>
          ))}
        </div>
        <div id="panel-nivel-m" className="mt-4" role="region" aria-live="polite" aria-label={f(t.nivelNombre, { k: sel, nombre: s.levels[sel] })}>
          <Panel key={sel} k={sel} t={t} s={s} nivel={nivel} mobile />
        </div>
      </div>
    </div>
  );
}
