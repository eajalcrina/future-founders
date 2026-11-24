import LegalPage from "@/components/site/LegalPage";
import { dict } from "@/i18n/dict";
import { metaPagina } from "@/i18n/metadatos";

const doc = dict("en").legal.terminos;

export const metadata = metaPagina("terminos", "en", {
  title: doc.title,
  description: doc.description,
  robots: { index: true, follow: true },
  og: { title: doc.title },
});

export default function Page() {
  return <LegalPage doc={doc} id="terminos-h" />;
}
