import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Kit «Plan de salida» de Future Founders: calcula cuántos meses aguantas sin sueldo con cinco plantillas gratuitas";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ kicker: "Kit gratuito, Plan de salida", title: "Calcula cuántos meses aguantas sin sueldo" });
}
