import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Future Founders: tu experiencia puede trabajar para más de una empresa. O para la tuya.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ kicker: "Para ejecutivos senior en Latinoamérica", title: "Tu experiencia puede trabajar para más de una empresa. O para la tuya." });
}
