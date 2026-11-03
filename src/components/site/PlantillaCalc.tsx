"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { Aviso, CalcItem, CalcRow, CalcTable } from "@/content/workbook";
import { computeAll, evaluate, exampleInputs, formatVal, isInput, isRow, type Val } from "@/lib/calc";
import { fmtNum, parseNum } from "@/lib/format";
import { readSaved, writeSaved } from "@/lib/saved";
import { Icon, Sc } from "./ui";

type Props = {
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

/** Calculadora en línea de una plantilla del workbook, con el ejemplo del libro cargado. */
export default function PlantillaCalc({ id, code, calc, avisos, who, check, next }: Props) {
  const uid = useId();
  const example = useMemo(() => exampleInputs(calc), [calc]);
  const inputs = useMemo(() => calc.filter(isRow).filter(isInput), [calc]);
  const [raw, setRaw] = useState<Record<string, string>>(example);
  const [loaded, setLoaded] = useState(false);
  const [imports, setImports] = useState<{ field: string; label: string; value: string; src: string }[]>([]);
  const firstRef = useRef<HTMLInputElement>(null);

  const isExample = sameInputs(raw, example);
  const vals = useMemo(() => computeAll(calc, raw), [calc, raw]);
  const arch = who ?? "el arquetipo";

  // Al abrir: tus números guardados, si los hay; si no, el ejemplo. Y lo que se puede traer de otras plantillas.
  useEffect(() => {
    const mine = readSaved(id);
    // Se lee del almacenamiento del navegador después de montar, para que el HTML estático y el del cliente coincidan.
    if (mine && Object.keys(mine.v).length) setRaw({ ...example, ...mine.v });
    const found: typeof imports = [];
    for (const r of inputs) {
      if (!r.from) continue;
      const [srcId, field] = r.from.split(":");
      const s = readSaved(srcId);
      const v = s?.out[field] ?? s?.v[field];
      if (v === undefined || v === "") continue;
      const text = typeof v === "number" ? fmtNum(v, Number.isInteger(v) ? 0 : 2) : String(v);
      found.push({ field: r.field, label: r.label, value: text, src: srcId });
    }
    setImports(found);
    setLoaded(true);
  }, [id, example, inputs]);

  // Guarda tus números (no el ejemplo) y las salidas, para que otras plantillas los traigan.
  useEffect(() => {
    if (!loaded || isExample) return;
    const out: Record<string, Val> = {};
    for (const r of calc.filter(isRow)) if (r.expr) out[r.field] = vals[r.field];
    writeSaved(id, { v: raw, out });
  }, [loaded, isExample, raw, vals, calc, id]);

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
    const lines = [["Fila", "Valor"].map(esc).join(";")];
    for (const r of calc.filter(isRow)) {
      const v = r.expr ? formatVal(r, vals[r.field]) : (raw[r.field] ?? "");
      lines.push([esc(`${r.tag ? r.tag + " " : ""}${r.label}`), esc(v + (r.unit && v !== "–" ? ` ${r.unit}` : ""))].join(";"));
    }
    const blob = new Blob(["﻿" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `doble-agente-${id}.csv`;
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
      className: "field tab",
      style: { height: 48, fontSize: 17 },
    };
    return (
      <div key={r.field} className="py-3 border-t border-ink20 grid gap-2">
        <label htmlFor={fid} className="text-[15px] leading-[1.35] font-semibold flex gap-2">
          {r.tag && (
            <span className="wm shrink-0 w-5" style={{ color: "var(--color-magt)" }}>
              {r.tag}
            </span>
          )}
          <span>
            <Sc text={r.label} />
          </span>
        </label>
        {r.kind === "select" ? (
          <select {...common} value={raw[r.field] ?? ""} onChange={(e) => set(r.field, e.target.value)}>
            {!(r.options ?? []).some((o) => o.value === raw[r.field]) && <option value={raw[r.field] ?? ""}>{raw[r.field] || "Elige"}</option>}
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
              const n = parseNum(raw[r.field] ?? "");
              if (Number.isFinite(n)) set(r.field, fmtNum(n, n % 1 ? (String(raw[r.field]).split(",")[1]?.length ?? 2) : 0));
            }}
          />
        )}
        {r.note && (
          <p id={help} className="text-[14px] leading-[1.4] text-ink2">
            <Sc text={r.note} />
          </p>
        )}
      </div>
    );
  };

  const output = (r: CalcRow) => {
    const v = formatVal(r, vals[r.field]);
    return (
      <div key={r.field} className="py-3 border-t border-ink20 flex justify-between items-baseline gap-4">
        <div className="min-w-0">
          <div className="text-[15px] leading-[1.35] font-semibold flex gap-2">
            {r.tag && (
              <span className="wm shrink-0 w-5" style={{ color: "var(--color-magt)" }}>
                {r.tag}
              </span>
            )}
            <span>
              <Sc text={r.label} />
            </span>
          </div>
          {r.show && <div className="wm text-ink2 mt-1 normal-case" style={{ letterSpacing: 0 }}>= {r.show}</div>}
        </div>
        <output className="wh tab text-[26px] whitespace-nowrap text-right" style={{ lineHeight: 1 }}>
          {v}
          {r.unit && v !== "–" && <span className="text-[15px] ml-1.5">{r.unit}</span>}
        </output>
      </div>
    );
  };

  const table = (t: CalcTable) => {
    const lim = t.mark ? vals[t.mark] : undefined;
    return (
      <div key={t.table} className="py-3 border-t border-ink20">
        <div className="text-[15px] font-semibold">{t.table}</div>
        <table className="w-full mt-2 text-[15px] tab">
          <thead>
            <tr>
              {t.head.map((h, i) => (
                <th key={h} scope="col" className={`wm text-ink2 font-normal pb-1.5 ${i ? "text-right" : "text-left"}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {t.cells.map(([label, ...cs]) => {
              const first = cs[0];
              const below = typeof lim === "number" && typeof vals[first] === "number" && (vals[first] as number) < lim;
              return (
                <tr key={label} className="border-t border-ink10" style={below ? { background: "var(--color-warm)" } : undefined}>
                  <th scope="row" className="text-left font-normal py-1.5">
                    {label}
                    {below && <span className="block text-[13px] text-magt font-semibold">bajo el saldo mínimo</span>}
                  </th>
                  {cs.map((c) => {
                    const r = calc.find((x) => isRow(x) && x.field === c) as CalcRow | undefined;
                    return (
                      <td key={c} className="text-right py-1.5 font-semibold">
                        {r ? formatVal(r, vals[c]) : "–"}
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
          <Icon name="formula" size={20} />
          <h2 id={`${uid}-h`} className="wm">
            Calculadora en línea
          </h2>
        </div>
        <span className="wm text-ink2 text-right" aria-live="polite">
          {isExample ? `Ejemplo con ${arch}` : "Tus números"}
        </span>
      </div>
      <div className="px-5 pt-3 pb-6">
        <p className="text-[14px] leading-[1.45] text-ink2 pb-3">
          Hace las cuentas de la {code} con las mismas filas del workbook. Escribe en tu moneda o en dólares, la misma en toda la plantilla.
        </p>
        {pending.length > 0 && (
          <div className="mb-3 px-3 py-2.5 bg-sal text-[15px] leading-[1.4]" style={{ color: "var(--color-sald)", borderLeft: "2px solid var(--color-sald)" }}>
            Tienes datos guardados de otra plantilla: {pending.map((im) => `${im.label.split(" (")[0]} ${im.value}`).join("; ")}.{" "}
            <button type="button" onClick={bring} className="ul font-bold">
              Traerlos aquí
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
            <p key={a.text} className="text-[15px] leading-[1.45] pl-3 border-l-2 border-magt">
              <Sc text={a.text} />
            </p>
          ))}
        </div>

        <div className="flex flex-col gap-3 mt-6">
          {isExample ? (
            <button type="button" onClick={mine} className="btn2 w-full">
              Calcular con mis números
            </button>
          ) : (
            <button type="button" onClick={() => setRaw(example)} className="btn2 w-full">
              Volver al ejemplo de {arch}
            </button>
          )}
          <button type="button" onClick={csv} className="ul self-center text-[15px] font-semibold">
            Descargar mis números (CSV)
          </button>
        </div>
        <p className="text-[13px] leading-[1.45] text-ink2 mt-4">Tus números se guardan solo en este navegador. No necesitas cuenta.</p>

        {check.length > 0 && (
          <div className="mt-6 pt-4 border-t-2 border-ink">
            <div className="wm text-ink2">Sabrás que terminaste cuando…</div>
            <ul className="mt-2 grid gap-1.5">
              {check.map((c) => (
                <li key={c} className="grid grid-cols-[20px_minmax(0,1fr)] text-[15px] leading-[1.45]">
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
          <Link href={`/workbook/${next.id}`} className="group block mt-5 text-[16px] font-bold">
            <span className="wm text-ink2 block font-normal">Siguiente plantilla</span>
            <span className="lnk">
              {next.code} {next.title}
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
