"use client";

import { Linkedin, Instagram, Youtube, Mail } from "lucide-react";

const socialLinks = [
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const navLinks = [
  { label: "Diagnóstico", href: "#diagnostico" },
  { label: "Metodología", href: "#metodologia" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Bootcamp", href: "#bootcamp" },
  { label: "FAQ", href: "#faq" },
];

const legalLinks = [
  { label: "Política de Privacidad", href: "#" },
  { label: "Términos y Condiciones", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#030305] border-t border-white/8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="inline-flex items-center gap-2 mb-4 cursor-pointer">
              <div className="w-8 h-8 rounded-lg bg-[#1a27c9] flex items-center justify-center">
                <span className="text-white font-bold text-sm font-[family-name:var(--font-space-grotesk)]">FF</span>
              </div>
              <span className="text-white font-bold text-lg font-[family-name:var(--font-space-grotesk)]">
                Future Founders
                <span className="text-[#f7e05f]">.</span>
              </span>
            </a>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-5 font-[family-name:var(--font-dm-sans)]">
              El bootcamp para ejecutivos senior que quieren convertir su experiencia corporativa en patrimonio empresarial real.
            </p>
            {/* Email */}
            <a
              href="mailto:ff@redesignlab.org"
              className="inline-flex items-center gap-2 text-[#f7e05f]/70 hover:text-[#f7e05f] text-sm transition-colors duration-150 cursor-pointer font-[family-name:var(--font-dm-sans)]"
            >
              <Mail size={14} />
              ff@redesignlab.org
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 font-[family-name:var(--font-space-grotesk)]">
              Programa
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/40 hover:text-white/80 text-sm transition-colors duration-150 cursor-pointer font-[family-name:var(--font-dm-sans)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social + Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 font-[family-name:var(--font-space-grotesk)]">
              Síguenos
            </h4>
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#f7e05f] hover:border-[#f7e05f]/30 hover:bg-[#f7e05f]/5 transition-all duration-150 cursor-pointer"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>

            <h4 className="text-white font-semibold text-sm mb-3 font-[family-name:var(--font-space-grotesk)]">
              Legal
            </h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/35 hover:text-white/60 text-xs transition-colors duration-150 cursor-pointer font-[family-name:var(--font-dm-sans)]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs font-[family-name:var(--font-dm-sans)]">
            © 2026 Future Founders. Todos los derechos reservados.
          </p>
          <p className="text-white/20 text-xs font-[family-name:var(--font-dm-sans)]">
            Lima, Perú · Para toda América Latina
          </p>
        </div>
      </div>
    </footer>
  );
}
