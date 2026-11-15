"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SEL = ".rv:not(.in), .rv-kids:not(.in), .lines:not(.in), .draw:not(.in)";

/** Retardo por línea para los titulares: agrupa las palabras por su posición vertical. */
function stagger(el: Element) {
  const words = Array.from(el.querySelectorAll<HTMLElement>(".w > span"));
  let line = -1;
  let lastTop = -Infinity;
  for (const w of words) {
    const top = (w.parentElement as HTMLElement).offsetTop;
    if (top > lastTop + 4) {
      line += 1;
      lastTop = top;
    }
    w.style.transitionDelay = `${line * 80}ms`;
  }
}

/**
 * Activa las entradas sutiles (.rv, .rv-kids, .lines, .draw) una sola vez al entrar en pantalla.
 * Sin JavaScript o con prefers-reduced-motion, el contenido ya es visible desde el inicio.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    (window as unknown as { __rv?: boolean }).__rv = true;
    const els = Array.from(document.querySelectorAll(SEL));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (!en.isIntersecting) continue;
          if (en.target.classList.contains("lines")) stagger(en.target);
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.12 }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
