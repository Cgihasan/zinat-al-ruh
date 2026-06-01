'use client';

import { useEffect, useRef } from 'react';
import { Reveal } from './Reveal';
import { WHATSAPP_HREF } from '@/lib/data';

const CASCADE_TEXT =
  'Let us turn your space into an experience — a complimentary site visit, anywhere in the UAE.';

export default function Contact() {
  const cascadeRef = useRef<HTMLSpanElement>(null);

  // letter cascade on scroll into view
  useEffect(() => {
    const node = cascadeRef.current;
    if (!node) return;
    const chars = Array.from(node.querySelectorAll<HTMLElement>('.ch'));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            chars.forEach((c, i) => setTimeout(() => c.classList.add('is-on'), i * 22));
            obs.disconnect();
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px' }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="contact" className="section" data-section="contact" style={{ paddingBottom: '2rem' }}>
      <div className="max-w-[1500px] w-full mx-auto">
        <div className="text-center">
          <Reveal className="eyebrow center mx-auto" >
            <span style={{ fontSize: 13, letterSpacing: '0.34em' }}>START YOUR PROJECT</span>
          </Reveal>
          <Reveal
            as="p"
            className="mt-6 max-w-2xl mx-auto text-[clamp(18px,1.7vw,24px)] leading-[1.6] text-[var(--ink-dim)]"
            delay={0.05}
          >
            <span className="letter-cascade" ref={cascadeRef}>
              {Array.from(CASCADE_TEXT).map((ch, i) => (
                <span key={i} className={`ch${ch === ' ' ? ' sp' : ''}`}>
                  {ch === ' ' ? ' ' : ch}
                </span>
              ))}
            </span>
          </Reveal>
        </div>

        <div className="contact-stage">
          <Reveal>
            <div className="div-tag">
              <span className="dot" /> SAY HELLO
            </div>
            <h3 className="font-display mt-7 text-[clamp(34px,4.2vw,58px)] leading-[1.05] font-light max-w-md">
              A complimentary site visit, anywhere in the <em className="text-[var(--gold-warm)]">UAE.</em>
            </h3>
            <p className="mt-7 text-[14px] leading-[1.85] text-[var(--ink-dim)] max-w-md">
              Share a few details about your project — we&apos;ll arrange an on-site assessment,
              prepare an indicative budget, and guide you with a clear delivery plan. No obligation.
            </p>

            <div className="cta-row mt-10">
              <a href={WHATSAPP_HREF} target="_blank" rel="noopener" className="cta-btn solid">
                <svg className="btn-ic" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.4-8.23 8.4zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
                </svg>
                WhatsApp Us <span className="arrow" />
              </a>
              <a href="mailto:sales@zinatalruh.com" className="cta-btn">
                Email the Team <span className="arrow" />
              </a>
              <a href="tel:+971585258199" className="cta-btn">
                Call Directly <span className="arrow" />
              </a>
            </div>
          </Reveal>

          <Reveal className="contact-card">
            <div className="contact-row">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 2C8 2 5 5 5 9c0 5.5 7 13 7 13s7-7.5 7-13c0-4-3-7-7-7z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <div>
                <div className="label-tiny">Office</div>
                <div className="val">
                  Deira
                  <br />
                  Dubai — United Arab Emirates
                </div>
              </div>
            </div>
            <div className="contact-row">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M4 4h16v16H4z" />
                  <path d="M4 6l8 6 8-6" />
                </svg>
              </div>
              <div>
                <div className="label-tiny">Email</div>
                <div className="val">
                  <a href="mailto:sales@zinatalruh.com">sales@zinatalruh.com</a>
                </div>
              </div>
            </div>
            <div className="contact-row">
              <div className="ic">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.13 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <div className="label-tiny">Phone</div>
                <div className="val">
                  <a href="tel:+971585258199">+971 58 525 8199</a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="footer-bar">
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/logo-color.png" alt="" style={{ height: 48, width: 'auto' }} />
            <div className="leading-tight">
              <div className="text-[var(--ink)] font-display tracking-[0.18em] text-[14px]">
                ZINAT AL RUH
              </div>
              <div>TECHNICAL SERVICES LLC</div>
            </div>
          </div>

          <div className="flex gap-7">
            <a href="#hero">Top</a>
            <a href="mailto:sales@zinatalruh.com">Email</a>
            <a href="tel:+971585258199">Call</a>
            <a
              href="https://www.instagram.com/zinat_alruh"
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              Instagram
            </a>
            <a
              href="https://www.linkedin.com/company/zinatalruh/posts/?feedView=all"
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
