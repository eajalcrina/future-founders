#!/usr/bin/env python3
"""Genera src/content/workbook.ts desde la maqueta del libro.

Uso:
  python3 scripts/gen-workbook.py [MAQUETA_DIR]
  MAQUETA_DIR=/ruta/a/maqueta-v3 python3 scripts/gen-workbook.py

Lee chapters/*/meta.json y wb.json (ids de los QR), src-md/*.md («Sabrás que
terminaste cuando…») y out/libro-report.json y out/workbook-report.json (páginas).
Lo que la maqueta todavía no trae de la ronda R2 (niveles, «trae», calculadoras)
sale de scripts/r2-overlay.json; el valor de la maqueta gana cuando existe.
"""
import json
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
MAQ = (sys.argv[1] if len(sys.argv) > 1 else os.environ.get("MAQUETA_DIR", "")).rstrip("/")
if not MAQ or not os.path.isdir(os.path.join(MAQ, "chapters")):
    sys.exit("Indica la carpeta de la maqueta (con chapters/ y src-md/) como argumento o en MAQUETA_DIR.")
CH = os.path.join(MAQ, "chapters")
SRC = os.path.join(MAQ, "src-md")
OUT = os.path.join(REPO, "src", "content", "workbook.ts")
OV = json.load(open(os.path.join(HERE, "r2-overlay.json"), encoding="utf-8"))

PARTS = {"01": "Diagnóstico", "02": "Mercado", "03": "Oferta", "04": "Primeros clientes", "05": "Transición"}
KIT = {
    "k1": ("K.1", "Tu runway hoy", "Saber cuántos meses aguantas sin sueldo.", "20 minutos"),
    "k2": ("K.2", "Lo que dice tu contrato", "Saber qué puedes hacer fuera de tu cargo.", "30 minutos"),
    "k3": ("K.3", "Tu salida en números", "Estimar tu indemnización antes de negociar o firmar.", "20 minutos"),
    "k4": ("K.4", "Tus primeros 30 días", "Tener decidido qué haces cada semana si sales.", "30 minutos"),
    "k5": ("K.5", "Tus primeras 20 llamadas", "Saber a quién llamas y qué le dices.", "20 minutos"),
}
notes = []


def load(*p):
    return json.load(open(os.path.join(CH, *p), encoding="utf-8"))


def nb(s):
    return s.replace(" ", " ") if isinstance(s, str) else s


def clean_md(s):
    s = re.sub(r"\*\*\*(.+?)\*\*\*", r"<em>\1</em>", s)
    s = re.sub(r"\*\*(.+?)\*\*", r"\1", s)
    s = re.sub(r"\*(.+?)\*", r"<em>\1</em>", s)
    return s.strip()


def checks_of(md_name):
    path = os.path.join(SRC, md_name)
    if not os.path.exists(path):
        return []
    lines = open(path, encoding="utf-8").read().split("\n")
    out, on = [], False
    for ln in lines:
        if ln.startswith("## "):
            on = ln.startswith("## Sabrás que terminaste")
            continue
        if on and ln.startswith("- "):
            out.append(clean_md(ln[2:]))
    return out


def kit_checks():
    txt = open(os.path.join(SRC, "kit.md"), encoding="utf-8").read()
    res = {}
    for m in re.finditer(r"^## (K\.\d) · .*?$(.*?)(?=^## |\Z)", txt, re.S | re.M):
        # R2: «*Sabrás que terminaste cuando* tengas…»; R3 (A-22): «*Sabrás que terminaste cuando…* Tienes…».
        c = re.search(r"\*Sabrás que terminaste cuando(?:…|\.\.\.)?\*\s*(.+)", m.group(2))
        if c:
            t = clean_md(c.group(1)).rstrip(".")
            res["k" + m.group(1)[2]] = [t[0].upper() + t[1:] + "."]
    return res


