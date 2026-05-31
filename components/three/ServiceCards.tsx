'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { SERVICES } from '@/lib/data';

/**
 * Six floating glass-gold service cards arranged in a slow ring deeper in the
 * scene. They bob and rotate gently, and the whole ring rotates a little with
 * scroll progress (passed in 0..1).
 */
export default function ServiceCards({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const ring = useRef<THREE.Group>(null);
  const cards = SERVICES.slice(0, 6);
  const R = 4.2;

  useFrame((state) => {
    if (!ring.current) return;
    const t = state.clock.elapsedTime;
    ring.current.rotation.y = t * 0.06 + (progressRef.current ?? 0) * Math.PI * 0.8;
  });

  return (
    <group ref={ring} position={[0, 3, -30]}>
      {cards.map((s, i) => {
        const a = (i / cards.length) * Math.PI * 2;
        const x = Math.sin(a) * R;
        const z = Math.cos(a) * R;
        return (
          <FloatingCard key={s.num} x={x} z={z} faceAngle={a} seed={i} num={s.num} name={s.name} />
        );
      })}
    </group>
  );
}

function FloatingCard({
  x,
  z,
  faceAngle,
  seed,
  num,
  name,
}: {
  x: number;
  z: number;
  faceAngle: number;
  seed: number;
  num: string;
  name: string;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = Math.sin(t * 0.6 + seed) * 0.16;
    ref.current.rotation.z = Math.sin(t * 0.3 + seed) * 0.04;
  });

  return (
    <group position={[x, 0, z]} rotation={[0, faceAngle, 0]}>
      <group ref={ref}>
        <RoundedBox args={[1.7, 2.3, 0.06]} radius={0.05} smoothness={4}>
          <meshStandardMaterial
            color="#0b1a26"
            roughness={0.25}
            metalness={0.6}
            emissive="#c39a4a"
            emissiveIntensity={0.12}
            transparent
            opacity={0.92}
          />
        </RoundedBox>
        <Text
          position={[0, 0.82, 0.05]}
          fontSize={0.16}
          color="#e4c294"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.2}
        >
          {num}
        </Text>
        <Text
          position={[0, -0.2, 0.05]}
          fontSize={0.17}
          maxWidth={1.35}
          textAlign="center"
          color="#fcf9f8"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.04}
        >
          {name.toUpperCase()}
        </Text>
        <mesh position={[0, -0.62, 0.05]}>
          <planeGeometry args={[0.5, 0.012]} />
          <meshBasicMaterial color="#e4c294" toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}
