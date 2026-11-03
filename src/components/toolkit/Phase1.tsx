"use client";
import { CalcCard, NumInput, ResultBox, BookNote, DiagRow } from "./CalcCard";
import { TK } from "./theme";
import { usePhaseData } from "./usePhaseData";
import { downloadPhase1Report } from "./phaseReports";
import { useAuth } from "./AuthContext";
import PhaseActions from "./PhaseActions";

const COLOR = TK.phase1;

export interface Phase1Data {
  // #01 Runway de Libertad
  ahorros: string; gastosMes: string;
  // #02 Valor de Mercado Real
  skills: string; demanda: string; competencia: string;
  // #03 Capital de Extracción
  salarioNeto: string; tasa: string; mesesHorizonte: string;
  // #04 Tasa Horaria Efectiva
  ingresoProyecto: string; horasReales: string;
}

const DEFAULTS: Phase1Data = {
  ahorros: "0", gastosMes: "0",
  skills: "5", demanda: "5", competencia: "5",
  salarioNeto: "0", tasa: "15", mesesHorizonte: "12",
  ingresoProyecto: "0", horasReales: "15",
};

function fmt(n: number, decimals = 0) {
  return n.toLocaleString("es-PE", { maximumFractionDigits: decimals });
}

/* ── #01 Runway de Libertad ── */
function RunwayLibertad({ d, s }: { d: Phase1Data; s: (k: keyof Phase1Data, v: string) => void }) {
  const ahorros = parseFloat(d.ahorros) || 0;
  const gastos = Math.max(1, parseFloat(d.gastosMes) || 1);
  const runway = ahorros / gastos;
  const diagIndex = runway > 12 ? 3 : runway >= 6 ? 2 : runway >= 3 ? 1 : 0;
  const diagLabel = ["Zona crítica — actúa hoy", "Zona de riesgo — margen insuficiente", "Estable, pero no cómodo", "Ventana operativa activa ✓"][diagIndex];
  const resultColor = runway > 12 ? TK.success : runway >= 6 ? COLOR : runway >= 3 ? TK.warning : TK.danger;
  const insight = ahorros > 0
    ? `Con USD ${fmt(ahorros)} ahorrados y USD ${fmt(gastos)}/mes de gastos, tienes ${fmt(runway, 1)} meses de runway. ${runway < 6 ? "Aumentar el runway es la prioridad antes de cualquier otra acción." : runway < 12 ? "Tienes estabilidad temporal. Úsala para construir sin presión extrema." : "Ventana operativa abierta: tienes tiempo para ejecutar con calma."}`
    : "Ingresa tus ahorros y gastos mensuales para calcular tu runway.";
  return (
    <CalcCard
      title="Runway de Libertad"
      description="Cuántos meses puedes vivir sin ingresos. La base de toda decisión de transición."
      mision="Herramienta 01"
      color={COLOR}
      left={
        <>
          <BookNote quote="El runway no es un lujo — es la condición mínima para que la transición tenga sentido estratégico." reference="Umbral mínimo: 6 meses · Ventana recomendada: +12 meses" />
          <NumInput label="Ahorros líquidos totales (USD)" value={d.ahorros} onChange={(v) => s("ahorros", v)} prefix="$" />
          <NumInput label="Gasto mensual real (USD)" value={d.gastosMes} onChange={(v) => s("gastosMes", v)} prefix="$" />
        </>
      }
      right={
        <>
          <DiagRow items={[
            { range: "< 3 meses", label: "Zona crítica — actúa hoy" },
            { range: "3–6 meses", label: "Zona de riesgo — margen insuficiente" },
            { range: "6–12 meses", label: "Estable, pero no cómodo" },
            { range: "> 12 meses", label: "Ventana operativa activa ✓" },
          ]} activeIndex={diagIndex} />
          <ResultBox color={resultColor} items={[
            { label: "Runway", value: `${fmt(runway, 1)} meses`, highlight: true },
            { label: "Estado", value: diagLabel },
          ]} insight={insight} />
        </>
      }
    />
  );
}

