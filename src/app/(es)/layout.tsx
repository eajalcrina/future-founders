import { Raiz, metadataRaiz } from "../raiz";

// Root layout del español: <html lang="es">. El inglés tiene el suyo en (en)/layout.tsx (dos root layouts por grupos de rutas).
export const metadata = metadataRaiz("es");
export { viewport } from "../raiz";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <Raiz locale="es">{children}</Raiz>;
}