def report_pages(name, prefix):
    try:
        rep = json.load(open(os.path.join(MAQ, "out", name), encoding="utf-8"))
    except FileNotFoundError:
        notes.append(f"sin {name}: las páginas quedan vacías")
        return {}
    # Una página puede llevar varias anclas separadas por espacios («ej-k1 kh-k1», R3 A-06); vale la primera página de cada una.
    res = {}
    for m in rep["map"]:
        for a in (m.get("anchor") or "").split():
            if a.startswith(prefix):
                res.setdefault(a[len(prefix):], m["folio"])
    return res


LIBRO = report_pages("libro-report.json", "ej-")
WB = report_pages("workbook-report.json", "wb-")


def level_nums(s):
    if not s:
        return []
    n = [int(x) for x in re.findall(r"\d", s)]
    if " a " in s and len(n) == 2:
        return list(range(n[0], n[1] + 1))
    return n


# Valor de ejemplo al comienzo del texto del libro: «61.600 y 61.150» → «61.600», «25 % (solo México)» → «25 %»,
# «Sí: 2.133 a 2.500» → «Sí», «3 h» → «3». El primero es el del arquetipo de la calculadora.
EJ_LEAD = re.compile(r"^(Sí|No|ninguno|mes \d+|[−-]?\d[\d.]*(?:,\d+)?(?:\s?%)?)(?=$|[\s:;(])")


def ej_num(s):
    m = re.fullmatch(r"([−-]?)([\d.]+(?:,\d+)?)(\s?%)?", s or "")
    if not m:
        return None
    return (-1 if m.group(1) else 1) * float(m.group(2).replace(".", "").replace(",", ".")), bool(m.group(3))


def split_ej(row, wb_ej):
    """Separa el valor de ejemplo (lo que la calculadora carga o muestra) del texto del libro con su anotación."""
    if row.get("kind") in ("text", "select") or row.get("fmt") == "text":
        return wb_ej, None
    m = EJ_LEAD.match(wb_ej.strip())
    lead = m.group(1) if m else wb_ej.strip()
    old = row.get("ej")
    # Misma cifra con otro formato («8» y «8,0»): se queda el formato de la calculadora.
    if old is not None and ej_num(old) is not None and ej_num(old) == ej_num(lead):
        lead = old
    return lead, (wb_ej if wb_ej != lead else None)


def calc_of(tid, wbt):
    """Filas con `calc` o `ej` en wb.json; si no hay, el juego R2 del overlay."""
    rows = []
    for b in wbt.get("blocks", []):
        for r in b.get("rows", []) if isinstance(b.get("rows"), list) and b.get("type") == "form" else []:
            if isinstance(r, dict) and ("calc" in r or "ej" in r):
                row = {"field": r["field"], "label": re.sub(r"<[^>]+>", "", nb(r.get("label", "")))}
                for k in ("tag", "dec", "ej", "unit", "note", "kind", "options", "from", "fmt", "opt", "show", "meta"):
                    if k in r:
                        row[k] = r[k]
                if "calc" in r:
                    row["expr"] = r["calc"]
                rows.append(row)
    if tid in OV["calc"]:
        # La pantalla (filas, tablas, avisos) sale del overlay; las cifras del ejemplo, de wb.json cuando las trae.
        spec = json.loads(json.dumps(OV["calc"][tid]))
        wbej = {r["field"]: r["ej"] for r in rows if "ej" in r}
        for r in spec["rows"]:
            f = r.get("field")
            if f in wbej:
                ej, libro = split_ej(r, wbej[f])
                if ej != r.get("ej"):
                    notes.append(f"{tid}.{f}: ej «{r.get('ej')}» → «{ej}» (wb.json)")
                    r["ej"] = ej
                if libro:
                    r["ejLibro"] = libro
        if wbt.get("avisos"):
            spec["avisos"] = wbt["avisos"]
        return spec, "overlay + wb.json" if wbej else "overlay"
    if rows:
        for r in rows:
            if "ej" in r:
                full = r.pop("ej")
                r["ej"], libro = split_ej(r, full)
                if libro:
                    r["ejLibro"] = libro
        return {"rows": rows, "avisos": wbt.get("avisos", [])}, "wb.json"
    return None, None


