import { OG_SIZE } from "@/lib/og";
import { ogAlt, ogPagina } from "@/vistas/og";

export const alt = ogAlt("actualizaciones", "es");
export const size = OG_SIZE;
export const contentType = "image/png";
// Next 16.2.1 sufija las imágenes de grupos de rutas con 6 caracteres y reconoce solo ese largo; aquí el sufijo
// sale de 5 («-khl5s») y la ruta quedaría dinámica. Se fuerza estática, como las demás.
export const dynamic = "force-static";

export default function Image() {
  return ogPagina("actualizaciones", "es");
}
