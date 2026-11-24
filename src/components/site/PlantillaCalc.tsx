"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { Aviso, CalcItem, CalcRow, CalcTable } from "@/content/workbook";
import { VACIO, computeAll, evaluate, exampleInputs, formatVacio, formatVal, isInput, isRow, type FmtCalc, type Val } from "@/lib/calc";
import { fmtNum, parseNum, sepDecimal } from "@/lib/format";
import { readSaved, writeSaved } from "@/lib/saved";
import type { Dict } from "@/i18n/es";
import { f } from "@/i18n/f";
import { lh, type Locale } from "@/i18n/rutas";
import { Aviso as AvisoTxt, Detalle, Icon, LinkArrow, Sc } from "./ui";

type Props = {
  locale: Locale;
  t: Dict["calc"];
  /** Rótulo del acordeón «Detalle» (comun.detalle). */
  detalle: string;
  id: string;
  code: string;
  calc: CalcItem[];
  avisos: Aviso[];
  /** Arquetipo del ejemplo resuelto («Carmen»). */
  who: string | null;
  check: string[];
  next: { id: string; code: string; title: string } | null;
};

function sameInputs(a: Record<string, string>, b: Record<string, string>) {
  const ks = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const k of ks) if ((a[k] ?? "").trim() !== (b[k] ?? "").trim()) return false;
  return true;
}

/** Letra de fila del workbook: cuadrado de tinta con la letra en papel, como en el ejemplo resuelto. */
function Letra({ tag }: { tag: string }) {
  return (
    <span className="shrink-0 inline-flex items-center justify-center min-w-4 h-4 px-0.5 mt-[2px] bg-ink text-paper font-mono text-rotulo leading-none">
      {tag}
    </span>
  );
}

