"use client";

import Link from "next/link";
import { useState, type KeyboardEvent } from "react";
import { LEVELS, LOOK, SIGNAL, CHAPS, DO_NOW, WITH, HERE } from "@/content/sitio";
import { Figure, Jn, Lvl, Mono, Sc } from "./ui";

const PAPER = "#F6F6F4", WARM = "#E6E4E0", INK = "#0C0C0D", INK2 = "#3D3D42", INK20 = "#C7C7C6", MAG = "#E6007E";
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
const CHLABELS: [number, number, string, string][] = [
  [150, RY[0] + 10, "Cap. 1 a 17", INK2],
  [XS[1] + 200, RY[1] + 10, "18", INK2],
  [XS[2] + 170, RY[2] + 10, "19", INK2],
  [XS[2] + 230, RY[2] + 10, "20", INK2],
  [XS[3] + 200, RY[3] + 10, "21", INK20],
];

function Panel({ k, mobile }: { k: number; mobile?: boolean }) {
  const { head, body } = DO_NOW[k];
  const tag = (
    <Mono color="var(--color-magt)">
      <Jn parts={[`Nivel ${k}`, LEVELS[k]]} />
    </Mono>
  );
  const sig = (
    <div>
      <div className="wm text-ink2">Señal para pasar al siguiente</div>
      <p className="text-[19px] leading-[1.35] font-bold mt-2">{SIGNAL[k]}</p>
      <div className="wm text-ink2 mt-[22px]">En el libro</div>
      <p className="text-[17px] mt-1.5">{CHAPS[k]}</p>
    </div>
  );
  const items = (
    <div>
      <div className="wm text-ink2 mb-1.5">Te acompaña</div>
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
      <p className="text-[15px] leading-[1.45] mt-4 px-3 py-2.5" style={{ color: "var(--color-sald)", background: "var(--color-sal)", borderLeft: "2px solid var(--color-sald)" }}>
        {HERE[k]}
      </p>
    </div>
  );
  if (mobile)
    return (
      <div className="xfade bg-warm px-5 pt-6 pb-[26px]">
        {tag}
        <h3 className="ws text-[24px] mt-3">{head}</h3>
        <p className="wt mt-3" style={{ fontSize: 17 }}>
          <Sc text={body} />
        </p>
        <div className="mt-[22px]">{sig}</div>
        <div className="mt-[22px]">{items}</div>
      </div>
    );
  return (
    <div className="xfade bg-warm grid gap-10 xl:gap-14 grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1.2fr)] px-10 pt-9 pb-10">
      <div>
        {tag}
        <h3 className="ws text-[30px] leading-[1.12] mt-3.5">{head}</h3>
        <p className="wt mt-3.5" style={{ fontSize: 18 }}>
          <Sc text={body} />
        </p>
      </div>
      {sig}
      {items}
    </div>
  );
}

