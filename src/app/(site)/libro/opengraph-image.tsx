import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Doble Agente, de Eddie Ajalcriña y Lorenzo Ortiz. Libro y workbook.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ kicker: "Libro y workbook, 2.ª edición", title: "Doble Agente", withCover: true });
}
