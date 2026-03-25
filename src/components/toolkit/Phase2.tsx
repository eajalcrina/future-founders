"use client";
import { CalcCard, NumInput, SelectInput, ResultBox, BookNote, DiagRow } from "./CalcCard";
import { TK } from "./theme";
import { usePhaseData } from "./usePhaseData";
import { downloadPhase2Report } from "./phaseReports";
import { useAuth } from "./AuthContext";
import PhaseActions from "./PhaseActions";

const COLOR = TK.phase2;

export interface Phase2Data {
  // #05 COI
  perdidaMensual: string; mesesProblema: string; precioSolucion: string;
  // #06 Daño por Proceso
  personas: string; horasPerdidas: string; salarioHora: string; tasaError: string; valorDecision: string;
  // #07 Daño por Talento
  salarioAnual: string; multiplicador: string;
}

const DEFAULTS: Phase2Data = {
  perdidaMensual: "0", mesesProblema: "6", precioSolucion: "0",
  personas: "5", horasPerdidas: "8", salarioHora: "25", tasaError: "5", valorDecision: "10000",
  salarioAnual: "0", multiplicador: "1.5",
};

function fmt(n: number, decimals = 0) {
  return n.toLocaleString("es-PE", { maximumFractionDigits: decimals });
}

/* ── #05 COI (Costo de Inacción) ── */
function COI({ d, s }: { d: Phase2Data; s: (k: keyof Phase2Data, v: string) => void }) {
  const perdida = parseFloat(d.perdidaMensual) || 0;
  const meses = Math.max(1, parseFloat(d.mesesProblema) || 1);
  const precio = parseFloat(d.precioSolucion) || 0;
  const coi = perdida * meses;
  const payback = perdida > 0 ? precio / perdida : 0;
  const roi = precio > 0 ? coi / precio : 0;
  const beneficioNeto = coi - precio;
  const diagIndex = roi >= 10 ? 0 : roi >= 3 ? 1 : roi > 0 ? 2 : -1;
  const roiColor = roi >= 10 ? TK.success : roi >= 3 ? COLOR : roi > 0 ? TK.warning : TK.textMuted;
  const insight = perdida > 0 && precio > 0
    ? roi >= 10
      ? `ROI de ${fmt(roi, 1)}× — la regla 10× está cumplida. La discusión de precio queda eliminada: el cliente recupera tu precio en ${fmt(payback, 1)} meses. Precio máximo para mantener 10×: USD ${fmt(coi / 10)}.`
      : roi >= 3
      ? `ROI de ${fmt(roi, 1)}× — zona aceptable. Para llegar a 10×, baja el precio a USD ${fmt(coi / 10)} o aumenta el beneficio cuantificado.`
      : `ROI de ${fmt(roi, 1)}× — por debajo del mínimo. Reencuadra el beneficio o revisa el precio. El COI de USD ${fmt(coi)} debe verse claramente mayor que el precio.`
    : "Ingresa la pérdida mensual del cliente y el precio de tu solución para calcular el ROI.";
  return (
    <CalcCard
      title="COI — Costo de Inacción"
      description="No vendas tu solución. Vende el costo de no tenerla. Cuantifica lo que le cuesta al cliente no actuar."
      mision="Herramienta 05"
      color={COLOR}
      left={
        <>
          <BookNote quote="No vendas tu solución. Vende el costo de no tenerla." reference="COI = Pérdida mensual × Tiempo con el problema · Precio máx 10× = COI ÷ 10" />
          <NumInput label="Pérdida mensual del cliente (USD)" value={d.perdidaMensual} onChange={(v) => s("perdidaMensual", v)} prefix="$" />
          <NumInput label="Tiempo con el problema (meses)" value={d.mesesProblema} onChange={(v) => s("mesesProblema", v)} suffix="meses" />
          <NumInput label="Precio de tu solución (USD)" value={d.precioSolucion} onChange={(v) => s("precioSolucion", v)} prefix="$" />
        </>
      }
      right={
        <>
          {roi > 0 && (
            <DiagRow items={[
              { range: "≥ 10×", label: "Regla 10× cumplida — decisión obvia ✓" },
              { range: "3–9×", label: "Zona aceptable, no óptima" },
              { range: "< 3×", label: "Reencuadrar beneficio o revisar precio" },
            ]} activeIndex={diagIndex} />
          )}
          <ResultBox color={roiColor} items={[
            { label: "COI total", value: `$${fmt(coi)}`, highlight: true },
            { label: "Payback del cliente", value: payback > 0 ? `${fmt(payback, 1)} meses` : "—" },
            { label: "ROI para el cliente", value: roi > 0 ? `${fmt(roi, 1)}×` : "—" },
            { label: "Beneficio neto", value: beneficioNeto > 0 ? `$${fmt(beneficioNeto)}` : "—" },
          ]} insight={insight} />
        </>
      }
    />
  );
}

