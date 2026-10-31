import Link from "next/link";
import type { ReactNode, CSSProperties } from "react";
import { SVG, ICON_PATHS } from "@/content/ilustraciones";

/* ---------------------------------------------------------------- texto */

/** Rótulo en JetBrains Mono, en mayúsculas. */
export function Mono({ children, className = "", color, as: As = "div" }: { children: ReactNode; className?: string; color?: string; as?: "div" | "span" | "p" }) {
  return (
    <As className={`wm ${className}`} style={color ? { color } : undefined}>
      {children}
    </As>
  );
}

/** Partes unidas por un filete vertical, como en los tableros. */
export function Jn({ parts }: { parts: string[] }) {
  return (
    <>
      {parts.map((p, i) => (
        <span key={i}>
          {i > 0 && <span className="vr" aria-hidden="true" />}
          {i > 0 && <span className="sr-only">, </span>}
          {p}
        </span>
      ))}
    </>
  );
}

/** Siglas en versalitas dentro de texto corrido (USD, CVM, EPS...). */
export function Sc({ text }: { text: string }) {
  const parts = text.split(/(\bUSD\b|\bCVM\b|\bEPS\b|\bCTS\b|\bAFP\b)/g);
  return (
    <>
      {parts.map((p, i) =>
        /^(USD|CVM|EPS|CTS|AFP)$/.test(p) ? (
          <span key={i} className="sc">
            {p}
          </span>
        ) : (
          <span key={i}>{p.replace(/(USD|S\/|MXN) (?=\d)/g, "$1 ")}</span>
        )
      )}
    </>
  );
}

/** Titular con revelado por línea (las palabras suben detrás de una máscara). */
export function Lines({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      <span className="sr-only">{text.replace(/ /g, " ")}</span>
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

export function SecHead({
  label,
  title,
  sub,
  size = "lg",
  dark = false,
  className = "",
  id,
  as: As = "h2",
}: {
  label: string[];
  title: string;
  sub?: ReactNode;
  size?: "xl" | "lg" | "md";
  dark?: boolean;
  className?: string;
  id?: string;
  as?: "h1" | "h2";
}) {
  const sz = size === "xl" ? "text-[48px] lg:text-[96px]" : size === "lg" ? "text-[44px] lg:text-[72px]" : "text-[40px] lg:text-[64px]";
  return (
    <div className={className}>
      <Mono color={dark ? "var(--color-magl)" : "var(--color-magt)"}>
        <Jn parts={label} />
      </Mono>
      <As id={id} className={`wh lines rv-line mt-3 lg:mt-[18px] ${sz}`} style={dark ? { color: "var(--color-paper)" } : undefined}>
        <Lines text={title} />
      </As>
      {sub && (
        <p className="wt mt-3.5 lg:mt-[22px] max-w-[880px]" style={{ color: dark ? "var(--color-paper)" : "var(--color-ink2)" }}>
          {sub}
        </p>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- iconos */

export function Arrow({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" style={{ display: "block", flex: "none" }}>
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square">
        <path d="M4 12h15" />
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
  arrow?: boolean;
  className?: string;
  external?: boolean;
  solidPaper?: boolean;
};

export function Btn({ href, children, kind = 1, arrow = true, className = "", external, solidPaper }: BtnProps) {
  const cls = `${kind === 1 ? "btn" : "btn2"} ${solidPaper ? "solid-paper" : ""} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <Arrow />}
    </>
  );
  const isExt = external ?? /^https?:/.test(href);
  if (isExt)
    return (
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer">
        {inner}
        <span className="sr-only"> (se abre en otra pestaña)</span>
      </a>
    );
  return (
    <Link className={cls} href={href}>
      {inner}
    </Link>
  );
}

export function Lectura({ text, bg = "var(--color-warm)", className = "" }: { text: ReactNode; bg?: string; className?: string }) {
  return (
    <aside className={`px-[22px] pt-5 pb-[22px] ${className}`} style={{ background: bg }}>
      <div className="flex gap-[9px] items-center">
        <Icon name="lectura" size={20} />
        <span className="wm">Lectura</span>
      </div>
      <p className="text-[16px] leading-[1.5] mt-2.5">{text}</p>
    </aside>
  );
}

export function Nota({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex gap-2.5 items-start ${className}`}>
      <span className="mt-[2px]">
        <Icon name="nota" size={18} color="var(--color-ink2)" />
      </span>
      <p className="text-[15px] leading-[1.45] text-ink2">{children}</p>
    </div>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
