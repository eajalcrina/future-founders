import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Programas de Future Founders ordenados por nivel de la escalera";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ kicker: "Programas por nivel", title: "Lo que te acompaña en cada nivel" });
}
