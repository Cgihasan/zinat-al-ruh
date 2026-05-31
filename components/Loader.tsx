'use client';

import { useEffect, useRef, useState } from 'react';

const WORDS = ['Design.', 'Build.', 'Deliver.'];

/**
 * Opening loader: cycles the words, counts 000→100, fills the bar, then fades.
 * Calls onDone when finished so the hero can play its entrance.
 */
export default function Loader({ onDone }: { onDone: () => void }) {
  const [done, setDone] = useState(false);
  const [wIdx, setWIdx] = useState(0);
  const [count, setCount] = useState(0);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wTimer = setInterval(() => setWIdx((i) => (i + 1) % WORDS.length), 900);

    const start = performance.now();
    const duration = 2700;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 2.2);
      setCount(Math.round(eased * 100));
      if (barRef.current) barRef.current.style.transform = `scaleX(${eased})`;
      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        clearInterval(wTimer);
        setTimeout(() => {
          setDone(true);
          onDone();
        }, 400);
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      clearInterval(wTimer);
      cancelAnimationFrame(raf);
    };
  }, [onDone]);

  return (
    <div id="loader" className={done ? 'is-done' : ''} aria-hidden="true">
      <div className="loader-label">Zinat Al Ruh · Loading</div>
      <div className="loader-words">
        {WORDS.map((w, i) => (
          <span key={w} className={`lw${i === wIdx ? ' is-active' : i < wIdx ? ' is-out' : ''}`}>
            {w}
          </span>
        ))}
      </div>
      <div className="loader-count">{String(count).padStart(3, '0')}</div>
      <div className="loader-bar">
        <span ref={barRef} />
      </div>
    </div>
  );
}
