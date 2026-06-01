'use client';

import Image from 'next/image';
import { Reveal } from './Reveal';
import StatCounter from './StatCounter';

export default function About() {
  return (
    <section id="about" className="section" data-section="about">
      <div className="max-w-[1500px] w-full mx-auto">
        <div className="about-frame">
          <Reveal as="h2" className="eyebrow">ABOUT ZINAT AL RUH</Reveal>

          <div className="about-cols about-cols-top">
            <div className="about-intro-col">
              <Reveal as="p" className="text-[15px] leading-[1.85] text-[var(--ink-dim)]">
                Zinat Al Ruh Technical Services LLC is a Dubai-based interior fit-out and technical
                services company delivering residential, commercial, retail and hospitality projects
                across the UAE.
              </Reveal>
              <Reveal as="p" className="mt-5 text-[15px] leading-[1.85] text-[var(--ink-dim)]" delay={0.05}>
                We support clients from initial site assessment to final execution — offering
                practical solutions for interior works, fit-out coordination, finishing, maintenance
                and technical installations. Our focus is precision, reliable site supervision,
                quality materials and smooth project coordination.
              </Reveal>
            </div>
            <div className="about-stats-col">
              <div className="stats-inline">
                <Reveal>
                  <div className="stat-num">
                    <StatCounter value={100} suffix="%" />
                  </div>
                  <div className="mt-2 text-[10px] tracking-[0.28em] text-[var(--ink-mute)] uppercase">
                    In-House Coordination
                  </div>
                </Reveal>
                <Reveal delay={0.05}>
                  <div className="stat-num">
                    <StatCounter value={7} />
                  </div>
                  <div className="mt-2 text-[10px] tracking-[0.28em] text-[var(--ink-mute)] uppercase">
                    Emirates Served
                  </div>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="stat-num">
                    <StatCounter value={4} />
                  </div>
                  <div className="mt-2 text-[10px] tracking-[0.28em] text-[var(--ink-mute)] uppercase">
                    Sectors Covered
                  </div>
                </Reveal>
                <Reveal delay={0.15}>
                  <div className="stat-num">
                    A<span className="text-[var(--gold)]">+</span>
                  </div>
                  <div className="mt-2 text-[10px] tracking-[0.28em] text-[var(--ink-mute)] uppercase">
                    Finishing Standard
                  </div>
                </Reveal>
              </div>
            </div>
          </div>

          <div className="values">
            <Reveal className="value-card">
              <div className="vt">01 — Client Focused</div>
              <div className="vh">Built around the client.</div>
              <div className="vp">
                We help homeowners, business owners, consultants and developers transform spaces into
                functional, elegant and durable interiors.
              </div>
            </Reveal>
            <Reveal className="value-card" delay={0.06}>
              <div className="vt">02 — Quality Driven</div>
              <div className="vh">Held to one standard.</div>
              <div className="vp">
                Premium execution. Clear coordination. Reliable delivery. Every project, every
                detail, every time.
              </div>
            </Reveal>
          </div>

          <Reveal className="team-block">
            <h3 className="eyebrow" style={{ marginBottom: 18 }}>
              OUR TEAM
            </h3>
            <article className="team-card team-card-wide">
              <div className="team-photo">
                <Image
                  src="/assets/team/ameer-ali.png"
                  alt="Ameer Ali, Operations Manager at Zinat Al Ruh Technical Services"
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="team-info">
                <div className="role">Operations Manager</div>
                <h3 className="name">
                  Ameer <em>Ali</em>
                </h3>
                <p className="bio">
                  Leading project execution with a strong focus on operational excellence, client
                  coordination and premium project delivery across residential and commercial
                  fit-out projects.
                </p>
                <p className="bio" style={{ marginTop: 10 }}>
                  At Zinat Al Ruh, every project is managed with a strong focus on planning,
                  coordination, site supervision and client communication — ensuring each project
                  moves smoothly from initial discussion to final handover, with clear control over
                  manpower, materials, timeline and finishing standards.
                </p>
                <span className="sig">Zinat Al Ruh · Operations</span>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