src_calc = {}


def head_of(wbt):
    """Campos de una línea partidos en varios («Cuenta», «Persona», «Fecha» de la 15.1, R3 B-32): "parts" en un bloque field."""
    out = []
    for b in wbt.get("blocks", []):
        if b.get("type") == "field" and b.get("parts"):
            out.append({"label": re.sub(r"<[^>]+>", "", nb(b.get("label", ""))),
                        "parts": [{"field": x["field"], "label": nb(x["label"])} for x in b["parts"]]})
    return out


def entry(**kw):
    tid = kw["id"]
    wbt = kw.pop("_wbt")
    kw["head"] = head_of(wbt)
    c, origin = calc_of(tid, wbt)
    if origin:
        src_calc[tid] = origin
    kw["calc"] = c["rows"] if c else None
    kw["avisos"] = c.get("avisos", []) if c else []
    kw["pages"] = {"libro": LIBRO.get(tid), "workbook": WB.get(tid)}
    return kw


out = []
kw = load("kit", "wb.json")
km = load("kit", "meta.json")
KCHK = kit_checks()
for t in kw["templates"]:
    c, ti, pu, tm = KIT[t["id"]]
    out.append(entry(id=t["id"], code=c, title=ti, time=tm, kind="kit", purpose=pu, intro=nb(t.get("intro")), trae=km["trae"].get(t["id"]),
                     where="Kit «Plan de salida», antes de la Parte 01", chapter=None, part=None, level="Nivel 0", who=(t.get("example") or {}).get("who") if isinstance(t.get("example"), dict) else None,
                     summary=[], check=KCHK.get(t["id"], []), _wbt=t))

for n in range(1, 22):
    k = f"{n:02d}"
    m = load(k, "meta.json")
    w = load(k, "wb.json")
    level = m.get("level")
    if k in OV["level"] and OV["level"][k] != level:
        notes.append(f"cap. {k}: nivel «{level}» → «{OV['level'][k]}» (overlay R2)")
        level = OV["level"][k]
    trae = nb(m.get("trae"))
    if k in OV["trae"] and OV["trae"][k] != trae:
        notes.append(f"cap. {k}: trae actualizado (overlay R2)")
        trae = OV["trae"][k]
    for t in m["templates"]:
        wt = [x for x in w["templates"] if x["id"] == t["id"]][0]
        out.append(entry(id=t["id"], code=t["code"], title=nb(t["title"]), time=nb(t["time"]), kind="capitulo", purpose=nb(m.get("takeaway")),
                         intro=nb(wt.get("intro")), trae=trae, where=f"Capítulo {n}, {m['title']}", chapter={"n": n, "title": m["title"]},
                         part={"num": m["part"], "name": PARTS[m["part"]]}, level=level, who=m.get("who"),
                         summary=[nb(x) for x in m.get("summary", [])], check=checks_of(f"cap-{k}.md"), _wbt=wt))

for k, country in [("anexo-peru", "Perú"), ("anexo-mexico", "México"), ("anexo-colombia", "Colombia"), ("anexo-chile", "Chile")]:
    m = load(k, "meta.json")
    w = load(k, "wb.json")
    t = m["templates"][0]
    wt = w["templates"][0]
    summary = [nb(x) for x in m.get("summary", [])]
    fix = OV.get("summary", {}).get(k)
    if fix and fix["old"] in summary:
        summary[summary.index(fix["old"])] = fix["new"]
        notes.append(f"{k}: resumen corregido (overlay R2)")
    out.append(entry(id=t["id"], code=t["code"], title=nb(t["title"]), time=nb(t["time"]), kind="anexo", purpose=nb(m.get("takeaway")),
                     intro=nb(wt.get("intro")), trae=nb(m.get("trae")), where=f"Anexo {m['n']}, {country}", chapter=None, part=None, level=None,
                     who=m.get("who"), summary=summary, check=[], _wbt=wt))

