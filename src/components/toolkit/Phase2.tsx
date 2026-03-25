"use client";
import { useState } from "react";
import { CalcCard, NumInput, SelectInput, ResultBox } from "./CalcCard";
import { TK } from "./theme";

const COLOR = TK.phase2;

function fmt(n: number, decimals = 0) {
  return n.toLocaleString("es-PE", { maximumFractionDigits: decimals });
}

/* ── Calc 1: Valor Real de tu Salario ── */
function ValorSalario() {
  const [salarioBruto, setSalarioBruto] = useState("0");
  const [bonos, setBonos] = useState("0");
  const [horasReales, setHorasReales] = useState("50");

  const salario = parseFloat(salarioBruto) || 0;
  const bonosAnual = parseFloat(bonos) || 0;
  const horas = Math.max(1, parseFloat(horasReales) || 1);

  const totalAnual = salario + bonosAnual;
  const totalMensual = totalAnual / 12;
  const horasAnuales = horas * 52;
  const valorHora = horasAnuales > 0 ? totalAnual / horasAnuales : 0;
  const valorHoraConsultoria = valorHora * 4;

  const insight =
    valorHora > 0
      ? `Cada hora que das a la empresa vale USD ${fmt(valorHora, 1)}. Un consultor externo con tu perfil cobra entre USD ${fmt(valorHora * 3, 0)} y USD ${fmt(valorHoraConsultoria, 0)}/h. Hay una brecha que puedes cerrar.`
      : "Ingresa tu salario y horas reales para ver el análisis.";

  return (
    <CalcCard
      title="Valor Real por Hora de Trabajo"
      description="Descubre cuánto vale realmente tu hora — y cuánto deberías cobrar si operaras como consultor independiente."
      mision="Misión 05"
      color={COLOR}
    >
      <NumInput label="Salario bruto anual (USD)" value={salarioBruto} onChange={setSalarioBruto} prefix="$" />
      <NumInput label="Bonos y beneficios anuales (USD)" value={bonos} onChange={setBonos} prefix="$" />
      <NumInput label="Horas reales trabajadas / semana" value={horasReales} onChange={setHorasReales} suffix="h" />
      <ResultBox
        color={COLOR}
        items={[
          { label: "Total anual", value: `$${fmt(totalAnual)}` },
          { label: "Ingreso mensual", value: `$${fmt(totalMensual)}`, highlight: true },
          { label: "Valor real / hora", value: `$${fmt(valorHora, 1)}` },
          { label: "Precio consultoría sugerido", value: `$${fmt(valorHoraConsultoria, 0)}/h` },
        ]}
        insight={insight}
      />
    </CalcCard>
  );
}

/* ── Calc 2: Potencial de Consultoría / Know-How ── */
function PotencialConsultoria() {
  const [aniosExp, setAniosExp] = useState("10");
  const [tarifaSesion, setTarifaSesion] = useState("0");
  const [sesionesMes, setSesionesMes] = useState("4");
  const [clientesMes, setClientesMes] = useState("2");

  const tarifa = parseFloat(tarifaSesion) || 0;
  const sesiones = parseFloat(sesionesMes) || 0;
  const clientes = parseFloat(clientesMes) || 0;

  const ingresoMensual = tarifa * sesiones * clientes;
  const ingresoAnual = ingresoMensual * 12;
  const multiplicador = ingresoAnual > 0 && parseFloat(aniosExp) > 0
    ? (ingresoAnual / (parseFloat(aniosExp) * 12 * 100)).toFixed(1)
    : "—";

  const insight =
    ingresoMensual > 0
      ? `Con ${sesiones} sesiones/mes a ${clientes} clientes, podrías generar USD ${fmt(ingresoMensual)}/mes. En 12 meses: USD ${fmt(ingresoAnual)}. Esto es posible con tus horas disponibles fuera del horario laboral.`
      : "Ingresa una tarifa por sesión para ver tu potencial de monetización.";

  return (
    <CalcCard
      title="Potencial de Monetización de Know-How"
      description="Calcula cuánto puedes generar vendiendo tu conocimiento como servicio, sin dejar el empleo."
      mision="Misión 06"
      color={COLOR}
    >
      <NumInput label="Años de expertise acumulado" value={aniosExp} onChange={setAniosExp} suffix="años" />
      <NumInput label="Tarifa por sesión / hora (USD)" value={tarifaSesion} onChange={setTarifaSesion} prefix="$" />
      <NumInput label="Sesiones promedio por cliente / mes" value={sesionesMes} onChange={setSesionesMes} suffix="ses." />
      <NumInput label="Clientes simultáneos realistas" value={clientesMes} onChange={setClientesMes} suffix="clientes" />
      <ResultBox
        color={COLOR}
        items={[
          { label: "Ingreso mensual potencial", value: `$${fmt(ingresoMensual)}`, highlight: true },
          { label: "Proyección anual", value: `$${fmt(ingresoAnual)}` },
          { label: "ROI de tu experiencia", value: `${multiplicador}x` },
        ]}
        insight={insight}
      />
    </CalcCard>
  );
}

