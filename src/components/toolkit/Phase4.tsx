"use client";
import { CalcCard, NumInput, ResultBox, BookNote, DiagRow } from "./CalcCard";
import { TK } from "./theme";
import { usePhaseData } from "./usePhaseData";
import { downloadPhase4Report } from "./phaseReports";
import { useAuth } from "./AuthContext";
import PhaseActions from "./PhaseActions";

const COLOR = TK.phase4;

export interface Phase4Data {
  // #10 CAC / LTV
  gastoMarketing: string; clientesAdq: string; tarifaMensual: string; mesesRetencion: string; margenNeto: string;
  // #11 N — Clientes para la Libertad
  cme: string; margenCliente: string;
  // #12 MRR
  clientesActivos: string; tarifaMRR: string; crecimientoMRR: string; churnMRR: string;
}

const DEFAULTS: Phase4Data = {
  gastoMarketing: "0", clientesAdq: "1", tarifaMensual: "0", mesesRetencion: "12", margenNeto: "70",
  cme: "0", margenCliente: "0",
  clientesActivos: "0", tarifaMRR: "0", crecimientoMRR: "10", churnMRR: "3",
};

function fmt(n: number, decimals = 0) {
  return n.toLocaleString("es-PE", { maximumFractionDigits: decimals });
}

/* ── #10 CAC / LTV ── */
function CACLTV({ d, s }: { d: Phase4Data; s: (k: keyof Phase4Data, v: string) => void }) {
  const gasto = parseFloat(d.gastoMarketing) || 0;
  const clientes = Math.max(1, parseFloat(d.clientesAdq) || 1);
  const tarifa = parseFloat(d.tarifaMensual) || 0;
  const meses = parseFloat(d.mesesRetencion) || 0;
  const margen = Math.min(100, parseFloat(d.margenNeto) || 0);
  const cac = gasto / clientes;
  const ltv = tarifa * meses * (margen / 100);
  const ratio = cac > 0 ? ltv / cac : gasto === 0 ? Infinity : 0;
  const ratioDisplay = !isFinite(ratio) ? "∞" : fmt(ratio, 1) + "×";
  const diagIndex = !isFinite(ratio) ? 5 : ratio > 10 ? 4 : ratio >= 5 ? 3 : ratio >= 3 ? 2 : ratio >= 1 ? 1 : 0;
  const ratioColor = !isFinite(ratio) || ratio > 10 ? TK.success : ratio >= 3 ? TK.success : ratio >= 1 ? COLOR : TK.danger;
  const diagLabel = ["Negocio insostenible", "Por debajo del mínimo viable", "Mínimo viable", "Saludable", "Óptimo", "Modelo óptimo — CAC = 0 ✓"];
  const insight = tarifa > 0
    ? !isFinite(ratio)
      ? "CAC = 0: adquieres clientes por tu red sin inversión en marketing — este es el modelo óptimo del Doble Agente. Ratio = ∞"
      : ratio >= 3
      ? `Ratio LTV/CAC de ${fmt(ratio, 1)}× — modelo sostenible. Por cada USD ${fmt(cac)} invertido en adquirir un cliente, recuperas USD ${fmt(ltv)}.`
      : ratio >= 1
      ? `Ratio de ${fmt(ratio, 1)}× — viable pero ajustado. Meta mínima: 3×. Considera reducir el CAC con referidos o aumentar el LTV extendiendo la retención.`
      : `Ratio menor a 1× — modelo insostenible. Revisa la estructura antes de escalar.`
    : "Ingresa tarifa mensual y datos de adquisición para calcular la salud del modelo.";
  return (
    <CalcCard
      title="CAC / LTV — Salud del Negocio"
      description="El ratio que determina si tu modelo tiene futuro. Si adquieres por referidos, CAC = 0 → Ratio = ∞ (modelo óptimo)."
      mision="Herramienta 10"
      color={COLOR}
      left={
        <>
          <BookNote quote="Si adquieres clientes por tu red de contactos → CAC = 0 → Ratio = ∞ (modelo óptimo del Doble Agente)." reference="LTV = Tarifa × Meses × Margen neto · Ratio saludable: ≥ 3×" />
          <NumInput label="Gasto total en marketing y ventas (USD)" value={d.gastoMarketing} onChange={(v) => s("gastoMarketing", v)} prefix="$" />
          <NumInput label="Clientes adquiridos en ese período" value={d.clientesAdq} onChange={(v) => s("clientesAdq", v)} suffix="clientes" min={1} />
          <NumInput label="Tarifa mensual por cliente (USD)" value={d.tarifaMensual} onChange={(v) => s("tarifaMensual", v)} prefix="$" />
          <NumInput label="Meses de retención promedio" value={d.mesesRetencion} onChange={(v) => s("mesesRetencion", v)} suffix="meses" />
          <NumInput label="Margen neto (%)" value={d.margenNeto} onChange={(v) => s("margenNeto", v)} min={0} max={100} suffix="%" />
        </>
      }
      right={
        <>
          <DiagRow items={[
            { range: "< 1×", label: "Negocio insostenible" },
            { range: "1–3×", label: "Por debajo del mínimo viable" },
            { range: "3–5×", label: "Mínimo viable" },
            { range: "5–10×", label: "Saludable" },
            { range: "> 10×", label: "Óptimo" },
            { range: "∞ (CAC=0)", label: "Modelo óptimo del Doble Agente ✓" },
          ]} activeIndex={diagIndex} />
          <ResultBox color={ratioColor} items={[
            { label: "CAC", value: cac > 0 ? `$${fmt(cac)}` : "CAC = 0 ✓" },
            { label: "LTV", value: `$${fmt(ltv)}` },
            { label: "Ratio LTV/CAC", value: ratioDisplay, highlight: true },
            { label: "Estado", value: diagLabel[diagIndex] },
          ]} insight={insight} />
        </>
      }
    />
  );
}

