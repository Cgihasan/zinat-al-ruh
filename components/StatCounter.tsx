'use client';

import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface StatCounterProps {
  /** Target value to count up to (e.g. 100, 7, 4). */
  value: number;
  /** Optional gold suffix rendered after the number (e.g. "%"). */
  suffix?: string;
  /** Animation length in seconds. */
  duration?: number;
}

/**
 * Animated count-up for the About stats. Starts at 0 and eases to `value` the
 * first time it scrolls into view. The real number is rendered in the SSR HTML
 * (good for SEO / no-JS), then reset to 0 on the client before the run so there's
 * no flash. Honours prefers-reduced-motion by skipping straight to the value.
 */
export default function StatCounter({ value, suffix, duration = 1.6 }: StatCounterProps) {
  const numRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(numRef, { once: true, margin: '0px 0px -10% 0px' });
  const reduce = useReducedMotion();

  // On client mount, hold at 0 until we animate (unless reduced motion is on).
  useEffect(() => {
    if (!reduce && numRef.current) numRef.current.textContent = '0';
  }, [reduce]);

  useEffect(() => {
    const node = numRef.current;
    if (!node || !inView) return;
    if (reduce) {
      node.textContent = String(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => {
        node.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value, duration]);

  return (
    <>
      <span ref={numRef}>{value}</span>
      {suffix && <span className="text-[var(--gold)]">{suffix}</span>}
    </>
  );
}
