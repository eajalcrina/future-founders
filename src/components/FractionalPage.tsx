import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { NAME, alternates, type Lang } from "@/lib/site";
import { FractionalForm } from "./FractionalForm";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function fractionalMetadata(lang: Lang): Metadata {
  const t = getContent(lang).fractional.meta;
  const og = lang === "en" ? "/og/og-fractional-en.png" : "/og/og-fractional-es.png";
  return {
    title: t.title,
    description: t.description,
    alternates: alternates("fractional", lang),
    openGraph: {
      type: "website",
      locale: lang === "en" ? "en_US" : "es_PE",
      siteName: NAME,
      url: alternates("fractional", lang).canonical,
      title: t.title,
      description: t.description,
      images: [{ url: og, width: 1200, height: 630, alt: t.title }],
    },
    twitter: { card: "summary_large_image", title: t.title, description: t.description, images: [og] },
  };
}

export function FractionalPage({ lang }: { lang: Lang }) {
  const t = getContent(lang).fractional;
  return (
    <>
      <SiteHeader lang={lang} current="fractional" />
      <main>
        <section className="grid-bg rule-b">
          <div className="wrap" style={{ padding: "80px var(--gutter) 72px", display: "flex", flexDirection: "column", gap: 28 }}>
            <p className="label kicker" style={{ margin: 0 }}>{t.kicker}</p>
            <h1 className="display-xl" style={{ maxWidth: 1000 }}>
              {t.titleA} <span className="accent">{t.titleB}</span>
            </h1>
            <p className="lead">{t.lead}</p>
          </div>
        </section>
        <section className="wrap">
          <ol className="cols-3 rule-b" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {t.steps.map((s, i) => (
              <li key={s.title}>
                <span className="label-s kicker">{String(i + 1).padStart(2, "0")}</span>
                <h2 style={{ margin: "10px 0 8px", fontSize: 22 }}>{s.title}</h2>
                <p className="body muted" style={{ margin: 0 }}>{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="label-s" style={{ margin: 0, padding: "20px 0", color: "var(--ink-subtle)" }}>{t.honest}</p>
        </section>
        <section className="wrap" style={{ padding: "48px var(--gutter) var(--space-xl)", maxWidth: 960 }}>
          <h2 className="display-l" style={{ marginBottom: 32 }}>{t.formTitle}</h2>
          <FractionalForm lang={lang} />
        </section>
      </main>
      <SiteFooter lang={lang} />
    </>
  );
}
