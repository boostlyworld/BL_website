import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import ImpactStatement from "@/components/sections/ImpactStatement";
import ScrollReveal from "@/components/sections/ScrollReveal";
import Services from "@/components/sections/Services";
import Approach from "@/components/sections/Approach";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ImpactStatement />
        <ScrollReveal />
        <Services />
        <Approach />
      </main>
    </>
  );
}
