import Actualizaciones, { metadataActualizaciones } from "@/vistas/Actualizaciones";

export const metadata = metadataActualizaciones("es");

export default function Page() {
  return <Actualizaciones locale="es" />;
}
