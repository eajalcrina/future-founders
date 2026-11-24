import Actualizaciones, { metadataActualizaciones } from "@/vistas/Actualizaciones";

export const metadata = metadataActualizaciones("en");

export default function Page() {
  return <Actualizaciones locale="en" />;
}
