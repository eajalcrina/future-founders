import WorkbookPlantilla, { metadataPlantilla, paramsWorkbook } from "@/vistas/WorkbookPlantilla";

export const dynamicParams = false;

export function generateStaticParams() {
  return paramsWorkbook();
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return metadataPlantilla(id, "en");
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <WorkbookPlantilla id={id} locale="en" />;
}
