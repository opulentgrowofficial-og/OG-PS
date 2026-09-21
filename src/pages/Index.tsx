import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Capabilities from "@/components/sections/Capabilities";
import Tagline from "@/components/sections/Tagline";
import Divergence from "@/components/sections/Divergence";
import Method from "@/components/sections/Method";
import Proof from "@/components/sections/Proof";
import Engagement from "@/components/sections/Engagement";
import Work from "@/components/sections/Work";
import Questions from "@/components/sections/Questions";
import Contact from "@/components/sections/Contact";

/**
 * Scroll narrative:
 * Hook (Hero) → Show (Capabilities) → Stakes (Tagline) →
 * Convince (Divergence, Method) → Proof (Proof, Engagement, Work) →
 * Objections (Questions) → Convert (Contact)
 */
export default function Index() {
  const [formOpen, setFormOpen] = useState(false);
  const openForm = () => setFormOpen(true);

  return (
    <>
      <Navbar onOpenForm={openForm} />
      <main id="main">
        <Hero onOpenForm={openForm} />
        <Capabilities />
        <Tagline />
        <Divergence />
        <Method />
        <Proof />
        <Engagement />
        <Work />
        <Questions />
        <Contact formOpen={formOpen} setFormOpen={setFormOpen} />
      </main>
      <Footer />
    </>
  );
}
