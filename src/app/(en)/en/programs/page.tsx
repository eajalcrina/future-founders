import Programas, { metadataProgramas } from "@/vistas/Programas";

export const metadata = metadataProgramas("en");

export default function Page() {
  return <Programas locale="en" />;
}
