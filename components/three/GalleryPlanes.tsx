'use client';

import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { SITE_SLIDES, DESIGN_SLIDES } from '@/lib/data';

const FRAMED = [...DESIGN_SLIDES, ...SITE_SLIDES];

/**
 * The bundle's photos as framed planes mounted on alternating side walls,
 * marching into the depth of the corridor. Each drifts very slightly so the
 * space feels alive. Public asset paths resolve from /public.
 */
export default function GalleryPlanes() {
  const urls = FRAMED.map((s) => s.src);
  const textures = useLoader(THREE.TextureLoader, urls);

  return (
    <group>
      {FRAMED.map((slide, i) => {
        const side = i % 2 === 0 ? -1 : 1;
        const z = 0 - i * 5.5 - 2;
        const tex = textures[i];
        return (
          <FramedPhoto
            key={slide.src}
            texture={tex}
            position={[side * 6.55, 3.1, z]}
            rotationY={side === -1 ? Math.PI / 2 : -Math.PI / 2}
            seed={i}
          />
        );
      })}
    </group>
  );
}

function FramedPhoto({
  texture,
  position,
  rotationY,
  seed,
}: {
  texture: THREE.Texture;
  position: [number, number, number];
  rotationY: number;
  seed: number;
}) {
  const group = useRef<THREE.Group>(null);
  const W = 3.4;
  const H = 2.2;

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y = position[1] + Math.sin(t * 0.4 + seed) * 0.06;
  });

  return (
    <group ref={group} position={position} rotation={[0, rotationY, 0]}>
      {/* gold frame */}
      <mesh position={[0, 0, -0.03]}>
        <planeGeometry args={[W + 0.18, H + 0.18]} />
        <meshStandardMaterial color="#c39a4a" roughness={0.35} metalness={0.85} />
      </mesh>
      {/* photo */}
      <mesh>
        <planeGeometry args={[W, H]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  );
}
