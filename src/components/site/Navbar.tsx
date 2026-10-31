"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { NAV } from "@/content/sitio";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => !href.includes("#") && pathname.startsWith(href);

  return (
    <header className="border-b border-ink bg-paper relative z-40">
      <div className="wrap flex items-center justify-between h-16 lg:h-[88px]">
        <Link href="/" aria-label="Future Founders, inicio" onClick={() => setOpen(false)}>
          <span className="lg:hidden">
            <Logo h={30} />
          </span>
          <span className="hidden lg:block">
            <Logo h={38} />
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden lg:flex gap-9 items-center">
          {NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`text-[16px] py-1.5 ${isActive(l.href) ? "font-bold border-b-2 border-ink" : "font-medium lnk"}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex gap-7 items-center">
          <Link href="/diagnostico" className="text-[16px] font-semibold ul" aria-current={pathname === "/diagnostico" ? "page" : undefined}>
            Diagnóstico de nivel
          </Link>
          <Link href="/kit" className="btn" style={{ minHeight: 50, padding: "0 22px" }}>
            Descarga el kit
          </Link>
        </div>

        <div className="flex lg:hidden gap-4 items-center">
          <Link href="/kit" className="btn" style={{ minHeight: 40, padding: "0 14px", fontSize: 16 }}>
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
              <g fill="none" stroke="currentColor" strokeWidth="1.6">
                {open ? <path d="M5 5l14 14M19 5 5 19" /> : <path d="M3 6.5h18M3 12h18M3 17.5h18" />}
              </g>
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-movil" aria-label="Menú" className="lg:hidden absolute left-0 right-0 top-full bg-paper border-b border-ink">
          <ul className="wrap py-3">
            {[...NAV, { label: "Diagnóstico de nivel", href: "/diagnostico" }, { label: "Kit «Plan de salida»", href: "/kit" }].map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={() => setOpen(false)} className="block py-3 text-[18px] font-semibold border-t border-ink20 first:border-t-0">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
