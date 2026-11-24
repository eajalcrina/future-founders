import { NextResponse, type NextRequest } from "next/server";

// Solo para la 404 en inglés: marca las peticiones bajo /en con la cabecera x-ff-locale, que lee
// app/global-not-found.tsx para pintar la página «no existe» en inglés y con <html lang="en">.
// Las páginas siguen siendo estáticas; el proxy no corre en las rutas en español.
export function proxy(request: NextRequest) {
  const h = new Headers(request.headers);
  h.set("x-ff-locale", "en");
  return NextResponse.next({ request: { headers: h } });
}

export const config = { matcher: ["/en", "/en/:path*"] };
