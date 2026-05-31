'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Drives the camera through the corridor based on page scroll progress (0..1)
 * and applies a subtle mouse parallax. Lerped each frame for smoothness.
 */
export default function CameraRig({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useRef(new THREE.Vector3());

  // track pointer (module-level listener via ref-bound effect would also work;
  // useFrame reads camera so we attach once here)
  useFrame((state) => {
    const p = progressRef.current ?? 0;

    // travel from z=6 (just inside the entrance) to z=-46 (deep in the space)
    const z = 6 - p * 52;
    const y = 2.6 + Math.sin(p * Math.PI) * 0.6; // gentle rise then settle

    // mouse parallax offset
    const mx = state.pointer.x * 0.9;
    const my = state.pointer.y * 0.5;

    camera.position.x += (mx - camera.position.x) * 0.04;
    camera.position.y += (y + my - camera.position.y) * 0.04;
    camera.position.z += (z - camera.position.z) * 0.06;

    // always look slightly ahead and down the corridor
    target.current.set(mx * 0.4, 2.4, camera.position.z - 12);
    camera.lookAt(target.current);
  });

  return null;
}