m = load("cierre", "meta.json")
w = load("cierre", "wb.json")
wt = w["templates"][0]
out.append(entry(id="cierre", code="Cierre", title=wt["title"], time=wt["time"], kind="cierre",
                 purpose="Te llevas tu nivel anotado con la fecha y la plantilla que vas a llenar esta semana.", intro=nb(wt.get("intro")), trae=None,
                 where="Cierre del libro, Lo que sigue", chapter=None, part=None, level=None, who=m.get("who"),
                 summary=[nb(x) for x in m.get("summary", [])], check=[], _wbt=wt))

# Plantillas que cada una usa: códigos citados en su intro y en su «trae».
CODE2ID = {p["code"]: p["id"] for p in out}
for p in out:
    txt = " ".join(x for x in (p["intro"], p["trae"]) if x)
    seen = []
    for c in re.findall(r"\b(K\.[1-5]|[A-D]\.1|\d{1,2}\.1)\b", txt):
        if c in CODE2ID and c != p["code"] and c not in [u["code"] for u in seen]:
            seen.append({"code": c, "id": CODE2ID[c]})
    p["uses"] = seen

# Niveles de cada parte, desde los capítulos (para /libro).
part_levels = {}
for p in out:
    if p["part"]:
        part_levels.setdefault(p["part"]["num"], set()).update(level_nums(p["level"]))
PART_LEVELS = {k: sorted(v) for k, v in sorted(part_levels.items())}

ORDER = ["id", "code", "title", "time", "kind", "purpose", "intro", "trae", "where", "chapter", "part", "level", "who", "summary", "check",
         "uses", "pages", "head", "calc", "avisos"]
out = [{k: p[k] for k in ORDER} for p in out]

s = "// Generado por scripts/gen-workbook.py desde maqueta-v3/chapters/*/meta.json, wb.json, src-md y out/*-report.json.\n"
s += "// No lo edites a mano: corrige la maqueta (o scripts/r2-overlay.json) y vuelve a correr el script.\n\n"
s += """export type CalcRow = {
  field: string;
  label: string;
  tag?: string;
  /** Fórmula con los nombres de campo; sin ella, la fila es una entrada. */
  expr?: string;
  /** Fórmula para mostrar en texto («A ÷ B»). */
  show?: string;
  dec?: number;
  /** Valor del arquetipo que la calculadora carga (entradas) o debe dar (fórmulas). */
  ej?: string;
  /** Texto del libro cuando trae más que la cifra: «7,0 y 4,9», «25 % (solo México)». */
  ejLibro?: string;
  unit?: string;
  note?: string;
  kind?: "num" | "text" | "select";
  options?: { label: string; value: string }[];
  fmt?: "num" | "pct" | "sino" | "text" | "mes";
  /** «k1:A»: trae el valor guardado de otra plantilla. */
  from?: string;
  /** Entrada que puede quedar vacía (cuenta como 0). */
  opt?: boolean;
  /** Fila que solo se muestra dentro de una tabla. */
  hide?: boolean;
  /** La meta que el libro marca en magenta (filete lateral y cifra en magenta de texto). Se marca en r2-overlay.json. */
  meta?: boolean;
};
export type CalcBand = { band: string };
export type CalcTable = { table: string; head: string[]; cells: string[][]; mark?: string };
export type CalcItem = CalcRow | CalcBand | CalcTable;
export type Aviso = { when: string; text: string };

export type Plantilla = {
  id: string;
  code: string;
  title: string;
  time: string;
  kind: "kit" | "capitulo" | "anexo" | "cierre";
  purpose: string | null;
  intro: string | null;
  trae: string | null;
  where: string;
  chapter: { n: number; title: string } | null;
  part: { num: string; name: string } | null;
  level: string | null;
  who: string | null;
  summary: string[];
  /** «Sabrás que terminaste cuando…» del capítulo. */
  check: string[];
  /** Plantillas que esta usa, citadas en su intro o en su «trae». */
  uses: { code: string; id: string }[];
  /** Primera página del ejemplo resuelto en el libro y de la plantilla en el workbook (folio = página del PDF). */
  pages: { libro: number | null; workbook: number | null };
  /** Datos de una línea que la hoja pide arriba, partidos en campos («Cuenta», «Persona», «Fecha»). */
  head: { label: string; parts: { field: string; label: string }[] }[];
  calc: CalcItem[] | null;
  avisos: Aviso[];
};

"""
s += "export const PARTES: Record<string, string> = " + json.dumps(PARTS, ensure_ascii=False) + ";\n\n"
s += "/** Niveles de la escalera en que se usa cada parte (regla R2: el nivel en que estás cuando la usas). */\n"
s += "export const PART_LEVELS: Record<string, number[]> = " + json.dumps(PART_LEVELS) + ";\n\n"
s += "export const PLANTILLAS: Plantilla[] = " + json.dumps(out, ensure_ascii=False, indent=1) + ";\n"
open(OUT, "w", encoding="utf-8").write(s)

