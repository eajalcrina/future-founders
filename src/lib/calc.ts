// Evaluador de las calculadoras del workbook, sin eval ni Function.
// Acepta números (1.2), nombres de campo, textos entre comillas, + − × ÷ * /, paréntesis,
// comparaciones (< <= > >= == !=), && || !, y las funciones min, max, ceil, floor, round, abs e if.

import { fmtNum, parseNum } from "./format";
import type { CalcItem, CalcRow } from "../content/workbook";

export type Val = number | string;
type Node =
  | { t: "n"; v: number }
  | { t: "s"; v: string }
  | { t: "id"; v: string }
  | { t: "un"; op: string; a: Node }
  | { t: "bin"; op: string; a: Node; b: Node }
  | { t: "fn"; name: string; args: Node[] };

const OPS = ["<=", ">=", "==", "!=", "&&", "||", "<", ">", "+", "-", "*", "/", "(", ")", ",", "!"];
const NORM: Record<string, string> = { "−": "-", "×": "*", "÷": "/" };

function tokenize(src: string): string[] {
  const out: string[] = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (/\s/.test(c)) {
      i++;
      continue;
    }
    if (NORM[c]) {
      out.push(NORM[c]);
      i++;
      continue;
    }
    if (c === '"') {
      const j = src.indexOf('"', i + 1);
      if (j < 0) throw new Error("Texto sin cerrar");
      out.push(src.slice(i, j + 1));
      i = j + 1;
      continue;
    }
    const num = /^\d+(\.\d+)?/.exec(src.slice(i));
    if (num) {
      out.push(num[0]);
      i += num[0].length;
      continue;
    }
    const id = /^[A-Za-z_][A-Za-z0-9_]*/.exec(src.slice(i));
    if (id) {
      out.push(id[0]);
      i += id[0].length;
      continue;
    }
    const op = OPS.find((o) => src.startsWith(o, i));
    if (!op) throw new Error(`Carácter no válido: ${c}`);
    out.push(op);
    i += op.length;
  }
  return out;
}

function parse(src: string): Node {
  const tk = tokenize(src);
  let p = 0;
  const peek = () => tk[p];
  const eat = (s?: string) => {
    const t = tk[p++];
    if (s && t !== s) throw new Error(`Se esperaba ${s}`);
    return t;
  };
  const level = (ops: string[], next: () => Node) => (): Node => {
    let a = next();
    while (ops.includes(peek())) {
      const op = eat();
      a = { t: "bin", op, a, b: next() };
    }
    return a;
  };
  const primary = (): Node => {
    const t = eat();
    if (t === undefined) throw new Error("Fórmula incompleta");
    if (t === "(") {
      const e = expr();
      eat(")");
      return e;
    }
    if (t === "-" || t === "!") return { t: "un", op: t, a: primary() };
    if (/^\d/.test(t)) return { t: "n", v: Number(t) };
    if (t.startsWith('"')) return { t: "s", v: t.slice(1, -1) };
    if (/^[A-Za-z_]/.test(t)) {
      if (peek() === "(") {
        eat("(");
        const args: Node[] = [];
        if (peek() !== ")") {
          args.push(expr());
          while (peek() === ",") {
            eat(",");
            args.push(expr());
          }
        }
        eat(")");
        return { t: "fn", name: t, args };
      }
      return { t: "id", v: t };
    }
    throw new Error(`Token inesperado: ${t}`);
  };
  const mul = level(["*", "/"], primary);
  const add = level(["+", "-"], mul);
  const cmp = level(["<", "<=", ">", ">=", "==", "!="], add);
  const and = level(["&&"], cmp);
  const expr = level(["||"], and);
  const e = expr();
  if (p < tk.length) throw new Error(`Sobra: ${tk.slice(p).join(" ")}`);
  return e;
}

const cache = new Map<string, Node>();
const truthy = (v: Val) => (typeof v === "string" ? v !== "" : Number.isFinite(v) && v !== 0);
const num = (v: Val) => (typeof v === "string" ? NaN : v);

