import WorkbookIndice, { metadataWorkbook } from "@/vistas/WorkbookIndice";

export const metadata = metadataWorkbook("en");

export default function Page() {
  return <WorkbookIndice locale="en" />;
}
