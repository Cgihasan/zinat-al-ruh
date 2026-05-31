'use client';

import { useMemo } from 'react';

/**
 * Procedural luxury corridor: marble floor, side walls, ceiling, and a series
 * of emissive gold light strips running into the distance to create depth.
 * No external model files — fully in-engine.
 */
export default function InteriorSpace({ accent = '#e4c294' }: { accent?: string }) {
  const DEPTH = 80;
  const HALF_W = 7;
  const HEIGHT = 7;

  const strips = useMemo(() => {
    const arr: number[] = [];
    for (let z = 4; z > -DEPTH; z -= 7) arr.push(z);
    return arr;
  }, []);

  return (
    <group>
      {/* Floor — polished dark marble */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, -DEPTH / 2 + 4]} receiveShadow>
        <planeGeometry args={[HALF_W * 2, DEPTH]} />
        <meshStandardMaterial
          color="#06141f"
          roughness={0.18}
          metalness={0.65}
          envMapIntensity={0.6}
        />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, HEIGHT, -DEPTH / 2 + 4]}>
        <planeGeometry args={[HALF_W * 2, DEPTH]} />
        <meshStandardMaterial color="#04101a" roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Left wall — warm wood tone */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-HALF_W, HEIGHT / 2, -DEPTH / 2 + 4]}>
        <planeGeometry args={[DEPTH, HEIGHT]} />
        <meshStandardMaterial color="#1a1208" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Right wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[HALF_W, HEIGHT / 2, -DEPTH / 2 + 4]}>
        <planeGeometry args={[DEPTH, HEIGHT]} />
        <meshStandardMaterial color="#0c1822" roughness={0.55} metalness={0.25} />
      </mesh>

      {/* Emissive gold ceiling light strips receding into depth */}
      {strips.map((z, i) => (
        <mesh key={i} position={[0, HEIGHT - 0.06, z]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.4, 0.16]} />
          <meshBasicMaterial color={accent} toneMapped={false} />
        </mesh>
      ))}

      {/* Thin gold reveal lines where walls meet floor */}
      {[-HALF_W + 0.05, HALF_W - 0.05].map((x, i) => (
        <mesh key={`r${i}`} position={[x, 0.05, -DEPTH / 2 + 4]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.04, 0.04, DEPTH]} />
          <meshBasicMaterial color="#c39a4a" toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}
