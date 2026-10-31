"use client";

import { useEffect, useRef } from "react";

import { fmtNum as fmt } from "@/lib/format";

/** Cifra que cuenta de 0 a su valor al entrar en pantalla (1,2 s). El HTML del servidor ya trae el valor final. */
export default function CountUp({ value, decimals = 0, prefix = "", suffix = "" }: { value: number; decimals?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const final = `${prefix}${fmt(value, decimals)}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return; // ya visible: no la reinicia
    const paint = (v: number) => {
      el.textContent = `${prefix}${fmt(v, decimals)}${suffix}`;
    };
    let raf = 0;
    paint(0);
    const io = new IntersectionObserver(
      ([en]) => {
        if (!en.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const step = (t: number) => {
          const p = Math.min(1, (t - t0) / 1200);
          paint(value * (1 - Math.pow(1 - p, 3)));
          if (p < 1) raf = requestAnimationFrame(step);
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      paint(value);
    };
  }, [value, decimals, prefix, suffix]);

  return (
    <span className="tab">
      <span className="sr-only">{final}</span>
      <span ref={ref} aria-hidden="true">
        {final}
      </span>
    </span>
  );
}
