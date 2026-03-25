"use client";
import { useState } from "react";
import { CalcCard, NumInput, ResultBox } from "./CalcCard";
import { TK } from "./theme";

const COLOR = TK.phase4;

function fmt(n: number, decimals = 0) {
  return n.toLocaleString("es-PE", { maximumFractionDigits: decimals });
}

/* ── Calc 1: Margen y Rentabilidad ── */
function MargenRentabilidad() {
  const [precioVenta, setPrecioVenta] = useState("0");
  const [costoDirec, setCostoDirec] = useState("0");
  const [costoFijo, setCostoFijo] = useState("0");
  const [ventasMes, setVentasMes] = useState("1");

  const precio = parseFloat(precioVenta) || 0;
  const directo = parseFloat(costoDirec) || 0;
  const fijo = parseFloat(costoFijo) || 0;
  const ventas = Math.max(1, parseFloat(ventasMes) || 1);

  const margenBrutoUni = precio - directo;
  const margenBrutoPct = precio > 0 ? (margenBrutoUni / precio) * 100 : 0;
  const ingresoMes = precio * ventas;
  const costoTotalMes = directo * ventas + fijo;
  const utilidadMes = ingresoMes - costoTotalMes;
  const margenNetoMes = ingresoMes > 0 ? (utilidadMes / ingresoMes) * 100 : 0;

  const saludColor =
    margenNetoMes >= 40 ? TK.success : margenNetoMes >= 20 ? COLOR : TK.danger;

  const insight =
    precio > 0
      ? margenNetoMes >= 40
        ? `Margen neto sólido del ${fmt(margenNetoMes, 0)}%. El negocio tiene estructura para escalar. Cada cliente adicional agrega $${fmt(margenBrutoUni)} de utilidad bruta.`
        : margenNetoMes >= 20
        ? `Margen del ${fmt(margenNetoMes, 0)}% es viable pero ajustado. Revisa si puedes reducir costos directos o subir el precio un 15–20%.`
        : `Margen del ${fmt(margenNetoMes, 0)}% es insuficiente. Aumenta precio, reduce costos o modifica el modelo de entrega.`
      : "Ingresa precio y costos para calcular tu rentabilidad.";

  return (
    <CalcCard
      title="Margen y Rentabilidad por Venta"
      description="Calcula el margen bruto y neto de tu negocio para asegurarte de que el modelo genera caja real."
      mision="Misión 13"
      color={COLOR}
    >
      <NumInput label="Precio de venta (USD)" value={precioVenta} onChange={setPrecioVenta} prefix="$" />
      <NumInput label="Costo directo por venta (tiempo, recursos)" value={costoDirec} onChange={setCostoDirec} prefix="$" />
      <NumInput label="Costos fijos mensuales (USD)" value={costoFijo} onChange={setCostoFijo} prefix="$" />
      <NumInput label="Ventas estimadas / mes" value={ventasMes} onChange={setVentasMes} suffix="ventas" />
      <ResultBox
        color={saludColor}
        items={[
          { label: "Ingreso mensual", value: `$${fmt(ingresoMes)}` },
          { label: "Margen bruto / unidad", value: `${fmt(margenBrutoPct, 0)}%` },
          { label: "Utilidad neta / mes", value: `$${fmt(utilidadMes)}`, highlight: true },
          { label: "Margen neto", value: `${fmt(margenNetoMes, 0)}%` },
        ]}
        insight={insight}
      />
    </CalcCard>
  );
}

/* ── Calc 2: Punto de Equilibrio ── */
function PuntoEquilibrio() {
  const [costosFijos, setCostosFijos] = useState("0");
  const [precioVenta, setPrecioVenta] = useState("0");
  const [costoVariable, setCostoVariable] = useState("0");
  const [clientesActuales, setClientesActuales] = useState("0");

  const fijos = parseFloat(costosFijos) || 0;
  const precio = parseFloat(precioVenta) || 0;
  const variable = parseFloat(costoVariable) || 0;
  const actuales = parseFloat(clientesActuales) || 0;

  const margenContrib = precio - variable;
  const breakEvenUnidades = margenContrib > 0 ? Math.ceil(fijos / margenContrib) : 0;
  const breakEvenIngresos = breakEvenUnidades * precio;
  const faltanClientes = Math.max(0, breakEvenUnidades - actuales);

  const insight =
    breakEvenUnidades > 0
      ? actuales >= breakEvenUnidades
        ? `¡Ya superaste el punto de equilibrio! Con ${actuales} clientes generas utilidad positiva. Cada cliente adicional suma $${fmt(margenContrib)} a tu bolsillo.`
        : `Necesitas ${breakEvenUnidades} clientes para cubrir costos. Te faltan ${faltanClientes}. Con una tasa de cierre del 20%, necesitas contactar a ${faltanClientes * 5} prospectos.`
      : "Ingresa costos fijos y precio para calcular tu punto de equilibrio.";

  return (
    <CalcCard
      title="Calculadora de Punto de Equilibrio"
      description="Descubre exactamente cuántas ventas necesitas para cubrir costos y empezar a generar utilidad real."
      mision="Misión 14"
      color={COLOR}
    >
      <NumInput label="Costos fijos mensuales (USD)" value={costosFijos} onChange={setCostosFijos} prefix="$" />
      <NumInput label="Precio por venta (USD)" value={precioVenta} onChange={setPrecioVenta} prefix="$" />
      <NumInput label="Costo variable por venta (USD)" value={costoVariable} onChange={setCostoVariable} prefix="$" />
      <NumInput label="Clientes / ventas actuales" value={clientesActuales} onChange={setClientesActuales} suffix="clientes" />
      <ResultBox
        color={COLOR}
        items={[
          { label: "Margen de contribución", value: `$${fmt(margenContrib)}` },
          { label: "Break-even (unidades)", value: `${fmt(breakEvenUnidades)} ventas`, highlight: true },
          { label: "Break-even (ingresos)", value: `$${fmt(breakEvenIngresos)}` },
          ...(actuales > 0 ? [{ label: "Clientes que faltan", value: `${faltanClientes > 0 ? faltanClientes : "¡Logrado!"}` }] : []),
        ]}
        insight={insight}
      />
    </CalcCard>
  );
}

