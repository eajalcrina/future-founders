import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Términos de uso de Future Founders";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ kicker: "Legal", title: "Términos de uso" });
}
