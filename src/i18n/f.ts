// Rellena las variables {nombre} de un texto del diccionario: f("Pregunta {n} de {total}", { n: 1, total: 4 }).
// Sin imports: la usan componentes de cliente y las pruebas en Node.
export function f(texto: string, vars: Record<string, string | number>): string {
  return texto.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? String(vars[k]) : m));
}
