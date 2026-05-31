'use client';

/**
 * Gold / champagne lighting rig — warm key from above-front, cool fill,
 * and a couple of point lights to read as recessed interior glow.
 */
export default function Lights({ accent = '#e4c294' }: { accent?: string }) {
  return (
    <>
      <ambientLight intensity={0.35} color="#cdd8e0" />
      {/* warm champagne key */}
      <directionalLight position={[6, 10, 8]} intensity={1.15} color={accent} />
      {/* cool rim from behind */}
      <directionalLight position={[-8, 4, -10]} intensity={0.5} color="#3a6f9e" />
      {/* recessed gold pools along the corridor */}
      <pointLight position={[0, 3.2, -6]} intensity={28} distance={22} decay={2} color={accent} />
      <pointLight position={[0, 2.4, -18]} intensity={22} distance={20} decay={2} color="#c39a4a" />
      <pointLight position={[0, 2.8, 4]} intensity={14} distance={16} decay={2} color={accent} />
    </>
  );
}
