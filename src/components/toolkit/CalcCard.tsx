"use client";
import { ReactNode, useState, useEffect } from "react";
import { TK } from "./theme";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

interface CalcCardProps {
  title: string;
  description: string;
  mision: string;
  color: string;
  children?: ReactNode;
  left?: ReactNode;
  right?: ReactNode;
}

export function CalcCard({ title, description, mision, color, children, left, right }: CalcCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const hasTwoCol = left !== undefined && right !== undefined;

  return (
    <div
      style={{
        background: TK.surface,
        border: `1.5px solid ${isOpen ? `${color}35` : TK.border}`,
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: isOpen ? TK.shadow : TK.shadowXs,
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
    >
      {/* Top accent */}
      <div style={{ height: 3, background: `linear-gradient(to right, ${color}, ${color}80)` }} />

      {/* Header — clickable toggle */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16,
          padding: "22px 28px 20px",
          background: "transparent",
          border: "none",
          borderBottom: isOpen ? `1px solid ${TK.border}` : "none",
          cursor: "pointer",
          textAlign: "left",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = `${color}04`)}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "inline-block",
              background: `${color}12`,
              border: `1px solid ${color}25`,
              borderRadius: 100,
              padding: "3px 10px",
              fontSize: 11,
              fontWeight: 700,
              color: color,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontFamily: TK.fontBadge,
              marginBottom: 8,
            }}
          >
            {mision}
          </div>
          <h3
            style={{
              fontSize: isMobile ? 17 : 20,
              fontWeight: 700,
              color: TK.text,
              marginBottom: 4,
              fontFamily: TK.fontHeading,
              letterSpacing: "-0.01em",
              lineHeight: 1.25,
            }}
          >
            {title}
          </h3>
          <p style={{ fontSize: isMobile ? 13 : 14, color: TK.textMuted, lineHeight: 1.55, fontFamily: TK.font, margin: 0 }}>
            {description}
          </p>
        </div>

        {/* Chevron */}
        <div
          style={{
            flexShrink: 0,
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: isOpen ? `${color}15` : TK.surface2,
            border: `1.5px solid ${isOpen ? `${color}30` : TK.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 4,
            transition: "all 0.2s",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            style={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          >
            <path d="M2 4L6 8L10 4" stroke={isOpen ? color : TK.textMuted} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>

      {/* Body — only visible when open */}
      {isOpen && (
        hasTwoCol ? (
          isMobile ? (
            <div style={{ padding: "22px 20px" }}>
              <div>{left}</div>
              <div style={{ borderTop: `1px solid ${TK.border}`, paddingTop: 20, marginTop: 8 }}>{right}</div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "40% 1fr", gap: 0 }}>
              <div style={{ padding: "22px 28px", borderRight: `1px solid ${TK.border}` }}>{left}</div>
              <div style={{ padding: "22px 28px" }}>{right}</div>
            </div>
          )
        ) : (
          <div style={{ padding: isMobile ? "20px" : "22px 28px", flex: 1 }}>{children}</div>
        )
      )}
    </div>
  );
}

/* ── Input helpers ── */

export function NumInput({
  label,
  value,
  onChange,
  prefix,
  suffix,
  min = 0,
  max,
  step = 1,
  placeholder = "0",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  placeholder?: string;
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label
        style={{
          display: "block",
          fontSize: 11.5,
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: TK.textSecondary,
          marginBottom: 4,
          fontFamily: TK.fontBadge,
        }}
      >
        {label}
      </label>
      <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
        {prefix && (
          <span
            style={{
              padding: "9px 10px 9px 12px",
              background: TK.surface2,
              border: `1.5px solid ${TK.border}`,
              borderRight: "none",
              borderRadius: "8px 0 0 8px",
              fontSize: 14,
              fontWeight: 600,
              color: TK.textMuted,
              fontFamily: TK.fontHeading,
              whiteSpace: "nowrap",
            }}
          >
            {prefix}
          </span>
        )}
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          style={{
            flex: 1,
            padding: "9px 11px",
            border: `1.5px solid ${TK.border}`,
            borderRadius: prefix ? "0 8px 8px 0" : suffix ? "8px 0 0 8px" : "8px",
            fontSize: 15,
            fontWeight: 600,
            background: TK.surface,
            color: TK.text,
            fontFamily: TK.fontHeading,
            outline: "none",
            width: "100%",
            minWidth: 0,
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = "#2510FF")}
          onBlur={(e) => (e.currentTarget.style.borderColor = TK.border)}
        />
        {suffix && (
          <span
            style={{
              padding: "9px 12px 9px 10px",
              background: TK.surface2,
              border: `1.5px solid ${TK.border}`,
              borderLeft: "none",
              borderRadius: "0 8px 8px 0",
              fontSize: 13,
              fontWeight: 600,
              color: TK.textMuted,
              fontFamily: TK.fontBadge,
              whiteSpace: "nowrap",
            }}
          >
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

export function SelectInput({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label
        style={{
          display: "block",
          fontSize: 11.5,
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: TK.textSecondary,
          marginBottom: 4,
          fontFamily: TK.fontBadge,
        }}
      >
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "9px 11px",
          border: `1.5px solid ${TK.border}`,
          borderRadius: 8,
          fontSize: 15,
          background: TK.surface,
          color: TK.text,
          fontFamily: TK.font,
          outline: "none",
          cursor: "pointer",
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ── Result box ── */
export function ResultBox({
  items,
  color,
  insight,
}: {
  items: { label: string; value: string; highlight?: boolean }[];
  color: string;
  insight?: string;
}) {
  return (
    <div
      style={{
        background: `${color}08`,
        border: `1.5px solid ${color}25`,
        borderRadius: 12,
        padding: "14px 16px",
        marginTop: 16,
      }}
    >
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px 20px", marginBottom: insight ? 10 : 0 }}>
        {items.map((item) => (
          <div key={item.label}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: `${color}CC`,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fontFamily: TK.fontBadge,
                marginBottom: 2,
              }}
            >
              {item.label}
            </div>
            <div
              style={{
                fontSize: item.highlight ? 26 : 18,
                fontWeight: 800,
                color: item.highlight ? color : TK.text,
                fontFamily: TK.fontHeading,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>
      {insight && (
        <p
          style={{
            fontSize: 13.5,
            color: TK.textSecondary,
            lineHeight: 1.6,
            fontFamily: TK.font,
            borderTop: `1px solid ${color}20`,
            paddingTop: 10,
            margin: 0,
          }}
        >
          {insight}
        </p>
      )}
    </div>
  );
}

/* ── Divider ── */
export function Divider() {
  return <div style={{ height: 1, background: TK.border, margin: "12px 0" }} />;
}

/* ── Book Note / Quote ── */
export function BookNote({ quote, reference }: { quote: string; reference?: string }) {
  return (
    <div
      style={{
        background: TK.blueDim,
        border: `1px solid ${TK.borderMid}`,
        borderLeft: `3px solid ${TK.blue}`,
        borderRadius: "0 8px 8px 0",
        padding: "10px 14px",
        marginBottom: 14,
      }}
    >
      <div style={{ fontSize: 11, color: TK.textMuted, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: TK.fontBadge, marginBottom: 4 }}>
        Del libro · Doble Agente
      </div>
      <p style={{ fontSize: 13, color: TK.textSecondary, fontStyle: "italic", lineHeight: 1.6, fontFamily: TK.font, margin: 0 }}>
        "{quote}"
      </p>
      {reference && (
        <div style={{ fontSize: 12, color: TK.blue, fontWeight: 700, marginTop: 6, fontFamily: TK.fontBadge }}>
          → {reference}
        </div>
      )}
    </div>
  );
}

/* ── Diagnostic Table row ── */
export function DiagRow({ items, activeIndex }: { items: { range: string; label: string }[]; activeIndex?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2, marginBottom: 10 }}>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 8, alignItems: "center", padding: "4px 8px", borderRadius: 6, background: activeIndex === i ? `${TK.blue}12` : "transparent", border: activeIndex === i ? `1px solid ${TK.blue}25` : "1px solid transparent" }}>
          <span style={{ fontSize: 11.5, fontWeight: 700, color: TK.textMuted, fontFamily: TK.fontBadge, minWidth: 90 }}>{item.range}</span>
          <span style={{ fontSize: 13, color: activeIndex === i ? TK.blue : TK.textSecondary, fontWeight: activeIndex === i ? 700 : 400, fontFamily: TK.font }}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
