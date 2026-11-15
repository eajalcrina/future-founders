import Link from "next/link";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { Arrow, Mono } from "@/components/site/ui";

export default function NotFound() {
  return (
    <div className="site">
      <Navbar />
      <main id="contenido" className="grain">
        <div className="wrap pt-16 pb-20 lg:pt-28 lg:pb-32">
          <Mono color="var(--color-magt)">Error 404</Mono>
          <h1 className="wh text-[56px] lg:text-[112px] mt-4">Esta página no existe</h1>
          <p className="wt mt-6 max-w-[640px]">
            Puede que el enlace esté mal escrito o que la página haya cambiado de lugar. Si llegaste desde un código QR del libro, revisa el índice del workbook.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-9">
            <Link href="/" className="btn">
              <span>Ir al inicio</span>
              <Arrow />
            </Link>
            <Link href="/workbook" className="btn2">
              Ver el workbook
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
