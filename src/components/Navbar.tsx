"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Diagnóstico", href: "#diagnostico" },
  { label: "Metodología", href: "#metodologia" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Bootcamp", href: "#bootcamp" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-4 left-4 right-4 z-50">
      <nav
        className={`
          max-w-6xl mx-auto rounded-2xl px-4 sm:px-6 py-3
          transition-all duration-300
          ${
            scrolled
              ? "bg-[#050508]/90 backdrop-blur-md shadow-lg border border-white/10"
              : "bg-[#050508]/70 backdrop-blur-sm border border-white/8"
          }
        `}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2 cursor-pointer"
            onClick={handleNavClick}
          >
            <div className="w-8 h-8 rounded-lg bg-[#1a27c9] flex items-center justify-center">
              <span className="text-white font-bold text-sm font-[family-name:var(--font-space-grotesk)]">FF</span>
            </div>
            <span className="text-white font-bold text-base sm:text-lg font-[family-name:var(--font-space-grotesk)] hidden sm:block">
              Future Founders<span className="text-[#f7e05f]">.</span>
            </span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors duration-150 cursor-pointer font-[family-name:var(--font-dm-sans)]"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side: CTA + hamburger */}
          <div className="flex items-center gap-2">
            <a
              href="#diagnostico"
              className="hidden sm:inline-flex items-center px-4 py-2 rounded-xl bg-[#f7e05f] hover:bg-[#e8d04e] text-[#050508] text-sm font-bold transition-all duration-200 cursor-pointer hover:shadow-lg hover:shadow-[#f7e05f]/20 font-[family-name:var(--font-dm-sans)]"
            >
              Diagnóstico gratis
            </a>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menú"
              className="md:hidden p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-colors duration-150 cursor-pointer"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-white/10">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors duration-150 cursor-pointer font-[family-name:var(--font-dm-sans)]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#diagnostico"
                onClick={handleNavClick}
                className="mt-2 text-center px-4 py-2.5 rounded-xl bg-[#f7e05f] hover:bg-[#e8d04e] text-[#050508] text-sm font-bold transition-colors duration-200 cursor-pointer font-[family-name:var(--font-dm-sans)]"
              >
                Diagnóstico gratis
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