/* ── Calc 3: Costo de Oportunidad Corporativa ── */
function CostoOportunidad() {
  const [salarioNeto, setSalarioNeto] = useState("0");
  const [proyectoMes, setProyectoMes] = useState("0");
  const [mesesRestantes, setMesesRestantes] = useState("18");

  const salario = parseFloat(salarioNeto) || 0;
  const proyecto = parseFloat(proyectoMes) || 0;
  const meses = Math.max(1, parseFloat(mesesRestantes) || 1);

  const totalSalario = salario * meses;
  const totalProyecto = proyecto * meses;
  const costoOportunidad = totalProyecto - totalSalario;
  const mesEquilibrio =
    salario > 0 && proyecto > salario
      ? Math.ceil(salario / (proyecto - salario) * meses)
      : 0;

  const balance = costoOportunidad > 0 ? "A favor del proyecto" : costoOportunidad < 0 ? "A favor del empleo" : "Equilibrio";
  const balanceColor = costoOportunidad > 0 ? TK.success : costoOportunidad < 0 ? TK.warning : TK.textMuted;

  const insight =
    salario > 0 && proyecto > 0
      ? costoOportunidad > 0
        ? `Tu proyecto tiene un potencial de ${fmt(costoOportunidad)} USD adicional vs quedarte en el empleo en ${meses} meses. El momento de actuar es ahora.`
        : `El salario sigue siendo más alto en el horizonte de ${meses} meses. Usa este tiempo para construir sin presión y alcanzar el equilibrio antes de salir.`
      : "Ingresa salario y potencial del proyecto para el análisis.";

  return (
    <CalcCard
      title="Costo de Oportunidad Corporativo"
      description="Compara el ingreso de tu empleo vs el potencial de tu proyecto para saber cuándo vale la pena el cambio."
      mision="Misión 07"
      color={COLOR}
    >
      <NumInput label="Salario neto mensual (USD)" value={salarioNeto} onChange={setSalarioNeto} prefix="$" />
      <NumInput label="Potencial mensual de tu proyecto (USD)" value={proyectoMes} onChange={setProyectoMes} prefix="$" />
      <NumInput label="Horizonte de análisis" value={mesesRestantes} onChange={setMesesRestantes} suffix="meses" />
      <ResultBox
        color={balanceColor}
        items={[
          { label: "Balance en el período", value: `$${costoOportunidad > 0 ? "+" : ""}${fmt(costoOportunidad)}`, highlight: true },
          { label: "Resultado", value: balance },
          ...(mesEquilibrio > 0 ? [{ label: "Mes de equilibrio estimado", value: `Mes ${mesEquilibrio}` }] : []),
        ]}
        insight={insight}
      />
    </CalcCard>
  );
}

/* ── Phase 2 ── */
export default function Phase2() {
  return (
    <section id="fase-02" style={{ marginBottom: 80 }}>
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
          <span style={{ fontSize: 11, fontWeight: 900, color: COLOR, fontFamily: TK.fontHeading }}>02</span>
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
            Fase 02 · Misión Corporativa
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
            Extrae el máximo valor de tu posición actual
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
        <ValorSalario />
        <PotencialConsultoria />
        <CostoOportunidad />
      </div>
    </section>
  );
}
