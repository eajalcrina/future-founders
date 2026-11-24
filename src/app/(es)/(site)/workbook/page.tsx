import WorkbookIndice, { metadataWorkbook } from "@/vistas/WorkbookIndice";

export const metadata = metadataWorkbook("es");

export default function Page() {
  return <WorkbookIndice locale="es" />;
}
