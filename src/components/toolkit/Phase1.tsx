"use client";
import { useState } from "react";
import { CalcCard, NumInput, SelectInput, ResultBox } from "./CalcCard";
import { TK } from "./theme";

const COLOR = TK.phase1;

function fmt(n: number, decimals = 0) {
  return n.toLocaleString("es-PE", { maximumFractionDigits: decimals });
}

/* ── Calc 1: Inventario de Activos ── */
function InventarioActivos() {
  const [red, setRed] = useState("0");
  const [expertise, setExpertise] = useState("0");
  const [horas, setHoras] = useState("0");
  const [capital, setCapital] = useState("0");

  const r = Math.min(10, Math.max(0, parseFloat(red) || 0));
  const e = Math.min(10, Math.max(0, parseFloat(expertise) || 0));
  const h = Math.min(10, Math.max(0, parseFloat(horas) || 0));
  const c = Math.min(10, Math.max(0, parseFloat(capital) || 0));
  const total = Math.round(((r + e + h + c) / 40) * 100);

  const nivel = total >= 70 ? "Alto" : total >= 40 ? "Medio" : "Bajo";
  const insight =
    total >= 70
      ? "Tienes activos sólidos para arrancar. El siguiente paso es productizar tu expertise en una oferta concreta."
      : total >= 40
      ? "Base de activos moderada. Identifica cuál de tus activos tiene mayor potencial y enfócate en desarrollarlo primero."
      : "Momento ideal para un inventario profundo. Explora redes que aún no has activado y conocimiento no documentado.";

  return (
    <CalcCard
      title="Inventario de Activos Ocultos"
      description="Valora los activos que ya tienes y que el sistema corporativo aún no ha monetizado."
      mision="Misión 01"
      color={COLOR}
    >
      <NumInput label="Red de contactos (0-10)" value={red} onChange={setRed} min={0} step={1} suffix="/ 10" />
      <NumInput label="Expertise especializado (0-10)" value={expertise} onChange={setExpertise} min={0} step={1} suffix="/ 10" />
      <NumInput label="Tiempo disponible (0-10)" value={horas} onChange={setHoras} min={0} step={1} suffix="/ 10" />
      <NumInput label="Capital disponible (0-10)" value={capital} onChange={setCapital} min={0} step={1} suffix="/ 10" />
      <ResultBox
        color={COLOR}
        items={[
          { label: "Potencial de activos", value: `${total}%`, highlight: true },
          { label: "Nivel", value: nivel },
        ]}
        insight={insight}
      />
    </CalcCard>
  );
}

/* ── Calc 2: Riesgo Laboral ── */
function RiesgoLaboral() {
  const [anios, setAnios] = useState("5");
  const [sector, setSector] = useState("estable");
  const [unico, setUnico] = useState("si");
  const [pct, setPct] = useState("100");

  const a = parseFloat(anios) || 0;
  const p = Math.min(100, Math.max(0, parseFloat(pct) || 0));

  const riesgoAnios = a < 2 ? 30 : a < 5 ? 20 : a < 10 ? 15 : 10;
  const riesgoSector = sector === "transformacion" ? 40 : sector === "inestable" ? 30 : 10;
  const riesgoUnico = unico === "si" ? 25 : 10;
  const riesgoPct = p >= 90 ? 20 : p >= 70 ? 12 : 5;

  const total = Math.min(100, riesgoAnios + riesgoSector + riesgoUnico + riesgoPct);
  const nivel = total >= 70 ? "Crítico" : total >= 45 ? "Moderado" : "Controlado";
  const nColor = total >= 70 ? TK.danger : total >= 45 ? TK.warning : TK.success;
  const insight =
    total >= 70
      ? "Riesgo elevado. Tu estabilidad corporativa es frágil — es urgente construir una segunda fuente de ingresos ahora."
      : total >= 45
      ? "Riesgo moderado. Tienes una ventana de 12–18 meses antes de que la incertidumbre se vuelva crítica."
      : "Posición estable. Aprovecha esta calma para construir tu activo con menor presión y más claridad.";

  return (
    <CalcCard
      title="Calculadora de Riesgo Laboral"
      description="Evalúa cuán expuesto estás a perder tu ingreso corporativo y con cuánta urgencia debes actuar."
      mision="Misión 02"
      color={COLOR}
    >
      <NumInput label="Años en la empresa actual" value={anios} onChange={setAnios} min={0} suffix="años" />
      <SelectInput
        label="Estabilidad del sector"
        value={sector}
        onChange={setSector}
        options={[
          { value: "estable", label: "Sector estable (banca, gobierno, salud)" },
          { value: "inestable", label: "Sector en contracción" },
          { value: "transformacion", label: "Sector en disrupción / transformación" },
        ]}
      />
      <SelectInput
        label="¿Única fuente de ingreso?"
        value={unico}
        onChange={setUnico}
        options={[
          { value: "si", label: "Sí — 100% dependiente del empleo" },
          { value: "no", label: "No — tengo otros ingresos parciales" },
        ]}
      />
      <NumInput label="% de tu ingreso que viene del empleo" value={pct} onChange={setPct} min={0} max={100} suffix="%" />
      <ResultBox
        color={nColor}
        items={[
          { label: "Índice de riesgo", value: `${total}%`, highlight: true },
          { label: "Clasificación", value: nivel },
        ]}
        insight={insight}
      />
    </CalcCard>
  );
}

