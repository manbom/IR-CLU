import { SiteHeader } from "@/components/nav/SiteHeader";
import { Hero } from "@/components/sections/Hero";
import { ScrollStory } from "@/components/sections/ScrollStory";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Team } from "@/components/sections/Team";
import { Portfolio } from "@/components/sections/Portfolio";
import { AutomationQuizTeaser } from "@/components/sections/AutomationQuizTeaser";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <ScrollStory />
        <Process />
        <Services />
        <About />
        <Team />
        <Portfolio />
        <AutomationQuizTeaser />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
