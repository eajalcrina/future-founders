import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // El toolkit de la primera edición se retira: sus enlaces llevan a las plantillas del workbook.
  // Los redirects se aplican antes que las rutas del sistema de archivos (guía de Next 16, redirects).
  async redirects() {
    return [
      { source: "/toolkit", destination: "/workbook", permanent: false },
      { source: "/toolkit/:path*", destination: "/workbook", permanent: false },
    ];
  },
};

export default nextConfig;
