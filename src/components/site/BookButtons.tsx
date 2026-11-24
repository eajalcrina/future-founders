import { AMAZON_URL, CHECKOUT_URL, whatsappUrl } from "@/content/sitio";
import type { Dict } from "@/i18n/es";
import { MarcaLogo } from "./ui";

type T = Pick<Dict, "libroBotones" | "sitio">;

/** El PDF se paga con Mercado Pago (NEXT_PUBLIC_CHECKOUT_URL). Mientras no esté definida, la compra se coordina por WhatsApp. */
export function checkoutHref(t: T) {
  return CHECKOUT_URL || whatsappUrl(t.sitio.checkoutWa);
}

/** Botón de Amazon: «Comprar en» y el logotipo oficial a una tinta. */
export function AmazonBtn({ t, className = "" }: { t: T; className?: string }) {
  return (
    <a href={AMAZON_URL} target="_blank" rel="noopener noreferrer" className={`btn-marca ${className}`} aria-label={t.libroBotones.amazonAria}>
      <span>{t.libroBotones.comprarEn}</span>
      <MarcaLogo marca="amazon" />
    </a>
  );
}

/**
 * Botón del PDF. Con NEXT_PUBLIC_CHECKOUT_URL: «Pagar con», el isotipo oficial a una tinta y el nombre de la marca.
 * Sin ella, el botón dice lo que hace («Pedir el PDF por WhatsApp»), sin el isotipo, para no prometer un pago que no ocurre.
 */
export function MercadoPagoBtn({ t, className = "" }: { t: T; className?: string }) {
  const b = t.libroBotones;
  if (!CHECKOUT_URL) {
    return (
      <a href={whatsappUrl(t.sitio.checkoutWa)} target="_blank" rel="noopener noreferrer" className={`btn-marca ${className}`} aria-label={b.pedirWaAria}>
        <span>{b.pedirWa}</span>
      </a>
    );
  }
  return (
    <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className={`btn-marca ${className}`} aria-label={b.mpAria}>
      <span>{b.pagarCon}</span>
      <span className="marca-nombre">
        <MarcaLogo marca="mercadopago" />
        <span>Mercado Pago</span>
      </span>
    </a>
  );
}

/** Los dos botones de compra pesan igual: papel con filete de tinta, Amazon primero. Sobre tinta van en papel sólido. */
export default function BookButtons({ t, full = false }: { t: T; full?: boolean }) {
  const w = full ? "w-full" : "w-full sm:w-auto";
  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
      <AmazonBtn t={t} className={w} />
      <MercadoPagoBtn t={t} className={w} />
    </div>
  );
}