/* ── Calc 3: CAC vs LTV ── */
function CACvsLTV() {
  const [costoAquisicion, setCostoAquisicion] = useState("0");
  const [ingresoMensual, setIngresoMensual] = useState("0");
  const [duracionMeses, setDuracionMeses] = useState("12");
  const [margenPct, setMargenPct] = useState("60");

  const cac = parseFloat(costoAquisicion) || 0;
  const ingreso = parseFloat(ingresoMensual) || 0;
  const duracion = parseFloat(duracionMeses) || 0;
  const margen = Math.min(100, parseFloat(margenPct) || 0);

  const ltv = ingreso * duracion;
  const ltvNeto = ltv * (margen / 100);
  const ratio = cac > 0 ? ltvNeto / cac : 0;
  const payback = ingreso > 0 && margen > 0 ? Math.ceil(cac / (ingreso * (margen / 100))) : 0;

  const saludColor =
    ratio >= 3 ? TK.success : ratio >= 1 ? COLOR : TK.danger;
  const saludLabel =
    ratio >= 5 ? "Excelente" : ratio >= 3 ? "Saludable" : ratio >= 1 ? "Ajustado" : "No rentable";

  const insight =
    ratio > 0
      ? ratio >= 3
        ? `Ratio LTV/CAC de ${fmt(ratio, 1)}x — modelo sostenible. Por cada dólar invertido en adquisición, recuperas $${fmt(ratio, 1)}. Puedes escalar con confianza.`
        : ratio >= 1
        ? `Ratio de ${fmt(ratio, 1)}x — viable pero ajustado. Meta mínima: 3x. Reduce CAC o extiende la duración del cliente para mejorar.`
        : `Ratio menor a 1: estás perdiendo dinero por cliente adquirido. Revisa el modelo antes de escalar.`
      : "Ingresa datos para calcular la salud de tu unidad económica.";

  return (
    <CalcCard
      title="Calculadora CAC vs LTV"
      description="Determina si tu modelo de adquisición de clientes es rentable y cuánto tiempo tarda en recuperar la inversión."
      mision="Misión 15"
      color={COLOR}
    >
      <NumInput label="Costo de adquirir 1 cliente (CAC, USD)" value={costoAquisicion} onChange={setCostoAquisicion} prefix="$" />
      <NumInput label="Ingreso mensual por cliente (USD)" value={ingresoMensual} onChange={setIngresoMensual} prefix="$" />
      <NumInput label="Duración promedio del cliente" value={duracionMeses} onChange={setDuracionMeses} suffix="meses" />
      <NumInput label="Margen bruto (%)" value={margenPct} onChange={setMargenPct} min={0} max={100} suffix="%" />
      <ResultBox
        color={saludColor}
        items={[
          { label: "LTV bruto", value: `$${fmt(ltv)}` },
          { label: "LTV neto", value: `$${fmt(ltvNeto)}` },
          { label: "Ratio LTV/CAC", value: `${fmt(ratio, 1)}x`, highlight: true },
          { label: "Salud", value: saludLabel },
          ...(payback > 0 ? [{ label: "Payback en", value: `${payback} meses` }] : []),
        ]}
        insight={insight}
      />
    </CalcCard>
  );
}

/* ── Phase 4 ── */
export default function Phase4() {
  return (
    <section id="fase-04" style={{ marginBottom: 80 }}>
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
          <span style={{ fontSize: 11, fontWeight: 900, color: COLOR, fontFamily: TK.fontHeading }}>04</span>
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
            Fase 04 · Unidad Económica
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
            Construye un modelo que genera caja real
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
        <MargenRentabilidad />
        <PuntoEquilibrio />
        <CACvsLTV />
      </div>
    </section>
  );
}
