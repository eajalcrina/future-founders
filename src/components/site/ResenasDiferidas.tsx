"use client";

import dynamic from "next/dynamic";
import type { Testimonio } from "@/content/testimonios";
import type { Dict } from "@/i18n/es";

// El carrusel se descarga solo cuando hay reseñas que mostrar. Con TESTIMONIOS vacío,
// este componente no se monta y el código de Testimonials no llega al navegador.
const Testimonials = dynamic(() => import("./Testimonials"));

export default function ResenasDiferidas({ items, t }: { items: Testimonio[]; t: Dict["resenas"] }) {
  if (items.length === 0) return null;
  return <Testimonials items={items} t={t} />;
}