# La meta en magenta: cada fila marcada en el overlay tiene que existir en su calculadora.
for tid, spec in OV["calc"].items():
    for r in spec.get("rows", []):
        if r.get("meta") and not r.get("field"):
            notes.append(f"{tid}: fila marcada como meta sin campo")
for p in out:
    for r in p["calc"] or []:
        if r.get("meta") and r.get("expr"):
            notes.append(f"{p['id']}.{r['field']}: la meta es una cuenta derivada; el libro marca la entrada")

# «La idea» de cada capítulo (primer párrafo de la sección en src-md/cap-NN.md), para «El método en 21 ideas» de /libro.
# El texto del libro no se edita aquí: si un párrafo no sirve para la web, el ajuste va en «ideasWeb» del overlay.
ideas = {}
for n in range(1, 22):
    path = os.path.join(SRC, f"cap-{n:02d}.md")
    txt = open(path, encoding="utf-8").read() if os.path.exists(path) else ""
    m = re.search(r"^## La idea\s*\n+(.+?)(?:\n\s*\n|\Z)", txt, re.S | re.M)
    if not m:
        sys.exit(f"cap-{n:02d}.md: no encuentro la sección «La idea»")
    ideas[n] = nb(clean_md(" ".join(m.group(1).split())))
for k, v in OV.get("ideasWeb", {}).items():
    ideas[int(k)] = v
    notes.append(f"idea del cap. {k}: texto de la web (overlay)")
IOUT = os.path.join(REPO, "src", "content", "ideas.ts")
si = "// Generado por scripts/gen-workbook.py desde maqueta-v3/src-md/cap-NN.md, sección «La idea» (primer párrafo).\n"
si += "// No lo edites a mano: corrige el libro (o «ideasWeb» en scripts/r2-overlay.json) y vuelve a correr el script.\n\n"
si += "/** La idea de cada capítulo, por número de capítulo. */\n"
si += "export const IDEAS: Record<number, string> = " + json.dumps(ideas, ensure_ascii=False, indent=1) + ";\n"
open(IOUT, "w", encoding="utf-8").write(si)
print(f"{len(ideas)} ideas → {os.path.relpath(IOUT, REPO)}")

print(f"{len(out)} plantillas → {os.path.relpath(OUT, REPO)}")
print("Calculadoras:", ", ".join(f"{k} ({v})" for k, v in src_calc.items()))
print("Niveles por parte:", PART_LEVELS)
for n in notes:
    print("·", n)
