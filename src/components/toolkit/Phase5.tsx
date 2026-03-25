"use client";
import { CalcCard, NumInput, ResultBox, BookNote, DiagRow } from "./CalcCard";
import { TK } from "./theme";
import { usePhaseData } from "./usePhaseData";
import { downloadPhase5Report } from "./phaseReports";
import { useAuth } from "./AuthContext";
import PhaseActions from "./PhaseActions";

const COLOR = TK.phase5;

export interface Phase5Data {
  // #13 CME
  salarioN: string; beneficios: string; reserva: string;
  // #14 Runway de Salida
  capitalLiquido: string; cmeRef: string;
  // #15 Punto de No Retorno
  mrr: string; cmePNR: string; capitalBanco: string; horasSem: string; valorHoraPNR: string;
}

const DEFAULTS: Phase5Data = {
  salarioN: "0", beneficios: "0", reserva: "20",
  capitalLiquido: "0", cmeRef: "0",
  mrr: "0", cmePNR: "0", capitalBanco: "0", horasSem: "40", valorHoraPNR: "0",
};

function fmt(n: number, decimals = 0) {
  return n.toLocaleString("es-PE", { maximumFractionDigits: decimals });
}

/* ── #13 CME — Costo Mensual de Existencia ── */
function CME({ d, s }: { d: Phase5Data; s: (k: keyof Phase5Data, v: string) => void }) {
  const salario = parseFloat(d.salarioN) || 0;
  const beneficios = parseFloat(d.beneficios) || 0;
  const reserva = Math.min(100, parseFloat(d.reserva) || 20);
  const cmeBase = salario + beneficios;
  const cmeAjustado = cmeBase * (1 + reserva / 100);
  const escSupervivencia = cmeAjustado * 0.6;
  const escExtraccion = cmeAjustado * 1.0;
  const escIndependencia = cmeAjustado * 2.0;
  const insight = cmeBase > 0
    ? `Tu CME ajustado (con ${reserva}% de reserva) es USD ${fmt(cmeAjustado)}/mes. Este es el número que tu MRR debe superar para que la renuncia sea una decisión racional. Lleva este número a las herramientas #14 y #15.`
    : "Ingresa tu salario neto y el valor de tus beneficios para calcular tu CME.";
  return (
    <CalcCard
      title="CME — Costo Mensual de Existencia"
      description="La cifra real que tu negocio debe superar para que la renuncia sea racional. Llévala a las herramientas #14 y #15."
      mision="Herramienta 13"
      color={COLOR}
      left={
        <>
          <BookNote quote="La cifra real que tu negocio debe superar para que la renuncia sea racional." reference="CME ajustado = (Salario + Beneficios) × 1.20 (estándar del libro: 20% de reserva)" />
          <NumInput label="Salario neto mensual (USD)" value={d.salarioN} onChange={(v) => s("salarioN", v)} prefix="$" />
          <NumInput label="Valor de beneficios corporativos / mes (USD)" value={d.beneficios} onChange={(v) => s("beneficios", v)} prefix="$" />
          <NumInput label="Reserva de seguridad (%" value={d.reserva} onChange={(v) => s("reserva", v)} min={0} max={100} suffix="%" />
        </>
      }
      right={
        <>
          {cmeBase > 0 && (
            <div style={{ background: TK.surface2, border: `1px solid ${TK.border}`, borderRadius: 10, padding: "12px 14px", marginBottom: 12 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: TK.textMuted, letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: TK.fontBadge, marginBottom: 8 }}>Los 3 escenarios del libro</div>
              {[
                { label: "Supervivencia (CME × 0.6)", value: escSupervivencia, desc: "Cubre gastos básicos" },
                { label: "Extracción (CME × 1.0)", value: escExtraccion, desc: "= Compensación corporativa → ejecutar renuncia" },
                { label: "Independencia (CME × 2.0)", value: escIndependencia, desc: "Objetivo 12–18 meses post-renuncia" },
              ].map((esc) => (
                <div key={esc.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5, gap: 8 }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: TK.textSecondary, fontFamily: TK.fontBadge }}>{esc.label}</div>
                    <div style={{ fontSize: 10.5, color: TK.textMuted, fontFamily: TK.font }}>{esc.desc}</div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: TK.text, fontFamily: TK.fontHeading, whiteSpace: "nowrap" }}>${fmt(esc.value)}</div>
                </div>
              ))}
            </div>
          )}
          <ResultBox color={COLOR} items={[
            { label: "CME base", value: `$${fmt(cmeBase)}/mes` },
            { label: "CME ajustado (+${reserva}%)", value: `$${fmt(cmeAjustado)}/mes`, highlight: true },
          ]} insight={insight} />
        </>
      }
    />
  );
}

