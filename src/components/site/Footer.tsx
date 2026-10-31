import Link from "next/link";
import Logo from "./Logo";
import { EMAIL, LEGAL, WHATSAPP_LABEL, whatsappUrl } from "@/content/sitio";

type L = { label: string; href: string; ext?: boolean };
const COLS: { title: string; links: L[] }[] = [
  { title: "El método", links: [{ label: "La escalera", href: "/#metodo" }, { label: "Para quién es", href: "/#para-quien" }, { label: "Programas", href: "/programas" }, { label: "Nosotros", href: "/#nosotros" }] },
  { title: "El libro", links: [{ label: "Doble Agente", href: "/libro" }, { label: "El workbook", href: "/workbook" }, { label: "Dónde comprar", href: "/libro#formatos" }] },
  { title: "Recursos", links: [{ label: "Kit «Plan de salida»", href: "/kit" }, { label: "Diagnóstico de nivel", href: "/diagnostico" }, { label: "Calculadora de runway", href: "/kit#calculadora" }, { label: "Toolkit de calculadoras", href: "/toolkit" }] },
  {
    title: "Contacto",
    links: [
      { label: EMAIL, href: `mailto:${EMAIL}`, ext: true },
      { label: `WhatsApp ${WHATSAPP_LABEL}`, href: whatsappUrl("Hola, escribo desde futurefounders.pe."), ext: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/eddieajalcrina/", ext: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-warm grain">
      <div className="wrap pt-11 pb-8 lg:pt-[72px] lg:pb-10">
        <div className="grid gap-8 lg:gap-10 lg:grid-cols-[340px_repeat(4,minmax(0,1fr))]">
          <div>
            <span className="lg:hidden"><Logo h={34} /></span>
            <span className="hidden lg:block"><Logo h={40} /></span>
            <p className="wt mt-4 lg:mt-5 max-w-[340px] text-ink2" style={{ fontSize: 17 }}>
              Acompañamos a ejecutivos senior de Latinoamérica a convertir su experiencia en ingresos propios, nivel por nivel.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 lg:contents">
            {COLS.map((c) => (
              <div key={c.title} className={c.title === "Contacto" ? "col-span-2 lg:col-span-1" : ""}>
                <h2 className="wm text-ink2 mb-3.5" style={{ fontWeight: 400 }}>{c.title}</h2>
                <ul>
                  {c.links.map((l) => (
                    <li key={l.label} className="mb-2.5">
                      {l.ext ? (
                        <a href={l.href} className="lnk text-[16px] leading-[1.3]" {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                          {l.label}
                        </a>
                      ) : (
                        <Link href={l.href} className="lnk text-[16px] leading-[1.3]">
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 lg:mt-14 pt-4 border-t border-ink flex flex-col lg:flex-row lg:justify-between gap-3 lg:gap-10 text-[13px] lg:text-[14px] text-ink2">
          <p>© 2026 Future Founders. {LEGAL}</p>
          <p className="whitespace-nowrap">
            <a className="lnk" href={`mailto:${EMAIL}?subject=Pol%C3%ADtica%20de%20privacidad`}>Política de privacidad</a>
            <span className="vr" aria-hidden="true" />
            <a className="lnk" href={`mailto:${EMAIL}?subject=T%C3%A9rminos%20y%20condiciones`}>Términos y condiciones</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