export default function Ladder() {
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
          <div role="radiogroup" aria-label="Elige tu nivel en la escalera">
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
                  Nivel {k}
                </span>
                <span className="wh absolute whitespace-nowrap" style={{ left: "6.1%", top: "42px", fontSize: "2.6cqw" }}>
                  {LEVELS[k]}
                </span>
              </button>
            ))}
          </div>
          <svg viewBox={`0 0 ${CW} ${SH}`} className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" aria-hidden="true">
            <defs>
              <mask id="route-mask" maskUnits="userSpaceOnUse" x="-20" y="-20" width={CW + 40} height={SH + 40}>
                <path className="route-mask" d={ROUTE_ALL} fill="none" stroke="#fff" strokeWidth="8" pathLength={1} strokeDasharray="1 1" />
              </mask>
            </defs>
            <g mask="url(#route-mask)">
              <path d={ROUTE_INK} fill="none" stroke={INK} strokeWidth="1.4" strokeDasharray="5 4" />
              <path d={ROUTE_PAPER} fill="none" stroke={PAPER} strokeWidth="1.4" strokeDasharray="5 4" />
            </g>
            {STATIONS.map(([x, y], n) => {
              const dark = x >= XS[3];
              return <circle key={n} cx={x} cy={y} r={n < 17 ? 2.6 : 4} fill={dark ? INK : PAPER} stroke={dark ? PAPER : INK} strokeWidth="1.3" />;
            })}
            <g className="flag" style={{ transformBox: "fill-box" }}>
              <line x1={FX} y1={TOPS[3]} x2={FX} y2={TOPS[3] - 36} stroke={INK} strokeWidth="1.5" />
              <path d={`M${FX} ${TOPS[3] - 36} L${FX + 28} ${TOPS[3] - 28} L${FX} ${TOPS[3] - 20}z`} fill={MAG} />
            </g>
            <line x1="-10" y1={BASE} x2={CW + 10} y2={BASE} stroke={INK} strokeWidth="1.5" />
          </svg>
          {CHLABELS.map(([x, y, t, c]) => (
            <span
              key={t}
              aria-hidden="true"
              className="wm absolute pointer-events-none"
              style={{
                left: px(t.startsWith("Cap") ? x : x - 20),
                top: py(y),
                width: t.startsWith("Cap") ? undefined : px(40),
                textAlign: t.startsWith("Cap") ? "left" : "center",
                color: c,
                letterSpacing: ".06em",
                fontSize: "max(10px, 0.92cqw)",
              }}
            >
              {t}
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
        <div className="grid grid-cols-4">
          {LOOK.map((t, k) => (
            <div key={k} className="border-t border-ink pt-2.5 pr-5">
              <div className="wm text-ink2">Cómo se ve</div>
              <p className="text-[16px] leading-[1.4] mt-1.5">{t}</p>
            </div>
          ))}
        </div>
        <div id="panel-nivel" className="mt-9" role="region" aria-live="polite" aria-label={`Nivel ${sel}, ${LEVELS[sel]}`}>
          <Panel key={sel} k={sel} />
        </div>
      </div>

      {/* ------------------------------------------------ móvil */}
      <div className="lg:hidden">
        <svg viewBox="0 0 350 150" className="block w-full h-auto" aria-hidden="true">
          {[0, 1, 2, 3].map((k) => {
            const h = 34 + k * 30;
            return <rect key={k} x={k * 87.5 + 0.5} y={148 - h} width={87.5 - (k === 3 ? 1 : 0)} height={h} fill={FILL[k]} stroke={INK} strokeWidth="1" />;
          })}
          <line x1="0" y1="148.5" x2="350" y2="148.5" stroke={INK} strokeWidth="1.5" />
          <line x1="326" y1="24" x2="326" y2="2" stroke={INK} strokeWidth="1.3" />
          <path d="M326 2 L344 7 L326 12z" fill={MAG} />
        </svg>
        <div role="radiogroup" aria-label="Elige tu nivel en la escalera" className="mt-4">
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
                boxShadow: sel === k ? `inset 6px 0 0 ${MAG}` : undefined,
              }}
            >
              <span className="wh text-[34px]">{k}</span>
              <span className="min-w-0">
                <span className="wm block" style={{ color: k === 3 ? INK20 : INK2 }}>
                  Nivel {k}
                </span>
                <span className="block text-[19px] font-bold mt-0.5">{LEVELS[k]}</span>
                <span className="block text-[14px] leading-[1.35] mt-1" style={{ color: k === 3 ? INK20 : INK2 }}>
                  {LOOK[k]}
                </span>
              </span>
              <Lvl on={Array.from({ length: k + 1 }, (_, i) => i)} size={8} fg={k === 3 ? PAPER : INK} off={k === 3 ? INK20 : "#5E5E66"} />
            </button>
          ))}
        </div>
        <div id="panel-nivel-m" className="mt-4" role="region" aria-live="polite" aria-label={`Nivel ${sel}, ${LEVELS[sel]}`}>
          <Panel key={sel} k={sel} mobile />
        </div>
      </div>
    </div>
  );
}
