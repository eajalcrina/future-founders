"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMedia } from "@/lib/useMedia";
import type { Testimonio } from "@/content/testimonios";

const INTERVAL = 6500;

function useVisible() {
  const md = useMedia("(min-width: 48rem)");
  const lg = useMedia("(min-width: 64rem)");
  return lg ? 3 : md ? 2 : 1;
}

/**
 * Carrusel de reseñas: avanza solo, se pausa al pasar el puntero o al enfocar,
 * tiene controles con nombre y no se mueve solo con prefers-reduced-motion.
 */
export default function Testimonials({ items }: { items: Testimonio[] }) {
  const visible = useVisible();
  const max = Math.max(0, items.length - visible);
  const [raw, setI] = useState(0);
  const i = Math.min(raw, max);
  const [playing, setPlaying] = useState(true);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const reduce = useMedia("(prefers-reduced-motion: reduce)");
  const root = useRef<HTMLElement>(null);

  const go = useCallback((n: number) => setI(((n % (max + 1)) + max + 1) % (max + 1)), [max]);

  const autoplay = playing && !reduce;
  const running = autoplay && !hover && !focus;
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setI((x) => (x >= max ? 0 : x + 1)), INTERVAL);
    return () => clearInterval(t);
  }, [running, max]);

  const pages = max + 1;

  return (
    <section
      ref={root}
      aria-roledescription="carrusel"
      aria-label="Reseñas de participantes"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocus(true)}
      onBlur={(e) => {
        if (!root.current?.contains(e.relatedTarget as Node)) setFocus(false);
      }}
    >
      <div className="flex items-center justify-between gap-4 mb-5">
        <h3 className="wm text-ink2" style={{ fontWeight: 400 }}>
          Lo que dicen quienes pasaron por el método
        </h3>
        <div className="flex items-center gap-2">
          <button type="button" className="tc" onClick={() => setPlaying(!autoplay)} aria-label={autoplay ? "Pausar el avance automático" : "Reanudar el avance automático"}>
            {autoplay ? (
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 3h3v10H4zM9 3h3v10H9z" fill="currentColor" /></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5 13 8l-9 5.5z" fill="currentColor" /></svg>
            )}
          </button>
          <button type="button" className="tc" onClick={() => go(i - 1)} aria-label="Reseña anterior">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12H5M10.5 6.5 5 12l5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" /></svg>
          </button>
          <button type="button" className="tc" onClick={() => go(i + 1)} aria-label="Reseña siguiente">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13.5 6.5 19 12l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" /></svg>
          </button>
        </div>
      </div>

      <div className="overflow-hidden">
        <ul
          className="flex"
          aria-live={running ? "off" : "polite"}
          style={{
            transform: `translateX(-${(i * 100) / visible}%)`,
            transition: reduce ? "none" : "transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1)",
          }}
        >
          {items.map((t, k) => {
            const shown = k >= i && k < i + visible;
            return (
              <li
                key={t.nombre}
                role="group"
                aria-roledescription="diapositiva"
                aria-label={`${k + 1} de ${items.length}`}
                aria-hidden={!shown}
                inert={!shown}
                className="shrink-0 px-0 md:pr-5"
                style={{ width: `${100 / visible}%` }}
              >
                <figure className="card-soft h-full bg-paper p-6 lg:p-7 flex flex-col m-0">
                  {t.ejemplo && (
                    <span className="wm self-start px-2 py-1 mb-4 text-ink" style={{ background: "var(--color-ink10)", border: "1px dashed var(--color-ink2)" }}>
                      Testimonio de ejemplo
                    </span>
                  )}
                  <blockquote className="wt m-0 mb-5" style={{ fontSize: 18 }}>
                    <p>«{t.cita}»</p>
                  </blockquote>
                  <figcaption className="mt-auto pt-5 border-t border-ink">
                    <span className="block text-[17px] font-bold">{t.nombre}</span>
                    <span className="block text-[15px] text-ink2 mt-1">
                      {t.cargo}, {t.ciudad}
                    </span>
                    {t.programa && <span className="wm block text-ink2 mt-2">{t.programa}</span>}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex gap-2 mt-5" role="group" aria-label="Elegir reseña">
        {Array.from({ length: pages }, (_, p) => (
          <button
            key={p}
            type="button"
            onClick={() => go(p)}
            aria-label={`Ir a la reseña ${p + 1}`}
            aria-current={p === i ? "true" : undefined}
            className="h-11 flex items-center"
          >
            <span className="block h-[3px] w-6 transition-colors" style={{ background: p === i ? "var(--color-mag)" : "var(--color-ink20)" }} />
          </button>
        ))}
      </div>
    </section>
  );
}
