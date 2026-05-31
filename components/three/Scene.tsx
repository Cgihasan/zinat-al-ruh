'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import Lights from './Lights';
import InteriorSpace from './InteriorSpace';
import GalleryPlanes from './GalleryPlanes';
import ServiceCards from './ServiceCards';
import CameraRig from './CameraRig';
import { useScroll } from '../ScrollProvider';

const BG = new THREE.Color('#000d18');

export default function Scene() {
  const { progress } = useScroll();
  const [accent, setAccent] = useState('#e4c294');

  // follow the live --gold-bright CSS var so the Tweaks accent flows into 3D
  useEffect(() => {
    const read = () => {
      const v = getComputedStyle(document.documentElement)
        .getPropertyValue('--gold-bright')
        .trim();
      if (v) setAccent(v);
    };
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });
    return () => obs.disconnect();
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 2.6, 6], fov: 55, near: 0.1, far: 200 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
        onCreated={({ scene }) => {
          scene.background = BG;
          scene.fog = new THREE.Fog('#000d18', 12, 60);
        }}
      >
        <CameraRig progressRef={progress} />
        <Lights accent={accent} />
        <Suspense fallback={null}>
          <InteriorSpace accent={accent} />
          <GalleryPlanes />
          <ServiceCards progressRef={progress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
