import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DiagnosticoSection from "@/components/DiagnosticoSection";
import ProblemaSection from "@/components/ProblemaSection";
import MetodologiaSection from "@/components/MetodologiaSection";
import NosotrosSection from "@/components/NosotrosSection";
import PruebaSocialSection from "@/components/PruebaSocialSection";
import BootcampSection from "@/components/BootcampSection";
import DobleAgenteSection from "@/components/DobleAgenteSection";
import MisionesSection from "@/components/MisionesSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <DiagnosticoSection />
        <ProblemaSection />
        <MetodologiaSection />
        <NosotrosSection />
        <PruebaSocialSection />
        <BootcampSection />
        <DobleAgenteSection />
        <MisionesSection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
