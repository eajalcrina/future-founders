"use client";
import { useState } from "react";
import { CalcCard, NumInput, ResultBox } from "./CalcCard";
import { TK } from "./theme";

const COLOR = TK.phase5;

function fmt(n: number, decimals = 0) {
  return n.toLocaleString("es-PE", { maximumFractionDigits: decimals });
}

/* ── Calc 1: Punto de Salida Corporativa ── */
function PuntoSalida() {
  const [salarioNeto, setSalarioNeto] = useState("0");
  const [ingresoProyecto, setIngresoProyecto] = useState("0");
  const [pctObjetivo, setPctObjetivo] = useState("80");
  const [runway, setRunway] = useState("0");

  const salario = parseFloat(salarioNeto) || 0;
  const proyecto = parseFloat(ingresoProyecto) || 0;
  const obj = Math.min(100, parseFloat(pctObjetivo) || 80);
  const runwayM = parseFloat(runway) || 0;

  const metaIngreso = salario * (obj / 100);
  const progreso = salario > 0 ? Math.min(100, Math.round((proyecto / metaIngreso) * 100)) : 0;
  const deficit = Math.max(0, metaIngreso - proyecto);
  const listo = progreso >= 100;

  const progresoColor =
    progreso >= 100 ? TK.success : progreso >= 60 ? COLOR : TK.danger;

  const insight =
    salario > 0 && proyecto > 0
      ? listo
        ? `¡Punto de salida alcanzado! Tu proyecto ya genera el ${obj}% de tu salario. Con ${runwayM} meses de runway, tienes seguridad para planificar la transición.`
        : `Faltan USD ${fmt(deficit)}/mes para alcanzar el ${obj}% de tu salario. Estás en el ${progreso}% del camino. Con una tasa de crecimiento del 15% mensual, podrías llegar en ${Math.ceil(Math.log(metaIngreso / proyecto) / Math.log(1.15))} meses.`
      : "Ingresa tu salario e ingreso actual del proyecto para ver tu avance.";

  return (
    <CalcCard
      title="Calculadora de Punto de Salida"
      description="Define exactamente cuándo es seguro dejar el empleo basándote en el porcentaje de reemplazo de tu salario."
      mision="Misión 17"
      color={COLOR}
    >
      <NumInput label="Salario neto mensual actual (USD)" value={salarioNeto} onChange={setSalarioNeto} prefix="$" />
      <NumInput label="Ingreso mensual del proyecto (USD)" value={ingresoProyecto} onChange={setIngresoProyecto} prefix="$" />
      <NumInput label="% de reemplazo objetivo" value={pctObjetivo} onChange={setPctObjetivo} min={50} max={200} suffix="%" />
      <NumInput label="Meses de runway ahorrados" value={runway} onChange={setRunway} suffix="meses" />
      <div style={{ marginTop: 14 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 6,
            fontSize: 10.5,
            fontWeight: 700,
            color: TK.textSecondary,
            fontFamily: TK.fontBadge,
            letterSpacing: "0.07em",
            textTransform: "uppercase",
          }}
        >
          <span>Progreso hacia la salida</span>
          <span style={{ color: progresoColor }}>{progreso}%</span>
        </div>
        <div
          style={{
            height: 8,
            background: TK.surface2,
            borderRadius: 4,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progreso}%`,
              background: `linear-gradient(to right, ${progresoColor}99, ${progresoColor})`,
              borderRadius: 4,
              transition: "width 0.6s ease",
            }}
          />
        </div>
      </div>
      <ResultBox
        color={progresoColor}
        items={[
          { label: "Meta de ingreso", value: `$${fmt(metaIngreso)}/mes` },
          { label: "Ingreso actual proyecto", value: `$${fmt(proyecto)}/mes` },
          { label: "Progreso", value: `${progreso}%`, highlight: true },
          { label: "Estado", value: listo ? "✓ Listo para salir" : `Déficit $${fmt(deficit)}/mes` },
        ]}
        insight={insight}
      />
    </CalcCard>
  );
}

/* ── Calc 2: Proyección de Ingresos 12M ── */
function Proyeccion12M() {
  const [mes1, setMes1] = useState("0");
  const [crecimiento, setCrecimiento] = useState("15");
  const [meta, setMeta] = useState("0");

  const inicio = parseFloat(mes1) || 0;
  const crec = parseFloat(crecimiento) || 0;
  const metaV = parseFloat(meta) || 0;

  const proyeccion = Array.from({ length: 12 }, (_, i) => ({
    mes: i + 1,
    ingreso: inicio * Math.pow(1 + crec / 100, i),
  }));

  const total12M = proyeccion.reduce((s, m) => s + m.ingreso, 0);
  const ultimo = proyeccion[11].ingreso;
  const mesMeta =
    metaV > 0 && inicio > 0
      ? proyeccion.findIndex((m) => m.ingreso >= metaV) + 1
      : 0;

  return (
    <CalcCard
      title="Proyección de Ingresos a 12 Meses"
      description="Visualiza tu trayectoria de ingresos con una tasa de crecimiento mensual compuesta."
      mision="Misión 18"
      color={COLOR}
    >
      <NumInput label="Ingreso mes 1 (USD)" value={mes1} onChange={setMes1} prefix="$" />
      <NumInput label="Tasa de crecimiento mensual" value={crecimiento} onChange={setCrecimiento} suffix="%" min={0} step={1} />
      <NumInput label="Meta mensual de ingreso (USD)" value={meta} onChange={setMeta} prefix="$" />

      {/* Mini chart */}
      {inicio > 0 && (
        <div style={{ marginTop: 12, marginBottom: 4 }}>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: TK.textMuted,
              letterSpacing: "0.07em",
              textTransform: "uppercase",
              fontFamily: TK.fontBadge,
              marginBottom: 6,
            }}
          >
            Proyección mensual
          </div>
          <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 60 }}>
            {proyeccion.map((m) => {
              const maxV = proyeccion[11].ingreso;
              const height = maxV > 0 ? (m.ingreso / maxV) * 52 : 4;
              const isAboveMeta = metaV > 0 && m.ingreso >= metaV;
              return (
                <div
                  key={m.mes}
                  title={`Mes ${m.mes}: $${fmt(m.ingreso)}`}
                  style={{
                    flex: 1,
                    height: `${height}px`,
                    background: isAboveMeta ? TK.success : COLOR,
                    borderRadius: "3px 3px 0 0",
                    opacity: 0.75 + (m.mes / 12) * 0.25,
                    transition: "height 0.4s ease",
                    cursor: "default",
                  }}
                />
              );
            })}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 9,
              color: TK.textMuted,
              fontFamily: TK.fontBadge,
              marginTop: 3,
            }}
          >
            <span>M1</span>
            <span>M6</span>
            <span>M12</span>
          </div>
        </div>
      )}

      <ResultBox
        color={COLOR}
        items={[
          { label: "Acumulado 12 meses", value: `$${fmt(total12M)}` },
          { label: "Ingreso mes 12", value: `$${fmt(ultimo)}`, highlight: true },
          ...(mesMeta > 0 ? [{ label: "Alcanzas tu meta en", value: `Mes ${mesMeta}` }] : []),
        ]}
        insight={
          inicio > 0
            ? `A una tasa del ${crec}% mensual, en 12 meses estarás en $${fmt(ultimo)}/mes y habrás generado $${fmt(total12M)} acumulados.`
            : "Ingresa tu ingreso inicial y tasa de crecimiento para ver la proyección."
        }
      />
    </CalcCard>
  );
}

/* ── Calc 3: Libertad Financiera ── */
function LibertadFinanciera() {
  const [gastosMes, setGastosMes] = useState("0");
  const [estiloVida, setEstiloVida] = useState("0");
  const [ahorro, setAhorro] = useState("0");
  const [multiplicador, setMultiplicador] = useState("1.5");

  const gastos = parseFloat(gastosMes) || 0;
  const lifestyle = parseFloat(estiloVida) || 0;
  const ahorroM = parseFloat(ahorro) || 0;
  const mult = parseFloat(multiplicador) || 1.5;

  const baseNecesaria = Math.max(gastos, lifestyle) + ahorroM;
  const metaLibertad = baseNecesaria * mult;
  const fondoEmergencia = baseNecesaria * 6;

  const insight =
    metaLibertad > 0
      ? `Para alcanzar libertad financiera total, necesitas USD ${fmt(metaLibertad)}/mes (${mult}x tu base de USD ${fmt(baseNecesaria)}). Asegura además un fondo de emergencia de USD ${fmt(fondoEmergencia)} (6 meses de gastos base).`
      : "Ingresa tus gastos mensuales para calcular tu objetivo de libertad financiera.";

  return (
    <CalcCard
      title="Calculadora de Libertad Financiera"
      description="Define el ingreso mensual exacto que necesitas para operar con libertad total sin depender de ningún empleador."
      mision="Misión 19"
      color={COLOR}
    >
      <NumInput label="Gastos mensuales actuales (USD)" value={gastosMes} onChange={setGastosMes} prefix="$" />
      <NumInput label="Gastos con estilo de vida deseado (USD)" value={estiloVida} onChange={setEstiloVida} prefix="$" />
      <NumInput label="Meta de ahorro / inversión mensual (USD)" value={ahorro} onChange={setAhorro} prefix="$" />
      <NumInput
        label="Multiplicador de seguridad (1.5 recomendado)"
        value={multiplicador}
        onChange={setMultiplicador}
        min={1}
        step={0.1}
        suffix="x"
      />
      <ResultBox
        color={COLOR}
        items={[
          { label: "Base necesaria / mes", value: `$${fmt(baseNecesaria)}` },
          { label: "Meta de libertad", value: `$${fmt(metaLibertad)}`, highlight: true },
          { label: "Fondo de emergencia", value: `$${fmt(fondoEmergencia)}` },
        ]}
        insight={insight}
      />
    </CalcCard>
  );
}

/* ── Phase 5 ── */
export default function Phase5() {
  return (
    <section id="fase-05" style={{ marginBottom: 80 }}>
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
          <span style={{ fontSize: 11, fontWeight: 900, color: COLOR, fontFamily: TK.fontHeading }}>05</span>
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
            Fase 05 · Punto de No Retorno
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
            Planifica tu transición hacia la libertad total
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
        <PuntoSalida />
        <Proyeccion12M />
        <LibertadFinanciera />
      </div>
    </section>
  );
}
