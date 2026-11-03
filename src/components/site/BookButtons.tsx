import { Arrow } from "./ui";
import { AMAZON_URL, CHECKOUT_URL, CHECKOUT_WHATSAPP } from "@/content/sitio";

/** Botones de compra del libro. La compra directa usa NEXT_PUBLIC_CHECKOUT_URL o, si no existe, WhatsApp. */
export function checkoutHref() {
  return CHECKOUT_URL || CHECKOUT_WHATSAPP;
}

function Ext({ href, className, children, arrow = true }: { href: string; className: string; children: React.ReactNode; arrow?: boolean }) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      <span>{children}</span>
      {arrow && <Arrow />}
      <span className="sr-only"> (se abre en otra pestaña)</span>
    </a>
  );
}

export default function BookButtons({ variant = "paper", full = false }: { variant?: "paper" | "ink"; full?: boolean }) {
  const w = full ? "w-full" : "w-full sm:w-auto";
  if (variant === "ink")
    return (
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
        <Ext href={AMAZON_URL} className={`btn2 solid-paper ${w}`}>
          Comprar en Amazon
        </Ext>
        <Ext href={checkoutHref()} className={`btn2 ${w}`} arrow={false}>
          Compra directa: libro en PDF
        </Ext>
      </div>
    );
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
      <Ext href={AMAZON_URL} className={`btn ${w}`}>
        Comprar en Amazon
      </Ext>
      <Ext href={checkoutHref()} className={`btn2 ${w}`} arrow={false}>
        Compra directa: libro en PDF
      </Ext>
    </div>
  );
}
