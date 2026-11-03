"use client";

import { useEffect, useRef } from "react";

/** Regla de lectura: línea magenta de 2 px arriba que avanza con el scroll. */
export default function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const up = () => {
      raf = 0;
      const d = document.documentElement;
      const max = d.scrollHeight - d.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, d.scrollTop / max)) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(up);
    };
    up();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div aria-hidden="true" className="fixed left-0 right-0 top-0 h-[2px] z-50 pointer-events-none">
      <div ref={bar} className="h-full bg-mag origin-left" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}
