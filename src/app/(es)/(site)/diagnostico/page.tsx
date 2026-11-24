import DiagnosticoPagina, { metadataDiagnostico } from "@/vistas/DiagnosticoPagina";

export const metadata = metadataDiagnostico("es");

export default function Page() {
  return <DiagnosticoPagina locale="es" />;
}