/* ── Calc 3: Horas Disponibles ── */
function HorasDisponibles() {
  const [laborales, setLaborales] = useState("50");
  const [sueno, setSueno] = useState("49");
  const [personal, setPersonal] = useState("20");
  const [otros, setOtros] = useState("5");

  const total = 168;
  const usadas = (parseFloat(laborales) || 0) + (parseFloat(sueno) || 0) + (parseFloat(personal) || 0) + (parseFloat(otros) || 0);
  const disponibles = Math.max(0, total - usadas);
  const pct = Math.round((disponibles / total) * 100);

  const nivel = disponibles >= 20 ? "Alta disponibilidad" : disponibles >= 10 ? "Disponibilidad media" : "Disponibilidad crítica";
  const insight =
    disponibles >= 20
      ? `${disponibles}h/semana es suficiente para construir un proyecto sólido en paralelo. Con foco, 3–4 horas diarias cambian todo.`
      : disponibles >= 10
      ? `${disponibles}h/semana es viable pero requiere máxima eficiencia. Identifica las 2 actividades de mayor impacto y descarta el resto.`
      : `${disponibles}h/semana es un punto de partida. Empieza con bloques de 1h y protege ese tiempo como si fuera una reunión de directorio.`;

  return (
    <CalcCard
      title="Auditoría de Tiempo Disponible"
      description="Calcula con precisión cuántas horas reales tienes cada semana para construir tu proyecto sin afectar tu empleo."
      mision="Misión 03"
      color={COLOR}
    >
      <NumInput label="Horas laborales / semana" value={laborales} onChange={setLaborales} suffix="h" />
      <NumInput label="Horas de sueño / semana (recomendado: 49h)" value={sueno} onChange={setSueno} suffix="h" />
      <NumInput label="Horas personales (familia, ocio, deporte)" value={personal} onChange={setPersonal} suffix="h" />
      <NumInput label="Otros compromisos fijos / semana" value={otros} onChange={setOtros} suffix="h" />
      <ResultBox
        color={COLOR}
        items={[
          { label: "Horas disponibles / semana", value: `${disponibles}h`, highlight: true },
          { label: "Del total semanal", value: `${pct}%` },
          { label: "Clasificación", value: nivel },
        ]}
        insight={insight}
      />
    </CalcCard>
  );
}

/* ── Phase 1 ── */
export default function Phase1() {
  return (
    <section id="fase-01" style={{ marginBottom: 80 }}>
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
          <span style={{ fontSize: 11, fontWeight: 900, color: COLOR, fontFamily: TK.fontHeading }}>01</span>
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
            Fase 01 · Infiltración
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
            Evalúa tu posición real antes de actuar
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
        <InventarioActivos />
        <RiesgoLaboral />
        <HorasDisponibles />
      </div>
    </section>
  );
}
