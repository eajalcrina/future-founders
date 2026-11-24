import Libro, { metadataLibro } from "@/vistas/Libro";

export const metadata = metadataLibro("en");

export default function Page() {
  return <Libro locale="en" />;
}
