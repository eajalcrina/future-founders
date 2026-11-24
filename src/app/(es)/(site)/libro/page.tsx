import Libro, { metadataLibro } from "@/vistas/Libro";

export const metadata = metadataLibro("es");

export default function Page() {
  return <Libro locale="es" />;
}
