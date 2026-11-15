"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./AuthContext";
import AuthModal from "./AuthModal";
import Roadmap from "./Roadmap";
import Phase1 from "./Phase1";
import Phase2 from "./Phase2";
import Phase3 from "./Phase3";
import Phase4 from "./Phase4";
import Phase5 from "./Phase5";
import { generateGlobalReport } from "./pdfReport";
import { TK } from "./theme";
import { useIsMobile } from "./CalcCard";

const PHASES = [
  { id: "fase-01", label: "Infiltración", num: "01" },
  { id: "fase-02", label: "Misión Corp.", num: "02" },
  { id: "fase-03", label: "Mercado", num: "03" },
  { id: "fase-04", label: "Unidad Econ.", num: "04" },
  { id: "fase-05", label: "No Retorno", num: "05" },
];

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 88, behavior: "smooth" });
}

/* ── Navbar ── */
function Navbar({ activePhaseId }: { activePhaseId: string }) {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${TK.border}` : "1px solid transparent",
        transition: "all 0.25s ease",
        boxShadow: scrolled ? TK.shadowXs : "none",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              background: TK.blue,
              borderRadius: 8,
              padding: "5px 11px",
            }}
          >
            <span
              style={{
                fontSize: 12,
                fontWeight: 900,
                color: TK.yellow,
                fontFamily: TK.fontDisplay,
                letterSpacing: "-0.01em",
                display: "block",
                lineHeight: 1.3,
              }}
            >
              future founders
            </span>
          </div>
          <div style={{ width: 1, height: 16, background: TK.borderMid }} />
          <span
            style={{
              fontSize: 10.5,
              fontWeight: 700,
              color: TK.textMuted,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: TK.fontBadge,
            }}
          >
            Toolkit
          </span>
        </Link>

        {/* Phase nav — hidden on mobile */}
        {!isMobile && <div
          style={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            flexShrink: 1,
          }}
        >
          {PHASES.map((p) => (
            <button
              key={p.id}
              onClick={() => scrollToId(p.id)}
              style={{
                background: activePhaseId === p.id ? TK.blueDim : "transparent",
                border: activePhaseId === p.id ? `1px solid ${TK.borderMid}` : "1px solid transparent",
                color: activePhaseId === p.id ? TK.blue : TK.textMuted,
                borderRadius: 8,
                padding: "5px 10px",
                fontSize: 11.5,
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.15s",
                fontFamily: TK.font,
              }}
              onMouseEnter={(e) => {
                if (activePhaseId !== p.id) {
                  e.currentTarget.style.background = TK.blueDim;
                  e.currentTarget.style.color = TK.blue;
                }
              }}
              onMouseLeave={(e) => {
                if (activePhaseId !== p.id) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = TK.textMuted;
                }
              }}
            >
              <span style={{ opacity: 0.5, marginRight: 4, fontWeight: 900 }}>{p.num}</span>
              {p.label}
            </button>
          ))}
        </div>}

        {/* User + CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
          {/* User badge */}
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowMenu((m) => !m)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: TK.surface2,
                border: `1.5px solid ${TK.border}`,
                borderRadius: 100,
                padding: "4px 12px 4px 4px",
                cursor: "pointer",
                fontFamily: TK.font,
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = TK.borderMid)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = TK.border)}
            >
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: "50%",
                  background: TK.blue,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: 10, fontWeight: 900, color: TK.yellow, fontFamily: TK.fontHeading }}>
                  {user?.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
              </div>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: TK.text,
                  maxWidth: 80,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  fontFamily: TK.font,
                }}
              >
                {user?.name.split(" ")[0]}
              </span>
            </button>

            {showMenu && (
              <div
                style={{
                  position: "absolute",
                  top: "110%",
                  right: 0,
                  background: "#fff",
                  border: `1.5px solid ${TK.border}`,
                  borderRadius: 14,
                  padding: 8,
                  boxShadow: TK.shadowMd,
                  minWidth: 210,
                  zIndex: 300,
                }}
              >
                <div
                  style={{
                    padding: "8px 12px 12px",
                    borderBottom: `1px solid ${TK.border}`,
                    marginBottom: 6,
                  }}
                >
                  <div style={{ fontSize: 13, fontWeight: 700, color: TK.text, fontFamily: TK.fontHeading }}>
                    {user?.name}
                  </div>
                  <div style={{ fontSize: 11.5, color: TK.textMuted, marginTop: 2, fontFamily: TK.font }}>
                    {user?.email}
                  </div>
                  {(user?.role || user?.company) && (
                    <div style={{ fontSize: 11, color: TK.blue, marginTop: 3, fontWeight: 600, fontFamily: TK.font }}>
                      {user?.role}
                      {user?.company ? ` · ${user.company}` : ""}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => {
                    logout();
                    setShowMenu(false);
                  }}
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    background: TK.dangerDim,
                    border: `1px solid ${TK.danger}25`,
                    borderRadius: 9,
                    color: TK.danger,
                    fontSize: 12.5,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: TK.font,
                    textAlign: "left",
                  }}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ── Hero ── */
function Hero({ onSelectPhase }: { onSelectPhase: (id: string) => void }) {
  return (
    <div
      style={{
        paddingTop: 96,
        paddingBottom: 72,
        background: "linear-gradient(160deg, #F5F6FF 0%, #EDEFFE 55%, #F5F6FF 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-10%",
          right: "-4%",
          width: 560,
          height: 560,
          background: "radial-gradient(circle, rgba(20,0,212,0.05) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-8%",
          left: "-5%",
          width: 440,
          height: 440,
          background: "radial-gradient(circle, rgba(245,200,0,0.06) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows: "auto auto",
            gap: 16,
            alignItems: "stretch",
          }}
        >
          {/* Main hero cell */}
          <div
            style={{
              gridColumn: "1 / 3",
              gridRow: "1 / 3",
              background: "#FFFFFF",
              border: `1.5px solid ${TK.border}`,
              borderRadius: 24,
              padding: "48px 48px 40px",
              boxShadow: TK.shadow,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minHeight: 340,
            }}
          >
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: TK.blueDim,
                  border: `1px solid ${TK.borderMid}`,
                  borderRadius: 100,
                  padding: "5px 14px",
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: TK.blue,
                  }}
                />
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: TK.blue,
                    fontFamily: TK.fontBadge,
                  }}
                >
                  Toolkit Oficial · Doble Agente
                </span>
              </div>

              <h1
                style={{
                  fontSize: "clamp(28px, 3.5vw, 50px)",
                  fontWeight: 900,
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  color: TK.text,
                  marginBottom: 16,
                  fontFamily: TK.fontDisplay,
                }}
              >
                Las fórmulas que convierten{" "}
                <br />
                tu salario en{" "}
                <span
                  style={{
                    background: `linear-gradient(135deg, ${TK.blue} 0%, #6644FF 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  libertad
                </span>
              </h1>

              <p
                style={{
                  fontSize: 15,
                  color: TK.textSecondary,
                  lineHeight: 1.72,
                  maxWidth: 460,
                  fontFamily: TK.font,
                }}
              >
                15 calculadoras interactivas extraídas directamente del libro.
                Sin teoría. Sin rodeos. Ingresa tus números y obtén claridad
                matemática sobre tu próximo movimiento.
              </p>
            </div>

            <div>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: TK.textMuted,
                  letterSpacing: "0.09em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                  fontFamily: TK.fontBadge,
                }}
              >
                Selecciona una fase para comenzar
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {[
                  { id: "fase-01", label: "01 · Infiltración", color: TK.phase1 },
                  { id: "fase-02", label: "02 · Misión Corp.", color: TK.phase2 },
                  { id: "fase-03", label: "03 · Mercado", color: TK.phase3 },
                  { id: "fase-04", label: "04 · Unidad Econ.", color: TK.phase4 },
                  { id: "fase-05", label: "05 · No Retorno", color: TK.phase5 },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onSelectPhase(p.id)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      background: `${p.color}0D`,
                      border: `1.5px solid ${p.color}25`,
                      borderRadius: 100,
                      padding: "7px 14px",
                      fontSize: 12.5,
                      fontWeight: 600,
                      color: p.color,
                      cursor: "pointer",
                      fontFamily: TK.font,
                      transition: "all 0.14s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${p.color}18`;
                      e.currentTarget.style.borderColor = `${p.color}40`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `${p.color}0D`;
                      e.currentTarget.style.borderColor = `${p.color}25`;
                    }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stat: 15 calculadoras */}
          <div
            style={{
              gridColumn: "3",
              gridRow: "1",
              background: `linear-gradient(135deg, ${TK.blue} 0%, ${TK.blueLight} 100%)`,
              borderRadius: 24,
              padding: "28px 24px",
              boxShadow: `0 8px 28px ${TK.blue}44`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              position: "relative",
              overflow: "hidden",
              minHeight: 150,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -20,
                right: -20,
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.07)",
              }}
            />
            <div style={{ position: "relative" }}>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                  color: "#fff",
                  lineHeight: 1,
                  fontFamily: TK.fontHeading,
                }}
              >
                15
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.95)",
                  marginTop: 4,
                  fontFamily: TK.font,
                }}
              >
                Calculadoras
              </div>
              <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.55)", fontFamily: TK.font }}>
                Herramientas interactivas
              </div>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: TK.yellow,
                }}
              />
            </div>
          </div>

          {/* Stat: 5 fases */}
          <div
            style={{
              gridColumn: "3",
              gridRow: "2",
              background: "#FFFFFF",
              border: `1.5px solid ${TK.border}`,
              borderRadius: 24,
              padding: 24,
              boxShadow: TK.shadow,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 42,
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                  color: TK.yellowDark,
                  lineHeight: 1,
                  fontFamily: TK.fontHeading,
                }}
              >
                5
              </div>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: TK.text,
                  marginTop: 3,
                  fontFamily: TK.fontHeading,
                }}
              >
                Fases
              </div>
              <div
                style={{
                  fontSize: 11.5,
                  color: TK.textMuted,
                  lineHeight: 1.4,
                  fontFamily: TK.font,
                }}
              >
                De infiltración a libertad total
              </div>
            </div>
            <div
              style={{
                marginTop: 14,
                padding: "9px 11px",
                background: TK.blueDim,
                border: `1px solid ${TK.border}`,
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                gap: 9,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  background: TK.blue,
                  borderRadius: 7,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: 10, fontWeight: 900, color: TK.yellow, fontFamily: TK.fontHeading }}>
                  DA
                </span>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: TK.blue, lineHeight: 1.2, fontFamily: TK.fontHeading }}>
                  Doble Agente
                </div>
                <div style={{ fontSize: 10, color: TK.textMuted, lineHeight: 1.3, fontFamily: TK.font }}>
                  Eddie Ajalcriña & Lorenzo Ortiz
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Empty state ── */
function EmptyState({ onSelectPhase }: { onSelectPhase: (id: string) => void }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "72px 24px",
        background: TK.surface2,
        borderRadius: 20,
        border: `1.5px dashed ${TK.borderMid}`,
        margin: "0 0 72px",
      }}
    >
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          background: TK.blueDim,
          border: `1.5px solid ${TK.borderMid}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 18px",
          fontSize: 22,
        }}
      >
        🗺
      </div>
      <h3
        style={{
          fontSize: 19,
          fontWeight: 700,
          color: TK.text,
          letterSpacing: "-0.02em",
          marginBottom: 8,
          fontFamily: TK.fontHeading,
        }}
      >
        Selecciona una fase en el roadmap
      </h3>
      <p
        style={{
          fontSize: 14,
          color: TK.textSecondary,
          lineHeight: 1.65,
          maxWidth: 400,
          margin: "0 auto 28px",
          fontFamily: TK.font,
        }}
      >
        Haz clic en cualquier fase del roadmap para abrir sus calculadoras interactivas.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
        {[
          { id: "fase-01", label: "01 · Infiltración", color: TK.phase1 },
          { id: "fase-02", label: "02 · Misión Corp.", color: TK.phase2 },
          { id: "fase-03", label: "03 · Mercado", color: TK.phase3 },
          { id: "fase-04", label: "04 · Unidad Econ.", color: TK.phase4 },
          { id: "fase-05", label: "05 · No Retorno", color: TK.phase5 },
        ].map((p) => (
          <button
            key={p.id}
            onClick={() => onSelectPhase(p.id)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "#fff",
              border: `1.5px solid ${p.color}25`,
              borderRadius: 12,
              padding: "9px 14px",
              fontSize: 12.5,
              fontWeight: 600,
              color: p.color,
              cursor: "pointer",
              fontFamily: TK.font,
              transition: "all 0.14s",
              boxShadow: TK.shadowXs,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${p.color}08`;
              e.currentTarget.style.borderColor = `${p.color}45`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.borderColor = `${p.color}25`;
            }}
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── Global report button ── */
function GlobalReportBar({ visible }: { visible: boolean }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!visible || !user) return null;

  const handleGlobal = async () => {
    setLoading(true);
    generateGlobalReport(user);
    setLoading(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 150,
      }}
    >
      <button
        onClick={handleGlobal}
        disabled={loading}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          background: loading ? TK.surface3 : TK.text,
          color: loading ? TK.textMuted : "#fff",
          border: "none",
          borderRadius: 14,
          padding: "12px 20px",
          fontSize: 13,
          fontWeight: 700,
          cursor: loading ? "not-allowed" : "pointer",
          fontFamily: TK.font,
          boxShadow: loading ? "none" : TK.shadowMd,
          transition: "all 0.2s",
          letterSpacing: "0.01em",
        }}
        onMouseEnter={(e) => {
          if (!loading) e.currentTarget.style.transform = "translateY(-2px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        <span style={{ fontSize: 15 }}>📋</span>
        {loading ? "Generando..." : "Reporte PDF"}
      </button>
    </div>
  );
}

