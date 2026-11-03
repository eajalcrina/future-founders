import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Kit «Plan de salida»: cinco plantillas gratuitas de Future Founders.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ kicker: "Kit gratuito, Plan de salida", title: "¿Tienes un plan si te despiden mañana?" });
}
