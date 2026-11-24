import Sitio from "@/components/site/Sitio";

export default function SiteLayoutEn({ children }: { children: React.ReactNode }) {
  return <Sitio locale="en">{children}</Sitio>;
}
