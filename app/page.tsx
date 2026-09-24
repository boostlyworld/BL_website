import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import ImpactStatement from "@/components/sections/ImpactStatement";
import ScrollReveal from "@/components/sections/ScrollReveal";
import Services from "@/components/sections/Services";
import Work from "@/components/sections/Work";
import Approach from "@/components/sections/Approach";
import FinalCta from "@/components/sections/FinalCta";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ImpactStatement />
        <ScrollReveal />
        <Services />
        <Work />
        <Approach />
        <FinalCta />
      </main>
    </>
  );
}
