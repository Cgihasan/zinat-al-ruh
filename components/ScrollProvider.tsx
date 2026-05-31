'use client';

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MutableRefObject,
} from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ScrollCtx {
  /** Normalized page scroll progress 0..1, updated every frame (read in useFrame). */
  progress: MutableRefObject<number>;
  lenis: MutableRefObject<Lenis | null>;
  scrollTo: (target: string | HTMLElement, offset?: number) => void;
}

const Ctx = createContext<ScrollCtx | null>(null);

export function useScroll(): ScrollCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useScroll must be used within <ScrollProvider>');
  return ctx;
}

export default function ScrollProvider({ children }: { children: ReactNode }) {
  const progress = useRef(0);
  const lenisRef = useRef<Lenis | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = max > 0 ? Math.max(0, Math.min(1, window.scrollY / max)) : 0;
      ScrollTrigger.update();
    };
    lenis.on('scroll', onScroll);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    onScroll();
    setReady(true);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = (target: string | HTMLElement, offset = -20) => {
    lenisRef.current?.scrollTo(target, { offset });
  };

  return (
    <Ctx.Provider value={{ progress, lenis: lenisRef, scrollTo }}>
      {children}
      {/* top progress bar */}
      {ready && <ProgressBar progress={progress} />}
    </Ctx.Provider>
  );
}

function ProgressBar({ progress }: { progress: MutableRefObject<number> }) {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let id: number;
    const tick = () => {
      if (barRef.current) barRef.current.style.width = (progress.current * 100).toFixed(2) + '%';
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [progress]);
  return <div ref={barRef} className="progress" />;
}
