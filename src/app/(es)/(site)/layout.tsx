import Sitio from "@/components/site/Sitio";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <Sitio locale="es">{children}</Sitio>;
}
