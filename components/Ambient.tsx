'use client';

/** CSS-only ambient background — always present (also the mobile/no-WebGL fallback). */
export default function Ambient() {
  return (
    <>
      <div id="ambient">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-4" />
        <div className="grid-lines" />
      </div>
      <div id="grain" />
    </>
  );
}
