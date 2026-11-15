import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Workbook de Doble Agente: las plantillas del libro, gratis";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ kicker: "Doble Agente, workbook gratis", title: "Las plantillas del workbook" });
}
