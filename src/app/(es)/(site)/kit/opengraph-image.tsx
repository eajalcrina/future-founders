import { OG_SIZE } from "@/lib/og";
import { ogAlt, ogPagina } from "@/vistas/og";

export const alt = ogAlt("kit", "es");
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogPagina("kit", "es");
}
