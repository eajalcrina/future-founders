import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import RevealObserver from "@/components/site/RevealObserver";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site">
      <a href="#contenido" className="skip">Saltar al contenido</a>
      <Navbar />
      <main id="contenido">{children}</main>
      <Footer />
      <RevealObserver />
    </div>
  );
}
