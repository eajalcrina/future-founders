"use client";
import { ReactNode } from "react";
import { TK } from "./theme";

interface CalcCardProps {
  title: string;
  description: string;
  mision: string;
  color: string;
  children: ReactNode;
}

export function CalcCard({ title, description, mision, color, children }: CalcCardProps) {
  return (
    <div
      style={{
        background: TK.surface,
        border: `1.5px solid ${TK.border}`,
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: TK.shadow,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top accent */}
      <div style={{ height: 3, background: `linear-gradient(to right, ${color}, ${color}80)` }} />

      {/* Header */}
      <div style={{ padding: "20px 22px 16px", borderBottom: `1px solid ${TK.border}` }}>
        <div
          style={{
            display: "inline-block",
            background: `${color}12`,
            border: `1px solid ${color}25`,
            borderRadius: 100,
            padding: "3px 10px",
            fontSize: 10,
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
            fontSize: 16,
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
        <p style={{ fontSize: 12.5, color: TK.textMuted, lineHeight: 1.55, fontFamily: TK.font }}>
          {description}
        </p>
      </div>

      {/* Body */}
      <div style={{ padding: "20px 22px", flex: 1 }}>{children}</div>
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
          fontSize: 10.5,
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
              fontSize: 13,
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
            fontSize: 13.5,
            fontWeight: 600,
            background: TK.surface,
            color: TK.text,
            fontFamily: TK.fontHeading,
            outline: "none",
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
              fontSize: 12,
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
          fontSize: 10.5,
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
          fontSize: 13.5,
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
                fontSize: 10,
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
                fontSize: item.highlight ? 22 : 16,
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
            fontSize: 12,
            color: TK.textSecondary,
            lineHeight: 1.55,
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
