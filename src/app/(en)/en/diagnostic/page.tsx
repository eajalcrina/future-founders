import DiagnosticoPagina, { metadataDiagnostico } from "@/vistas/DiagnosticoPagina";

export const metadata = metadataDiagnostico("en");

export default function Page() {
  return <DiagnosticoPagina locale="en" />;
}
