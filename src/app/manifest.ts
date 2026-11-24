import type { MetadataRoute } from "next";

// Íconos cuadrados a sangre: tinta hasta el borde, sin esquinas transparentes. El sistema operativo
// aplica su propia máscara; la versión «maskable» deja el monograma dentro del círculo seguro del 80 %.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Future Founders",
    short_name: "Future Founders",
    description: "Método por niveles para ejecutivos que construyen ingresos propios sin abandonar su empleo de golpe.",
    start_url: "/",
    display: "browser",
    background_color: "#0C0C0D",
    theme_color: "#F6F6F4",
    icons: [
      { src: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
