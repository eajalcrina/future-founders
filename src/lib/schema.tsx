import { getContent } from "./content";
import { EDDIE_ID, EDDIE_URL, EMAIL, LORENZO_ID, NAME, ORG_ID, ROUTES, SITE, WEBSITE_ID, type Lang } from "./site";

// Grafo compartido: la organización, el sitio y sus fundadores. Eddie usa el mismo
// @id que eddieajalcrina.com, así los buscadores unen ambas páginas.
export function siteGraph(lang: Lang) {
  const t = getContent(lang);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: NAME,
        url: SITE,
        logo: `${SITE}/brand/logo.svg`,
        email: EMAIL,
        description: t.meta.description,
        areaServed: "Latin America",
        founder: [{ "@id": EDDIE_ID }, { "@id": LORENZO_ID }],
      },
      { "@type": "Person", "@id": EDDIE_ID, name: "Eddie Ajalcriña", url: EDDIE_URL },
      { "@type": "Person", "@id": LORENZO_ID, name: "Lorenzo Ortiz" },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE,
        name: NAME,
        inLanguage: ["es", "en"],
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

export function homeGraph(lang: Lang) {
  const t = getContent(lang);
  const url = SITE + (lang === "en" ? ROUTES.home.en : "");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: lang === "en" ? "Guidance for executives: fractional work and your own company" : "Acompañamiento para ejecutivos: Fractional y empresa propia",
        provider: { "@id": ORG_ID },
        areaServed: "Latin America",
        url,
        description: t.meta.description,
      },
      {
        "@type": "Book",
        name: "Doble Agente",
        alternativeHeadline: t.book.subtitle,
        author: [{ "@id": EDDIE_ID }, { "@id": LORENZO_ID }],
        inLanguage: ["es", "en"],
        publisher: { "@id": ORG_ID },
      },
      {
        "@type": "FAQPage",
        url,
        mainEntity: t.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
      },
    ],
  };
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
