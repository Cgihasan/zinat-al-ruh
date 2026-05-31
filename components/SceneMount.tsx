'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// R3F is client-only; never SSR the canvas.
const Scene = dynamic(() => import('./three/Scene'), { ssr: false });

function webglAvailable(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

/**
 * Mounts the WebGL scene only when it makes sense:
 * desktop width, motion allowed, and WebGL present. Otherwise the CSS
 * ambient background (rendered in page.tsx) carries the mood.
 */
export default function SceneMount() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const decide = () => {
      const ok =
        window.innerWidth >= 768 &&
        !mqMotion.matches &&
        webglAvailable();
      setEnabled(ok);
    };
    decide();
    window.addEventListener('resize', decide);
    mqMotion.addEventListener('change', decide);
    return () => {
      window.removeEventListener('resize', decide);
      mqMotion.removeEventListener('change', decide);
    };
  }, []);

  if (!enabled) return null;
  return <Scene />;
}
