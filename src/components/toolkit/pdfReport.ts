import { ToolkitUser } from "./AuthContext";
import type { Phase1Data } from "./Phase1";
import type { Phase2Data } from "./Phase2";
import type { Phase3Data } from "./Phase3";
import type { Phase4Data } from "./Phase4";
import type { Phase5Data } from "./Phase5";

function fmt(n: number, decimals = 0) {
  return n.toLocaleString("es-PE", { maximumFractionDigits: decimals });
}
function fmtK(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${fmt(n)}`;
}
function loadPhase<T>(key: string, defaults: T): T {
  try {
    const raw = localStorage.getItem(`ff_toolkit_${key}`);
    if (raw) return { ...defaults, ...JSON.parse(raw) };
  } catch {}
  return defaults;
}

const P1_DEF: Phase1Data = {
  ahorros: "0", gastosMes: "0",
  skills: "5", demanda: "5", competencia: "5",
  salarioNeto: "0", tasa: "20", mesesHorizonte: "12",
  ingresoProyecto: "0", horasReales: "0",
};
const P2_DEF: Phase2Data = {
  perdidaMensual: "0", mesesProblema: "6", precioSolucion: "0",
  personas: "5", horasPerdidas: "8", salarioHora: "25", tasaError: "5", valorDecision: "10000",
  salarioAnual: "0", multiplicador: "1.5",
};
const P3_DEF: Phase3Data = {
  objetivo: "0", precioCliente: "0", conversion: "15",
  beneficio: "0", precioOferta: "0", certidumbre: "7",
};
const P4_DEF: Phase4Data = {
  gastoMarketing: "0", clientesAdq: "1", tarifaMensual: "0", mesesRetencion: "12", margenNeto: "70",
  cme: "0", margenCliente: "0",
  clientesActivos: "0", tarifaMRR: "0", crecimientoMRR: "10", churnMRR: "3",
};
const P5_DEF: Phase5Data = {
  salarioN: "0", beneficios: "0", reserva: "20",
  capitalLiquido: "0", cmeRef: "0",
  mrr: "0", cmePNR: "0", capitalBanco: "0", horasSem: "40", valorHoraPNR: "0",
};

export function generateGlobalReport(user: ToolkitUser) {
  const date = new Date().toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric" });
  const year = new Date().getFullYear();

  const p1 = loadPhase<Phase1Data>("phase1", P1_DEF);
  const p2 = loadPhase<Phase2Data>("phase2", P2_DEF);
  const p3 = loadPhase<Phase3Data>("phase3", P3_DEF);
  const p4 = loadPhase<Phase4Data>("phase4", P4_DEF);
  const p5 = loadPhase<Phase5Data>("phase5", P5_DEF);

  // ── Phase 1: Runway, VMR, Capital, Tasa Horaria ──
  const ahorros = parseFloat(p1.ahorros) || 0;
  const gastosMes = Math.max(1, parseFloat(p1.gastosMes) || 1);
  const runway = ahorros / gastosMes;
  const skills = Math.min(10, Math.max(1, parseFloat(p1.skills) || 5));
  const demanda = Math.min(10, Math.max(1, parseFloat(p1.demanda) || 5));
  const competencia = Math.min(10, Math.max(1, parseFloat(p1.competencia) || 5));
  const vmr = (skills * demanda) / competencia;
  const salarioNetoP1 = parseFloat(p1.salarioNeto) || 0;
  const tasa = Math.min(100, parseFloat(p1.tasa) || 20);
  const mesesHorizonte = parseFloat(p1.mesesHorizonte) || 12;
  const extraccionMes = salarioNetoP1 * (tasa / 100);
  const capitalExtraccion = extraccionMes * mesesHorizonte;
  const ingresoProyecto = parseFloat(p1.ingresoProyecto) || 0;
  const horasRealesP1 = Math.max(1, parseFloat(p1.horasReales) || 1);
  const tasaHoraria = ingresoProyecto > 0 ? ingresoProyecto / horasRealesP1 : 0;

  // ── Phase 2: COI, Proceso, Talento ──
  const perdida = parseFloat(p2.perdidaMensual) || 0;
  const mesesProb = Math.max(1, parseFloat(p2.mesesProblema) || 1);
  const precioSol = parseFloat(p2.precioSolucion) || 0;
  const coi = perdida * mesesProb;
  const roi2 = precioSol > 0 ? coi / precioSol : 0;
  const personas = parseFloat(p2.personas) || 0;
  const horasPerd = parseFloat(p2.horasPerdidas) || 0;
  const salHora = parseFloat(p2.salarioHora) || 0;
  const tasaErr = Math.min(100, parseFloat(p2.tasaError) || 0);
  const valDec = parseFloat(p2.valorDecision) || 0;
  const danoProcesoMes = personas * horasPerd * salHora + (tasaErr / 100) * valDec;
  const salarioAnual = parseFloat(p2.salarioAnual) || 0;
  const mult = parseFloat(p2.multiplicador) || 1.5;
  const costoReemplazo = salarioAnual * 0.30 + (salarioAnual / 12) * 6 + salarioAnual * mult;

  // ── Phase 3: TAM Suficiencia, Valor Percibido ──
  const objetivo = parseFloat(p3.objetivo) || 0;
  const precioCliente = Math.max(1, parseFloat(p3.precioCliente) || 1);
  const convPct = Math.max(0.1, Math.min(100, parseFloat(p3.conversion) || 15));
  const objetivoRes = objetivo * 1.5;
  const clientesNec = objetivoRes / precioCliente;
  const prospectos = clientesNec / (convPct / 100);
  const tamMin = prospectos * 4;
  const beneficio = parseFloat(p3.beneficio) || 0;
  const precioOferta = parseFloat(p3.precioOferta) || 0;
  const certidumbre = Math.min(10, Math.max(1, parseFloat(p3.certidumbre) || 7));
  const V = (beneficio - precioOferta) * (certidumbre / 10);
  const ratioBP = precioOferta > 0 ? beneficio / precioOferta : 0;

  // ── Phase 4: CAC/LTV, N Clientes, MRR ──
  const gastoMkt = parseFloat(p4.gastoMarketing) || 0;
  const clientesAdq = Math.max(1, parseFloat(p4.clientesAdq) || 1);
  const tarifaMes = parseFloat(p4.tarifaMensual) || 0;
  const mesesRet = parseFloat(p4.mesesRetencion) || 0;
  const margenNeto = Math.min(100, parseFloat(p4.margenNeto) || 0);
  const cac = gastoMkt / clientesAdq;
  const ltv = tarifaMes * mesesRet * (margenNeto / 100);
  const ratioLTVCAC = cac > 0 ? ltv / cac : gastoMkt === 0 && tarifaMes > 0 ? Infinity : 0;
  const cmeP4 = parseFloat(p4.cme) || 0;
  const margenCliente = parseFloat(p4.margenCliente) || 0;
  const nClientes = margenCliente > 0 ? cmeP4 / margenCliente : 0;
  const clientesActivos = parseFloat(p4.clientesActivos) || 0;
  const tarifaMRR = parseFloat(p4.tarifaMRR) || 0;
  const crecMRR = parseFloat(p4.crecimientoMRR) || 0;
  const churnMRR = parseFloat(p4.churnMRR) || 0;
  const mrr4 = clientesActivos * tarifaMRR;
  const crecNeto = crecMRR - churnMRR;
  const mrr4_12 = mrr4 * Math.pow(1 + crecNeto / 100, 12);

  // ── Phase 5: CME, Runway Salida, Punto No Retorno ──
  const salarioN = parseFloat(p5.salarioN) || 0;
  const beneficiosEmp = parseFloat(p5.beneficios) || 0;
  const reserva = Math.min(100, parseFloat(p5.reserva) || 20);
  const cmeBase = salarioN + beneficiosEmp;
  const cmeAjustado = cmeBase * (1 + reserva / 100);
  const capitalLiquido = parseFloat(p5.capitalLiquido) || 0;
  const cmeRef = Math.max(1, parseFloat(p5.cmeRef) || 1);
  const runwayActual = capitalLiquido / cmeRef;
  const runwayReq = cmeRef * 6;
  const runwayOk = capitalLiquido >= runwayReq;
  const mrrPNR = parseFloat(p5.mrr) || 0;
  const cmePNR = parseFloat(p5.cmePNR) || 0;
  const capitalBanco = parseFloat(p5.capitalBanco) || 0;
  const horasSem = parseFloat(p5.horasSem) || 0;
  const valorHoraPNR = parseFloat(p5.valorHoraPNR) || 0;
  const cond1 = cmePNR > 0 ? mrrPNR >= cmePNR : false;
  const cond2 = cmePNR > 0 ? capitalBanco >= cmePNR * 6 : false;
  const go = cond1 && cond2;
  const costoOps = horasSem * 4 * valorHoraPNR;

  // ── Profile summary ──
  const runwayLabel = runway >= 12 ? "Sólido (≥12m)" : runway >= 6 ? "Adecuado (6-12m)" : runway > 0 ? "Ajustado (<6m)" : "—";
  const vmrLabel = vmr >= 5 ? "Alto" : vmr >= 2 ? "Medio" : "Bajo";
  const goLabel = go ? "GO ✓" : cond1 || cond2 ? "Parcial" : "NO GO";

  const perfil =
    go ? "Condiciones de salida verificadas — GO"
    : runway >= 6 && vmr >= 3 ? "En construcción acelerada"
    : runway < 3 && cmeBase > 0 ? "Runway crítico — acción inmediata"
    : "En desarrollo — avanza con disciplina";

  // ── Cross-phase recommendations ──
  const recs: string[] = [];
  if (runway > 0 && runway < 3) recs.push(`Tu runway de libertad es de ${fmt(runway, 1)} meses. Prioriza proteger el capital y aumentar la tasa de extracción antes de comprometer nuevas inversiones.`);
  if (vmr < 2 && (parseFloat(p1.skills) > 0 || parseFloat(p1.demanda) > 0)) recs.push(`Tu VMR actual es ${fmt(vmr, 1)} — baja competencia de demanda vs. oferta. Sube la demanda especializándote en el dolor más urgente del mercado.`);
  if (tasaHoraria > 0 && cac > 0 && tasaHoraria < cac / mesesRet) recs.push(`Tu tasa horaria efectiva ($${fmt(tasaHoraria, 0)}/h) está por debajo de lo que justificaría tu CAC. Aumenta el precio o reduce las horas invertidas.`);
  if (coi > 0 && roi2 > 0 && roi2 < 3) recs.push(`Tu ROI para el cliente es ${fmt(roi2, 1)}× — por debajo del mínimo de 3×. Reencuadra el beneficio cuantificado o revisa el precio de la solución.`);
  if (tamMin > 0 && objetivo > 0) recs.push(`Tu TAM mínimo requerido es ${fmtK(tamMin)}. Valida que tu mercado real supere ese umbral antes de invertir en escalar adquisición.`);
  if (ratioBP > 0 && ratioBP < 5) recs.push(`El ratio beneficio/precio es ${fmt(ratioBP, 1)}× — por debajo del umbral óptimo de 10×. Para eliminar la negociación de precio, el beneficio debe ser ≥ ${fmtK(precioOferta * 10)}.`);
  if (nClientes > 20) recs.push(`Necesitas ${fmt(nClientes, 0)} clientes para alcanzar tu CME — por encima de 20, el libro recomienda revisar el precio o el margen antes de escalar.`);
  if (mrr4 > 0 && crecNeto < 0) recs.push(`Churn (${churnMRR}%) > Crecimiento (${crecMRR}%) — el MRR está en contracción neta. Prioriza retención antes que adquisición.`);
  if (!go && cmePNR > 0) {
    if (!cond1) recs.push(`Faltan $${fmt(cmePNR - mrrPNR)}/mes de MRR para la Condición 1 del GO. Con ${nClientes > 0 ? `${Math.ceil(nClientes)} clientes` : "más clientes"}, la condición se cumple.`);
    if (!cond2) recs.push(`Faltan $${fmt(Math.max(0, cmePNR * 6 - capitalBanco))} en banco para la Condición 2 del GO. Extrae sistemáticamente y resguarda el capital.`);
  }
  if (go) recs.push("GO ✓ — Ambas condiciones son verdes. Quedarse en el empleo es pérdida verificable de dinero. Define tu fecha de salida en el calendario.");
  if (recs.length === 0) recs.push("Completa las 5 fases con tus datos reales para obtener recomendaciones personalizadas basadas en tu perfil.");

  const ratioDisplay = !isFinite(ratioLTVCAC) ? "∞ (CAC=0)" : ratioLTVCAC > 0 ? `${fmt(ratioLTVCAC, 1)}×` : "—";

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <title>Reporte Global — ${user.name}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, Helvetica, sans-serif; background: #fff; color: #0B0B1E; font-size: 13px; line-height: 1.6; }
    @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } .no-print { display: none !important; } }
    .no-print { text-align: center; padding: 14px; background: #f3f4f6; border-bottom: 1px solid #e5e7eb; }
    .no-print button { padding: 9px 24px; background: #1400D4; color: white; border: none; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; margin: 0 5px; }
    .no-print button.sec { background: transparent; color: #666; border: 1px solid #ccc; }
    .section { padding: 22px 32px; border-bottom: 1px solid #eaeaea; }
    .section-title { font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #1400D4; border-bottom: 1.5px solid #1400D4; padding-bottom: 4px; margin-bottom: 16px; }
    .tip { background: rgba(20,0,212,0.05); border-left: 3px solid #1400D4; padding: 12px 16px; border-radius: 4px; font-size: 12.5px; line-height: 1.65; color: #333; margin-top: 14px; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; }
    th { background: rgba(20,0,212,0.08); text-align: left; padding: 7px 10px; font-weight: 700; }
    td { padding: 6px 10px; border-bottom: 1px solid #eee; }
    .kpi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 4px; }
    .kpi { background: #f7f8ff; border: 1.5px solid rgba(20,0,212,0.1); border-radius: 10px; padding: 14px 16px; }
    .kpi label { display: block; font-size: 9px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(20,0,212,0.7); margin-bottom: 4px; }
    .kpi .val { font-size: 22px; font-weight: 800; color: #0B0B1E; letter-spacing: -0.02em; }
    .kpi .sub { font-size: 11px; color: #666; margin-top: 2px; }
    .phase-row td:first-child { font-weight: 700; }
    .badge { display: inline-block; padding: 2px 8px; border-radius: 100px; font-size: 10px; font-weight: 700; }
    .badge.green { background: #d1fae5; color: #006E49; }
    .badge.yellow { background: #fef3c7; color: #9A7B00; }
    .badge.red { background: #fee2e2; color: #C23048; }
  </style>
</head>
<body>
<div class="no-print">
  <button onclick="window.print()">🖨 Imprimir / Guardar PDF</button>
  <button class="sec" onclick="window.close()">Cerrar</button>
</div>

<!-- Header -->
<div style="background:#050508;color:white;padding:20px 32px;display:flex;justify-content:space-between;align-items:flex-start;">
  <div>
    <div style="font-size:20px;font-weight:900;color:#F5C800;letter-spacing:0.04em;">FUTURE FOUNDERS</div>
    <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:2px;">Toolkit Doble Agente — Reporte Global de Progreso</div>
  </div>
  <div style="text-align:right;font-size:11px;color:rgba(255,255,255,0.5);">
    <div>futurefounders.pe · ff@redesignlab.org</div>
    <div style="margin-top:2px;">${date}</div>
  </div>
</div>

<!-- User band -->
<div style="background:#1400D4;color:white;padding:14px 32px;display:flex;justify-content:space-between;align-items:center;">
  <div>
    <div style="font-size:15px;font-weight:700;">${user.name}</div>
    <div style="font-size:11px;color:rgba(255,255,255,0.7);margin-top:2px;">${user.email}${user.role ? ` · ${user.role}` : ""}${user.company ? ` @ ${user.company}` : ""}</div>
  </div>
  <div style="text-align:right;">
    <div style="font-size:11px;color:rgba(255,255,255,0.7);">Perfil de misión</div>
    <div style="font-size:14px;font-weight:700;color:#F5C800;">${perfil}</div>
  </div>
</div>

<!-- KPI summary -->
<div class="section">
  <div class="section-title">Indicadores Clave de tu Misión</div>
  <div class="kpi-grid">
    <div class="kpi">
      <label>Runway de libertad</label>
      <div class="val">${runway > 0 ? fmt(runway, 1) + "m" : "—"}</div>
      <div class="sub">${runwayLabel}</div>
    </div>
    <div class="kpi">
      <label>VMR — Valor de Mercado Real</label>
      <div class="val">${fmt(vmr, 1)}</div>
      <div class="sub">${vmrLabel} · (S×D)/C</div>
    </div>
    <div class="kpi">
      <label>Capital de extracción</label>
      <div class="val">${fmtK(capitalExtraccion)}</div>
      <div class="sub">$${fmt(extraccionMes)}/mes × ${fmt(mesesHorizonte)}m</div>
    </div>
    <div class="kpi">
      <label>Tasa horaria efectiva</label>
      <div class="val">${tasaHoraria > 0 ? "$" + fmt(tasaHoraria, 0) + "/h" : "—"}</div>
      <div class="sub">${tasaHoraria > 0 ? "Consultoría mín.: $" + fmt(tasaHoraria * 3, 0) + "/h" : "Ingresa datos en Fase 01"}</div>
    </div>
    <div class="kpi">
      <label>COI del cliente</label>
      <div class="val">${coi > 0 ? fmtK(coi) : "—"}</div>
      <div class="sub">${roi2 > 0 ? "ROI: " + fmt(roi2, 1) + "×" : "Ingresa datos en Fase 02"}</div>
    </div>
    <div class="kpi">
      <label>TAM mínimo requerido</label>
      <div class="val">${tamMin > 0 ? fmtK(tamMin) : "—"}</div>
      <div class="sub">${objetivo > 0 ? "Objetivo: " + fmtK(objetivo) + "/año" : "Ingresa datos en Fase 03"}</div>
    </div>
    <div class="kpi">
      <label>MRR actual</label>
      <div class="val">${mrr4 > 0 ? "$" + fmt(mrr4) : "—"}</div>
      <div class="sub">${mrr4 > 0 ? "Proyectado M12: $" + fmt(mrr4_12) : "Ingresa datos en Fase 04"}</div>
    </div>
    <div class="kpi">
      <label>Ratio LTV / CAC</label>
      <div class="val">${ratioDisplay}</div>
      <div class="sub">${!isFinite(ratioLTVCAC) ? "Modelo óptimo ✓" : ratioLTVCAC >= 3 ? "Saludable" : ratioLTVCAC > 0 ? "Revisar" : "—"}</div>
    </div>
    <div class="kpi">
      <label>CME ajustado</label>
      <div class="val">${cmeAjustado > 0 ? "$" + fmt(cmeAjustado) : "—"}</div>
      <div class="sub">${cmeAjustado > 0 ? "Escenario salida: $" + fmt(cmeAjustado) + "/mes" : "Ingresa datos en Fase 05"}</div>
    </div>
  </div>
  <div class="kpi-grid" style="margin-top:14px;">
    <div class="kpi" style="grid-column: span 2;">
      <label>Runway de salida — progreso hacia el mínimo de 6 meses</label>
      <div style="display:flex;align-items:center;gap:12px;margin-top:4px;">
        <div style="flex:1;height:10px;background:#eef;border-radius:5px;overflow:hidden;">
          <div style="height:100%;width:${Math.min(100, runwayReq > 0 ? (capitalLiquido / runwayReq) * 100 : 0)}%;background:${runwayOk ? "#006E49" : "#C23048"};border-radius:5px;"></div>
        </div>
        <div class="val" style="font-size:18px;">${runwayReq > 0 ? Math.min(100, Math.round((capitalLiquido / runwayReq) * 100)) : 0}%</div>
      </div>
      <div class="sub">${capitalLiquido > 0 ? `$${fmt(capitalLiquido)} en banco · Runway actual: ${fmt(runwayActual, 1)} meses · Requerido: 6 meses` : "Ingresa capital líquido en Fase 05 para ver tu progreso"}</div>
    </div>
    <div class="kpi">
      <label>Punto de No Retorno</label>
      <div class="val" style="color:${go ? "#006E49" : "#C23048"};">${goLabel}</div>
      <div class="sub">${go ? "Quedarse es pérdida verificable" : cmePNR > 0 ? `Condición 1: ${cond1 ? "✓" : "✗"} · Condición 2: ${cond2 ? "✓" : "✗"}` : "Completa Fase 05"}</div>
    </div>
  </div>
</div>

<!-- Phase-by-phase summary -->
<div class="section">
  <div class="section-title">Análisis de Progresión por Fase</div>
  <table>
    <thead>
      <tr>
        <th style="width:80px;">Fase</th>
        <th>Herramientas</th>
        <th>Indicadores clave</th>
        <th style="width:120px;">Estado</th>
      </tr>
    </thead>
    <tbody class="phase-row">
      <tr>
        <td><span style="color:#1400D4;">01 · Capital</span></td>
        <td>Runway · VMR · Capital Extracción · Tasa Horaria</td>
        <td>${runway > 0 ? fmt(runway, 1) + "m runway" : "—"} · VMR ${fmt(vmr, 1)} · ${tasaHoraria > 0 ? "$" + fmt(tasaHoraria, 0) + "/h" : "—"}</td>
        <td><span class="badge ${runway >= 6 && vmr >= 3 ? "green" : runway >= 3 || vmr >= 2 ? "yellow" : "red"}">${runway >= 6 && vmr >= 3 ? "Sólido" : runway >= 3 || vmr >= 2 ? "En proceso" : "Iniciar"}</span></td>
      </tr>
      <tr>
        <td><span style="color:#009966;">02 · Dolor</span></td>
        <td>COI · Daño por Proceso · Daño por Talento</td>
        <td>${coi > 0 ? "COI " + fmtK(coi) : "—"} · ROI ${roi2 > 0 ? fmt(roi2, 1) + "×" : "—"} · Reemplazo ${costoReemplazo > 0 ? fmtK(costoReemplazo) : "—"}</td>
        <td><span class="badge ${roi2 >= 3 ? "green" : roi2 > 0 ? "yellow" : "red"}">${roi2 >= 10 ? "10× ✓" : roi2 >= 3 ? "Viable" : coi > 0 ? "Ajustar" : "Iniciar"}</span></td>
      </tr>
      <tr>
        <td><span style="color:#7C3AED;">03 · Mercado</span></td>
        <td>TAM Suficiencia · Ecuación del Valor Percibido</td>
        <td>${tamMin > 0 ? "TAM mín. " + fmtK(tamMin) : "—"} · ${ratioBP > 0 ? "B/P " + fmt(ratioBP, 1) + "×" : "—"} · V=$${fmt(V)}</td>
        <td><span class="badge ${ratioBP >= 10 ? "green" : ratioBP >= 5 ? "yellow" : "red"}">${ratioBP >= 10 ? "10× ✓" : ratioBP >= 5 ? "Parcial" : beneficio > 0 ? "Revisar" : "Iniciar"}</span></td>
      </tr>
      <tr>
        <td><span style="color:#B45309;">04 · Unidad Econ.</span></td>
        <td>CAC/LTV · N Clientes · MRR</td>
        <td>${ratioDisplay !== "—" ? "LTV/CAC " + ratioDisplay : "—"} · ${nClientes > 0 ? "n=" + fmt(nClientes, 0) + " clientes" : "—"} · MRR $${fmt(mrr4)}</td>
        <td><span class="badge ${(!isFinite(ratioLTVCAC) || ratioLTVCAC >= 3) && mrr4 > 0 ? "green" : ratioLTVCAC >= 1 || mrr4 > 0 ? "yellow" : "red"}">${!isFinite(ratioLTVCAC) ? "Óptimo ✓" : ratioLTVCAC >= 3 ? "Saludable" : tarifaMes > 0 || mrr4 > 0 ? "Ajustado" : "Iniciar"}</span></td>
      </tr>
      <tr>
        <td><span style="color:#C23048;">05 · No Retorno</span></td>
        <td>CME · Runway de Salida · GO/NO GO</td>
        <td>CME $${fmt(cmeAjustado)}/mes · Runway ${fmt(runwayActual, 1)}m · ${goLabel}</td>
        <td><span class="badge ${go ? "green" : cond1 || cond2 ? "yellow" : "red"}">${go ? "GO ✓" : cmeAjustado > 0 ? "En curso" : "Iniciar"}</span></td>
      </tr>
    </tbody>
  </table>
</div>

<!-- Cross-phase interpretation -->
<div class="section">
  <div class="section-title">Interpretación Consolidada del Perfil</div>
  <p style="margin-bottom:14px;color:#333;line-height:1.75;">
    ${user.name}, ${perfil === "Condiciones de salida verificadas — GO"
      ? `el análisis es claro: ambas condiciones del Punto de No Retorno están verificadas. Tu MRR ≥ CME y tienes el runway mínimo en banco. Quedarse en el empleo es pérdida verificable de dinero — la siguiente acción es una decisión, no un cálculo.`
      : perfil === "En construcción acelerada"
      ? `tienes el capital de arranque y un VMR que justifica la inversión de tiempo. El foco ahora es cerrar la brecha entre tu MRR actual y el CME. Cada cliente nuevo es un paso hacia el GO.`
      : perfil === "Runway crítico — acción inmediata"
      ? `la ventana de tiempo es corta. Con menos de 3 meses de runway, cualquier demora en conseguir ingresos del proyecto pone presión en el capital de subsistencia. El primer cliente pagador es la prioridad absoluta.`
      : `estás en el proceso de construcción. Con disciplina y foco en las acciones de mayor impacto, los indicadores mejorarán semana a semana. Completa todas las fases con datos reales para ver tu perfil completo.`}
  </p>
  ${costoOps > 0
    ? `<div class="tip"><strong>Costo de oportunidad:</strong> Con ${fmt(horasSem)} horas semanales en el empleo a una tasa de $${fmt(valorHoraPNR)}/h, el costo de oportunidad mensual de seguir es <strong>USD ${fmt(costoOps)}</strong>. Este número crece cada mes que el GO no se ejecuta.</div>`
    : mrr4_12 > 0 && cmeAjustado > 0
    ? `<div class="tip"><strong>Proyección:</strong> A una tasa de crecimiento neto del ${fmt(crecNeto, 1)}%/mes, en 12 meses el MRR llegaría a <strong>$${fmt(mrr4_12)}/mes</strong>. Tu CME ajustado es $${fmt(cmeAjustado)}/mes — ${mrr4_12 >= cmeAjustado ? "la proyección supera el CME en el horizonte de 12 meses." : `la proyección aún no supera el CME. Revisa precio o retención.`}</div>`
    : ""}
</div>

<!-- Recommendations -->
<div class="section">
  <div class="section-title">Recomendaciones Personalizadas</div>
  <ol style="padding-left:18px;font-size:13px;line-height:2.1;color:#333;">
    ${recs.map(r => `<li>${r}</li>`).join("")}
  </ol>
  <div class="tip" style="margin-top:18px;">
    <strong>Próximo paso concreto:</strong> ${
      go ? "Define una fecha de salida en el calendario. La ambigüedad es el mayor enemigo de la transición — trabaja hacia atrás desde esa fecha."
      : !cond1 && cmePNR > 0 ? `Faltan $${fmt(cmePNR - mrrPNR)}/mes de MRR para el GO. Enfócate en cerrar ${nClientes > 0 ? Math.ceil(nClientes) + " clientes" : "más clientes"} al precio actual.`
      : !cond2 && cmePNR > 0 ? `Faltan $${fmt(Math.max(0, cmePNR * 6 - capitalBanco))} en banco para el runway mínimo. Extrae sistemáticamente y no toques ese capital.`
      : runway > 0 && runway < 6 ? "Protege el runway. Antes de invertir en escalar, asegura 6 meses de gastos en banco."
      : ratioBP > 0 && ratioBP < 5 ? "Reencuadra el beneficio de tu oferta. El cliente debe ver 10× antes de ver el precio."
      : "Avanza a la siguiente fase con datos reales. Cada calculadora con información verídica es una decisión mejor tomada."
    }
  </div>
</div>

<!-- Phase tools reference -->
<div class="section">
  <div class="section-title">Las 15 Herramientas del Doble Agente — Referencia</div>
  <table>
    <thead><tr><th>Fase</th><th>Nombre</th><th>Herramientas</th><th>Misiones</th></tr></thead>
    <tbody>
      <tr><td><strong style="color:#1400D4;">01</strong></td><td><strong>Capital Personal</strong></td><td>Runway de Libertad · VMR · Capital de Extracción · Tasa Horaria Efectiva</td><td>01 – 04</td></tr>
      <tr><td><strong style="color:#009966;">02</strong></td><td><strong>Misión Corporativa</strong></td><td>COI · Daño por Ineficiencia de Proceso · Daño por Fuga de Talento</td><td>05 – 07</td></tr>
      <tr><td><strong style="color:#7C3AED;">03</strong></td><td><strong>Mercado</strong></td><td>TAM Suficiencia · Ecuación del Valor Percibido</td><td>08 – 09</td></tr>
      <tr><td><strong style="color:#B45309;">04</strong></td><td><strong>Unidad Económica</strong></td><td>CAC / LTV · N Clientes para la Libertad · MRR</td><td>10 – 12</td></tr>
      <tr><td><strong style="color:#C23048;">05</strong></td><td><strong>Punto de No Retorno</strong></td><td>CME · Runway de Salida · GO / NO GO</td><td>13 – 15</td></tr>
    </tbody>
  </table>
</div>

<!-- Footer -->
<div style="background:#050508;color:rgba(255,255,255,0.4);padding:14px 32px;font-size:10px;display:flex;justify-content:space-between;">
  <span>© ${year} Future Founders — Documento confidencial · Uso personal</span>
  <span>futurefounders.pe · ff@redesignlab.org</span>
</div>
</body>
</html>`;

  const popup = window.open("", "_blank", "width=960,height=1200,scrollbars=yes");
  if (popup) {
    popup.document.write(html);
    popup.document.close();
  }
}