/** Calculadora en línea de una plantilla del workbook, con el ejemplo del libro cargado. */
export default function PlantillaCalc({ locale, t, detalle, id, code, calc, avisos, who, check, next }: Props) {
  const uid = useId();
  const fc: FmtCalc = { locale, si: t.si, no: t.no, mes: t.mes, ninguno: t.ninguno };
  const example = useMemo(() => exampleInputs(calc, locale), [calc, locale]);
  // Al cambiar de idioma no se reescriben las listas desplegables (guardan el valor del libro, «0,75») ni los textos («2026»).
  const fijos = useMemo(() => new Set(calc.filter(isRow).filter((r) => r.kind === "select" || r.kind === "text").map((r) => r.field)), [calc]);
  const inputs = useMemo(() => calc.filter(isRow).filter(isInput), [calc]);
  const [raw, setRaw] = useState<Record<string, string>>(example);
  const [loaded, setLoaded] = useState(false);
  const [imports, setImports] = useState<{ field: string; label: string; value: string; src: string }[]>([]);
  const firstRef = useRef<HTMLInputElement>(null);

  const isExample = sameInputs(raw, example);
  const vals = useMemo(() => computeAll(calc, raw, locale), [calc, raw, locale]);
  const arch = who ?? t.arquetipo;

  // Al abrir: tus números guardados, si los hay; si no, el ejemplo. Y lo que se puede traer de otras plantillas.
  useEffect(() => {
    const mine = readSaved(id, locale, fijos);
    // Se lee del almacenamiento del navegador después de montar, para que el HTML estático y el del cliente coincidan.
    if (mine && Object.keys(mine.v).length) setRaw({ ...example, ...mine.v });
    const found: typeof imports = [];
    for (const r of inputs) {
      if (!r.from) continue;
      const [srcId, field] = r.from.split(":");
      const s = readSaved(srcId, locale);
      const v = s?.out[field] ?? s?.v[field];
      if (v === undefined || v === "") continue;
      const text = typeof v === "number" ? fmtNum(v, Number.isInteger(v) ? 0 : 2, locale) : String(v);
      found.push({ field: r.field, label: r.label, value: text, src: srcId });
    }
    setImports(found);
    setLoaded(true);
  }, [id, example, inputs, locale, fijos]);

  // Guarda tus números (no el ejemplo) y las salidas, para que otras plantillas los traigan.
  useEffect(() => {
    if (!loaded || isExample) return;
    const out: Record<string, Val> = {};
    for (const r of calc.filter(isRow)) if (r.expr) out[r.field] = vals[r.field];
    writeSaved(id, { v: raw, out }, locale);
  }, [loaded, isExample, raw, vals, calc, id, locale]);

  function set(field: string, v: string) {
    setRaw((o) => ({ ...o, [field]: v }));
  }
  function mine() {
    const o: Record<string, string> = {};
    for (const r of inputs) o[r.field] = "";
    for (const im of imports) o[im.field] = im.value;
    setRaw(o);
    firstRef.current?.focus();
  }
  function bring() {
    setRaw((o) => {
      const n = { ...o };
      for (const im of imports) n[im.field] = im.value;
      return n;
    });
  }
  function csv() {
    const esc = (s: string) => `"${s.replace(/"/g, '""')}"`;
    // Español: «;» separa columnas (la coma es decimal). Inglés: «,», como espera una hoja en inglés.
    const sep = locale === "en" ? "," : ";";
    const lines = [[t.csvFila, t.csvValor].map(esc).join(sep)];
    for (const r of calc.filter(isRow)) {
      const v = r.expr ? formatVal(r, vals[r.field], fc) : (raw[r.field] ?? "");
      lines.push([esc(`${r.tag ? r.tag + " " : ""}${r.label}`), esc(v + (r.unit && v !== VACIO ? ` ${r.unit}` : ""))].join(sep));
    }
    const blob = new Blob(["﻿" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = f(t.csvArchivo, { id });
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  const shown = avisos.filter((a) => {
    try {
      const v = evaluate(a.when, vals);
      return typeof v === "number" ? Number.isFinite(v) && v !== 0 : v !== "";
    } catch {
      return false;
    }
  });
  const firstInput = inputs[0]?.field;
  const pending = imports.filter((im) => (raw[im.field] ?? "") !== im.value);

  const input = (r: CalcRow) => {
    const fid = `${uid}-${r.field}`;
    const help = r.note ? `${fid}-n` : undefined;
    const common = {
      id: fid,
      "aria-describedby": help,
      className: `field ${r.kind === "text" || r.kind === "select" ? "" : "der"}`,
      style: { height: 48 },
    };
    return (
      <div key={r.field} className={`py-3 border-t border-ink20 grid gap-2 ${r.meta ? "calc-meta" : ""}`}>
        <label htmlFor={fid} className="text-recuadro leading-[1.35] font-semibold flex gap-2">
          {r.tag && <Letra tag={r.tag} />}
          <span>
            <Sc text={r.label} />
          </span>
        </label>
        {r.kind === "select" ? (
          <select {...common} value={raw[r.field] ?? ""} onChange={(e) => set(r.field, e.target.value)}>
            {!(r.options ?? []).some((o) => o.value === raw[r.field]) && <option value={raw[r.field] ?? ""}>{raw[r.field] || t.elige}</option>}
            {(r.options ?? []).map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            {...common}
            ref={r.field === firstInput ? firstRef : undefined}
            inputMode={r.kind === "text" ? "text" : "decimal"}
            autoComplete="off"
            placeholder={r.kind === "text" ? "" : "0"}
            value={raw[r.field] ?? ""}
            onChange={(e) => set(r.field, r.kind === "text" ? e.target.value : e.target.value.replace(/[^\d.,\s-]/g, ""))}
            onBlur={() => {
              if (r.kind === "text") return;
              const n = parseNum(raw[r.field] ?? "", locale);
              if (Number.isFinite(n)) set(r.field, fmtNum(n, n % 1 ? (String(raw[r.field]).split(sepDecimal(locale))[1]?.length ?? 2) : 0, locale));
            }}
          />
        )}
        {r.note && (
          <p id={help} className="text-recuadro leading-[1.4] text-ink2">
            <Sc text={r.note} />
          </p>
        )}
      </div>
    );
  };

  const output = (r: CalcRow) => {
    const v = formatVal(r, vals[r.field], fc);
    return (
      <div key={r.field} className="py-3 border-t border-ink20 flex justify-between items-baseline gap-4">
        <div className="min-w-0">
          <div className="text-recuadro leading-[1.35] font-semibold flex gap-2">
            {r.tag && <Letra tag={r.tag} />}
            <span>
              <Sc text={r.label} />
            </span>
          </div>
          {r.show && <div className="font-mono text-rotulo text-ink3 mt-1">= {r.show}</div>}
        </div>
        <output className={`num text-kpi whitespace-nowrap text-right ${v === VACIO ? "text-ink3" : ""}`}>
          {v === VACIO ? formatVacio(r, locale) : v}
          {r.unit && (v !== VACIO || formatVacio(r, locale) !== "") && <span className="text-recuadro font-semibold font-stretch-normal tracking-normal ml-1.5">{r.unit}</span>}
        </output>
      </div>
    );
  };

  const table = (tb: CalcTable) => {
    const lim = tb.mark ? vals[tb.mark] : undefined;
    return (
      <div key={tb.table} className="py-3 border-t border-ink20">
        <div className="text-recuadro font-semibold">{tb.table}</div>
        <table className="tabla mt-2">
          <thead>
            <tr>
              {tb.head.map((h, i) => (
                <th key={h} scope="col" className={i ? "n" : ""}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tb.cells.map(([label, ...cs]) => {
              const first = cs[0];
              const below = typeof lim === "number" && typeof vals[first] === "number" && (vals[first] as number) < lim;
              return (
                <tr key={label} style={below ? { background: "var(--color-warm)" } : undefined}>
                  <th scope="row" className="text-left font-normal">
                    {label}
                    {below && (
                      <span className="flex gap-1.5 items-center text-recuadro font-semibold mt-0.5">
                        <Icon name="error" size={14} />
                        {t.bajoMinimo}
                      </span>
                    )}
                  </th>
                  {cs.map((c) => {
                    const r = calc.find((x) => isRow(x) && x.field === c) as CalcRow | undefined;
                    return (
                      <td key={c} className="n font-semibold">
                        {r ? formatVal(r, vals[c], fc) : VACIO}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="border border-ink bg-paper" role="group" aria-labelledby={`${uid}-h`}>
      <div className="flex justify-between items-center gap-3 px-5 py-4 border-b border-ink">
        <div className="flex gap-2.5 items-center">
          <Icon name="formula" size={16} />
          <h2 id={`${uid}-h`} className="text-recuadro font-bold">
            {t.titulo}
          </h2>
        </div>
        <span className="wm text-ink2 text-right" aria-live="polite">
          {isExample ? f(t.ejemploCon, { nombre: arch }) : t.tusNumeros}
        </span>
      </div>
      <div className="px-5 pt-3 pb-6">
        <p className="text-recuadro leading-[1.45] text-ink2">{t.moneda}</p>
        <Detalle label={detalle} className="pb-1">
          {f(t.detalle, { code })}
        </Detalle>
        {pending.length > 0 && (
          <div className="mb-3 px-3 py-2.5 bg-warm text-recuadro leading-[1.4] filete-sup">
            {f(t.guardados, { lista: pending.map((im) => `${im.label.split(" (")[0]} ${im.value}`).join("; ") })}{" "}
            <button type="button" onClick={bring} className="ul font-bold">
              {t.traer}
            </button>
          </div>
        )}
        <div className="border-b border-ink20">
          {calc.map((it, i) => {
            if ("band" in it)
              return (
                <div key={`b${i}`} className="wm text-ink2 pt-5 pb-2 border-t border-ink">
                  {it.band}
                </div>
              );
            if ("table" in it) return table(it);
            if (it.hide) return null;
            return it.expr ? output(it) : input(it);
          })}
        </div>

        <div aria-live="polite" className="mt-4 grid gap-2">
          {shown.map((a) => (
            <AvisoTxt key={a.text}>
              <Sc text={a.text} />
            </AvisoTxt>
          ))}
        </div>

        <div className="flex flex-col gap-3 mt-6">
          {isExample ? (
            <button type="button" onClick={mine} className="btn2 w-full">
              {t.misNumeros}
            </button>
          ) : (
            <button type="button" onClick={() => setRaw(example)} className="btn2 w-full">
              {f(t.volver, { nombre: arch })}
            </button>
          )}
          <button type="button" onClick={csv} className="ul self-center text-recuadro font-semibold">
            {t.csv}
          </button>
        </div>
        <p className="text-recuadro leading-[1.45] text-ink2 mt-4">{t.navegador}</p>

        {check.length > 0 && (
          <div className="mt-6 pt-4 border-t border-ink">
            <div className="wm text-ink2">{t.terminaste}</div>
            <ul className="mt-2 grid gap-1.5">
              {check.map((c) => (
                <li key={c} className="grid grid-cols-[20px_minmax(0,1fr)] text-recuadro leading-[1.45]">
                  <span className="block w-1.5 h-1.5 mt-2 bg-ink" aria-hidden="true" />
                  <span>
                    <Sc text={c} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {next && (
          <div className="mt-5">
            <span className="wm text-ink2 block">{t.siguiente}</span>
            <LinkArrow href={lh(locale, `/workbook/${next.id}`)} className="text-recuadro mt-1 min-h-6">
              {next.code} {next.title}
            </LinkArrow>
          </div>
        )}
      </div>
    </div>
  );
}
