import Link from "next/link";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import RevealObserver from "@/components/site/RevealObserver";
import { Hero as HeroHead } from "@/components/site/ui";

export default function NotFound() {
  return (
    <div className="site">
      <a href="#contenido" className="skip">Saltar al contenido</a>
      <Navbar />
      <main id="contenido">
        <div className="wrap pt-16 pb-20 lg:pt-28 lg:pb-32">
          <HeroHead label={["Error 404"]} title="Esta página no existe" />
          <p className="lead mt-6 max-w-[640px]">
            Puede que el enlace esté mal escrito o que la página haya cambiado de lugar. Si llegaste desde un código QR del libro, revisa el índice del workbook.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-9">
            <Link href="/" className="btn">
              Ir al inicio
            </Link>
            <Link href="/workbook" className="btn2">
              Ver el workbook
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <RevealObserver />
    </div>
  );
}
