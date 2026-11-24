import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

// Mismos valores que los tokens de globals.css: el formato de ImageResponse no admite variables CSS.
const PAPER = "#F6F6F4", INK = "#0C0C0D", INK2 = "#3D3D42";

/**
 * Imagen para compartir con el sistema del libro: papel, tinta, el logotipo con su cuadrado magenta
 * y el titular en mayúsculas condensadas, como una portada. Sin punto final y sin «·».
 */
export async function ogImage({ kicker, title, withCover = false }: { kicker: string; title: string; withCover?: boolean }) {
  const [display, mono, logo, cover] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/archivo-condensed-800.ttf")),
    readFile(join(process.cwd(), "src/assets/jetbrains-mono-500.ttf")),
    readFile(join(process.cwd(), "public/logo/logo-l4.svg")),
    withCover ? readFile(join(process.cwd(), "src/assets/portada-og.png")) : Promise.resolve(null),
  ]);
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;
  const coverSrc = cover ? `data:image/png;base64,${cover.toString("base64")}` : null;
  const clean = title.replace(/[.]\s*$/, "");
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: PAPER, color: INK, padding: "60px 72px", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, paddingRight: coverSrc ? 48 : 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={136} height={56} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Mono", fontSize: 22, letterSpacing: "0.12em", textTransform: "uppercase", color: INK }}>{kicker}</div>
            {/* en mayúsculas desde el texto: con textTransform la imagen mide las palabras en minúscula y deja espacios desiguales */}
            <div style={{ fontFamily: "Archivo", fontSize: coverSrc ? 88 : clean.length > 50 ? 80 : 96, lineHeight: 0.9, marginTop: 22, letterSpacing: "-0.02em" }}>
              {clean.toLocaleUpperCase("es")}
            </div>
          </div>
          <div style={{ display: "flex", fontFamily: "Mono", fontSize: 20, letterSpacing: "0.1em", textTransform: "uppercase", color: INK2, borderTop: `1px solid ${INK}`, paddingTop: 14 }}>
            futurefounders.pe
          </div>
        </div>
        {coverSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={coverSrc} width={340} height={499} alt="" style={{ border: `1px solid ${INK}` }} />
        )}
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Archivo", data: display, weight: 800, style: "normal" },
        { name: "Mono", data: mono, weight: 500, style: "normal" },
      ],
    }
  );
}
