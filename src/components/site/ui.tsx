import Link from "next/link";
import type { ReactNode, CSSProperties } from "react";
import { SVG, ICON_PATHS } from "@/content/ilustraciones";
import { AMAZON, MERCADO_PAGO } from "@/content/logos-terceros";
import { PRIVACIDAD_LINEA, agendaUrl } from "@/content/sitio";

/* ---------------------------------------------------------------- texto */

/**
 * Rótulo en JetBrains Mono, en mayúsculas.
 * tone «ink»: rótulo de sección en tinta (.lab del libro). «gris»: rótulo secundario en tinta media.
 * «claro»: sobre superficies de tinta, en tinta 20 %. «salvia»: sobre salvia, en salvia profundo.
 */
export function Mono({
  children,
  className = "",
  tone = "ink",
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  tone?: "ink" | "gris" | "claro" | "salvia" | "papel";
  as?: "div" | "span" | "p";
}) {
  const color = { ink: "text-ink lab", gris: "text-ink2", claro: "text-ink20", salvia: "text-saged", papel: "text-paper lab" }[tone];
  return <As className={`wm ${color} ${className}`}>{children}</As>;
}

/** Partes unidas por un filete vertical, como en los tableros (nunca «·»). En celular, un dato por línea, sin filete. */
export function Jn({ parts }: { parts: string[] }) {
  return (
    <>
      {parts.map((p, i) => (
        <span key={i} className="block sm:inline">
          {i > 0 && <span className="vr hidden sm:inline-block" aria-hidden="true" />}
          {i > 0 && <span className="sr-only">, </span>}
          {p}
        </span>
      ))}
    </>
  );
}

function scPart(text: string, k: string) {
  const parts = text.split(/(\bUSD\b|\bCVM\b|\bEPS\b|\bCTS\b|\bAFP\b)/g);
  return parts.map((p, i) =>
    /^(USD|CVM|EPS|CTS|AFP)$/.test(p) ? (
      <span key={`${k}-${i}`} className="sc">
        {p}
      </span>
    ) : (
      <span key={`${k}-${i}`}>{p.replace(/(USD|S\/|MXN) (?=\d)/g, "$1 ")}</span>
    )
  );
}

/** Siglas en versalitas (USD, CVM, EPS...), espacio duro tras la moneda y cursivas marcadas con <em>. */
export function Sc({ text }: { text: string }) {
  const chunks = text.split(/<em>(.*?)<\/em>/g);
  return <>{chunks.map((c, i) => (i % 2 ? <i key={i}>{scPart(c, `e${i}`)}</i> : scPart(c, `t${i}`)))}</>;
}

/** Titular del héroe con revelado por línea (las palabras suben detrás de una máscara). */
export function Lines({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={i}>
            <span className="w">
              <span>{w}</span>
            </span>
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    </>
  );
}

/** Héroe de página: rótulo en tinta y titular en mayúsculas condensadas (portada y aperturas del libro). */
export function Hero({ label, title, id, size = "xl", className = "" }: { label: string[]; title: string; id?: string; size?: "xl" | "portada"; className?: string }) {
  return (
    <>
      <Mono>
        <Jn parts={label} />
      </Mono>
      <h1 id={id} className={`wh lines mt-4 lg:mt-[22px] ${size === "portada" ? "text-portada" : "text-display-xl"} ${className}`}>
        <Lines text={title} />
      </h1>
    </>
  );
}

/**
 * Cabecera de sección: rótulo en tinta y titular en minúsculas, Archivo semi-negrita condensada,
 * como las aperturas de sección del libro. El titular dice la conclusión.
 */
export function SecHead({
  label,
  title,
  sub,
  dark = false,
  className = "",
  id,
}: {
  label: string[];
  title: string;
  sub?: ReactNode;
  dark?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <div className={className}>
      <Mono tone={dark ? "papel" : "ink"}>
        <Jn parts={label} />
      </Mono>
      <h2 id={id} className={`wh2 text-display-md mt-3 lg:mt-4 ${dark ? "text-paper" : ""}`}>
        {title}
      </h2>
      {sub && <p className={`lead mt-4 lg:mt-5 max-w-[880px] ${dark ? "text-paper" : "text-ink2"}`}>{sub}</p>}
    </div>
  );
}

/* ---------------------------------------------------------------- iconos */

/** Icono «remisión» del sistema: trazo de 1,5, extremos cuadrados. Solo en enlaces de texto, nunca en botones. */
export function Arrow({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="flecha-i">
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M3.5 12h15.5" />
        <path d="M13.5 6.5 19 12l-5.5 5.5" />
      </g>
    </svg>
  );
}

export function Icon({ name, size = 18, color = "currentColor" }: { name: keyof typeof ICON_PATHS; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ display: "block", flex: "none" }}>
      <g
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
        dangerouslySetInnerHTML={{ __html: ICON_PATHS[name] }}
      />
    </svg>
  );
}

/** Aviso o error: texto en tinta con el icono «error». El magenta nunca señala un problema. */
export function Aviso({ children, id, className = "" }: { children: ReactNode; id?: string; className?: string }) {
  return (
    <p id={id} className={`aviso ${className}`}>
      <Icon name="error" size={16} />
      <span>{children}</span>
    </p>
  );
}

/** Cuatro cuadrados que marcan los niveles de la escalera. */
export function Lvl({ on, size = 9, fg = "var(--color-ink)", off = "var(--color-ink3)", label }: { on: number[]; size?: number; fg?: string; off?: string; label?: string }) {
  return (
    <span className="inline-flex gap-[3px]" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      {[0, 1, 2, 3].map((k) => (
        <span
          key={k}
          style={{
            width: size,
            height: size,
            display: "inline-block",
            ...(on.includes(k) ? { background: fg } : { border: `1px solid ${off}` }),
          }}
        />
      ))}
    </span>
  );
}

