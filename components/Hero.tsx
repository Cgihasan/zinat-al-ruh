'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RevealLine } from './Reveal';
import { HERO_ROLES } from '@/lib/data';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero({ play }: { play: boolean }) {
  const [role, setRole] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRole((i) => (i + 1) % HERO_ROLES.length), 2200);
    return () => clearInterval(id);
  }, []);

  // staggered blur-in once the loader finishes
  const blur = (delay: number) => ({
    initial: { opacity: 0, y: 20, filter: 'blur(10px)' },
    animate: play ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {},
    transition: { duration: 1, delay, ease: 'easeOut' as const },
  });

  return (
    <section id="hero" className="section section-hero relative overflow-hidden" data-section="hero">
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/assets/design/04-formal-living.jpg"
      >
        <source src="/assets/hero-video.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay" />

      <div className="max-w-[1600px] w-full mx-auto hero-content">
        <div className="max-w-[860px]">
          <motion.div className="eyebrow" {...blur(0.3)}>
            COLLECTION &apos;26 · DEIRA, DUBAI
          </motion.div>

          <h1 className="hero-title mt-7">
            <RevealLine immediate={play} delay={0.1}>Design.</RevealLine>{' '}
            <RevealLine immediate={play} delay={0.2}>Build.</RevealLine>
            <br />
            <RevealLine immediate={play} delay={0.3}>Supervise.</RevealLine>{' '}
            <RevealLine immediate={play} delay={0.4} className="gold">Deliver.</RevealLine>
            <span className="sr-only"> — Premium Interior Fit-Out in Dubai, UAE</span>
          </h1>

          <motion.div className="gold-line mt-8" {...blur(0.5)} />

          <motion.p
            className="mt-7 max-w-xl text-[16px] leading-[1.7] text-[var(--ink-dim)] font-light"
            {...blur(0.6)}
          >
            Premium{' '}
            <motion.span
              key={role}
              className="role-word"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {HERO_ROLES[role]}
            </motion.span>{' '}
            interiors across the United Arab Emirates — a single accountable partner from first site
            visit to final handover.
          </motion.p>

          <motion.div className="hero-cta mt-12 flex flex-wrap items-center gap-6" {...blur(0.7)}>
            <a href="#contact" className="cta-btn solid">
              See the Work <span className="arrow" />
            </a>
            <a href="#site-work" className="cta-btn">
              Request a Site Visit <span className="arrow" />
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="scroll-cue"
        initial={{ opacity: 0 }}
        animate={play ? { opacity: 1 } : {}}
        transition={{ duration: 1.4, delay: 1.2 }}
      >
        <span>Scroll</span>
        <span className="line" />
      </motion.div>
    </section>
  );
}
