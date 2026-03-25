"use client";
import { TK } from "./theme";

const PHASES = [
  {
    id: "fase-01",
    num: "01",
    label: "Infiltración",
    desc: "Evalúa tu situación real e identifica activos ocultos",
    color: TK.phase1,
    icon: "🕵️",
  },
  {
    id: "fase-02",
    num: "02",
    label: "Misión Corp.",
    desc: "Extrae el máximo valor de tu posición corporativa",
    color: TK.phase2,
    icon: "🎯",
  },
  {
    id: "fase-03",
    num: "03",
    label: "Mercado",
    desc: "Dimensiona el mercado y valora tu oferta",
    color: TK.phase3,
    icon: "📊",
  },
  {
    id: "fase-04",
    num: "04",
    label: "Unidad Econ.",
    desc: "Construye la unidad económica de tu negocio",
    color: TK.phase4,
    icon: "💡",
  },
  {
    id: "fase-05",
    num: "05",
    label: "No Retorno",
    desc: "Planifica tu transición y punto de salida",
    color: TK.phase5,
    icon: "🚀",
  },
];

interface RoadmapProps {
  activePhaseId: string | null;
  onPhaseSelect: (id: string) => void;
}

export default function Roadmap({ activePhaseId, onPhaseSelect }: RoadmapProps) {
  return (
    <div style={{ padding: "32px 0 28px" }}>
      {/* Header */}
      <div style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: TK.textMuted,
            fontFamily: TK.fontBadge,
          }}
        >
          Hoja de ruta · 5 fases · 15 calculadoras
        </span>
        <div style={{ flex: 1, height: 1, background: TK.border }} />
      </div>

      {/* Phase track */}
      <div style={{ position: "relative" }}>
        {/* Connector line */}
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 28,
            right: 28,
            height: 2,
            background: `linear-gradient(to right, ${TK.phase1}, ${TK.phase2}, ${TK.phase3}, ${TK.phase4}, ${TK.phase5})`,
            opacity: 0.25,
            zIndex: 0,
          }}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: 12,
            position: "relative",
            zIndex: 1,
          }}
        >
          {PHASES.map((phase) => {
            const isActive = activePhaseId === phase.id;
            return (
              <button
                key={phase.id}
                onClick={() => onPhaseSelect(phase.id)}
                style={{
                  background: isActive ? `${phase.color}10` : TK.surface,
                  border: `1.5px solid ${isActive ? phase.color : TK.border}`,
                  borderRadius: 16,
                  padding: "16px 14px 14px",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.18s",
                  boxShadow: isActive ? `0 4px 20px ${phase.color}22` : TK.shadowXs,
                  fontFamily: TK.font,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = `${phase.color}55`;
                    e.currentTarget.style.background = `${phase.color}07`;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = TK.border;
                    e.currentTarget.style.background = TK.surface;
                  }
                }}
              >
                {/* Dot + number */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: isActive ? phase.color : `${phase.color}18`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "background 0.18s",
                    }}
                  >
                    <span style={{ fontSize: isActive ? 14 : 15 }}>
                      {isActive ? (
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 900,
                            color: "#fff",
                            fontFamily: TK.fontHeading,
                          }}
                        >
                          {phase.num}
                        </span>
                      ) : (
                        phase.icon
                      )}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: isActive ? phase.color : TK.textMuted,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      fontFamily: TK.fontBadge,
                    }}
                  >
                    Fase {phase.num}
                  </span>
                </div>

                {/* Label */}
                <div
                  style={{
                    fontSize: 13.5,
                    fontWeight: 700,
                    color: isActive ? phase.color : TK.text,
                    marginBottom: 4,
                    fontFamily: TK.fontHeading,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {phase.label}
                </div>

                {/* Description */}
                <div
                  style={{
                    fontSize: 11.5,
                    color: TK.textMuted,
                    lineHeight: 1.5,
                    fontFamily: TK.font,
                  }}
                >
                  {phase.desc}
                </div>

                {/* Active indicator */}
                {isActive && (
                  <div
                    style={{
                      marginTop: 10,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      background: `${phase.color}18`,
                      border: `1px solid ${phase.color}35`,
                      borderRadius: 100,
                      padding: "3px 9px",
                    }}
                  >
                    <div
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: "50%",
                        background: phase.color,
                      }}
                    />
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: phase.color,
                        fontFamily: TK.fontBadge,
                        letterSpacing: "0.05em",
                      }}
                    >
                      ACTIVA
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