/* ---------------------------------------------------------------- figuras */

export function Scene({ who, className = "", style }: { who: "carmen" | "javier" | "andrea" | "rodrigo"; className?: string; style?: CSSProperties }) {
  return <div className={`svgfit ${className}`} style={style} dangerouslySetInnerHTML={{ __html: SVG[`scene_${who}`] }} />;
}

export function Figure({ who, className = "", style }: { who: "carmen" | "javier" | "andrea" | "rodrigo"; className?: string; style?: CSSProperties }) {
  return <div className={`svgfit ${className}`} style={style} dangerouslySetInnerHTML={{ __html: SVG[`figure_${who}`] }} />;
}

/** Marcas de corte de imprenta en las esquinas de un bloque. */
export function CropMarks() {
  return (
    <>
      <span className="cm tl" aria-hidden="true" />
      <span className="cm tr" aria-hidden="true" />
      <span className="cm bl" aria-hidden="true" />
      <span className="cm br" aria-hidden="true" />
    </>
  );
}

/* ---------------------------------------------------------------- acciones */

type BtnProps = {
  href: string;
  children: ReactNode;
  kind?: 1 | 2;
  className?: string;
  external?: boolean;
  solidPaper?: boolean;
};

/** Botón sin flecha. El principal (kind 1, magenta) va una vez por vista. */
export function Btn({ href, children, kind = 1, className = "", external, solidPaper }: BtnProps) {
  const cls = `${kind === 1 ? "btn" : "btn2"} ${solidPaper ? "solid-paper" : ""} ${className}`;
  const isExt = external ?? /^https?:/.test(href);
  if (isExt)
    return (
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
        <span>{children}</span>
        <span className="sr-only"> (se abre en otra pestaña)</span>
      </a>
    );
  if (href.startsWith("#"))
    return (
      <a className={cls} href={href}>
        {children}
      </a>
    );
  return (
    <Link className={cls} href={href}>
      {children}
    </Link>
  );
}

/** Enlace de texto con la flecha de remisión, que avanza al pasar el cursor. */
export function LinkArrow({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link href={href} className={`group flecha font-bold ${className}`}>
      <span className="lnk">{children}</span>
      <Arrow />
    </Link>
  );
}

/**
 * «Agenda 30 minutos» con el icono de calendario: abre la página de citas de Google Calendar
 * (NEXT_PUBLIC_AGENDA_URL) o, sin ella, WhatsApp. Siempre el mismo nombre. kind «link»: enlace subrayado; «btn2»: botón de línea.
 */
export function AgendaLink({ kind = "link", className = "" }: { kind?: "link" | "btn2"; className?: string }) {
  // Como enlace, la fila se alinea por la línea base del texto (no por el icono), para apoyarse en la frase que lo rodea.
  const cls = kind === "btn2" ? `btn2 ${className}` : `ul inline-flex items-baseline gap-2 font-bold ${className}`;
  return (
    <a href={agendaUrl()} target="_blank" rel="noopener noreferrer" className={cls}>
      <span className="self-center">
        <Icon name="calendario" size={18} />
      </span>
      <span>Agenda 30 minutos</span>
      <span className="sr-only"> (se abre en otra pestaña)</span>
    </a>
  );
}

/** Línea de privacidad bajo cada formulario, con el enlace a /privacidad. */
export function PrivacidadLinea({ className = "", id }: { className?: string; id?: string }) {
  return (
    <p id={id} className={`text-recuadro leading-[1.45] ${className}`}>
      {PRIVACIDAD_LINEA.antes}
      <Link href="/privacidad" className="ul">
        {PRIVACIDAD_LINEA.enlace}
      </Link>
      {PRIVACIDAD_LINEA.despues}
    </p>
  );
}

/** Logotipo de una tienda a una tinta (toma el color del botón). Decorativo: el nombre va en el aria-label del enlace. */
export function MarcaLogo({ marca }: { marca: "amazon" | "mercadopago" }) {
  const l = marca === "amazon" ? AMAZON : MERCADO_PAGO;
  return (
    <svg viewBox={l.viewBox} className={`marca ${marca}`} aria-hidden="true" focusable="false">
      <g fill="currentColor">
        {l.trazos.map((t, i) => (
          <path key={i} d={t.d} transform={t.t} />
        ))}
      </g>
    </svg>
  );
}

/** Recuadro Lectura del libro: siempre en papel cálido, icono de 16 px y texto de recuadro. */
export function Lectura({ text, className = "" }: { text: ReactNode; className?: string }) {
  return (
    <aside className={`bg-warm px-4 pt-3.5 pb-4 lg:px-5 lg:pt-4 lg:pb-5 ${className}`}>
      <div className="flex gap-2 items-center">
        <Icon name="lectura" size={16} />
        <span className="wm">Lectura</span>
      </div>
      <p className="text-recuadro leading-[1.375] mt-2">{text}</p>
    </aside>
  );
}

/** Nota o Fuente al pie: filete superior fino en tinta, icono «nota», rótulo y texto en tinta suave. */
export function Nota({ children, className = "", label = "Nota" }: { children: ReactNode; className?: string; label?: "Nota" | "Fuente" }) {
  return (
    <div className={`filete-sup grid grid-cols-[16px_minmax(0,1fr)] gap-x-2.5 gap-y-1 ${className}`}>
      <span className="mt-[1px]">
        <Icon name="nota" size={16} />
      </span>
      <span className="wm lab font-bold">{label}</span>
      <p className="col-start-2 text-recuadro leading-[1.4] text-ink3">{children}</p>
    </div>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
