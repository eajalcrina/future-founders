import { Root, baseMetadata } from "@/components/Root";

export { viewport } from "@/components/Root";
export const metadata = baseMetadata("es");

export default function EsLayout({ children }: { children: React.ReactNode }) {
  return <Root lang="es">{children}</Root>;
}
