import Inicio, { metadataInicio } from "@/vistas/Inicio";

export const metadata = metadataInicio("es");

export default function Page() {
  return <Inicio locale="es" />;
}
