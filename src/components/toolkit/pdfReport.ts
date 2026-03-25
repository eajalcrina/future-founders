import { ToolkitUser } from "./AuthContext";

export function generateGlobalReport(user: ToolkitUser) {
  const date = new Date().toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const year = new Date().getFullYear();

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <title>Reporte Toolkit — ${user.name}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial, Helvetica, sans-serif; background: #fff; color: #0B0B1E; }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .no-print { display: none !important; }
    }
    .no-print {
      text-align: center; padding: 16px;
      background: #f3f4f6; border-bottom: 1px solid #e5e7eb;
    }
    .no-print button {
      padding: 10px 28px; background: #1400D4; color: white;
      border: none; border-radius: 8px; font-size: 14px;
      font-weight: 700; cursor: pointer; margin: 0 6px;
    }
    .no-print button.sec {
      background: transparent; color: #666; border: 1px solid #ccc;
    }
    .section { padding: 28px 32px; border-bottom: 1px solid #e5e7eb; }
    .section-title {
      font-size: 11px; font-weight: 700; letter-spacing: 0.15em;
      text-transform: uppercase; color: #1400D4;
      border-bottom: 1.5px solid #1400D4; padding-bottom: 4px;
      margin-bottom: 14px;
    }
    .tip {
      background: rgba(20,0,212,0.05); border-left: 3px solid #1400D4;
      padding: 12px 16px; border-radius: 4px; font-size: 12.5px;
      line-height: 1.65; color: #333; margin-top: 14px;
    }
    table { width: 100%; border-collapse: collapse; font-size: 12px; }
    th { background: rgba(20,0,212,0.08); text-align: left; padding: 7px 10px; font-weight: 700; }
    td { padding: 6px 10px; border-bottom: 1px solid #eee; }
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
      <div style="font-size:11px;color:rgba(255,255,255,0.5);margin-top:2px;">Toolkit Doble Agente — Reporte de Progreso</div>
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
      <div style="font-size:11px;color:rgba(255,255,255,0.7);">15 Calculadoras</div>
      <div style="font-size:20px;font-weight:900;color:#F5C800;">5 Fases</div>
    </div>
  </div>

  <!-- Intro -->
  <div class="section">
    <div class="section-title">Sobre este Toolkit</div>
    <p style="font-size:13px;line-height:1.72;color:#333;">
      Este reporte resume las fases del Toolkit Doble Agente desarrollado por Eddie Ajalcriña y Lorenzo Ortiz.
      Contiene 15 calculadoras interactivas distribuidas en 5 fases diseñadas para convertir tu experiencia
      corporativa en patrimonio empresarial.
    </p>
    <div class="tip">
      <strong>Instrucción:</strong> Usa cada calculadora con tus datos reales. Los resultados son tan precisos
      como la información que ingresas. Actualiza los valores mensualmente para hacer seguimiento de tu progreso.
    </div>
  </div>

  <!-- Phase summary table -->
  <div class="section">
    <div class="section-title">Resumen de Fases y Herramientas</div>
    <table>
      <thead>
        <tr>
          <th style="width:80px;">Fase</th>
          <th>Nombre</th>
          <th>Herramientas incluidas</th>
          <th style="width:100px;">Misiones</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong style="color:#1400D4;">01</strong></td>
          <td><strong>Infiltración</strong></td>
          <td>Inventario de Activos · Riesgo Laboral · Auditoría de Tiempo</td>
          <td>01 – 03</td>
        </tr>
        <tr>
          <td><strong style="color:#009966;">02</strong></td>
          <td><strong>Misión Corp.</strong></td>
          <td>Valor Real por Hora · Potencial de Know-How · Costo de Oportunidad</td>
          <td>05 – 07</td>
        </tr>
        <tr>
          <td><strong style="color:#7C3AED;">03</strong></td>
          <td><strong>Mercado</strong></td>
          <td>TAM/SAM/SOM · Precio Basado en Valor · Ventaja Competitiva</td>
          <td>09 – 11</td>
        </tr>
        <tr>
          <td><strong style="color:#B45309;">04</strong></td>
          <td><strong>Unidad Económica</strong></td>
          <td>Margen y Rentabilidad · Punto de Equilibrio · CAC vs LTV</td>
          <td>13 – 15</td>
        </tr>
        <tr>
          <td><strong style="color:#C23048;">05</strong></td>
          <td><strong>No Retorno</strong></td>
          <td>Punto de Salida · Proyección 12M · Libertad Financiera</td>
          <td>17 – 19</td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Next steps -->
  <div class="section">
    <div class="section-title">Próximos Pasos Recomendados</div>
    <ol style="padding-left:18px;font-size:13px;line-height:2;color:#333;">
      <li>Completa la <strong>Fase 01</strong> con datos reales de tu situación actual</li>
      <li>Usa la <strong>Calculadora de Costo de Oportunidad</strong> para validar que vale la pena actuar ahora</li>
      <li>Define tu oferta usando el <strong>Precio Basado en Valor</strong> antes de hablar con un solo cliente</li>
      <li>Construye tu <strong>Unidad Económica</strong> — sin margen, no hay empresa</li>
      <li>Fija tu <strong>Fecha de Salida</strong> con la Calculadora de Punto de No Retorno</li>
    </ol>
    <div class="tip">
      El Toolkit es la capa de ejecución del libro Doble Agente. Si aún no tienes el libro,
      descárgalo en <strong>futurefounders.pe</strong> para el contexto completo de cada fase.
    </div>
  </div>

  <!-- Footer -->
  <div style="background:#050508;color:rgba(255,255,255,0.4);padding:14px 32px;font-size:10px;display:flex;justify-content:space-between;">
    <span>© ${year} Future Founders — Documento confidencial · Uso personal</span>
    <span>futurefounders.pe · ff@redesignlab.org</span>
  </div>
</body>
</html>`;

  const popup = window.open("", "_blank", "width=920,height=1100,scrollbars=yes");
  if (popup) {
    popup.document.write(html);
    popup.document.close();
  }
}
