import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

const PAPER = "#F6F6F4", INK = "#0C0C0D", INK2 = "#3D3D42", MAG = "#E6007E", MAGT = "#C8006D";

/** Imagen Open Graph del sistema: papel, tinta, un cuadrado magenta y el titular condensado. */
export async function ogImage({ kicker, title, withCover = false }: { kicker: string; title: string; withCover?: boolean }) {
  const [display, mono, cover] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/archivo-condensed-800.ttf")),
    readFile(join(process.cwd(), "src/assets/jetbrains-mono-500.ttf")),
    withCover ? readFile(join(process.cwd(), "src/assets/portada-og.png")) : Promise.resolve(null),
  ]);
  const coverSrc = cover ? `data:image/png;base64,${cover.toString("base64")}` : null;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: PAPER, color: INK, padding: "64px 72px", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, paddingRight: coverSrc ? 48 : 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", flexDirection: "column", fontFamily: "Archivo", fontSize: 34, lineHeight: 0.9, textTransform: "lowercase", letterSpacing: "-0.01em" }}>
              <span>future</span>
              <span>founders</span>
            </div>
            <div style={{ width: 16, height: 16, background: MAG, marginTop: -18 }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Mono", fontSize: 22, letterSpacing: "0.1em", textTransform: "uppercase", color: MAGT }}>{kicker}</div>
            <div style={{ fontFamily: "Archivo", fontSize: coverSrc ? 84 : 96, lineHeight: 0.9, textTransform: "uppercase", marginTop: 22, letterSpacing: "-0.012em" }}>{title}</div>
          </div>
          <div style={{ display: "flex", fontFamily: "Mono", fontSize: 20, letterSpacing: "0.1em", textTransform: "uppercase", color: INK2, borderTop: `2px solid ${INK}`, paddingTop: 14 }}>
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
