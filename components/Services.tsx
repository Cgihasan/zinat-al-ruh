'use client';

import { useEffect } from 'react';
import { Reveal } from './Reveal';
import { SERVICES, ICONS } from '@/lib/data';

export default function Services() {
  // cursor-following glow + subtle 3D tilt on every card (ported from main.js)
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.services-grid .glass-card'));
    const onMove = (e: MouseEvent) => {
      cards.forEach((c) => {
        const r = c.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        c.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
        c.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
        const dist = Math.hypot(dx / r.width, dy / r.height);
        c.style.setProperty('--glow', Math.max(0, 1 - dist / 1.5).toFixed(3));
        c.style.setProperty('--angle', (Math.atan2(dy, dx) * 180) / Math.PI + 90 + 'deg');
        if (dist < 0.7) {
          const rx = (dy / r.height) * -10;
          const ry = (dx / r.width) * 12;
          c.style.transform = `perspective(900px) translateY(-6px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        } else {
          c.style.transform = '';
        }
      });
    };
    const onLeave = () => cards.forEach((c) => {
      c.style.setProperty('--glow', '0');
      c.style.transform = '';
    });
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section id="services" className="section" data-section="services">
      <div className="max-w-[1500px] w-full mx-auto">
        <div className="sec-head max-w-[920px]">
          <Reveal as="h2" className="eyebrow">OUR SERVICES</Reveal>
          <Reveal as="p" className="sec-lead mt-7 max-w-2xl" delay={0.08}>
            Zinat Al Ruh brings design understanding, technical coordination and site execution
            together — delivering residential, commercial, retail and hospitality interiors with
            clean finishing and reliable supervision.
          </Reveal>
        </div>

        <div className="services-grid mt-12">
          {SERVICES.map((s, i) => (
            <div key={s.num} className="glass-card" style={{ ['--i' as string]: i }}>
              <div className="glow" />
              <div className="num">{s.num}</div>
              <div className="icon" dangerouslySetInnerHTML={{ __html: ICONS[s.icon] }} />
              <div className="svc-foot">
                <h3 className="title">{s.name}</h3>
                <div className="underline" />
                <div className="svc-desc">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
