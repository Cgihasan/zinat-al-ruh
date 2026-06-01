'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import type { Slide } from '@/lib/data';

interface GalleryProps {
  slides: Slide[];
  autoAdvanceMs: number;
  defaultMeta: string;
  defaultLabel: string;
}

/** 3D stacked photo carousel (ported from buildGallery in main.js). */
export default function Gallery({ slides, autoAdvanceMs, defaultMeta, defaultLabel }: GalleryProps) {
  const [current, setCurrent] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = slides.length;

  const resetTimer = useCallback(() => {
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setCurrent((c) => (c + 1) % count), autoAdvanceMs);
  }, [autoAdvanceMs, count]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [resetTimer]);

  const go = (i: number) => {
    setCurrent(((i % count) + count) % count);
    resetTimer();
  };
  const next = () => go(current + 1);

  // relative position (-2..2) for the stacked transform, or hidden
  const posOf = (i: number): number | null => {
    let rel = i - current;
    if (rel > count / 2) rel -= count;
    if (rel < -count / 2) rel += count;
    return Math.abs(rel) > 2 ? null : rel;
  };

  // mouse parallax tilt on the stage
  const onStageMove = (e: React.MouseEvent) => {
    const s = stageRef.current;
    if (!s) return;
    const r = s.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
    const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
    s.style.transform = `rotateX(${-dy * 4}deg) rotateY(${dx * 6}deg)`;
  };
  const onStageLeave = () => {
    if (stageRef.current) stageRef.current.style.transform = '';
    resetTimer();
  };

  const active = slides[current];

  return (
    <>
      <div
        className="stage"
        ref={stageRef}
        onClick={next}
        onMouseMove={onStageMove}
        onMouseEnter={() => timer.current && clearInterval(timer.current)}
        onMouseLeave={onStageLeave}
      >
        {slides.map((s, i) => {
          const pos = posOf(i);
          return (
            <div
              key={s.src}
              className={`slide${pos === null ? ' is-hidden' : ''}`}
              data-pos={pos === null ? undefined : pos}
            >
              <Image
                src={s.src}
                alt={s.label}
                fill
                sizes="(max-width: 768px) 90vw, 60vw"
                loading={i < 3 ? 'eager' : 'lazy'}
                style={{ objectFit: 'cover' }}
              />
            </div>
          );
        })}

        <div className="stage-caption">
          <div>
            <div className="meta">{active?.meta ?? defaultMeta}</div>
            <div className="label">{active?.label ?? defaultLabel}</div>
          </div>
          <div className="counter">
            <span>{String(current + 1).padStart(2, '0')}</span>
            <span className="total">
              {' '}/ <span>{String(count).padStart(2, '0')}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-6">
        <div className="thumbs">
          {slides.map((s, i) => (
            <div
              key={s.src}
              className={`thumb${i === current ? ' is-active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                go(i);
              }}
            >
              <Image src={s.src} alt="" fill sizes="78px" loading="lazy" style={{ objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
