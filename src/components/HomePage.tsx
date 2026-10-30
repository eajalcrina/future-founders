import Image from "next/image";
import Link from "next/link";
import { getContent } from "@/lib/content";
import { JsonLd, homeGraph } from "@/lib/schema";
import { CALENDAR_URL, EDDIE_URL, ROUTES, mailto, type Lang } from "@/lib/site";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";
import { TrackLink } from "./TrackLink";

export function HomePage({ lang }: { lang: Lang }) {
  const t = getContent(lang);
  return (
    <>
      <JsonLd data={homeGraph(lang)} />
      <SiteHeader lang={lang} current="home" />
      <main>
        {/* Hero con la ruta */}
        <section className="grid-bg rule-b">
          <div className="wrap" style={{ display: "flex", flexWrap: "wrap" }}>
            <div style={{ flex: "999 1 600px", minWidth: 0, padding: "80px 48px 88px 0", display: "flex", flexDirection: "column", gap: 32 }}>
              <p className="label kicker" style={{ margin: 0 }}>{t.hero.kicker}</p>
              <h1 className="display-xl">
                {t.hero.titleA} <span className="accent">{t.hero.titleB}</span>
              </h1>
              <p className="lead">{t.hero.lead}</p>
              <div className="btns">
                <TrackLink event="cta_calendar" where="hero" href={CALENDAR_URL} target="_blank" rel="noopener" className="btn btn-primary">
                  {t.hero.ctaPrimary} →
                </TrackLink>
                <TrackLink event="cta_email" where="hero" href={mailto(t.close.mailSubject)} className="btn">
                  {t.hero.ctaSecondary}
                </TrackLink>
              </div>
            </div>
            <div className="route" style={{ flex: "1 1 280px", minWidth: 0 }} aria-label={t.nav.routes}>
              {t.hero.route.map((r, i) => (
                <div key={r.label}>
                  <span className="label-s" style={{ color: i === 0 ? "var(--ink-subtle)" : i === 3 ? "var(--magenta-soft)" : "var(--magenta-text)" }}>{r.label}</span>
                  <span className="t">{r.title}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 01 Oportunidad */}
        <section id="oportunidad" className="wrap" style={{ scrollMarginTop: 24 }}>
          <div className="rule-b" style={{ display: "flex", flexWrap: "wrap", gap: "0 32px" }}>
            <p className="label kicker" style={{ flex: "1 1 220px", margin: 0, padding: "48px 0 0" }}>{t.opportunity.kicker}</p>
            <h2 className="display-l" style={{ flex: "999 1 600px", padding: "44px 0 48px" }}>{t.opportunity.title}</h2>
          </div>
          <div className="cols-3 rule-b">
            {t.opportunity.points.map((p) => (
              <div key={p.title}>
                <h3 style={{ margin: "0 0 10px", fontSize: 22 }}>{p.title}</h3>
                <p className="body muted" style={{ margin: 0 }}>{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 02 Rutas */}
        <section id="ruta" className="wrap" style={{ padding: "var(--space-xl) var(--gutter)", display: "flex", flexDirection: "column", gap: 40, scrollMarginTop: 24 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p className="label kicker" style={{ margin: 0 }}>{t.routes.kicker}</p>
            <h2 className="display-l" style={{ maxWidth: 900 }}>{t.routes.title}</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", gap: 24 }}>
            {[t.routes.a, t.routes.b].map((r, i) => (
              <article key={r.title} className="card">
                <div className="card-head label-s"><span>{r.label}</span><span className="kicker">{r.tag}</span></div>
                <div className="card-body">
                  <h3 className="display-m" style={{ margin: 0, fontSize: "clamp(40px, 4vw, 56px)" }}>{r.title}</h3>
                  <p style={{ margin: 0, fontSize: 18, lineHeight: 1.55 }} className="muted">{r.text}</p>
                </div>
                <ul>{r.items.map((it) => <li key={it}>{it}</li>)}</ul>
                {i === 0 && (
                  <Link href={ROUTES.fractional[lang]} className="label" style={{ padding: "18px 28px", borderTop: "1px solid var(--ink)", color: "var(--magenta-text)", textDecoration: "none", fontWeight: 500 }}>
                    {t.routes.a.link}
                  </Link>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* 03 Cómo trabajamos */}
        <section className="magenta-block">
          <div className="wrap" style={{ padding: "var(--space-xl) var(--gutter)", display: "flex", flexDirection: "column", gap: 44 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <p className="label" style={{ margin: 0 }}>{t.how.kicker}</p>
              <h2 className="display-l">{t.how.title}</h2>
            </div>
            <ol className="cols-3" style={{ listStyle: "none", margin: 0, padding: 0, borderTop: "1px solid #fff" }}>
              {t.how.steps.map((s, i) => (
                <li key={s.title} style={{ borderColor: "#fff" }}>
                  <span className="display-m" style={{ display: "block", fontSize: 72, fontStretch: "62%" }}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 style={{ margin: "12px 0 8px", fontSize: 22 }}>{s.title}</h3>
                  <p className="body" style={{ margin: 0 }}>{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 04 Quiénes somos */}
        <section id="nosotros" className="wrap" style={{ padding: "var(--space-xl) var(--gutter)", display: "flex", flexDirection: "column", gap: 40 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 820 }}>
            <p className="label kicker" style={{ margin: 0 }}>{t.about.kicker}</p>
            <h2 className="display-l">{t.about.title}</h2>
            <p className="lead">{t.about.intro}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: 24 }}>
            {[
              { p: t.about.eddie, img: "/eddie.jpg", alt: t.about.photoAltEddie, link: true },
              { p: t.about.lorenzo, img: "/lorenzo.jpg", alt: t.about.photoAltLorenzo, link: false },
            ].map(({ p, img, alt, link }) => (
              <article key={p.name} className="card" style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <div style={{ flex: "1 1 180px", position: "relative", minHeight: 240, borderRight: "1px solid var(--ink)" }}>
                  <Image src={img} alt={alt} fill sizes="(max-width: 900px) 50vw, 240px" style={{ objectFit: "cover", filter: "grayscale(1)" }} />
                </div>
                <div className="card-body" style={{ flex: "2 1 240px" }}>
                  <h3 className="display-m" style={{ margin: 0, fontSize: 32 }}>{p.name}</h3>
                  <p className="label-s kicker" style={{ margin: 0 }}>{p.role}</p>
                  <p className="body muted" style={{ margin: 0 }}>{p.bio}</p>
                  {link && (
                    <a href={EDDIE_URL + (lang === "en" ? "/en" : "")} className="label" style={{ color: "var(--magenta-text)", textDecoration: "none" }}>{t.about.eddie.link}</a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* 05 Libro */}
        <section className="rule-t rule-b" style={{ background: "var(--surface)" }}>
          <div className="wrap" style={{ padding: "64px var(--gutter)", display: "flex", flexWrap: "wrap", gap: 48, alignItems: "center" }}>
            <div style={{ flex: "1 1 380px", minWidth: 0, border: "1px solid var(--ink)", lineHeight: 0 }}>
              <Image src="/mockups/1.jpg" alt={t.book.alt} width={1600} height={900} sizes="(max-width: 900px) 100vw, 560px" style={{ width: "100%", height: "auto" }} />
            </div>
            <div style={{ flex: "1 1 360px", minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>
              <p className="label kicker" style={{ margin: 0 }}>{t.book.kicker}</p>
              <h2 className="display-l">{t.book.title}</h2>
              <p style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>{t.book.subtitle}</p>
              <p className="body muted" style={{ margin: 0 }}>{t.book.text}</p>
              <div className="btns">
                <TrackLink event="cta_email" where="book" href={mailto(t.book.mailSubject)} className="btn">{t.book.cta}</TrackLink>
              </div>
            </div>
          </div>
        </section>

        {/* 06 Preguntas */}
        <section className="wrap" style={{ padding: "var(--space-xl) var(--gutter)", display: "flex", flexWrap: "wrap", gap: 40 }}>
          <div style={{ flex: "1 1 260px", display: "flex", flexDirection: "column", gap: 16 }}>
            <p className="label kicker" style={{ margin: 0 }}>{t.faq.kicker}</p>
            <h2 className="display-l">{t.faq.title}</h2>
          </div>
          <div className="rule-t" style={{ flex: "999 1 560px", minWidth: 0 }}>
            {t.faq.items.map((f) => (
              <details key={f.q} className="faq">
                <summary>{f.q}</summary>
                <p className="body muted">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Cierre */}
        <section id="agenda" className="grid-bg rule-t">
          <div className="wrap" style={{ padding: "104px var(--gutter)", display: "flex", flexDirection: "column", gap: 32 }}>
            <h2 className="display-xl" style={{ maxWidth: 1000 }}>
              {t.close.titleA} <span className="accent">{t.close.titleB}</span>
            </h2>
            <div className="btns">
              <TrackLink event="cta_calendar" where="close" href={CALENDAR_URL} target="_blank" rel="noopener" className="btn btn-primary">{t.close.cta} →</TrackLink>
              <TrackLink event="cta_email" where="close" href={mailto(t.close.mailSubject)} className="btn" style={{ fontFamily: "var(--font-mono)", textTransform: "none", fontWeight: 400 }}>ff@redesignlab.org</TrackLink>
            </div>
            <p className="label-s" style={{ margin: 0, color: "var(--ink-subtle)" }}>{t.close.note}</p>
          </div>
        </section>
      </main>
      <SiteFooter lang={lang} />
    </>
  );
}