/* ── #06 Daño por Ineficiencia de Proceso ── */
function DanoProceso({ d, s }: { d: Phase2Data; s: (k: keyof Phase2Data, v: string) => void }) {
  const personas = parseFloat(d.personas) || 0;
  const horas = parseFloat(d.horasPerdidas) || 0;
  const salario = parseFloat(d.salarioHora) || 0;
  const tasaError = Math.min(100, parseFloat(d.tasaError) || 0);
  const valorDec = parseFloat(d.valorDecision) || 0;
  const costoTiempo = personas * horas * salario;
  const costoErrores = (tasaError / 100) * valorDec;
  const danoMensual = costoTiempo + costoErrores;
  const danoAnual = danoMensual * 12;
  const insight = danoMensual > 0
    ? `El proceso ineficiente le cuesta al cliente USD ${fmt(danoMensual)}/mes — USD ${fmt(danoAnual)} al año. ${costoTiempo > costoErrores ? `El mayor daño viene del tiempo perdido (${fmt((costoTiempo / danoMensual) * 100, 0)}% del total).` : `El mayor daño viene de los errores de decisión (${fmt((costoErrores / danoMensual) * 100, 0)}% del total).`} Usa este número como el COI en tu propuesta.`
    : "Ingresa los parámetros del proceso para cuantificar el daño.";
  return (
    <CalcCard
      title="Daño por Ineficiencia de Proceso"
      description="Cuantifica el costo real de los procesos ineficientes. Tiempo perdido + decisiones afectadas por errores."
      mision="Herramienta 06"
      color={COLOR}
      left={
        <>
          <BookNote quote="Cuantifica el dolor interno antes de proponer la solución." reference="Daño total = Costo de tiempo perdido + Costo de errores" />
          <NumInput label="Personas afectadas por el proceso" value={d.personas} onChange={(v) => s("personas", v)} suffix="personas" />
          <NumInput label="Horas perdidas por persona / mes" value={d.horasPerdidas} onChange={(v) => s("horasPerdidas", v)} suffix="h/mes" />
          <NumInput label="Salario promedio / hora (USD)" value={d.salarioHora} onChange={(v) => s("salarioHora", v)} prefix="$" />
          <NumInput label="Tasa de error en decisiones (%)" value={d.tasaError} onChange={(v) => s("tasaError", v)} min={0} max={100} suffix="%" />
          <NumInput label="Valor promedio de cada decisión (USD)" value={d.valorDecision} onChange={(v) => s("valorDecision", v)} prefix="$" />
        </>
      }
      right={
        <ResultBox color={COLOR} items={[
          { label: "Costo de tiempo perdido/mes", value: `$${fmt(costoTiempo)}` },
          { label: "Costo de errores/mes", value: `$${fmt(costoErrores)}` },
          { label: "Daño total mensual", value: `$${fmt(danoMensual)}`, highlight: true },
          { label: "Daño anual", value: `$${fmt(danoAnual)}` },
        ]} insight={insight} />
      }
    />
  );
}

