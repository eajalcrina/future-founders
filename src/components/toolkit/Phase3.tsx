"use client";
import { useState } from "react";
import { CalcCard, NumInput, ResultBox } from "./CalcCard";
import { TK } from "./theme";

const COLOR = TK.phase3;

function fmt(n: number, decimals = 0) {
  return n.toLocaleString("es-PE", { maximumFractionDigits: decimals });
}
function fmtK(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${fmt(n)}`;
}

/* ── Calc 1: TAM / SAM / SOM ── */
function MercadoTAM() {
  const [universo, setUniverso] = useState("0");
  const [precioPromedio, setPrecioPromedio] = useState("0");
  const [pctSAM, setPctSAM] = useState("10");
  const [pctSOM, setPctSOM] = useState("2");

  const u = parseFloat(universo) || 0;
  const p = parseFloat(precioPromedio) || 0;
  const sam = Math.min(100, parseFloat(pctSAM) || 0);
  const som = Math.min(100, parseFloat(pctSOM) || 0);

  const TAM = u * p;
  const SAM = TAM * (sam / 100);
  const SOM = SAM * (som / 100);

  const insight =
    SOM > 0
      ? `Tu mercado captureable realista es ${fmtK(SOM)}/año. Con ${fmt(Math.ceil(SOM / (p * 12)))} clientes activos puedes sostener ese número. Enfócate en ese nicho antes de escalar.`
      : "Ingresa el tamaño de universo y precio para calcular tu mercado.";

  return (
    <CalcCard
      title="Dimensionamiento de Mercado TAM/SAM/SOM"
      description="Calcula el mercado total, el accesible y el capturable para validar si tu idea tiene escala suficiente."
      mision="Misión 09"
      color={COLOR}
    >
      <NumInput label="Universo total de potenciales clientes" value={universo} onChange={setUniverso} suffix="personas/empresas" />
      <NumInput label="Precio promedio por cliente / año (USD)" value={precioPromedio} onChange={setPrecioPromedio} prefix="$" />
      <NumInput label="% del mercado accesible (SAM)" value={pctSAM} onChange={setPctSAM} min={0} max={100} suffix="%" />
      <NumInput label="% realista a capturar (SOM)" value={pctSOM} onChange={setPctSOM} min={0} max={100} suffix="%" />
      <ResultBox
        color={COLOR}
        items={[
          { label: "TAM (mercado total)", value: fmtK(TAM) },
          { label: "SAM (mercado accesible)", value: fmtK(SAM) },
          { label: "SOM (tu mercado real)", value: fmtK(SOM), highlight: true },
        ]}
        insight={insight}
      />
    </CalcCard>
  );
}

/* ── Calc 2: Precio Basado en Valor ── */
function PrecioOferta() {
  const [valorGenerado, setValorGenerado] = useState("0");
  const [pctPrecio, setPctPrecio] = useState("10");
  const [precioMercado, setPrecioMercado] = useState("0");

  const valor = parseFloat(valorGenerado) || 0;
  const pct = Math.min(100, parseFloat(pctPrecio) || 0);
  const mercado = parseFloat(precioMercado) || 0;

  const precioValor = valor * (pct / 100);
  const diferencial = mercado > 0 ? ((precioValor - mercado) / mercado) * 100 : 0;

  const posicion =
    diferencial > 20
      ? "Premium justificado"
      : diferencial > 0
      ? "Sobre el mercado"
      : diferencial === 0
      ? "En línea con mercado"
      : "Bajo el mercado";

  const insight =
    precioValor > 0
      ? `Basado en el valor que entregas (USD ${fmt(valor)}), tu precio óptimo es USD ${fmt(precioValor)}/año. ${mercado > 0 ? `Vs. el mercado (USD ${fmt(mercado)}): estás ${diferencial > 0 ? "por encima" : "por debajo"} un ${Math.abs(diferencial).toFixed(0)}%.` : ""} El precio debe reflejar el resultado, no el tiempo.`
      : "Ingresa el valor anual que generas al cliente para calcular tu precio óptimo.";

  return (
    <CalcCard
      title="Calculadora de Precio Basado en Valor"
      description="Determina el precio óptimo de tu oferta en función del valor real que entregas al cliente — no de tu tiempo."
      mision="Misión 10"
      color={COLOR}
    >
      <NumInput label="Valor anual generado al cliente (USD)" value={valorGenerado} onChange={setValorGenerado} prefix="$" />
      <NumInput label="% del valor como precio (5-20% es rango típico)" value={pctPrecio} onChange={setPctPrecio} min={1} max={50} suffix="%" />
      <NumInput label="Precio promedio de la competencia (USD/año)" value={precioMercado} onChange={setPrecioMercado} prefix="$" />
      <ResultBox
        color={COLOR}
        items={[
          { label: "Precio óptimo / año", value: `$${fmt(precioValor)}`, highlight: true },
          { label: "Precio / mes", value: `$${fmt(precioValor / 12)}` },
          ...(mercado > 0 ? [{ label: "Posición vs. mercado", value: posicion }] : []),
        ]}
        insight={insight}
      />
    </CalcCard>
  );
}

/* ── Calc 3: Ventaja Competitiva ── */
function VentajaCompetitiva() {
  const [tuPrecio, setTuPrecio] = useState("5");
  const [tuEspecializ, setTuEspecializ] = useState("5");
  const [tuRed, setTuRed] = useState("5");
  const [tuCredibilidad, setTuCredibilidad] = useState("5");
  const [tuVelocidad, setTuVelocidad] = useState("5");
  const [compPrecio, setCompPrecio] = useState("5");
  const [compEspecializ, setCompEspecializ] = useState("5");
  const [compRed, setCompRed] = useState("5");
  const [compCredibilidad, setCompCredibilidad] = useState("5");
  const [compVelocidad, setCompVelocidad] = useState("5");

  const tuTotal =
    (parseFloat(tuPrecio) || 0) +
    (parseFloat(tuEspecializ) || 0) +
    (parseFloat(tuRed) || 0) +
    (parseFloat(tuCredibilidad) || 0) +
    (parseFloat(tuVelocidad) || 0);
  const compTotal =
    (parseFloat(compPrecio) || 0) +
    (parseFloat(compEspecializ) || 0) +
    (parseFloat(compRed) || 0) +
    (parseFloat(compCredibilidad) || 0) +
    (parseFloat(compVelocidad) || 0);

  const diferencia = tuTotal - compTotal;
  const pctVentaja = compTotal > 0 ? Math.round((diferencia / compTotal) * 100) : 0;
  const posicion =
    diferencia > 5 ? "Ventaja clara" : diferencia > 0 ? "Ventaja moderada" : diferencia < 0 ? "Brecha a cerrar" : "Empate";
  const ventajaColor = diferencia > 0 ? TK.success : TK.danger;

  const dims = [
    { label: "Precio competitivo", tu: parseFloat(tuPrecio) || 0, comp: parseFloat(compPrecio) || 0 },
    { label: "Especialización", tu: parseFloat(tuEspecializ) || 0, comp: parseFloat(compEspecializ) || 0 },
    { label: "Red de contactos", tu: parseFloat(tuRed) || 0, comp: parseFloat(compRed) || 0 },
    { label: "Credibilidad / track record", tu: parseFloat(tuCredibilidad) || 0, comp: parseFloat(compCredibilidad) || 0 },
    { label: "Velocidad de entrega", tu: parseFloat(tuVelocidad) || 0, comp: parseFloat(compVelocidad) || 0 },
  ];

  const mayorVentaja = dims.sort((a, b) => (b.tu - b.comp) - (a.tu - a.comp))[0];

  return (
    <CalcCard
      title="Análisis de Ventaja Competitiva"
      description="Compara tu posición vs. la competencia en 5 dimensiones clave para identificar tu diferencial de mercado."
      mision="Misión 11"
      color={COLOR}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          marginBottom: 4,
          fontSize: 10,
          fontWeight: 700,
          color: TK.textMuted,
          letterSpacing: "0.07em",
          textTransform: "uppercase",
          fontFamily: TK.fontBadge,
        }}
      >
        <span>TÚ (0-10)</span>
        <span>COMPETENCIA (0-10)</span>
      </div>
      {[
        { label: "Precio", tu: tuPrecio, setTu: setTuPrecio, comp: compPrecio, setComp: setCompPrecio },
        { label: "Especialización", tu: tuEspecializ, setTu: setTuEspecializ, comp: compEspecializ, setComp: setCompEspecializ },
        { label: "Red", tu: tuRed, setTu: setTuRed, comp: compRed, setComp: setCompRed },
        { label: "Credibilidad", tu: tuCredibilidad, setTu: setTuCredibilidad, comp: compCredibilidad, setComp: setCompCredibilidad },
        { label: "Velocidad", tu: tuVelocidad, setTu: setTuVelocidad, comp: compVelocidad, setComp: setCompVelocidad },
      ].map((d) => (
        <div key={d.label} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, alignItems: "center", marginBottom: 6 }}>
          <NumInput label={d.label} value={d.tu} onChange={d.setTu} min={0} max={10} step={1} suffix="/ 10" />
          <NumInput label={d.label} value={d.comp} onChange={d.setComp} min={0} max={10} step={1} suffix="/ 10" />
        </div>
      ))}
      <ResultBox
        color={ventajaColor}
        items={[
          { label: "Score tú", value: `${tuTotal}/50` },
          { label: "Score competencia", value: `${compTotal}/50` },
          { label: "Ventaja relativa", value: `${pctVentaja > 0 ? "+" : ""}${pctVentaja}%`, highlight: true },
          { label: "Posición", value: posicion },
        ]}
        insight={
          tuTotal > 0
            ? `Tu mayor ventaja: ${mayorVentaja.label} (+${(mayorVentaja.tu - mayorVentaja.comp).toFixed(0)} pts). Comunícala explícitamente en tu propuesta comercial.`
            : "Completa los scores para ver tu posición competitiva."
        }
      />
    </CalcCard>
  );
}

/* ── Phase 3 ── */
export default function Phase3() {
  return (
    <section id="fase-03" style={{ marginBottom: 80 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          marginBottom: 28,
          paddingBottom: 18,
          borderBottom: `1.5px solid ${TK.border}`,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: `${COLOR}18`,
            border: `1.5px solid ${COLOR}30`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 900, color: COLOR, fontFamily: TK.fontHeading }}>03</span>
        </div>
        <div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: COLOR,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: TK.fontBadge,
              marginBottom: 3,
            }}
          >
            Fase 03 · Mercado
          </div>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: TK.text,
              fontFamily: TK.fontHeading,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            Dimensiona tu mercado y define tu precio
          </h2>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 20,
        }}
      >
        <MercadoTAM />
        <PrecioOferta />
        <VentajaCompetitiva />
      </div>
    </section>
  );
}
