import { ToolkitUser } from "./AuthContext";
import type { Phase1Data } from "./Phase1";
import type { Phase2Data } from "./Phase2";
import type { Phase3Data } from "./Phase3";
import type { Phase4Data } from "./Phase4";
import type { Phase5Data } from "./Phase5";

/* ── Shared helpers ── */
function fmt(n: number, decimals = 0) {
  return n.toLocaleString("es-PE", { maximumFractionDigits: decimals });
}
function fmtK(n: number) {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${fmt(n)}`;
}
function styles() {
  return `
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, Helvetica, sans-serif; background: #fff; color: #0B0B1E; font-size: 13px; line-height: 1.6; }
    @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } .no-print { display: none !important; } }
    .no-print { text-align: center; padding: 14px; background: #f3f4f6; border-bottom: 1px solid #e5e7eb; }
    .no-print button { padding: 9px 24px; background: #1400D4; color: white; border: none; border-radius: 8px; font-size: 13px; font-weight: 700; cursor: pointer; margin: 0 5px; }
    .no-print button.sec { background: transparent; color: #666; border: 1px solid #ccc; }
    .section { padding: 22px 32px; border-bottom: 1px solid #eaeaea; }
    .section-title { font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #1400D4; border-bottom: 1.5px solid #1400D4; padding-bottom: 4px; margin-bottom: 16px; }
    .calc-title { font-size: 15px; font-weight: 700; margin-bottom: 4px; }
    .calc-desc { font-size: 12px; color: #666; margin-bottom: 10px; }
    .book-quote { background: rgba(20,0,212,0.05); border-left: 3px solid #1400D4; padding: 8px 14px; border-radius: 0 6px 6px 0; margin-bottom: 12px; font-size: 12px; font-style: italic; color: #444; }
    .book-quote .ref { font-size: 10.5px; font-weight: 700; color: #1400D4; font-style: normal; margin-top: 4px; }
    .result-grid { display: flex; flex-wrap: wrap; gap: 14px 24px; background: #f7f8ff; border: 1.5px solid rgba(20,0,212,0.12); border-radius: 10px; padding: 12px 16px; margin-bottom: 12px; }
    .result-item label { display: block; font-size: 9px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(20,0,212,0.7); margin-bottom: 2px; }
    .result-item .val { font-size: 20px; font-weight: 800; color: #0B0B1E; }
    .result-item .val.sm { font-size: 14px; font-weight: 700; }
    .insight { background: rgba(20,0,212,0.05); border-left: 3px solid #1400D4; padding: 10px 14px; border-radius: 4px; font-size: 12.5px; line-height: 1.65; color: #333; margin-bottom: 12px; }
    .recs ol { padding-left: 18px; margin-top: 8px; }
    .recs li { font-size: 12.5px; margin-bottom: 6px; color: #333; }
    .summary-box { background: #f7f8ff; border: 1.5px solid rgba(20,0,212,0.15); border-radius: 12px; padding: 18px 22px; margin-top: 14px; }
    .diag-table { width: 100%; border-collapse: collapse; font-size: 11.5px; margin: 10px 0; }
    .diag-table td { padding: 4px 10px; border-bottom: 1px solid #f0f0f0; }
    .diag-table td:first-child { font-weight: 700; color: #1400D4; width: 110px; }
    .diag-active { background: rgba(20,0,212,0.07); font-weight: 700 !important; }
    table.data { width: 100%; border-collapse: collapse; font-size: 12px; }
    table.data th { background: rgba(20,0,212,0.08); text-align: left; padding: 7px 10px; font-weight: 700; }
    table.data td { padding: 6px 10px; border-bottom: 1px solid #eee; }`;
}
function header(phaseLabel: string, subtitle: string, user: ToolkitUser, date: string, color: string) {
  return `
  <div style="background:#050508;color:white;padding:20px 32px;display:flex;justify-content:space-between;align-items:flex-start;">
    <div>
      <div style="font-size:20px;font-weight:900;color:#F5C800;letter-spacing:0.04em;">FUTURE FOUNDERS</div>
      <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:2px;">Toolkit Doble Agente — ${subtitle}</div>
    </div>
    <div style="text-align:right;font-size:11px;color:rgba(255,255,255,0.5);">
      <div>futurefounders.pe</div><div style="margin-top:2px;">${date}</div>
    </div>
  </div>
  <div style="background:${color};color:white;padding:14px 32px;display:flex;justify-content:space-between;align-items:center;">
    <div>
      <div style="font-size:15px;font-weight:700;">${user.name}</div>
      <div style="font-size:11px;color:rgba(255,255,255,0.75);margin-top:2px;">${user.email}${user.role ? ` · ${user.role}` : ""}${user.company ? ` @ ${user.company}` : ""}</div>
    </div>
    <div style="text-align:right;font-size:18px;font-weight:900;">${phaseLabel}</div>
  </div>`;
}
function footer(year: number) {
  return `<div style="background:#050508;color:rgba(255,255,255,0.4);padding:14px 32px;font-size:10px;display:flex;justify-content:space-between;">
    <span>© ${year} Future Founders — Documento confidencial · Uso personal</span>
    <span>futurefounders.pe · Doble Agente — Eddie Ajalcriña & Lorenzo Ortiz</span>
  </div>`;
}
function openPopup(html: string) {
  const popup = window.open("", "_blank", "width=920,height=1150,scrollbars=yes");
  if (popup) { popup.document.write(html); popup.document.close(); }
}

/* ─────────────────────────── PHASE 1 ─────────────────────────── */
export function downloadPhase1Report(d: Phase1Data, user: ToolkitUser) {
  const date = new Date().toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric" });
  const year = new Date().getFullYear();

  // #01 Runway
  const ahorros = parseFloat(d.ahorros) || 0;
  const gastos = Math.max(1, parseFloat(d.gastosMes) || 1);
  const runway = ahorros / gastos;
  const runwayLabel = runway > 12 ? "Ventana operativa activa ✓" : runway >= 6 ? "Estable, pero no cómodo" : runway >= 3 ? "Zona de riesgo" : "Zona crítica";

  // #02 VMR
  const skills = Math.min(10, Math.max(1, parseFloat(d.skills) || 1));
  const demanda = Math.min(10, Math.max(1, parseFloat(d.demanda) || 1));
  const competencia = Math.max(1, parseFloat(d.competencia) || 1);
  const vmr = (skills * demanda) / competencia;
  const vmrLabel = vmr >= 7 ? "Alta demanda" : vmr >= 4 ? "Posición media" : "Posición débil";

  // #03 Extracción
  const salario = parseFloat(d.salarioNeto) || 0;
  const tasa = parseFloat(d.tasa) || 0;
  const mesesH = Math.max(1, parseFloat(d.mesesHorizonte) || 1);
  const extMes = salario * (tasa / 100);
  const capitalAcum = extMes * mesesH;

  // #04 Tasa Horaria
  const ingreso = parseFloat(d.ingresoProyecto) || 0;
  const horas = Math.max(1, parseFloat(d.horasReales) || 1);
  const tasaH = ingreso / horas;
  const thLabel = tasaH > 300 ? "Excepcional" : tasaH >= 150 ? "Alto valor" : tasaH >= 50 ? "Competitivo" : "Bajo mercado";

  const html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"/><title>Reporte Fase 01 — ${user.name}</title><style>${styles()}</style></head>
<body>
<div class="no-print"><button onclick="window.print()">🖨 Imprimir / PDF</button><button class="sec" onclick="window.close()">Cerrar</button></div>
${header("Fase 01 · Infiltración", "Reporte Fase 01 — Herramientas 01–04", user, date, "#1400D4")}

<div class="section">
  <div class="section-title">Herramienta 01 — Runway de Libertad</div>
  <div class="calc-desc">Cuántos meses puedes vivir sin ingresos.</div>
  <div class="book-quote">"El runway no es un lujo — es la condición mínima para que la transición tenga sentido estratégico." <div class="ref">→ Umbral mínimo: 6 meses · Ventana operativa recomendada: +12 meses</div></div>
  <div class="result-grid">
    <div class="result-item"><label>Ahorros líquidos</label><div class="val sm">$${fmt(ahorros)}</div></div>
    <div class="result-item"><label>Gasto mensual</label><div class="val sm">$${fmt(gastos)}/mes</div></div>
    <div class="result-item"><label>Runway</label><div class="val">${fmt(runway, 1)} meses</div></div>
    <div class="result-item"><label>Estado</label><div class="val sm">${runwayLabel}</div></div>
  </div>
  <div class="insight">${runway > 12 ? `Ventana operativa activa con ${fmt(runway, 1)} meses de runway. Tienes el tiempo necesario para ejecutar con calma.` : runway >= 6 ? `Runway de ${fmt(runway, 1)} meses — estable pero no cómodo. Úsalo bien: construye con urgencia sin pánico.` : `Runway de ${fmt(runway, 1)} meses — zona de riesgo. Aumentar el runway es la prioridad antes que cualquier otra acción estratégica.`}</div>
  <div class="recs"><strong style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#555;">Recomendaciones:</strong><ol>
    ${runway < 6 ? "<li>Activa inmediatamente el protocolo de extracción (Herramienta #03) — necesitas al menos 6 meses de runway antes de cualquier movimiento estratégico.</li>" : ""}
    <li>El runway es dinámico — cada reducción de gasto o aumento de ahorro lo extiende. Revísalo mensualmente.</li>
    <li>Meta mínima: 6 meses. Meta operativa: 12+ meses. Trabaja hacia la ventana operativa activa.</li>
  </ol></div>
</div>

<div class="section">
  <div class="section-title">Herramienta 02 — Valor de Mercado Real (VMR)</div>
  <div class="calc-desc">Tu salario mide tu costo de reemplazo, no tu valor real.</div>
  <div class="book-quote">"Tu salario mide tu costo de reemplazo, no tu valor real." <div class="ref">→ VMR = (Skills × Demanda) ÷ Competencia · Escala 1–10</div></div>
  <div class="result-grid">
    <div class="result-item"><label>Skills clave</label><div class="val sm">${skills}/10</div></div>
    <div class="result-item"><label>Demanda del mercado</label><div class="val sm">${demanda}/10</div></div>
    <div class="result-item"><label>Nivel de competencia</label><div class="val sm">${competencia}/10</div></div>
    <div class="result-item"><label>Índice VMR</label><div class="val">${fmt(vmr, 1)}</div></div>
    <div class="result-item"><label>Posicionamiento</label><div class="val sm">${vmrLabel}</div></div>
  </div>
  <div class="insight">${vmr >= 7 ? `VMR de ${fmt(vmr, 1)} — alta demanda. El mercado está buscando tu perfil. Ahora es el momento de monetizar.` : vmr >= 4 ? `VMR de ${fmt(vmr, 1)} — posición media. Identifica las 2 skills con mayor demanda y menor oferta en tu industria y desarrolla en ellas.` : `VMR de ${fmt(vmr, 1)} — posición débil. Enfócate en fortalecer skills transferibles antes de salir al mercado.`}</div>
  <div class="recs"><strong style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#555;">Recomendaciones:</strong><ol>
    ${skills < 7 ? "<li>Identifica las 2–3 skills de mayor demanda en tu industria y crea un plan de desarrollo de 90 días.</li>" : "<li>Tu especialización es alta — productízala en una oferta concreta con resultados medibles.</li>"}
    ${competencia >= 7 ? "<li>La competencia es alta — diferénciate con un nicho específico. Menos mercado, más profundidad.</li>" : "<li>La competencia es moderada — tienes espacio para posicionarte con solidez antes de que aumente.</li>"}
    <li>El VMR no es fijo — cada credencial, caso de éxito y resultado documentado lo incrementa.</li>
  </ol></div>
</div>

<div class="section">
  <div class="section-title">Herramienta 03 — Capital de Extracción</div>
  <div class="calc-desc">El protocolo de ahorro obligatorio para financiar la transición.</div>
  <div class="book-quote">"La cuenta de extracción es intocable. Solo existe para financiar la salida." <div class="ref">→ Tasa mínima del protocolo: 15% del salario neto mensual</div></div>
  <div class="result-grid">
    <div class="result-item"><label>Salario neto</label><div class="val sm">$${fmt(salario)}/mes</div></div>
    <div class="result-item"><label>Tasa aplicada</label><div class="val sm">${tasa}%</div></div>
    <div class="result-item"><label>Extracción mensual</label><div class="val">$${fmt(extMes)}</div></div>
    <div class="result-item"><label>Capital en ${mesesH} meses</label><div class="val sm">$${fmt(capitalAcum)}</div></div>
    <div class="result-item"><label>Estado del protocolo</label><div class="val sm">${tasa >= 15 ? "Protocolo del libro ✓" : tasa >= 10 ? "Mínimo viable" : "No genera masa crítica"}</div></div>
  </div>
  <div class="insight">${salario > 0 ? `Ahorrando el ${tasa}% de tu salario, acumulas USD ${fmt(capitalAcum)} en ${mesesH} meses. ${tasa < 15 ? `Para el protocolo del libro (15%), necesitas USD ${fmt(salario * 0.15 - extMes)} adicionales por mes — lo que significa USD ${fmt(capitalAcum + (salario * 0.15 - extMes) * mesesH)} al final del período.` : "Estás siguiendo el protocolo del libro ✓ — cada mes que pasa, tu ventana de libertad se amplía."}` : "Ingresa tu salario para calcular el capital de extracción."}</div>
  <div class="recs"><strong style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#555;">Recomendaciones:</strong><ol>
    <li>Abre una cuenta separada exclusivamente para la extracción — la visibilidad psicológica del progreso es motivación real.</li>
    ${tasa < 15 ? `<li>Para alcanzar el 15% del protocolo, identifica USD ${fmt(salario * 0.15 - extMes)} en gastos reducibles mensualmente.</li>` : ""}
    <li>La cuenta de extracción no es el fondo de emergencia — son instrumentos distintos con propósitos distintos.</li>
  </ol></div>
</div>

<div class="section">
  <div class="section-title">Herramienta 04 — Tasa Horaria Efectiva</div>
  <div class="calc-desc">Cuánto vale realmente cada hora invertida en tu negocio.</div>
  <div class="book-quote">"Incluye en las horas: prospección, reuniones, entrega, revisiones y administración." <div class="ref">→ Referencia del libro — Gabriel: $4,500 ÷ 15 hrs = $300/hr</div></div>
  <div class="result-grid">
    <div class="result-item"><label>Ingreso del proyecto</label><div class="val sm">$${fmt(ingreso)}</div></div>
    <div class="result-item"><label>Horas reales</label><div class="val sm">${horas}h</div></div>
    <div class="result-item"><label>Tasa horaria efectiva</label><div class="val">$${fmt(tasaH, 1)}/hr</div></div>
    <div class="result-item"><label>Benchmark</label><div class="val sm">${thLabel}</div></div>
  </div>
  <div class="insight">${ingreso > 0 ? `Tasa efectiva de USD ${fmt(tasaH, 1)}/hr — ${thLabel.toLowerCase()}. La referencia del libro es $300/hr (Gabriel: $4,500 ÷ 15hrs). ${tasaH < 300 ? `Para llegar a $300/hr con las mismas ${horas}h, necesitas generar USD ${fmt(300 * horas)} por proyecto.` : "Ya operas en el nivel de referencia del libro — escala el volumen."}` : "Ingresa ingreso y horas reales para calcular tu tasa efectiva."}</div>
  <div class="recs"><strong style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#555;">Recomendaciones:</strong><ol>
    <li>Mide siempre las horas REALES incluyendo todo el trabajo invisible: prospección, admin, revisiones.</li>
    ${tasaH < 50 ? "<li>Tasa bajo mercado — revisa el modelo: o sube el precio, o reduce las horas de entrega con mayor eficiencia o delegación.</li>" : ""}
    <li>El benchmark del libro es $300/hr. Cada mejora de proceso que reduce horas sin reducir precio aumenta la tasa efectiva.</li>
  </ol></div>
</div>

<div class="section">
  <div class="section-title">Síntesis — Fase 01 · Infiltración</div>
  <div class="summary-box">
    <table class="data" style="margin-bottom:14px;">
      <thead><tr><th>Herramienta</th><th>Resultado clave</th><th>Estado</th></tr></thead>
      <tbody>
        <tr><td>#01 Runway</td><td>${fmt(runway, 1)} meses</td><td>${runwayLabel}</td></tr>
        <tr><td>#02 VMR</td><td>${fmt(vmr, 1)} índice</td><td>${vmrLabel}</td></tr>
        <tr><td>#03 Extracción</td><td>$${fmt(extMes)}/mes → $${fmt(capitalAcum)} en ${mesesH}m</td><td>${tasa >= 15 ? "Protocolo ✓" : tasa >= 10 ? "Mínimo viable" : "Insuficiente"}</td></tr>
        <tr><td>#04 Tasa Horaria</td><td>$${fmt(tasaH, 1)}/hr</td><td>${thLabel}</td></tr>
      </tbody>
    </table>
  </div>
</div>

${footer(year)}
<script>setTimeout(()=>window.print(),800);</script>
</body></html>`;
  openPopup(html);
}

/* ─────────────────────────── PHASE 2 ─────────────────────────── */
export function downloadPhase2Report(d: Phase2Data, user: ToolkitUser) {
  const date = new Date().toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric" });
  const year = new Date().getFullYear();

  // #05 COI
  const perdida = parseFloat(d.perdidaMensual) || 0;
  const meses = Math.max(1, parseFloat(d.mesesProblema) || 1);
  const precio = parseFloat(d.precioSolucion) || 0;
  const coi = perdida * meses;
  const roi = precio > 0 ? coi / precio : 0;
  const payback = perdida > 0 ? precio / perdida : 0;

  // #06 Proceso
  const personas = parseFloat(d.personas) || 0;
  const horasPerd = parseFloat(d.horasPerdidas) || 0;
  const salHora = parseFloat(d.salarioHora) || 0;
  const tasaErr = Math.min(100, parseFloat(d.tasaError) || 0);
  const valDec = parseFloat(d.valorDecision) || 0;
  const costoTiempo = personas * horasPerd * salHora;
  const costoErr = (tasaErr / 100) * valDec;
  const danoMes = costoTiempo + costoErr;

  // #07 Talento
  const salAnual = parseFloat(d.salarioAnual) || 0;
  const mult = parseFloat(d.multiplicador) || 1;
  const reclu = salAnual * 0.3;
  const rampa = (salAnual / 12) * 6;
  const conocimiento = salAnual * mult;
  const costoReemplazo = reclu + rampa + conocimiento;

  const html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"/><title>Reporte Fase 02 — ${user.name}</title><style>${styles()}</style></head>
<body>
<div class="no-print"><button onclick="window.print()">🖨 Imprimir / PDF</button><button class="sec" onclick="window.close()">Cerrar</button></div>
${header("Fase 02 · Misión Corporativa", "Reporte Fase 02 — Herramientas 05–07", user, date, "#009966")}

<div class="section">
  <div class="section-title">Herramienta 05 — COI (Costo de Inacción)</div>
  <div class="calc-desc">No vendas tu solución. Vende el costo de no tenerla.</div>
  <div class="book-quote">"No vendas tu solución. Vende el costo de no tenerla." <div class="ref">→ COI = Pérdida mensual × Tiempo con el problema · Precio máximo 10× = COI ÷ 10</div></div>
  <div class="result-grid">
    <div class="result-item"><label>Pérdida mensual</label><div class="val sm">$${fmt(perdida)}/mes</div></div>
    <div class="result-item"><label>Meses con el problema</label><div class="val sm">${meses} meses</div></div>
    <div class="result-item"><label>Precio solución</label><div class="val sm">$${fmt(precio)}</div></div>
    <div class="result-item"><label>COI total</label><div class="val">$${fmt(coi)}</div></div>
    <div class="result-item"><label>ROI para el cliente</label><div class="val sm">${roi > 0 ? fmt(roi, 1) + "×" : "—"}</div></div>
    <div class="result-item"><label>Payback</label><div class="val sm">${payback > 0 ? fmt(payback, 1) + " meses" : "—"}</div></div>
    <div class="result-item"><label>Precio máx. 10×</label><div class="val sm">${coi > 0 ? "$" + fmt(coi / 10) : "—"}</div></div>
  </div>
  <div class="insight">${coi > 0 ? roi >= 10 ? `Regla 10× cumplida (ROI: ${fmt(roi, 1)}×) ✓ — la discusión de precio queda eliminada. El cliente recupera tu precio en ${fmt(payback, 1)} meses.` : roi >= 3 ? `ROI de ${fmt(roi, 1)}× — zona aceptable. Para llegar a 10×, el precio máximo es USD ${fmt(coi / 10)} o debes elevar el COI documentado.` : `ROI de ${fmt(roi, 1)}× — por debajo del mínimo. Reencuadra el beneficio cuantificado o revisa el precio.` : "Completa los datos del cliente para ver el análisis de COI."}</div>
  <div class="recs"><strong style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#555;">Recomendaciones:</strong><ol>
    <li>El COI debe estar documentado antes de cualquier conversación de ventas. Primero cuantifica el problema, luego presenta la solución.</li>
    ${roi < 10 && precio > 0 ? `<li>Para cumplir la regla 10×, tu precio máximo es USD ${fmt(coi / 10)}. Baja el precio o aumenta el COI documentado.</li>` : ""}
    <li>El payback es el argumento de cierre: "Tu inversión se recupera en ${fmt(payback, 1)} meses — ¿qué pasa si no actúas hoy?"</li>
  </ol></div>
</div>

<div class="section">
  <div class="section-title">Herramienta 06 — Daño por Ineficiencia de Proceso</div>
  <div class="book-quote">"Cuantifica el dolor interno antes de proponer la solución." <div class="ref">→ Daño total = Costo tiempo perdido + Costo de errores</div></div>
  <div class="result-grid">
    <div class="result-item"><label>Personas afectadas</label><div class="val sm">${personas}</div></div>
    <div class="result-item"><label>Horas perdidas/mes</label><div class="val sm">${horasPerd}h/persona</div></div>
    <div class="result-item"><label>Salario promedio/hr</label><div class="val sm">$${fmt(salHora)}</div></div>
    <div class="result-item"><label>Tasa de error</label><div class="val sm">${tasaErr}%</div></div>
    <div class="result-item"><label>Costo tiempo/mes</label><div class="val sm">$${fmt(costoTiempo)}</div></div>
    <div class="result-item"><label>Costo errores/mes</label><div class="val sm">$${fmt(costoErr)}</div></div>
    <div class="result-item"><label>Daño total mensual</label><div class="val">$${fmt(danoMes)}</div></div>
    <div class="result-item"><label>Daño anual</label><div class="val sm">$${fmt(danoMes * 12)}</div></div>
  </div>
  <div class="insight">${danoMes > 0 ? `El proceso le cuesta al cliente USD ${fmt(danoMes)}/mes — USD ${fmt(danoMes * 12)}/año. Usa este número como el COI en tu propuesta comercial.` : "Ingresa los parámetros del proceso para cuantificar el daño."}</div>
</div>

<div class="section">
  <div class="section-title">Herramienta 07 — Daño por Fuga de Talento</div>
  <div class="book-quote">"Dos usos: argumento de retención (negocia antes de salir) + argumento de venta (si tu propuesta incluye retener talento)." <div class="ref">→ Costo = Reclutamiento (30%) + Rampa (6 meses) + Conocimiento perdido (mult)</div></div>
  <div class="result-grid">
    <div class="result-item"><label>Salario anual</label><div class="val sm">$${fmt(salAnual)}</div></div>
    <div class="result-item"><label>Multiplicador conocimiento</label><div class="val sm">${mult}×</div></div>
    <div class="result-item"><label>Costo reclutamiento (30%)</label><div class="val sm">$${fmt(reclu)}</div></div>
    <div class="result-item"><label>Costo rampa (6m)</label><div class="val sm">$${fmt(rampa)}</div></div>
    <div class="result-item"><label>Conocimiento perdido</label><div class="val sm">$${fmt(conocimiento)}</div></div>
    <div class="result-item"><label>Costo total reemplazo</label><div class="val">$${fmt(costoReemplazo)}</div></div>
  </div>
  <div class="insight">${salAnual > 0 ? `Reemplazar a este profesional costaría USD ${fmt(costoReemplazo)} — equivale a ${fmt(costoReemplazo / (salAnual / 12), 1)} meses de salario. ${mult >= 2.5 ? "Conocimiento crítico: el argumento de retención o de venta es muy fuerte." : "Argumento útil para posicionar tu propuesta de valor en proyectos de retención o desarrollo de talento."}` : "Ingresa el salario anual para calcular el costo de reemplazo."}</div>
  <div class="recs"><strong style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#555;">Recomendaciones:</strong><ol>
    <li>Si estás negociando una mejora salarial antes de salir, usa este número: "Mi reemplazo costaría USD ${fmt(costoReemplazo)} — ¿cuánto cuesta retenerme?"</li>
    ${mult >= 2.5 ? "<li>Conocimiento crítico documentado: incluye este análisis en tu propuesta si vendes soluciones de gestión de talento o cultura organizacional.</li>" : ""}
    <li>El costo de reemplazo suele ser invisible para la empresa hasta que sucede — hacer visible lo invisible es tu ventaja comercial.</li>
  </ol></div>
</div>

<div class="section">
  <div class="section-title">Síntesis — Fase 02 · Misión Corporativa</div>
  <div class="summary-box">
    <table class="data">
      <thead><tr><th>Herramienta</th><th>Resultado clave</th></tr></thead>
      <tbody>
        <tr><td>#05 COI</td><td>$${fmt(coi)} total · ROI ${roi > 0 ? fmt(roi, 1) + "×" : "—"} · Precio máx. 10× = $${coi > 0 ? fmt(coi / 10) : "—"}</td></tr>
        <tr><td>#06 Daño Proceso</td><td>$${fmt(danoMes)}/mes · $${fmt(danoMes * 12)}/año</td></tr>
        <tr><td>#07 Daño Talento</td><td>$${fmt(costoReemplazo)} costo de reemplazo · ${mult}× conocimiento</td></tr>
      </tbody>
    </table>
  </div>
</div>

${footer(year)}
<script>setTimeout(()=>window.print(),800);</script>
</body></html>`;
  openPopup(html);
}

/* ─────────────────────────── PHASE 3 ─────────────────────────── */
export function downloadPhase3Report(d: Phase3Data, user: ToolkitUser) {
  const date = new Date().toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric" });
  const year = new Date().getFullYear();

  const objetivo = parseFloat(d.objetivo) || 0;
  const precioC = Math.max(1, parseFloat(d.precioCliente) || 1);
  const conv = Math.max(0.1, parseFloat(d.conversion) || 15);
  const objRes = objetivo * 1.5;
  const clientesNec = objRes / precioC;
  const prospectos = clientesNec / (conv / 100);
  const tamMin = prospectos * 4;

  const beneficio = parseFloat(d.beneficio) || 0;
  const precioO = parseFloat(d.precioOferta) || 0;
  const cert = Math.min(10, Math.max(1, parseFloat(d.certidumbre) || 1));
  const V = (beneficio - precioO) * (cert / 10);
  const ratio = precioO > 0 ? beneficio / precioO : 0;

  const html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"/><title>Reporte Fase 03 — ${user.name}</title><style>${styles()}</style></head>
<body>
<div class="no-print"><button onclick="window.print()">🖨 Imprimir / PDF</button><button class="sec" onclick="window.close()">Cerrar</button></div>
${header("Fase 03 · Mercado", "Reporte Fase 03 — Herramientas 08–09", user, date, "#7C3AED")}

<div class="section">
  <div class="section-title">Herramienta 08 — TAM (Calculadora de Suficiencia)</div>
  <div class="book-quote">"El mercado no tiene que ser enorme. Solo tiene que ser suficientemente grande." <div class="ref">→ TAM mínimo requerido = Prospectos × 4 · Test: ¿Tu TAM real ≥ TAM mínimo?</div></div>
  <div class="result-grid">
    <div class="result-item"><label>Objetivo anual</label><div class="val sm">$${fmt(objetivo)}</div></div>
    <div class="result-item"><label>Objetivo con reserva (1.5×)</label><div class="val sm">$${fmt(objRes)}</div></div>
    <div class="result-item"><label>Precio por cliente/año</label><div class="val sm">$${fmt(precioC)}</div></div>
    <div class="result-item"><label>Tasa de conversión</label><div class="val sm">${conv}%</div></div>
    <div class="result-item"><label>Clientes necesarios</label><div class="val sm">${fmt(Math.ceil(clientesNec))}</div></div>
    <div class="result-item"><label>Prospectos requeridos</label><div class="val sm">${fmt(Math.ceil(prospectos))}</div></div>
    <div class="result-item"><label>TAM mínimo requerido</label><div class="val">${fmtK(tamMin)}</div></div>
  </div>
  <div class="insight">${objetivo > 0 ? `Para USD ${fmtK(objetivo)}/año necesitas ${fmt(Math.ceil(clientesNec))} clientes. Con ${conv}% de conversión, eso requiere alcanzar ${fmt(Math.ceil(prospectos))} prospectos. Tu TAM mínimo requerido es ${fmtK(tamMin)}. Si tu mercado total es mayor a eso, la viabilidad está confirmada.` : "Ingresa tu objetivo anual para calcular el TAM mínimo requerido."}</div>
  <div class="recs"><strong style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#555;">Recomendaciones:</strong><ol>
    <li>Tasa de conversión recomendada para inicio: 15% (red de contactos) — evita los canales fríos hasta tener casos de éxito documentados.</li>
    <li>El 1.5× de reserva es intencional: siempre hay prospectos que no avanzan por razones externas al pitch.</li>
    <li>Si el TAM real de tu nicho es menor que el mínimo requerido, amplía el segmento o sube el precio por cliente.</li>
  </ol></div>
</div>

<div class="section">
  <div class="section-title">Herramienta 09 — Ecuación del Valor Percibido (V)</div>
  <div class="book-quote">"Tu precio nunca debería negociarse si el beneficio es 10× mayor." <div class="ref">→ V = (Beneficio − Precio) × (Certidumbre ÷ 10) · Precio máx = Beneficio ÷ 10</div></div>
  <div class="result-grid">
    <div class="result-item"><label>Beneficio cuantificado</label><div class="val sm">$${fmt(beneficio)}</div></div>
    <div class="result-item"><label>Precio de la oferta</label><div class="val sm">$${fmt(precioO)}</div></div>
    <div class="result-item"><label>Certidumbre</label><div class="val sm">${cert}/10</div></div>
    <div class="result-item"><label>Valor percibido (V)</label><div class="val">$${fmt(V)}</div></div>
    <div class="result-item"><label>Ratio B/P</label><div class="val sm">${ratio > 0 ? fmt(ratio, 1) + "×" : "—"}</div></div>
    <div class="result-item"><label>Precio máx. 10×</label><div class="val sm">${beneficio > 0 ? "$" + fmt(beneficio / 10) : "—"}</div></div>
  </div>
  <div class="insight">${beneficio > 0 && precioO > 0 ? ratio >= 10 ? `Ratio ${fmt(ratio, 1)}× ✓ — la discusión de precio está eliminada. El cliente percibe USD ${fmt(V)} de valor neto.` : ratio >= 5 ? `Ratio ${fmt(ratio, 1)}× — zona aceptable. Para 10×, precio máximo: USD ${fmt(beneficio / 10)}.` : `Ratio ${fmt(ratio, 1)}× — bajo el mínimo. Documenta un beneficio de al menos USD ${fmt(precioO * 10)} para justificar el precio actual.` : "Ingresa beneficio cuantificado y precio para el análisis de valor percibido."}</div>
  <div class="recs"><strong style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#555;">Recomendaciones:</strong><ol>
    <li>El beneficio cuantificado debe ser un número concreto derivado del análisis de COI (Herramienta #05), no una estimación genérica.</li>
    <li>La certidumbre del beneficio se construye con casos de éxito previos — cada cliente satisfecho sube este número.</li>
    ${ratio < 10 ? `<li>Tu precio máximo para la regla 10× es USD ${fmt(beneficio / 10)}. Por encima de ese número, el cliente racionalizará la decisión negativamente.</li>` : ""}
  </ol></div>
</div>

<div class="section">
  <div class="section-title">Síntesis — Fase 03 · Mercado</div>
  <div class="summary-box">
    <table class="data">
      <thead><tr><th>Herramienta</th><th>Resultado clave</th></tr></thead>
      <tbody>
        <tr><td>#08 TAM</td><td>TAM mínimo: ${fmtK(tamMin)} · ${fmt(Math.ceil(clientesNec))} clientes · ${fmt(Math.ceil(prospectos))} prospectos</td></tr>
        <tr><td>#09 Valor Percibido</td><td>V = $${fmt(V)} · Ratio ${ratio > 0 ? fmt(ratio, 1) + "×" : "—"} · Precio máx. 10×: $${beneficio > 0 ? fmt(beneficio / 10) : "—"}</td></tr>
      </tbody>
    </table>
  </div>
</div>

${footer(year)}
<script>setTimeout(()=>window.print(),800);</script>
</body></html>`;
  openPopup(html);
}

/* ─────────────────────────── PHASE 4 ─────────────────────────── */
export function downloadPhase4Report(d: Phase4Data, user: ToolkitUser) {
  const date = new Date().toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric" });
  const year = new Date().getFullYear();

  // #10 CAC/LTV
  const gasto = parseFloat(d.gastoMarketing) || 0;
  const clientesAdq = Math.max(1, parseFloat(d.clientesAdq) || 1);
  const tarifa = parseFloat(d.tarifaMensual) || 0;
  const mesesRet = parseFloat(d.mesesRetencion) || 0;
  const margen = Math.min(100, parseFloat(d.margenNeto) || 0);
  const cac = gasto / clientesAdq;
  const ltv = tarifa * mesesRet * (margen / 100);
  const ratio = cac > 0 ? ltv / cac : (gasto === 0 && ltv > 0 ? Infinity : 0);
  const ratioStr = !isFinite(ratio) ? "∞ (modelo óptimo)" : fmt(ratio, 1) + "×";

  // #11 N Clientes
  const cme = parseFloat(d.cme) || 0;
  const margenC = parseFloat(d.margenCliente) || 0;
  const n = margenC > 0 ? cme / margenC : 0;

  // #12 MRR
  const clientes = parseFloat(d.clientesActivos) || 0;
  const tarifaMRR = parseFloat(d.tarifaMRR) || 0;
  const crec = parseFloat(d.crecimientoMRR) || 0;
  const churn = parseFloat(d.churnMRR) || 0;
  const mrr = clientes * tarifaMRR;
  const crecNeto = crec - churn;
  const mrr12 = mrr * Math.pow(1 + crecNeto / 100, 12);

  const html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"/><title>Reporte Fase 04 — ${user.name}</title><style>${styles()}</style></head>
<body>
<div class="no-print"><button onclick="window.print()">🖨 Imprimir / PDF</button><button class="sec" onclick="window.close()">Cerrar</button></div>
${header("Fase 04 · Unidad Económica", "Reporte Fase 04 — Herramientas 10–12", user, date, "#B45309")}

<div class="section">
  <div class="section-title">Herramienta 10 — CAC / LTV (Salud del Negocio)</div>
  <div class="book-quote">"Si adquieres clientes por tu red de contactos → CAC = 0 → Ratio = ∞ (modelo óptimo del Doble Agente)." <div class="ref">→ LTV = Tarifa × Meses × Margen neto · Ratio saludable ≥ 3×</div></div>
  <div class="result-grid">
    <div class="result-item"><label>Gasto marketing</label><div class="val sm">$${fmt(gasto)}</div></div>
    <div class="result-item"><label>Clientes adquiridos</label><div class="val sm">${clientesAdq}</div></div>
    <div class="result-item"><label>CAC</label><div class="val sm">${cac > 0 ? "$" + fmt(cac) : "CAC = 0 ✓"}</div></div>
    <div class="result-item"><label>LTV</label><div class="val sm">$${fmt(ltv)}</div></div>
    <div class="result-item"><label>Ratio LTV/CAC</label><div class="val">${ratioStr}</div></div>
    <div class="result-item"><label>Estado</label><div class="val sm">${!isFinite(ratio) ? "Modelo óptimo ✓" : ratio >= 5 ? "Saludable" : ratio >= 3 ? "Mínimo viable" : ratio >= 1 ? "Por debajo del mínimo" : "Insostenible"}</div></div>
  </div>
  <div class="insight">${!isFinite(ratio) ? "CAC = 0: adquieres clientes por referidos o red — modelo óptimo del Doble Agente." : ratio >= 3 ? `Ratio LTV/CAC de ${fmt(ratio, 1)}× — modelo sostenible.` : `Ratio de ${fmt(ratio, 1)}× — por debajo del mínimo viable (3×). Mejora la retención o reduce el CAC.`}</div>
</div>

<div class="section">
  <div class="section-title">Herramienta 11 — N (Clientes para la Libertad)</div>
  <div class="book-quote">"El cliente #(n+1) es el punto de inflexión: a partir de ahí, quedarse en la oficina es pérdida verificable de dinero." <div class="ref">→ n = CME ÷ Margen neto mensual por cliente · Alerta: n > 20 → revisar precio</div></div>
  <div class="result-grid">
    <div class="result-item"><label>CME mensual</label><div class="val sm">$${fmt(cme)}</div></div>
    <div class="result-item"><label>Margen por cliente</label><div class="val sm">$${fmt(margenC)}/mes</div></div>
    <div class="result-item"><label>n (clientes para libertad)</label><div class="val">${n > 0 ? fmt(n, 1) : "—"}</div></div>
    <div class="result-item"><label>Punto de inflexión</label><div class="val sm">${n > 0 ? "Cliente #" + (Math.ceil(n) + 1) : "—"}</div></div>
  </div>
  <div class="insight">${n > 0 ? n <= 20 ? `Necesitas ${fmt(n, 1)} clientes para igualar tu CME. El cliente #${Math.ceil(n) + 1} es cuando quedarse en la oficina es pérdida verificable de dinero.` : `n = ${fmt(n, 1)} — por encima de 20. El libro recomienda revisar precio o margen: duplicar el margen reduciría n a ${fmt(n / 2, 1)}.` : "Ingresa CME y margen por cliente para calcular tu número de libertad."}</div>
</div>

<div class="section">
  <div class="section-title">Herramienta 12 — MRR (Proyección de Ingresos Recurrentes)</div>
  <div class="book-quote">"La métrica reina. Convierte el futuro incierto en certeza matemática." <div class="ref">→ Señal crítica: Si churn > crecimiento → contracción neta. Prioriza retención.</div></div>
  <div class="result-grid">
    <div class="result-item"><label>Clientes activos</label><div class="val sm">${clientes}</div></div>
    <div class="result-item"><label>Tarifa mensual</label><div class="val sm">$${fmt(tarifaMRR)}/cliente</div></div>
    <div class="result-item"><label>MRR actual</label><div class="val">$${fmt(mrr)}</div></div>
    <div class="result-item"><label>ARR</label><div class="val sm">$${fmt(mrr * 12)}</div></div>
    <div class="result-item"><label>Crecimiento neto/mes</label><div class="val sm">${crecNeto > 0 ? "+" : ""}${fmt(crecNeto, 1)}%</div></div>
    <div class="result-item"><label>MRR proyectado mes 12</label><div class="val sm">$${fmt(mrr12)}</div></div>
  </div>
  <div class="insight">${mrr > 0 ? crecNeto < 0 ? `⚠ Churn (${churn}%) supera al crecimiento (${crec}%) — contracción neta. El MRR caerá a USD ${fmt(mrr12)} en 12 meses. Prioriza retención.` : `MRR de USD ${fmt(mrr)} creciendo al ${fmt(crecNeto, 1)}% neto mensual → USD ${fmt(mrr12)} en 12 meses.` : "Ingresa clientes activos y tarifa para calcular tu MRR."}</div>
</div>

<div class="section">
  <div class="section-title">Síntesis — Fase 04 · Unidad Económica</div>
  <div class="summary-box">
    <table class="data">
      <thead><tr><th>Herramienta</th><th>Resultado clave</th></tr></thead>
      <tbody>
        <tr><td>#10 CAC/LTV</td><td>Ratio ${ratioStr} · LTV $${fmt(ltv)} · CAC ${cac > 0 ? "$" + fmt(cac) : "0 ✓"}</td></tr>
        <tr><td>#11 N Clientes</td><td>n = ${n > 0 ? fmt(n, 1) : "—"} · Punto inflexión: cliente #${n > 0 ? Math.ceil(n) + 1 : "—"}</td></tr>
        <tr><td>#12 MRR</td><td>$${fmt(mrr)}/mes actual → $${fmt(mrr12)}/mes en 12M · Crec. neto ${fmt(crecNeto, 1)}%</td></tr>
      </tbody>
    </table>
  </div>
</div>

${footer(year)}
<script>setTimeout(()=>window.print(),800);</script>
</body></html>`;
  openPopup(html);
}

/* ─────────────────────────── PHASE 5 ─────────────────────────── */
export function downloadPhase5Report(d: Phase5Data, user: ToolkitUser) {
  const date = new Date().toLocaleDateString("es-PE", { year: "numeric", month: "long", day: "numeric" });
  const year = new Date().getFullYear();

  // #13 CME
  const salarioN = parseFloat(d.salarioN) || 0;
  const beneficios = parseFloat(d.beneficios) || 0;
  const reserva = Math.min(100, parseFloat(d.reserva) || 20);
  const cmeBase = salarioN + beneficios;
  const cmeAjustado = cmeBase * (1 + reserva / 100);

  // #14 Runway
  const capital = parseFloat(d.capitalLiquido) || 0;
  const cmeRef = Math.max(1, parseFloat(d.cmeRef) || 1);
  const runwayActual = capital / cmeRef;
  const runwayReq = cmeRef * 6;
  const gap = Math.max(0, runwayReq - capital);
  const listo14 = capital >= runwayReq;

  // #15 PNR
  const mrr = parseFloat(d.mrr) || 0;
  const cmePNR = parseFloat(d.cmePNR) || 0;
  const capitalB = parseFloat(d.capitalBanco) || 0;
  const horas = parseFloat(d.horasSem) || 0;
  const valorH = parseFloat(d.valorHoraPNR) || 0;
  const cond1 = cmePNR > 0 ? mrr >= cmePNR : false;
  const cond2 = cmePNR > 0 ? capitalB >= cmePNR * 6 : false;
  const go = cond1 && cond2;
  const costoOps = horas * 4 * valorH;

  const html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"/><title>Reporte Fase 05 — ${user.name}</title><style>${styles()}</style></head>
<body>
<div class="no-print"><button onclick="window.print()">🖨 Imprimir / PDF</button><button class="sec" onclick="window.close()">Cerrar</button></div>
${header("Fase 05 · Punto de No Retorno", "Reporte Fase 05 — Herramientas 13–15", user, date, "#C23048")}

<div class="section">
  <div class="section-title">Herramienta 13 — CME (Costo Mensual de Existencia)</div>
  <div class="book-quote">"La cifra real que tu negocio debe superar para que la renuncia sea racional." <div class="ref">→ CME ajustado = (Salario + Beneficios) × 1.20 (reserva estándar del libro)</div></div>
  <div class="result-grid">
    <div class="result-item"><label>Salario neto</label><div class="val sm">$${fmt(salarioN)}/mes</div></div>
    <div class="result-item"><label>Beneficios corporativos</label><div class="val sm">$${fmt(beneficios)}/mes</div></div>
    <div class="result-item"><label>Reserva de seguridad</label><div class="val sm">${reserva}%</div></div>
    <div class="result-item"><label>CME base</label><div class="val sm">$${fmt(cmeBase)}</div></div>
    <div class="result-item"><label>CME ajustado</label><div class="val">$${fmt(cmeAjustado)}/mes</div></div>
  </div>
  <div style="background:#f7f8ff;border:1.5px solid rgba(20,0,212,0.12);border-radius:10px;padding:12px 16px;margin-bottom:12px;">
    <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;color:rgba(20,0,212,0.7);margin-bottom:8px;">Los 3 escenarios del libro</div>
    <table class="diag-table">
      <tr><td>Supervivencia</td><td>CME × 0.6 = $${fmt(cmeAjustado * 0.6)}/mes</td><td style="color:#666;font-size:11px;">Cubre gastos básicos únicamente</td></tr>
      <tr><td>Extracción ★</td><td>CME × 1.0 = $${fmt(cmeAjustado)}/mes</td><td style="color:#1400D4;font-weight:700;font-size:11px;">= Compensación corporativa → ejecutar renuncia</td></tr>
      <tr><td>Independencia</td><td>CME × 2.0 = $${fmt(cmeAjustado * 2)}/mes</td><td style="color:#666;font-size:11px;">Objetivo 12–18 meses post-renuncia</td></tr>
    </table>
  </div>
  <div class="insight">${cmeBase > 0 ? `Tu CME ajustado es USD ${fmt(cmeAjustado)}/mes. Este es el número objetivo para la herramienta #15 (GO/NO GO). Para ejecutar la renuncia, tu MRR debe igualar o superar esta cifra.` : "Ingresa tu salario y beneficios para calcular tu CME."}</div>
</div>

<div class="section">
  <div class="section-title">Herramienta 14 — Runway de Salida</div>
  <div class="book-quote">"El colchón mínimo en banco para que la renuncia deje de ser un salto al vacío." <div class="ref">→ Runway requerido = CME ajustado × 6 · ✓ Listo: Capital líquido ≥ CME × 6</div></div>
  <div class="result-grid">
    <div class="result-item"><label>Capital líquido</label><div class="val sm">$${fmt(capital)}</div></div>
    <div class="result-item"><label>CME ajustado ref.</label><div class="val sm">$${fmt(cmeRef)}/mes</div></div>
    <div class="result-item"><label>Runway requerido</label><div class="val sm">$${fmt(runwayReq)} (6 meses)</div></div>
    <div class="result-item"><label>Runway actual</label><div class="val">${fmt(runwayActual, 1)} meses</div></div>
    <div class="result-item"><label>Estado</label><div class="val sm">${listo14 ? "✓ Listo" : "⚠ En progreso"}</div></div>
    ${gap > 0 ? `<div class="result-item"><label>Gap a cerrar</label><div class="val sm">$${fmt(gap)}</div></div>` : ""}
  </div>
  <div class="insight">${capital > 0 ? listo14 ? `Runway de ${fmt(runwayActual, 1)} meses ✓ — superas los 6 meses mínimos requeridos. Esta condición está cumplida para el GO/NO GO.` : `Runway actual: ${fmt(runwayActual, 1)} meses. Faltan USD ${fmt(gap)} para el mínimo requerido. A USD ${fmt(cmeRef * 0.15)}/mes de extracción (15%), lo logras en ${fmt(gap / (cmeRef * 0.15), 0)} meses.` : "Ingresa tu capital líquido y el CME para calcular tu runway de salida."}</div>
</div>

<div class="section">
  <div class="section-title">Herramienta 15 — Punto de No Retorno (GO / NO GO)</div>
  <div class="book-quote">"Cuando ambas condiciones son verdes, quedarse es pérdida verificable de dinero." <div class="ref">→ GO = (MRR ≥ CME ajustado) AND (Banco ≥ CME × 6)</div></div>
  <div class="result-grid">
    <div class="result-item"><label>MRR actual</label><div class="val sm">$${fmt(mrr)}/mes</div></div>
    <div class="result-item"><label>CME ajustado</label><div class="val sm">$${fmt(cmePNR)}/mes</div></div>
    <div class="result-item"><label>Capital en banco</label><div class="val sm">$${fmt(capitalB)}</div></div>
    <div class="result-item"><label>CME × 6 requerido</label><div class="val sm">$${fmt(cmePNR * 6)}</div></div>
    <div class="result-item"><label>Condición 1 (MRR ≥ CME)</label><div class="val sm">${cond1 ? "✓ Cumplida" : "✗ Pendiente"}</div></div>
    <div class="result-item"><label>Condición 2 (Banco ≥ CME×6)</label><div class="val sm">${cond2 ? "✓ Cumplida" : "✗ Pendiente"}</div></div>
    <div class="result-item"><label>Decisión final</label><div class="val">${go ? "GO ✓" : "NO GO"}</div></div>
    ${costoOps > 0 ? `<div class="result-item"><label>Costo de oportunidad/mes</label><div class="val sm">$${fmt(costoOps)}</div></div>` : ""}
  </div>
  <div class="insight">${cmePNR > 0 ? go ? `GO ✓ — Ambas condiciones cumplidas. Quedarse en la oficina representa una pérdida verificable de USD ${costoOps > 0 ? fmt(costoOps) : "calculable"}/mes en costo de oportunidad.` : `NO GO — ${!cond1 ? `Faltan USD ${fmt(cmePNR - mrr)}/mes de MRR.` : "Condición 1 ✓."} ${!cond2 ? `Faltan USD ${fmt(Math.max(0, cmePNR * 6 - capitalB))} en banco.` : "Condición 2 ✓."}` : "Ingresa tu MRR y CME para el análisis GO/NO GO."}</div>
  <div class="recs"><strong style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#555;">Recomendaciones:</strong><ol>
    ${go ? "<li>Las condiciones están dadas. Define una fecha concreta de salida — la ambigüedad es el mayor enemigo de la transición.</li><li>Prepara un plan de traspaso profesional. La salida debe ser limpia para proteger tu reputación y futuras referencias.</li>" : ""}
    ${!cond1 && cmePNR > 0 ? `<li>Para Condición 1: necesitas USD ${fmt(cmePNR - mrr)} adicionales de MRR. Revisa el precio de tu oferta y el número de clientes activos para cerrar esta brecha.</li>` : ""}
    ${!cond2 && cmePNR > 0 ? "<li>Para Condición 2: activa el protocolo de extracción (Herramienta #03) con la máxima tasa posible hasta cubrir el runway.</li>" : ""}
    <li>El GO/NO GO es binario pero el proceso es gradual. Monitorea ambas condiciones mensualmente con esta calculadora.</li>
  </ol></div>
</div>

<div class="section">
  <div class="section-title">Síntesis Final — Fase 05 · Punto de No Retorno</div>
  <div class="summary-box">
    <table class="data">
      <thead><tr><th>Herramienta</th><th>Resultado clave</th><th>Estado</th></tr></thead>
      <tbody>
        <tr><td>#13 CME</td><td>$${fmt(cmeAjustado)}/mes ajustado (+${reserva}%)</td><td>${cmeBase > 0 ? "Calculado" : "—"}</td></tr>
        <tr><td>#14 Runway</td><td>${fmt(runwayActual, 1)} meses · Gap: $${fmt(gap)}</td><td>${listo14 ? "✓ Listo" : "⚠ En progreso"}</td></tr>
        <tr><td>#15 GO/NO GO</td><td>${go ? "GO ✓ — Ambas condiciones verdes" : `NO GO — ${cond1 ? "C1✓" : "C1✗"} · ${cond2 ? "C2✓" : "C2✗"}`}</td><td>${go ? "✓ EJECUTAR" : "Pendiente"}</td></tr>
      </tbody>
    </table>
  </div>
</div>

${footer(year)}
<script>setTimeout(()=>window.print(),800);</script>
</body></html>`;
  openPopup(html);
}
