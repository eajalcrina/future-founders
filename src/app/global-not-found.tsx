import type { Metadata } from "next";
import { headers } from "next/headers";
import NoEncontrada from "@/vistas/NoEncontrada";
import { Raiz, metadataRaiz } from "./raiz";

// 404 de todo el sitio. Con dos root layouts (español e inglés) no hay un layout común desde el que componer un
// not-found.tsx, así que Next pide global-not-found (guía de Next 16, not-found.js, «global-not-found.js»).
// El idioma lo marca src/proxy.ts, que solo corre bajo /en: pone la cabecera x-ff-locale y aquí se lee.

async function idioma() {
  return (await headers()).get("x-ff-locale") === "en" ? "en" : "es";
}

/** Los metadatos del sitio en ese idioma, como cualquier página sin los suyos (Next añade noindex a las 404). */
export async function generateMetadata(): Promise<Metadata> {
  return metadataRaiz(await idioma());
}

export { viewport } from "./raiz";

export default async function GlobalNotFound() {
  const locale = await idioma();
  return (
    <Raiz locale={locale}>
      <NoEncontrada locale={locale} />
    </Raiz>
  );
}