/* ── #07 Daño por Fuga de Talento ── */
function DanoTalento({ d, s }: { d: Phase2Data; s: (k: keyof Phase2Data, v: string) => void }) {
  const salario = parseFloat(d.salarioAnual) || 0;
  const mult = parseFloat(d.multiplicador) || 1;
  const reclutamiento = salario * 0.30;
  const rampa = (salario / 12) * 6;
  const conocimientoPerdido = salario * mult;
  const costoTotal = reclutamiento + rampa + conocimientoPerdido;
  const multIndex = mult >= 4 ? 4 : mult >= 2.5 ? 3 : mult >= 1.5 ? 2 : mult >= 1 ? 1 : 0;
  const insight = salario > 0
    ? `Reemplazar a este profesional le costaría al cliente USD ${fmt(costoTotal)}. Esto equivale a ${fmt(costoTotal / (salario / 12), 1)} meses de salario. ${mult >= 2.5 ? "Conocimiento crítico — el argumento de retención o de venta es muy fuerte." : "Usa este número para justificar el valor de tu solución de talento o como argumento de negociación."}`
    : "Ingresa el salario anual para calcular el costo de reemplazo.";
  return (
    <CalcCard
      title="Daño por Fuga de Talento"
      description="El costo real de perder a un top performer. Dos usos: argumento de retención + argumento de venta."
      mision="Herramienta 07"
      color={COLOR}
      left={
        <>
          <BookNote quote="Dos usos: argumento de retención (negocia antes de salir) + argumento de venta (si tu propuesta incluye retener talento)." reference="Costo = Reclutamiento (30%) + Rampa (6m) + Conocimiento perdido" />
          <NumInput label="Salario anual del profesional (USD)" value={d.salarioAnual} onChange={(v) => s("salarioAnual", v)} prefix="$" />
          <SelectInput label="Multiplicador de conocimiento" value={d.multiplicador} onChange={(v) => s("multiplicador", v)} options={[
            { value: "0.5", label: "0.5× — Reemplazable fácilmente" },
            { value: "1.0", label: "1.0× — Reemplazable con esfuerzo" },
            { value: "1.5", label: "1.5× — Conocimiento moderado" },
            { value: "2.5", label: "2.5× — Conocimiento crítico" },
            { value: "4.0", label: "4.0× — Conocimiento único" },
          ]} />
        </>
      }
      right={
        <>
          <DiagRow items={[
            { range: "0.5×", label: "Reemplazable fácilmente" },
            { range: "1.0×", label: "Reemplazable con esfuerzo" },
            { range: "1.5×", label: "Conocimiento moderado" },
            { range: "2.5×", label: "Conocimiento crítico" },
            { range: "4.0×", label: "Conocimiento único" },
          ]} activeIndex={multIndex} />
          <ResultBox color={COLOR} items={[
            { label: "Costo de reclutamiento", value: `$${fmt(reclutamiento)}` },
            { label: "Costo de rampa (6m)", value: `$${fmt(rampa)}` },
            { label: "Conocimiento perdido", value: `$${fmt(conocimientoPerdido)}` },
            { label: "Costo total de reemplazo", value: `$${fmt(costoTotal)}`, highlight: true },
          ]} insight={insight} />
        </>
      }
    />
  );
}

/* ── Phase 2 ── */
export default function Phase2() {
  const { data, set, saved, save } = usePhaseData<Phase2Data>("phase2", DEFAULTS);
  const { user } = useAuth();
  return (
    <section id="fase-02" style={{ marginBottom: 80 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28, paddingBottom: 18, borderBottom: `1.5px solid ${TK.border}` }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${COLOR}18`, border: `1.5px solid ${COLOR}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 900, color: COLOR, fontFamily: TK.fontHeading }}>02</span>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: COLOR, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: TK.fontBadge, marginBottom: 3 }}>Fase 02 · Misión Corporativa — Herramientas 05–07</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: TK.text, fontFamily: TK.fontHeading, letterSpacing: "-0.02em", margin: 0 }}>Cuantifica el dolor interno antes de proponer la solución</h2>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <COI d={data} s={set} />
        <DanoProceso d={data} s={set} />
        <DanoTalento d={data} s={set} />
      </div>
      <PhaseActions saved={saved} onSave={save} onReport={() => user && downloadPhase2Report(data, user)} />
    </section>
  );
}