/* ── #02 Valor de Mercado Real (VMR) ── */
function ValorMercadoReal({ d, s }: { d: Phase1Data; s: (k: keyof Phase1Data, v: string) => void }) {
  const skills = Math.min(10, Math.max(1, parseFloat(d.skills) || 1));
  const demanda = Math.min(10, Math.max(1, parseFloat(d.demanda) || 1));
  const competencia = Math.max(1, Math.min(10, parseFloat(d.competencia) || 1));
  const vmr = (skills * demanda) / competencia;
  const diagIndex = vmr >= 7 ? 0 : vmr >= 4 ? 1 : 2;
  const diagLabel = ["Alta demanda · Momento para moverte", "Posición media · Desarrolla más skills", "Posición débil · Fortalecer skills transferibles"][diagIndex];
  const resultColor = vmr >= 7 ? TK.success : vmr >= 4 ? COLOR : TK.danger;
  const insight = `VMR de ${fmt(vmr, 1)}: ${diagLabel.toLowerCase()}. ${skills >= 7 ? "Tu especialización es tu activo principal." : "Enfócate en 1-2 skills de alta demanda y baja oferta."} ${competencia >= 7 ? "Alta competencia — diferénciate con nicho específico." : "La competencia es moderada — puedes posicionarte con solidez."}`;
  return (
    <CalcCard
      title="Valor de Mercado Real (VMR)"
      description="Tu salario mide tu costo de reemplazo, no tu valor real. Esta fórmula mide lo segundo."
      mision="Herramienta 02"
      color={COLOR}
      left={
        <>
          <BookNote quote="Tu salario mide tu costo de reemplazo, no tu valor real." reference="VMR = (Skills × Demanda) ÷ Competencia" />
          <NumInput label="Skills clave (1–10)" value={d.skills} onChange={(v) => s("skills", v)} min={1} max={10} step={1} suffix="/ 10" />
          <NumInput label="Demanda del mercado (1–10)" value={d.demanda} onChange={(v) => s("demanda", v)} min={1} max={10} step={1} suffix="/ 10" />
          <NumInput label="Nivel de competencia (1–10)" value={d.competencia} onChange={(v) => s("competencia", v)} min={1} max={10} step={1} suffix="/ 10" />
        </>
      }
      right={
        <>
          <DiagRow items={[
            { range: "≥ 7", label: "Alta demanda · Momento para moverte" },
            { range: "4–7", label: "Posición media · Desarrolla más skills" },
            { range: "< 4", label: "Posición débil · Fortalecer skills transferibles" },
          ]} activeIndex={diagIndex} />
          <ResultBox color={resultColor} items={[
            { label: "Índice VMR", value: fmt(vmr, 1), highlight: true },
            { label: "Posicionamiento", value: diagLabel.split(" · ")[0] },
          ]} insight={insight} />
        </>
      }
    />
  );
}

/* ── #03 Capital de Extracción ── */
function CapitalExtraccion({ d, s }: { d: Phase1Data; s: (k: keyof Phase1Data, v: string) => void }) {
  const salario = parseFloat(d.salarioNeto) || 0;
  const tasa = Math.min(100, Math.max(0, parseFloat(d.tasa) || 0));
  const meses = Math.max(1, parseFloat(d.mesesHorizonte) || 1);
  const extraccionMes = salario * (tasa / 100);
  const capitalAcum = extraccionMes * meses;
  const diagIndex = tasa >= 15 ? 2 : tasa >= 10 ? 1 : 0;
  const tasaColor = tasa >= 15 ? TK.success : tasa >= 10 ? TK.warning : TK.danger;
  const insight = salario > 0
    ? `Ahorrando el ${tasa}% de USD ${fmt(salario)}/mes, extraes USD ${fmt(extraccionMes)}/mes. En ${meses} meses acumulas USD ${fmt(capitalAcum)} de capital de transición. ${tasa < 15 ? `Para cumplir el protocolo del libro necesitas USD ${fmt(salario * 0.15 - extraccionMes)} adicionales por mes.` : "Estás siguiendo el protocolo del libro ✓"}`
    : "Ingresa tu salario neto para calcular el capital de extracción.";
  return (
    <CalcCard
      title="Capital de Extracción"
      description="El protocolo de ahorro obligatorio para financiar la transición. La cuenta intocable."
      mision="Herramienta 03"
      color={COLOR}
      left={
        <>
          <BookNote quote="La cuenta de extracción es intocable. Solo existe para financiar la salida." reference="Tasa mínima del protocolo: 15% del salario neto" />
          <NumInput label="Salario neto mensual (USD)" value={d.salarioNeto} onChange={(v) => s("salarioNeto", v)} prefix="$" />
          <NumInput label="Tasa de extracción (%)" value={d.tasa} onChange={(v) => s("tasa", v)} min={0} max={100} suffix="%" />
          <NumInput label="Meses de horizonte" value={d.mesesHorizonte} onChange={(v) => s("mesesHorizonte", v)} suffix="meses" />
        </>
      }
      right={
        <>
          <DiagRow items={[
            { range: "< 10%", label: "No genera masa crítica" },
            { range: "10–14%", label: "Mínimo viable" },
            { range: "≥ 15%", label: "Protocolo del libro ✓" },
          ]} activeIndex={diagIndex} />
          <ResultBox color={tasaColor} items={[
            { label: "Extracción mensual", value: `$${fmt(extraccionMes)}`, highlight: true },
            { label: `Capital en ${meses} meses`, value: `$${fmt(capitalAcum)}` },
            { label: "Tasa aplicada", value: `${tasa}%` },
          ]} insight={insight} />
        </>
      }
    />
  );
}

