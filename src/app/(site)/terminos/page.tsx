import type { Metadata } from "next";
import LegalPage from "@/components/site/LegalPage";
import { TERMINOS } from "@/content/legal";

export const metadata: Metadata = {
  title: TERMINOS.title,
  description: TERMINOS.description,
  alternates: { canonical: "/terminos" },
  robots: { index: true, follow: true },
  openGraph: { title: TERMINOS.title, url: "/terminos" },
};

export default function TerminosPage() {
  return <LegalPage doc={TERMINOS} id="terminos-h" />;
}
