import { AMAZON_URL, CHECKOUT_URL, CHECKOUT_WHATSAPP } from "@/content/sitio";
import { MarcaLogo } from "./ui";

/** El PDF se paga con Mercado Pago (NEXT_PUBLIC_CHECKOUT_URL). Mientras no esté definida, la compra se coordina por WhatsApp. */
export function checkoutHref() {
  return CHECKOUT_URL || CHECKOUT_WHATSAPP;
}

/** Botón de Amazon: «Comprar en» y el logotipo oficial a una tinta. */
export function AmazonBtn({ className = "" }: { className?: string }) {
  return (
    <a href={AMAZON_URL} target="_blank" rel="noopener noreferrer" className={`btn-marca ${className}`} aria-label="Comprar en Amazon (se abre en otra pestaña)">
      <span>Comprar en</span>
      <MarcaLogo marca="amazon" />
    </a>
  );
}

/** Botón de Mercado Pago: «Pagar con», el isotipo oficial a una tinta y el nombre de la marca. */
export function MercadoPagoBtn({ className = "" }: { className?: string }) {
  return (
    <a href={checkoutHref()} target="_blank" rel="noopener noreferrer" className={`btn-marca ${className}`} aria-label="Comprar el PDF con Mercado Pago (se abre en otra pestaña)">
      <span>Pagar con</span>
      <MarcaLogo marca="mercadopago" />
      <span className="font-bold">Mercado Pago</span>
    </a>
  );
}

/** Los dos botones de compra pesan igual: papel con filete de tinta, Amazon primero. Sobre tinta van en papel sólido. */
export default function BookButtons({ full = false }: { full?: boolean }) {
  const w = full ? "w-full" : "w-full sm:w-auto";
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
      <AmazonBtn className={w} />
      <MercadoPagoBtn className={w} />
    </div>
  );
}