function run(n: Node, env: Record<string, Val>): Val {
  switch (n.t) {
    case "n":
    case "s":
      return n.v;
    case "id":
      return n.v in env ? env[n.v] : NaN;
    case "un": {
      const a = run(n.a, env);
      return n.op === "!" ? (truthy(a) ? 0 : 1) : -num(a);
    }
    case "bin": {
      if (n.op === "&&") return truthy(run(n.a, env)) && truthy(run(n.b, env)) ? 1 : 0;
      if (n.op === "||") return truthy(run(n.a, env)) || truthy(run(n.b, env)) ? 1 : 0;
      const a = run(n.a, env);
      const b = run(n.b, env);
      if (n.op === "==") return a === b ? 1 : 0;
      if (n.op === "!=") return a !== b ? 1 : 0;
      const x = num(a);
      const y = num(b);
      switch (n.op) {
        case "+":
          return x + y;
        case "-":
          return x - y;
        case "*":
          return x * y;
        case "/":
          return y === 0 ? NaN : x / y;
        case "<":
          return x < y ? 1 : 0;
        case "<=":
          return x <= y ? 1 : 0;
        case ">":
          return x > y ? 1 : 0;
        case ">=":
          return x >= y ? 1 : 0;
      }
      return NaN;
    }
    case "fn": {
      if (n.name === "if") return truthy(run(n.args[0], env)) ? run(n.args[1], env) : run(n.args[2], env);
      const xs = n.args.map((a) => num(run(a, env)));
      switch (n.name) {
        case "min":
          return Math.min(...xs);
        case "max":
          return Math.max(...xs);
        case "ceil":
          return Math.ceil(xs[0] - 1e-9);
        case "floor":
          return Math.floor(xs[0] + 1e-9);
        case "round":
          return Math.round(xs[0]);
        case "abs":
          return Math.abs(xs[0]);
      }
      throw new Error(`Función desconocida: ${n.name}`);
    }
  }
}

/** Evalúa una fórmula con los valores de `env`. Devuelve NaN si falta un dato. */
export function evaluate(src: string, env: Record<string, Val>): Val {
  let n = cache.get(src);
  if (!n) {
    n = parse(src);
    cache.set(src, n);
  }
  return run(n, env);
}

export const isRow = (it: CalcItem): it is CalcRow => "field" in it;
export const isInput = (r: CalcRow) => !r.expr;

/** Lee las entradas (texto tal como se escribe) y calcula todas las filas en orden. */
export function computeAll(items: CalcItem[], raw: Record<string, string>): Record<string, Val> {
  const env: Record<string, Val> = {};
  for (const it of items) {
    if (!isRow(it)) continue;
    if (it.expr) {
      try {
        env[it.field] = evaluate(it.expr, env);
      } catch {
        env[it.field] = NaN;
      }
      continue;
    }
    const s = (raw[it.field] ?? "").trim();
    if (it.kind === "text") env[it.field] = s;
    else if (!s) env[it.field] = it.opt ? 0 : NaN;
    else env[it.field] = parseNum(s);
  }
  return env;
}

/** Valor listo para mostrar, con el formato del libro (61.600; 7,0; 6,25 %; Sí). */
export function formatVal(r: CalcRow, v: Val | undefined): string {
  const f = r.fmt ?? "num";
  if (f === "text") return v === undefined || (typeof v === "number" && !Number.isFinite(v)) ? "–" : String(v);
  if (typeof v !== "number" || !Number.isFinite(v)) return "–";
  if (f === "sino") return v ? "Sí" : "No";
  if (f === "mes") return v > 0 ? `mes ${fmtNum(v, 0)}` : "ninguno";
  const dec = r.dec ?? 0;
  const x = Math.abs(v) < 0.5 * 10 ** -dec ? 0 : v;
  return fmtNum(x, dec) + (f === "pct" ? " %" : "");
}

/** Valores del ejemplo del libro para las entradas. */
export function exampleInputs(items: CalcItem[]): Record<string, string> {
  const o: Record<string, string> = {};
  for (const it of items) if (isRow(it) && isInput(it) && it.ej !== undefined) o[it.field] = it.ej;
  return o;
}