/* ── #04 Tasa Horaria Efectiva ── */
function TasaHorariaEfectiva({ d, s }: { d: Phase1Data; s: (k: keyof Phase1Data, v: string) => void }) {
  const ingreso = parseFloat(d.ingresoProyecto) || 0;
  const horas = Math.max(1, parseFloat(d.horasReales) || 1);
  const tasa = ingreso / horas;
  const diagIndex = tasa > 300 ? 3 : tasa >= 150 ? 2 : tasa >= 50 ? 1 : 0;
  const tasaColor = tasa > 300 ? TK.success : tasa >= 150 ? TK.success : tasa >= 50 ? COLOR : TK.warning;
  const benchmarks = ["< $50/hr · Bajo mercado", "$50–$150/hr · Competitivo", "$150–$300/hr · Alto valor", "> $300/hr · Excepcional"];
  const insight = ingreso > 0
    ? `Tu tasa horaria efectiva es USD ${fmt(tasa, 1)}/hr — ${benchmarks[diagIndex].split(" · ")[1].toLowerCase()}. ${diagIndex <= 1 ? `Para alcanzar la referencia del libro ($300/hr), necesitas generar USD ${fmt(300 * horas)} con las mismas ${horas}h invertidas.` : "Estás operando en el rango de alto valor del libro."}`
    : "Ingresa el ingreso del proyecto y las horas reales para calcular tu tasa efectiva.";
  return (
    <CalcCard
      title="Tasa Horaria Efectiva"
      description="Cuánto vale realmente cada hora invertida en tu negocio. Incluye toda actividad: prospección, reuniones, entrega y administración."
      mision="Herramienta 04"
      color={COLOR}
      left={
        <>
          <BookNote quote="Incluye en las horas: prospección, reuniones, entrega, revisiones y administración." reference="Referencia del libro — Gabriel: $4,500 ÷ 15 hrs = $300/hr" />
          <NumInput label="Ingreso total del proyecto (USD)" value={d.ingresoProyecto} onChange={(v) => s("ingresoProyecto", v)} prefix="$" />
          <NumInput label="Horas reales invertidas" value={d.horasReales} onChange={(v) => s("horasReales", v)} suffix="horas" />
        </>
      }
      right={
        <>
          <DiagRow items={[
            { range: "< $50/hr", label: "Bajo mercado LATAM" },
            { range: "$50–$150/hr", label: "Competitivo" },
            { range: "$150–$300/hr", label: "Alto valor" },
            { range: "> $300/hr", label: "Excepcional" },
          ]} activeIndex={diagIndex} />
          <ResultBox color={tasaColor} items={[
            { label: "Tasa horaria efectiva", value: `$${fmt(tasa, 1)}/hr`, highlight: true },
            { label: "Benchmark", value: benchmarks[diagIndex].split(" · ")[1] },
          ]} insight={insight} />
        </>
      }
    />
  );
}

/* ── Phase 1 ── */
export default function Phase1() {
  const { data, set, saved, save } = usePhaseData<Phase1Data>("phase1", DEFAULTS);
  const { user } = useAuth();
  return (
    <section id="fase-01" style={{ marginBottom: 80 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28, paddingBottom: 18, borderBottom: `1.5px solid ${TK.border}` }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${COLOR}18`, border: `1.5px solid ${COLOR}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 900, color: COLOR, fontFamily: TK.fontHeading }}>01</span>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: COLOR, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: TK.fontBadge, marginBottom: 3 }}>Fase 01 · Infiltración — Herramientas 01–04</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: TK.text, fontFamily: TK.fontHeading, letterSpacing: "-0.02em", margin: 0 }}>Diagnostica tu posición antes de hacer cualquier movimiento</h2>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <RunwayLibertad d={data} s={set} />
        <ValorMercadoReal d={data} s={set} />
        <CapitalExtraccion d={data} s={set} />
        <TasaHorariaEfectiva d={data} s={set} />
      </div>
      <PhaseActions saved={saved} onSave={save} onReport={() => user && downloadPhase1Report(data, user)} />
    </section>
  );
}
