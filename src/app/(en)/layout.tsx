import { Raiz, metadataRaiz } from "../raiz";

// Root layout del inglés: <html lang="en"> para todo lo que vive bajo /en.
export const metadata = metadataRaiz("en");
export { viewport } from "../raiz";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <Raiz locale="en">{children}</Raiz>;
}