/* ── #11 N — Clientes para la Libertad ── */
function NClientes({ d, s }: { d: Phase4Data; s: (k: keyof Phase4Data, v: string) => void }) {
  const cme = parseFloat(d.cme) || 0;
  const margen = parseFloat(d.margenCliente) || 0;
  const n = margen > 0 ? cme / margen : 0;
  const nColor = n > 0 && n <= 20 ? TK.success : n > 20 ? TK.warning : TK.textMuted;
  const insight = cme > 0 && margen > 0
    ? n <= 20
      ? `Necesitas ${fmt(n, 1)} clientes para igualar tu CME. El cliente #${Math.ceil(n) + 1} es el punto de inflexión: a partir de ahí, quedarse en la oficina es pérdida verificable de dinero.`
      : `Necesitas ${fmt(n, 1)} clientes — por encima de 20, el libro recomienda revisar el precio o el margen antes de escalar. Doblar el margen reduciría n a ${fmt(n / 2, 1)} clientes.`
    : "Ingresa tu CME y el margen neto por cliente para calcular tu número de libertad.";
  return (
    <CalcCard
      title="N — Clientes para la Libertad"
      description="El número exacto de clientes que convierte la renuncia en una decisión lógica, no emocional."
      mision="Herramienta 11"
      color={COLOR}
      left={
        <>
          <BookNote quote="El cliente #(n+1) es el punto de inflexión: a partir de ahí, quedarse en la oficina es pérdida verificable de dinero." reference="n = CME ÷ Margen neto por cliente · Alerta: si n > 20 → revisar precio" />
          <NumInput label="CME — Costo Mensual de Existencia (USD)" value={d.cme} onChange={(v) => s("cme", v)} prefix="$" />
          <NumInput label="Margen neto mensual por cliente (USD)" value={d.margenCliente} onChange={(v) => s("margenCliente", v)} prefix="$" />
        </>
      }
      right={
        <>
          {n > 20 && (
            <div style={{ padding: "8px 12px", background: `${TK.warning}10`, border: `1px solid ${TK.warning}30`, borderRadius: 8, fontSize: 11.5, color: TK.warning, fontWeight: 600, fontFamily: TK.font, marginBottom: 8 }}>
              ⚠ n &gt; 20 — Revisar precio o margen antes de escalar
            </div>
          )}
          <ResultBox color={nColor} items={[
            { label: "Clientes para la libertad (n)", value: n > 0 ? fmt(n, 1) : "—", highlight: true },
            { label: "Punto de inflexión", value: n > 0 ? `Cliente #${Math.ceil(n) + 1}` : "—" },
            { label: "Ingreso en punto de inflexión", value: n > 0 ? `$${fmt((Math.ceil(n) + 1) * margen)}/mes` : "—" },
          ]} insight={insight} />
        </>
      }
    />
  );
}

