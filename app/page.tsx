'use client';

import { useState } from 'react';
import ScrollProvider from '@/components/ScrollProvider';
import Ambient from '@/components/Ambient';
import Loader from '@/components/Loader';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import { SiteWork, DesignConsultant } from '@/components/Divisions';
import About from '@/components/About';
import Enquiry from '@/components/Enquiry';
import Contact from '@/components/Contact';
import TweaksPanel from '@/components/TweaksPanel';

export default function Page() {
  const [loaded, setLoaded] = useState(false);

  return (
    <ScrollProvider>
      <Loader onDone={() => setLoaded(true)} />

      {/* CSS ambient background */}
      <Ambient />

      <Nav />

      <main style={{ position: 'relative', zIndex: 3 }}>
        <Hero play={loaded} />
        <Services />
        <SiteWork />
        <DesignConsultant />
        <About />
        <Enquiry />
        <Contact />
      </main>

      <TweaksPanel />
    </ScrollProvider>
  );
}
