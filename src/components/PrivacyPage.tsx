import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { EMAIL, alternates, type Lang } from "@/lib/site";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function privacyMetadata(lang: Lang): Metadata {
  const t = getContent(lang).privacy.meta;
  return { title: t.title, description: t.description, alternates: alternates("privacy", lang) };
}

// Texto conforme a la Ley 29733 (Perú). Responsable y razón social por confirmar con Eddie.
const TEXT = {
  es: {
    title: "Política de privacidad",
    updated: "Actualizada el 30 de octubre de 2026",
    blocks: [
      ["Quién trata tus datos", `Future Founders es responsable del tratamiento de los datos que recibe a través de este sitio. Para cualquier consulta sobre tus datos escribe a ${EMAIL}.`],
      ["Qué datos recogemos", "Solo los que nos das: en el registro de la Red Fractional, tus datos de contacto, tu perfil profesional y tu disponibilidad; cuando nos escribes o agendas una reunión, tu nombre, correo y lo que nos cuentes."],
      ["Para qué los usamos", "Para evaluar tu perfil, contactarte con conversaciones u oportunidades fractional que encajen contigo, responder tus mensajes y, solo si lo autorizas, enviarte novedades por correo. No vendemos tus datos."],
      ["Base legal", "Tu consentimiento, que das al marcar la casilla del formulario y que puedes retirar en cualquier momento."],
      ["Con quién se comparten", "Con los proveedores que nos ayudan a operar el sitio y guardar la información: Vercel (alojamiento), Supabase (base de datos), Brevo (correo) y Google (agenda). Algunos están fuera del Perú, por lo que hay transferencia internacional de datos. Solo compartiremos tu perfil con una empresa interesada después de hablar contigo."],
      ["Cuánto tiempo", "Mientras tu perfil esté activo en la red o hasta que nos pidas eliminarlo."],
      ["Tus derechos", `Puedes acceder, rectificar, cancelar u oponerte al tratamiento de tus datos (derechos ARCO) escribiendo a ${EMAIL}. También puedes acudir a la Autoridad Nacional de Protección de Datos Personales.`],
      ["Cookies y medición", "Este sitio usa Vercel Analytics, que mide visitas de forma agregada y sin cookies. No usamos cookies publicitarias."],
    ],
  },
  en: {
    title: "Privacy policy",
    updated: "Updated on 30 October 2026",
    blocks: [
      ["Who processes your data", `Future Founders is responsible for the data it receives through this website. For any question about your data, write to ${EMAIL}.`],
      ["What data we collect", "Only what you give us: in the Fractional network registration, your contact details, professional profile and availability; when you write to us or book a meeting, your name, email and whatever you tell us."],
      ["What we use it for", "To review your profile, contact you about fractional conversations or opportunities that fit you, answer your messages and, only if you agree, send you news by email. We do not sell your data."],
      ["Legal basis", "Your consent, given by ticking the box in the form, which you can withdraw at any time."],
      ["Who we share it with", "With the providers that help us run the site and store information: Vercel (hosting), Supabase (database), Brevo (email) and Google (calendar). Some are located outside Peru, which involves an international data transfer. We will only share your profile with an interested company after talking to you."],
      ["How long", "While your profile is active in the network or until you ask us to delete it."],
      ["Your rights", `You can access, rectify, cancel or object to the processing of your data by writing to ${EMAIL}. You may also contact Peru's National Authority for the Protection of Personal Data.`],
      ["Cookies and analytics", "This website uses Vercel Analytics, which measures visits in aggregate and without cookies. We do not use advertising cookies."],
    ],
  },
};

export function PrivacyPage({ lang }: { lang: Lang }) {
  const t = TEXT[lang];
  return (
    <>
      <SiteHeader lang={lang} current="privacy" />
      <main className="wrap" style={{ padding: "72px var(--gutter) var(--space-xl)" }}>
        <h1 className="display-l">{t.title}</h1>
        <p className="label-s" style={{ color: "var(--ink-subtle)" }}>{t.updated}</p>
        <div className="prose">
          {t.blocks.map(([h, p]) => (
            <section key={h} id={h === "Cookies y medición" || h === "Cookies and analytics" ? "cookies" : undefined}>
              <h2>{h}</h2>
              <p className="muted">{p}</p>
            </section>
          ))}
        </div>
      </main>
      <SiteFooter lang={lang} />
    </>
  );
}
