"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import ReadingProgress from "./ReadingProgress";
import SelectorIdioma from "./SelectorIdioma";
import { identificar, lh, type Locale } from "@/i18n/rutas";
import type { Dict } from "@/i18n/es";

/**
 * Encabezado fijo (sticky). Alto fijo de --header-h, más el área segura del celular.
 * Un centinela de 1 px arriba de la página pone data-scrolled al salir de la vista: aparece el filete inferior.
 * En /libro, la regla de lectura corre por el borde inferior del encabezado.
 * El selector de idioma va a la derecha del menú (antes de «Diagnóstico de nivel») y dentro del menú móvil.
 */
export default function Navbar({ locale, t, idioma }: { locale: Locale; t: Dict["nav"]; idioma: Dict["idioma"] }) {
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

  // En /kit el botón del encabezado baja al formulario en lugar de recargar la misma página.
  const kit = lh(locale, "/kit");
  const diag = lh(locale, "/diagnostico");
  const kitHref = pathname === kit ? "#formulario" : kit;
  const isActive = (href: string) => !href.includes("#") && pathname.startsWith(href);
  const nav = t.items.map((l) => ({ ...l, href: lh(locale, l.href) }));

  return (
    <>
      <span ref={sentinel} aria-hidden="true" className="absolute top-0 left-0 w-px h-px pointer-events-none" />
      <header className="cab" data-scrolled={scrolled || open ? "" : undefined}>
        <div className="wrap cab-fila flex items-center justify-between">
          <Link href={lh(locale, "/")} aria-label={t.inicioAria} onClick={() => setOpen(false)}>
            <span className="xl:hidden">
              <Logo h={28} />
            </span>
            <span className="hidden xl:block">
              <Logo h={34} />
            </span>
          </Link>

          <nav aria-label={t.principalAria} className="hidden xl:flex gap-9 items-center">
            {nav.map((l) => (
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

          <div className="hidden xl:flex gap-7 items-center">
            <SelectorIdioma locale={locale} t={idioma} />
            <Link href={diag} className="text-recuadro font-semibold ul inline-flex items-center min-h-6" aria-current={pathname === diag ? "page" : undefined}>
              {t.diagnostico}
            </Link>
            <Link href={kitHref} className="btn compact">
              {t.descargaKit}
            </Link>
          </div>

          <div className="flex xl:hidden gap-4 items-center">
            <Link href={kitHref} className="btn compact">
              {t.kitGratis}
            </Link>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="menu-movil"
              onClick={() => setOpen((o) => !o)}
              className="w-11 h-11 -mr-2 flex items-center justify-center"
            >
              <span className="sr-only">{open ? t.cerrarMenu : t.abrirMenu}</span>
              <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
                <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square">
                  {open ? <path d="M5 5l14 14M19 5 5 19" /> : <path d="M3 6.5h18M3 12h18M3 17.5h18" />}
                </g>
              </svg>
            </button>
          </div>
        </div>

        {identificar(pathname)?.pagina === "libro" && <ReadingProgress />}

        {open && (
          <nav id="menu-movil" aria-label={t.menuAria} className="cab-menu xl:hidden absolute left-0 right-0 top-full bg-paper border-b border-ink">
            <ul className="wrap py-3">
              {[...nav, { label: t.diagnostico, href: diag }, { label: t.kitPlan, href: kit }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={() => setOpen(false)} className="block py-3 text-h3 font-semibold border-t border-ink20 first:border-t-0">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="border-t border-ink20 py-3">
                <SelectorIdioma locale={locale} t={idioma} className="-ml-1" />
              </li>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
