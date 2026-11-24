"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useMedia } from "@/lib/useMedia";
import { RESENAS_PUBLICABLES, type Testimonio } from "@/content/testimonios";
import type { Dict } from "@/i18n/es";
import { f } from "@/i18n/f";

const INTERVAL = 6500;

function useVisible() {
  const md = useMedia("(min-width: 48rem)");
  const lg = useMedia("(min-width: 64rem)");
  return lg ? 3 : md ? 2 : 1;
}

/**
 * Carrusel de reseñas. No rota solo: el botón de reproducir lo activa, se pausa al pasar
 * el puntero o al enfocar y queda quieto con prefers-reduced-motion. Filtra por su cuenta
 * y no pinta nada si no hay reseñas reales con permiso. Si todas caben en pantalla (una a tres
 * en escritorio) se muestran como tarjetas fijas, sin botones ni puntos.
 */
export default function Testimonials({ items: todas, t: tx }: { items: Testimonio[]; t: Dict["resenas"] }) {
  const items = RESENAS_PUBLICABLES(todas);
  const visible = useVisible();
  const max = Math.max(0, items.length - visible);
  const [raw, setI] = useState(0);
  const i = Math.min(raw, max);
  // Sin rotación automática por defecto (reglas web, sección 5); el botón de reproducir la activa.
  const [playing, setPlaying] = useState(false);
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
  const fijas = pages === 1;

  if (items.length === 0) return null;

  return (
    <section
      ref={root}
      aria-roledescription={fijas ? undefined : tx.carrusel}
      aria-label={tx.aria}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocus(true)}
      onBlur={(e) => {
        if (!root.current?.contains(e.relatedTarget as Node)) setFocus(false);
      }}
    >
      {!fijas && (
      <div className="flex items-center justify-end gap-4 mb-5">
        <div className="flex items-center gap-2">
          <button type="button" className="tc" onClick={() => setPlaying(!autoplay)} aria-label={autoplay ? tx.pausar : tx.reanudar}>
            {autoplay ? (
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 3h3v10H4zM9 3h3v10H9z" fill="currentColor" /></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5 13 8l-9 5.5z" fill="currentColor" /></svg>
            )}
          </button>
          <button type="button" className="tc" onClick={() => go(i - 1)} aria-label={tx.anterior}>
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12H5M10.5 6.5 5 12l5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" /></svg>
          </button>
          <button type="button" className="tc" onClick={() => go(i + 1)} aria-label={tx.siguiente}>
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h15M13.5 6.5 19 12l-5.5 5.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" /></svg>
          </button>
        </div>
      </div>
      )}

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
                aria-roledescription={fijas ? undefined : tx.diapositiva}
                aria-label={f(tx.nDeTotal, { n: k + 1, total: items.length })}
                aria-hidden={!shown}
                inert={!shown}
                className="shrink-0 px-0 md:pr-5"
                style={{ width: `${100 / visible}%` }}
              >
                <figure className="border border-ink20 h-full bg-paper p-6 lg:p-7 flex flex-col m-0">
                  <blockquote className="wt m-0 mb-5">
                    <p>«{t.cita}»</p>
                  </blockquote>
                  <figcaption className="mt-auto pt-5 border-t border-ink">
                    <span className="block text-cuerpo font-bold">{t.nombre}</span>
                    <span className="block text-recuadro text-ink2 mt-1">
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

      {!fijas && (
      <div className="flex gap-2 mt-5" role="group" aria-label={tx.elegir}>
        {Array.from({ length: pages }, (_, p) => (
          <button
            key={p}
            type="button"
            onClick={() => go(p)}
            aria-label={f(tx.irA, { n: p + 1 })}
            aria-current={p === i ? "true" : undefined}
            className="h-11 flex items-center"
          >
            <span className="block h-[3px] w-6 transition-colors" style={{ background: p === i ? "var(--color-ink)" : "var(--color-ink20)" }} />
          </button>
        ))}
      </div>
      )}
    </section>
  );
}
