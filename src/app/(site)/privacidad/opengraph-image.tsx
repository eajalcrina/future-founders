import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Política de privacidad de Future Founders";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ kicker: "Legal", title: "Política de privacidad" });
}
