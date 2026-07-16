import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Leadership } from "@/components/sections/Leadership";
import { Agenda } from "@/components/sections/Agenda";
import { Tickets } from "@/components/sections/Tickets";
import { Location } from "@/components/sections/Location";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CTAFinal } from "@/components/sections/CTAFinal";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Leadership />
        <Agenda />
        <Tickets />
        <Location />
        
        <FAQ />
        <Testimonials />
        <CTAFinal />
      </main>
      <Footer />
    </>
  );
}
