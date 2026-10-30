import type { Metadata } from "next";
import Link from "next/link";
import { Root } from "@/components/Root";

export const metadata: Metadata = { title: "Página no encontrada · Page not found · Future Founders", robots: { index: false } };

// 404 para rutas que no existen en ninguna de las dos versiones; el texto va en ambos idiomas.
export default function GlobalNotFound() {
  return (
    <Root lang="es">
      <main className="grid-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}>
        <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <p className="label kicker" style={{ margin: 0 }}>404</p>
          <h1 className="display-xl">Esta página no existe. <span className="accent">This page doesn&apos;t exist.</span></h1>
          <div className="btns">
            <Link href="/" className="btn btn-primary">Ir al inicio →</Link>
            <Link href="/en" className="btn">Go to home</Link>
          </div>
        </div>
      </main>
    </Root>
  );
}
