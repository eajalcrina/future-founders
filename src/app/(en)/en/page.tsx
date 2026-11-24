import Inicio, { metadataInicio } from "@/vistas/Inicio";

export const metadata = metadataInicio("en");

export default function Page() {
  return <Inicio locale="en" />;
}
