"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import ReadingProgress from "./ReadingProgress";
import { NAV } from "@/content/sitio";

/**
 * Encabezado fijo (sticky). Alto fijo de --header-h, más el área segura del celular.
 * Un centinela de 1 px arriba de la página pone data-scrolled al salir de la vista: aparece el filete inferior.
 * En /libro, la regla de lectura corre por el borde inferior del encabezado.
 */
export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sentinel = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const el = sentinel.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const isActive = (href: string) => !href.includes("#") && pathname.startsWith(href);

  return (
    <>
      <span ref={sentinel} aria-hidden="true" className="absolute top-0 left-0 w-px h-px pointer-events-none" />
      <header className="cab" data-scrolled={scrolled || open ? "" : undefined}>
        <div className="wrap cab-fila flex items-center justify-between">
          <Link href="/" aria-label="Future Founders, inicio" onClick={() => setOpen(false)}>
            <span className="lg:hidden">
              <Logo h={28} />
            </span>
            <span className="hidden lg:block">
              <Logo h={34} />
            </span>
          </Link>

          <nav aria-label="Principal" className="hidden lg:flex gap-9 items-center">
            {NAV.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`text-recuadro py-1.5 ${isActive(l.href) ? "font-bold border-b-2 border-ink" : "font-medium lnk"}`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex gap-7 items-center">
            <Link href="/diagnostico" className="text-recuadro font-semibold ul" aria-current={pathname === "/diagnostico" ? "page" : undefined}>
              Diagnóstico de nivel
            </Link>
            <Link href="/kit" className="btn compact">
              Descarga el kit
            </Link>
          </div>

          <div className="flex lg:hidden gap-4 items-center">
            <Link href="/kit" className="btn compact">
              Kit gratis
            </Link>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="menu-movil"
              onClick={() => setOpen((o) => !o)}
              className="w-11 h-11 -mr-2 flex items-center justify-center"
            >
              <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
              <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
                <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                  {open ? <path d="M5 5l14 14M19 5 5 19" /> : <path d="M3 6.5h18M3 12h18M3 17.5h18" />}
                </g>
              </svg>
            </button>
          </div>
        </div>

        {pathname === "/libro" && <ReadingProgress />}

        {open && (
          <nav id="menu-movil" aria-label="Menú" className="cab-menu lg:hidden absolute left-0 right-0 top-full bg-paper border-b border-ink">
            <ul className="wrap py-3">
              {[...NAV, { label: "Diagnóstico de nivel", href: "/diagnostico" }, { label: "Kit «Plan de salida»", href: "/kit" }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={() => setOpen(false)} className="block py-3 text-h3 font-semibold border-t border-ink20 first:border-t-0">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