/* ── Footer ── */
function Footer() {
  return (
    <footer
      style={{
        borderTop: `1px solid ${TK.border}`,
        padding: "48px 24px 36px",
        background: "#FFFFFF",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
        }}
      >
        <div style={{ background: TK.blue, borderRadius: 9, padding: "6px 13px" }}>
          <span
            style={{
              fontSize: 13,
              fontWeight: 900,
              color: TK.yellow,
              fontFamily: TK.fontDisplay,
            }}
          >
            future founders
          </span>
        </div>
        <p
          style={{
            fontSize: 13,
            color: TK.textMuted,
            maxWidth: 460,
            lineHeight: 1.72,
            textAlign: "center",
            fontFamily: TK.font,
          }}
        >
          Toolkit extraído del libro{" "}
          <strong style={{ color: TK.textSecondary, fontWeight: 700 }}>Doble Agente</strong>{" "}
          por Eddie Ajalcriña & Lorenzo Ortiz.
          Herramienta de apoyo educativo. No sustituye asesoría financiera, legal ni contable.
        </p>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <Link
            href="/"
            style={{
              fontSize: 13,
              color: TK.blue,
              fontWeight: 600,
              textDecoration: "none",
              fontFamily: TK.font,
            }}
          >
            ← futurefounders.pe
          </Link>
          <span style={{ width: 1, height: 12, background: TK.borderMid }} />
          <span style={{ fontSize: 12, color: TK.textMuted, fontFamily: TK.font }}>
            © 2026 Future Founders
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ── Inner app (requires auth) ── */
function InnerApp() {
  const { user } = useAuth();
  const [activePhaseId, setActivePhaseId] = useState<string | null>(null);
  const [activeNavPhase, setActiveNavPhase] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const onScroll = () => {
      let current = "";
      ["fase-01", "fase-02", "fase-03", "fase-04", "fase-05"].forEach((id) => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.getBoundingClientRect().top + window.scrollY - 160) {
          current = id;
        }
      });
      setActiveNavPhase(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!user) return <AuthModal />;

  const handleSelectPhase = (id: string) => {
    setActivePhaseId(id);
    setHasInteracted(true);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 88, behavior: "smooth" });
    }, 80);
  };

  return (
    <>
      <Navbar activePhaseId={activeNavPhase} />
      <Hero onSelectPhase={handleSelectPhase} />

      {/* Roadmap */}
      <div
        style={{
          background: "#FFFFFF",
          borderTop: `1px solid ${TK.border}`,
          borderBottom: `1px solid ${TK.border}`,
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>
          <Roadmap activePhaseId={activePhaseId} onPhaseSelect={handleSelectPhase} />
        </div>
      </div>

      {/* Phases */}
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: isMobile ? "0 16px" : "0 24px" }}>
        <div
          style={{
            textAlign: "center",
            padding: "64px 0 48px",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              color: TK.textMuted,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontFamily: TK.fontBadge,
            }}
          >
            <div style={{ height: 1, width: 48, background: TK.borderMid }} />
            {activePhaseId ? "Herramientas activas" : "Selecciona una fase para comenzar"}
            <div style={{ height: 1, width: 48, background: TK.borderMid }} />
          </div>
        </div>

        {!activePhaseId && <EmptyState onSelectPhase={handleSelectPhase} />}
        {activePhaseId === "fase-01" && <Phase1 />}
        {activePhaseId === "fase-02" && <Phase2 />}
        {activePhaseId === "fase-03" && <Phase3 />}
        {activePhaseId === "fase-04" && <Phase4 />}
        {activePhaseId === "fase-05" && <Phase5 />}
      </main>

      <Footer />
      <GlobalReportBar visible={hasInteracted} />
    </>
  );
}

/* ── Root export ── */
export default function ToolkitApp() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}
