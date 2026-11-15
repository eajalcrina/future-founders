"use client";

import dynamic from "next/dynamic";
import type { Testimonio } from "@/content/testimonios";

// El carrusel se descarga solo cuando hay reseñas que mostrar. Con TESTIMONIOS vacío,
// este componente no se monta y el código de Testimonials no llega al navegador.
const Testimonials = dynamic(() => import("./Testimonials"));

export default function ResenasDiferidas({ items }: { items: Testimonio[] }) {
  if (items.length === 0) return null;
  return <Testimonials items={items} />;
}