/* ── #14 Runway de Salida ── */
function RunwaySalida({ d, s }: { d: Phase5Data; s: (k: keyof Phase5Data, v: string) => void }) {
  const capital = parseFloat(d.capitalLiquido) || 0;
  const cme = Math.max(1, parseFloat(d.cmeRef) || 1);
  const runwayReq = cme * 6;
  const runwayActual = capital / cme;
  const gap = Math.max(0, runwayReq - capital);
  const listo = capital >= runwayReq;
  const runwayColor = listo ? TK.success : runwayActual >= 3 ? TK.warning : TK.danger;
  const insight = capital > 0
    ? listo
      ? `Runway de ${fmt(runwayActual, 1)} meses ✓ — superas el mínimo requerido de 6 meses. Tienes el colchón necesario para que la renuncia deje de ser un salto al vacío.`
      : `Runway actual: ${fmt(runwayActual, 1)} meses. Te faltan USD ${fmt(gap)} en banco para alcanzar el mínimo de 6 meses. A USD ${fmt(cme * 0.15)}/mes de extracción (15%), lo logras en ${fmt(gap / (cme * 0.15), 0)} meses.`
    : "Ingresa tu capital líquido y tu CME ajustado para calcular el runway de salida.";
  return (
    <CalcCard
      title="Runway de Salida"
      description="El colchón mínimo en banco para que la renuncia deje de ser un salto al vacío. Requiere el CME de la herramienta #13."
      mision="Herramienta 14"
      color={COLOR}
      left={
        <>
          <BookNote quote="El colchón mínimo en banco para que la renuncia deje de ser un salto al vacío." reference="Runway requerido = CME ajustado × 6 meses · ✓ Listo: Capital ≥ CME × 6" />
          <NumInput label="Capital líquido en banco (USD)" value={d.capitalLiquido} onChange={(v) => s("capitalLiquido", v)} prefix="$" />
          <NumInput label="CME ajustado (de herramienta #13, USD/mes)" value={d.cmeRef} onChange={(v) => s("cmeRef", v)} prefix="$" />
        </>
      }
      right={
        <>
          <DiagRow items={[
            { range: "✓ Listo", label: "Capital líquido ≥ CME ajustado × 6" },
            { range: "⚠ En progreso", label: "Capital líquido < CME ajustado × 6" },
          ]} activeIndex={listo ? 0 : 1} />
          <div style={{ marginTop: 10, marginBottom: 4 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 10, fontWeight: 700, color: TK.textSecondary, fontFamily: TK.fontBadge, letterSpacing: "0.07em", textTransform: "uppercase" }}>
              <span>Progreso hacia el runway mínimo</span>
              <span style={{ color: runwayColor }}>{Math.min(100, Math.round((capital / runwayReq) * 100))}%</span>
            </div>
            <div style={{ height: 8, background: TK.surface2, borderRadius: 4, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${Math.min(100, (capital / runwayReq) * 100)}%`, background: `linear-gradient(to right, ${runwayColor}99, ${runwayColor})`, borderRadius: 4, transition: "width 0.6s ease" }} />
            </div>
          </div>
          <ResultBox color={runwayColor} items={[
            { label: "Runway requerido", value: `$${fmt(runwayReq)} (6 meses)` },
            { label: "Runway actual", value: `${fmt(runwayActual, 1)} meses`, highlight: true },
            { label: "Estado", value: listo ? "✓ Listo" : "⚠ En progreso" },
            ...(gap > 0 ? [{ label: "Gap a cerrar", value: `$${fmt(gap)}` }] : []),
          ]} insight={insight} />
        </>
      }
    />
  );
}

/* ── #15 Punto de No Retorno (GO / NO GO) ── */
function PuntoNoRetorno({ d, s }: { d: Phase5Data; s: (k: keyof Phase5Data, v: string) => void }) {
  const mrr = parseFloat(d.mrr) || 0;
  const cme = parseFloat(d.cmePNR) || 0;
  const banco = parseFloat(d.capitalBanco) || 0;
  const horas = parseFloat(d.horasSem) || 0;
  const valorHora = parseFloat(d.valorHoraPNR) || 0;
  const cond1 = cme > 0 ? mrr >= cme : false;
  const cond2 = cme > 0 ? banco >= cme * 6 : false;
  const go = cond1 && cond2;
  const costoOps = horas * 4 * valorHora;
  const goColor = go ? TK.success : cond1 || cond2 ? TK.warning : TK.danger;
  const insight = cme > 0
    ? go
      ? `GO ✓ — Ambas condiciones son verdes. Cuando MRR ≥ CME Y banco ≥ CME × 6, quedarse en la oficina es pérdida verificable de dinero. ${costoOps > 0 ? `El costo de oportunidad mensual de seguir en el empleo es USD ${fmt(costoOps)}.` : ""}`
      : `NO GO — ${!cond1 ? `Faltan USD ${fmt(cme - mrr)}/mes de MRR (Condición 1).` : "Condición 1 ✓."} ${!cond2 ? `Faltan USD ${fmt(Math.max(0, cme * 6 - banco))} en banco (Condición 2).` : "Condición 2 ✓."}`
    : "Ingresa tu MRR, CME ajustado y capital en banco para calcular el GO/NO GO.";
  return (
    <CalcCard
      title="Punto de No Retorno — GO / NO GO"
      description="La fórmula definitiva. Cuando ambas condiciones son verdes, quedarse es pérdida verificable de dinero."
      mision="Herramienta 15"
      color={COLOR}
      left={
        <>
          <BookNote quote="Cuando ambas condiciones son verdes, quedarse es pérdida verificable de dinero." reference="GO = (MRR ≥ CME ajustado) AND (Banco ≥ CME × 6) · Costo ops = Horas × 4 × Valor hora" />
          <NumInput label="MRR actual (USD/mes)" value={d.mrr} onChange={(v) => s("mrr", v)} prefix="$" />
          <NumInput label="CME ajustado (de herramienta #13, USD/mes)" value={d.cmePNR} onChange={(v) => s("cmePNR", v)} prefix="$" />
          <NumInput label="Capital en banco (USD)" value={d.capitalBanco} onChange={(v) => s("capitalBanco", v)} prefix="$" />
          <NumInput label="Horas semanales en el empleo" value={d.horasSem} onChange={(v) => s("horasSem", v)} suffix="hrs/sem" />
          <NumInput label="Valor real de tu hora propia (USD)" value={d.valorHoraPNR} onChange={(v) => s("valorHoraPNR", v)} prefix="$" />
        </>
      }
      right={
        <>
          {cme > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
              {[
                { label: "Condición 1", desc: `MRR (${fmt(mrr > 0 ? mrr : 0)}) ≥ CME (${fmt(cme)})`, ok: cond1 },
                { label: "Condición 2", desc: `Banco (${fmt(banco > 0 ? banco : 0)}) ≥ CME × 6 (${fmt(cme * 6)})`, ok: cond2 },
              ].map((cond) => (
                <div key={cond.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 9, background: cond.ok ? `${TK.success}10` : `${TK.danger}08`, border: `1px solid ${cond.ok ? TK.success : TK.danger}25` }}>
                  <span style={{ fontSize: 14, lineHeight: 1 }}>{cond.ok ? "✓" : "✗"}</span>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: cond.ok ? TK.success : TK.danger, fontFamily: TK.fontBadge }}>{cond.label}</div>
                    <div style={{ fontSize: 11, color: TK.textSecondary, fontFamily: TK.font }}>{cond.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <ResultBox color={goColor} items={[
            { label: "Decisión", value: go ? "GO ✓" : "NO GO", highlight: true },
            ...(costoOps > 0 ? [{ label: "Costo de oportunidad / mes", value: `$${fmt(costoOps)}` }] : []),
            ...(cme > 0 ? [
              { label: "MRR vs CME", value: `${fmt(mrr)} / ${fmt(cme)}` },
              { label: "Banco vs CME × 6", value: `${fmt(banco)} / ${fmt(cme * 6)}` },
            ] : []),
          ]} insight={insight} />
        </>
      }
    />
  );
}

/* ── Phase 5 ── */
export default function Phase5() {
  const { data, set, saved, save } = usePhaseData<Phase5Data>("phase5", DEFAULTS);
  const { user } = useAuth();
  return (
    <section id="fase-05" style={{ marginBottom: 80 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 28, paddingBottom: 18, borderBottom: `1.5px solid ${TK.border}` }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: `${COLOR}18`, border: `1.5px solid ${COLOR}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 11, fontWeight: 900, color: COLOR, fontFamily: TK.fontHeading }}>05</span>
        </div>
        <div>
          <div style={{ fontSize: 10, fontWeight: 700, color: COLOR, letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: TK.fontBadge, marginBottom: 3 }}>Fase 05 · Punto de No Retorno — Herramientas 13–15</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: TK.text, fontFamily: TK.fontHeading, letterSpacing: "-0.02em", margin: 0 }}>La única fórmula que importa al final</h2>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <CME d={data} s={set} />
        <RunwaySalida d={data} s={set} />
        <PuntoNoRetorno d={data} s={set} />
      </div>
      <PhaseActions saved={saved} onSave={save} onReport={() => user && downloadPhase5Report(data, user)} />
    </section>
  );
}
