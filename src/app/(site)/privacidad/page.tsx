import type { Metadata } from "next";
import LegalPage from "@/components/site/LegalPage";
import { PRIVACIDAD } from "@/content/legal";

export const metadata: Metadata = {
  title: PRIVACIDAD.title,
  description: PRIVACIDAD.description,
  alternates: { canonical: "/privacidad" },
  robots: { index: true, follow: true },
  openGraph: { title: PRIVACIDAD.title, url: "/privacidad" },
};

export default function PrivacidadPage() {
  return <LegalPage doc={PRIVACIDAD} id="privacidad-h" />;
}
