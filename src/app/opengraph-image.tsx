import { ogImage, OG_SIZE } from "@/lib/og";
import { HERO_TITLE } from "@/content/sitio";

export const alt = `Future Founders: ${HERO_TITLE.charAt(0).toLowerCase()}${HERO_TITLE.slice(1)}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ kicker: "Para ejecutivos senior en Latinoamérica", title: HERO_TITLE });
}
