"use client";
import { CalcCard, NumInput, SelectInput, ResultBox, BookNote, DiagRow } from "./CalcCard";
import { TK } from "./theme";
import { usePhaseData } from "./usePhaseData";
import { downloadPhase3Report } from "./phaseReports";
import { useAuth } from "./AuthContext";
import PhaseActions from "./PhaseActions";

const COLOR = TK.phase3;

export interface Phase3Data {
  // #08 TAM Suficiencia
  objetivo: string; precioCliente: string; conversion: string;
  // #09 Ecuación del Valor Percibido
  beneficio: string; precioOferta: string; certidumbre: string;
}

const DEFAULTS: Phase3Data = {
  objetivo: "0", precioCliente: "0", conversion: "15",
  beneficio: "0", precioOferta: "0", certidumbre: "7",
};

function fmt(n: number, decimals = 0) {
  return n.toLocaleString("es-PE", { maximumFractionDigits: decimals });
}
function fmtK(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${fmt(n)}`;
}

/* ── #08 TAM (Calculadora de Suficiencia) ── */
function TAMSuficiencia({ d, s }: { d: Phase3Data; s: (k: keyof Phase3Data, v: string) => void }) {
  const objetivo = parseFloat(d.objetivo) || 0;
  const precio = Math.max(1, parseFloat(d.precioCliente) || 1);
  const convPct = Math.max(0.1, Math.min(100, parseFloat(d.conversion) || 15));
  const objetivoRes = objetivo * 1.5;
  const clientesNec = objetivoRes / precio;
  const prospectos = clientesNec / (convPct / 100);
  const tamMin = prospectos * 4;
  const convIndex = convPct >= 25 ? 3 : convPct >= 15 ? 2 : convPct >= 8 ? 1 : 0;
  const insight = objetivo > 0
    ? `Para un objetivo de USD ${fmtK(objetivo)}/año (con reserva: ${fmtK(objetivoRes)}), necesitas ${fmt(Math.ceil(clientesNec))} clientes a USD ${fmt(precio)}/cliente. Con una tasa de conversión del ${convPct}%, eso requiere alcanzar a ${fmt(Math.ceil(prospectos))} prospectos. Tu TAM mínimo requerido es ${fmtK(tamMin)}.`
    : "Ingresa tu objetivo anual y precio por cliente para calcular el TAM mínimo requerido.";
  return (
    <CalcCard
      title="TAM — Calculadora de Suficiencia"
      description="El mercado no tiene que ser enorme. Solo tiene que ser suficientemente grande para tu objetivo."
      mision="Herramienta 08"
      color={COLOR}
      left={
        <>
          <BookNote quote="El mercado no tiene que ser enorme. Solo tiene que ser suficientemente grande." reference="TAM mínimo = Prospectos requeridos × 4 · Test: ¿Tu TAM real ≥ TAM mínimo?" />
          <NumInput label="Objetivo anual de ingresos (USD)" value={d.objetivo} onChange={(v) => s("objetivo", v)} prefix="$" />
          <NumInput label="Precio por cliente / año (USD)" value={d.precioCliente} onChange={(v) => s("precioCliente", v)} prefix="$" />
          <SelectInput label="Tasa de conversión del canal" value={d.conversion} onChange={(v) => s("conversion", v)} options={[
            { value: "3", label: "3–5% — Canal frío" },
            { value: "8", label: "8% — B2B típico" },
            { value: "15", label: "15% — Red de contactos" },
            { value: "25", label: "25%+ — Referidos activos" },
          ]} />
        </>
      }
      right={
        <>
          <DiagRow items={[
            { range: "3–5%", label: "Canal frío" },
            { range: "8%", label: "B2B típico" },
            { range: "15%", label: "Red de contactos" },
            { range: "25%+", label: "Referidos activos" },
          ]} activeIndex={convIndex} />
          <ResultBox color={COLOR} items={[
            { label: "Objetivo con reserva (1.5×)", value: fmtK(objetivoRes) },
            { label: "Clientes necesarios", value: `${fmt(Math.ceil(clientesNec))} clientes` },
            { label: "Prospectos requeridos", value: `${fmt(Math.ceil(prospectos))} prospectos` },
            { label: "TAM mínimo requerido", value: fmtK(tamMin), highlight: true },
          ]} insight={insight} />
        </>
      }
    />
  );
}

/* ── #09 Ecuación del Valor Percibido ── */
function ValorPercibido({ d, s }: { d: Phase3Data; s: (k: keyof Phase3Data, v: string) => void }) {
  const beneficio = parseFloat(d.beneficio) || 0;
  const precio = parseFloat(d.precioOferta) || 0;
  const cert = Math.min(10, Math.max(1, parseFloat(d.certidumbre) || 1));
  const V = (beneficio - precio) * (cert / 10);
  const ratio = precio > 0 ? beneficio / precio : 0;
  const precioMax10x = beneficio / 10;
  const diagIndex = ratio >= 10 ? 0 : ratio >= 5 ? 1 : ratio > 0 ? 2 : -1;
  const vColor = ratio >= 10 ? TK.success : ratio >= 5 ? COLOR : ratio > 0 ? TK.warning : TK.textMuted;
  const insight = beneficio > 0 && precio > 0
    ? ratio >= 10
      ? `Ratio ${fmt(ratio, 1)}× — la discusión de precio queda eliminada ✓. El cliente percibe USD ${fmt(V)} de valor neto. Para mantener el 10×, tu precio puede llegar hasta USD ${fmt(precioMax10x)}.`
      : ratio >= 5
      ? `Ratio ${fmt(ratio, 1)}× — zona aceptable. Para llegar a 10×, aumenta el beneficio cuantificado o baja el precio a USD ${fmt(precioMax10x)}.`
      : `Ratio ${fmt(ratio, 1)}× — reencuadra el beneficio o revisa el precio. Tu propuesta debe demostrar un beneficio de al menos USD ${fmt(precio * 10)} para justificar el precio actual.`
    : "Ingresa el beneficio cuantificado y el precio de tu oferta para calcular el valor percibido.";
  return (
    <CalcCard
      title="V — Ecuación del Valor Percibido"
      description="Tu precio nunca debería negociarse si el beneficio es 10× mayor. Esta fórmula lo demuestra matemáticamente."
      mision="Herramienta 09"
      color={COLOR}
      left={
        <>
          <BookNote quote="Tu precio nunca debería negociarse si el beneficio es 10× mayor." reference="V = (Beneficio − Precio) × (Certidumbre ÷ 10) · Precio máx 10× = Beneficio ÷ 10" />
          <NumInput label="Beneficio cuantificado para el cliente (USD)" value={d.beneficio} onChange={(v) => s("beneficio", v)} prefix="$" />
          <NumInput label="Precio de tu oferta (USD)" value={d.precioOferta} onChange={(v) => s("precioOferta", v)} prefix="$" />
          <NumInput label="Certidumbre del beneficio (1–10)" value={d.certidumbre} onChange={(v) => s("certidumbre", v)} min={1} max={10} step={1} suffix="/ 10" />
        </>
      }
      right={
        <>
          {ratio > 0 && (
            <DiagRow items={[
              { range: "≥ 10×", label: "Discusión de precio eliminada ✓" },
              { range: "5–9×", label: "Zona aceptable, no óptima" },
              { range: "< 5×", label: "Reencuadra beneficio o baja el precio" },
            ]} activeIndex={diagIndex} />
          )}
          <ResultBox color={vColor} items={[
            { label: "Valor percibido (V)", value: `$${fmt(V)}`, highlight: true },
            { label: "Ratio B/P", value: ratio > 0 ? `${fmt(ratio, 1)}×` : "—" },
            { label: "Precio máx. para regla 10×", value: precioMax10x > 0 ? `$${fmt(precioMax10x)}` : "—" },
          ]} insight={insight} />
        </>
      }
    />
  );
}

/* ── Phase 3 ── */
export default function Phase3() {
  const { data, set, saved, save } = usePhaseData<Phase3Data>("phase3", DEFAULTS);
  const { user } = useAuth();
  return (
    <section id="fase-03" style={{ marginBottom: 80 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28, paddingBottom: 18, borderBottom: `1.5px solid ${TK.border}` }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${COLOR}18`, border: `1.5px solid ${COLOR}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 900, color: COLOR, fontFamily: TK.fontHeading }}>03</span>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: COLOR, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: TK.fontBadge, marginBottom: 3 }}>Fase 03 · Mercado — Herramientas 08–09</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: TK.text, fontFamily: TK.fontHeading, letterSpacing: "-0.02em", margin: 0 }}>Valida que el mercado existe y que tu precio es matemáticamente irresistible</h2>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <TAMSuficiencia d={data} s={set} />
        <ValorPercibido d={data} s={set} />
      </div>
      <PhaseActions saved={saved} onSave={save} onReport={() => user && downloadPhase3Report(data, user)} />
    </section>
  );
}
