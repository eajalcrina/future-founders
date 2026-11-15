import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Diagnóstico de nivel de Future Founders: cuatro preguntas para saber en qué nivel de la escalera estás";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ kicker: "Gratis, cuatro preguntas", title: "Diagnóstico de nivel" });
}
