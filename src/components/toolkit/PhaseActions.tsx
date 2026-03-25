"use client";
import { TK } from "./theme";

interface PhaseActionsProps {
  saved: boolean;
  onSave: () => void;
  onReport: () => void;
}

export default function PhaseActions({ saved, onSave, onReport }: PhaseActionsProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginTop: 24,
        padding: "14px 20px",
        background: TK.surface,
        border: `1.5px solid ${TK.border}`,
        borderRadius: 14,
        flexWrap: "wrap",
      }}
    >
      <div style={{ flex: 1, minWidth: 140, fontSize: 12, color: saved ? TK.success : TK.warning, fontFamily: TK.font, fontWeight: 600 }}>
        {saved ? "✓ Datos guardados" : "● Cambios sin guardar"}
      </div>
      <button
        onClick={onSave}
        style={{
          padding: "9px 20px",
          borderRadius: 8,
          border: `1.5px solid ${TK.borderMid}`,
          background: TK.surface2,
          color: TK.text,
          fontWeight: 600,
          fontSize: 13,
          fontFamily: TK.font,
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        Guardar datos
      </button>
      <button
        onClick={onReport}
        style={{
          padding: "9px 20px",
          borderRadius: 8,
          border: "none",
          background: TK.blue,
          color: "#fff",
          fontWeight: 700,
          fontSize: 13,
          fontFamily: TK.font,
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        Descargar reporte de fase
      </button>
    </div>
  );
}