/* ── #12 MRR — Proyección de Ingresos Recurrentes ── */
function MRRProyeccion({ d, s }: { d: Phase4Data; s: (k: keyof Phase4Data, v: string) => void }) {
  const clientes = parseFloat(d.clientesActivos) || 0;
  const tarifa = parseFloat(d.tarifaMRR) || 0;
  const crec = parseFloat(d.crecimientoMRR) || 0;
  const churn = parseFloat(d.churnMRR) || 0;
  const mrr = clientes * tarifa;
  const arr = mrr * 12;
  const crecNeto = crec - churn;
  const mrr12 = mrr * Math.pow(1 + crecNeto / 100, 12);
  const contraccion = crecNeto < 0;
  const mrrColor = contraccion ? TK.danger : crecNeto > 0 ? TK.success : COLOR;
  // Mini bar chart data for 12 months
  const meses = Array.from({ length: 12 }, (_, i) => mrr * Math.pow(1 + crecNeto / 100, i));
  const maxMrr = Math.max(...meses);
  const insight = mrr > 0
    ? contraccion
      ? `⚠ Churn (${churn}%) > Crecimiento (${crec}%) — el negocio está en contracción neta. Prioriza retención antes que adquisición. El MRR caerá a USD ${fmt(mrr12)} en 12 meses si no se corrige.`
      : `Con ${fmt(clientes)} clientes activos a USD ${fmt(tarifa)}/mes, tu MRR es USD ${fmt(mrr)}. Con un crecimiento neto del ${fmt(crecNeto, 1)}%/mes, llegarás a USD ${fmt(mrr12)}/mes en 12 meses (ARR: USD ${fmt(mrr12 * 12)}).`
    : "Ingresa clientes activos y tarifa mensual para calcular tu MRR.";
  return (
    <CalcCard
      title="MRR — Proyección de Ingresos Recurrentes"
      description="La métrica reina. Convierte el futuro incierto en certeza matemática."
      mision="Herramienta 12"
      color={COLOR}
      left={
        <>
          <BookNote quote="La métrica reina. Convierte el futuro incierto en certeza matemática." reference="Señal crítica: Si churn > crecimiento → contracción neta. Prioriza retención." />
          <NumInput label="Clientes activos actuales" value={d.clientesActivos} onChange={(v) => s("clientesActivos", v)} suffix="clientes" />
          <NumInput label="Tarifa mensual promedio (USD)" value={d.tarifaMRR} onChange={(v) => s("tarifaMRR", v)} prefix="$" />
          <NumInput label="Tasa de crecimiento mensual (%)" value={d.crecimientoMRR} onChange={(v) => s("crecimientoMRR", v)} suffix="%" min={0} />
          <NumInput label="Churn mensual (%)" value={d.churnMRR} onChange={(v) => s("churnMRR", v)} suffix="%" min={0} />
        </>
      }
      right={
        <>
          {contraccion && (
            <div style={{ padding: "8px 12px", background: `${TK.danger}10`, border: `1px solid ${TK.danger}30`, borderRadius: 8, fontSize: 11.5, color: TK.danger, fontWeight: 600, fontFamily: TK.font, marginBottom: 8 }}>
              ⚠ Churn &gt; Crecimiento — contracción neta
            </div>
          )}
          {mrr > 0 && (
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: TK.textMuted, letterSpacing: "0.07em", textTransform: "uppercase", fontFamily: TK.fontBadge, marginBottom: 5 }}>Proyección 12 meses</div>
              <div style={{ display: "flex", gap: 2, alignItems: "flex-end", height: 44 }}>
                {meses.map((v, i) => (
                  <div key={i} title={`Mes ${i + 1}: $${fmt(v)}`} style={{ flex: 1, height: `${maxMrr > 0 ? (v / maxMrr) * 38 + 4 : 4}px`, background: contraccion ? TK.danger : COLOR, borderRadius: "2px 2px 0 0", opacity: 0.6 + (i / 12) * 0.4 }} />
                ))}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: TK.textMuted, fontFamily: TK.fontBadge, marginTop: 2 }}>
                <span>Hoy</span><span>Mes 6</span><span>Mes 12</span>
              </div>
            </div>
          )}
          <ResultBox color={mrrColor} items={[
            { label: "MRR actual", value: `$${fmt(mrr)}`, highlight: true },
            { label: "ARR", value: `$${fmt(arr)}` },
            { label: "Crecimiento neto / mes", value: `${crecNeto > 0 ? "+" : ""}${fmt(crecNeto, 1)}%` },
            { label: "MRR proyectado mes 12", value: `$${fmt(mrr12)}` },
          ]} insight={insight} />
        </>
      }
    />
  );
}

/* ── Phase 4 ── */
export default function Phase4() {
  const { data, set, saved, save } = usePhaseData<Phase4Data>("phase4", DEFAULTS);
  const { user } = useAuth();
  return (
    <section id="fase-04" style={{ marginBottom: 80 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28, paddingBottom: 18, borderBottom: `1.5px solid ${TK.border}` }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${COLOR}18`, border: `1.5px solid ${COLOR}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 900, color: COLOR, fontFamily: TK.fontHeading }}>04</span>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: COLOR, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: TK.fontBadge, marginBottom: 3 }}>Fase 04 · Unidad Económica — Herramientas 10–12</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: TK.text, fontFamily: TK.fontHeading, letterSpacing: "-0.02em", margin: 0 }}>Los tres ratios que determinan si tu negocio tiene futuro real</h2>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <CACLTV d={data} s={set} />
        <NClientes d={data} s={set} />
        <MRRProyeccion d={data} s={set} />
      </div>
      <PhaseActions saved={saved} onSave={save} onReport={() => user && downloadPhase4Report(data, user)} />
    </section>
  );
}
