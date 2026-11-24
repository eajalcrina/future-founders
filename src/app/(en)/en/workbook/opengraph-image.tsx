import { OG_SIZE } from "@/lib/og";
import { ogAlt, ogPagina } from "@/vistas/og";

export const alt = ogAlt("workbook", "en");
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogPagina("workbook", "en");
}
