import Programas, { metadataProgramas } from "@/vistas/Programas";

export const metadata = metadataProgramas("es");

export default function Page() {
  return <Programas locale="es" />;
}
