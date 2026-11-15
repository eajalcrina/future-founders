import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Valores del año de los anexos por país de Doble Agente";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ kicker: "Doble Agente, anexos por país", title: "Valores del año" });
}
