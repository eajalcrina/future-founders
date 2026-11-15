import { AMAZON_URL, CHECKOUT_URL, CHECKOUT_WHATSAPP } from "@/content/sitio";

/** Botones de compra del libro. La compra directa usa NEXT_PUBLIC_CHECKOUT_URL o, si no existe, WhatsApp. */
export function checkoutHref() {
  return CHECKOUT_URL || CHECKOUT_WHATSAPP;
}

function Ext({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      <span>{children}</span>
      <span className="sr-only"> (se abre en otra pestaña)</span>
    </a>
  );
}

/** Sobre papel, Amazon es el botón principal; sobre tinta, los dos son secundarios (el magenta queda para el kit). */
export default function BookButtons({ variant = "paper", full = false }: { variant?: "paper" | "ink"; full?: boolean }) {
  const w = full ? "w-full" : "w-full sm:w-auto";
  if (variant === "ink")
    return (
      <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
        <Ext href={AMAZON_URL} className={`btn2 solid-paper ${w}`}>
          Comprar en Amazon
        </Ext>
        <Ext href={checkoutHref()} className={`btn2 ${w}`}>
          Comprar el PDF
        </Ext>
      </div>
    );
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
      <Ext href={AMAZON_URL} className={`btn ${w}`}>
        Comprar en Amazon
      </Ext>
      <Ext href={checkoutHref()} className={`btn2 ${w}`}>
        Comprar el PDF
      </Ext>
    </div>
  );
}
