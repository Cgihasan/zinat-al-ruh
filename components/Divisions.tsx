'use client';

import { Reveal, RevealLine } from './Reveal';
import Gallery from './Gallery';
import { SITE_SLIDES, DESIGN_SLIDES } from '@/lib/data';

export function SiteWork() {
  return (
    <section id="site-work" className="section section-tight" data-section="site-work">
      <div className="max-w-[1600px] w-full mx-auto">
        <div className="div-frame">
          <div className="div-blueprint" />
          <div className="div-bg-number">01</div>
          <div className="div-frame-left">
            <Reveal className="div-tag">
              <span className="dot" /> DIVISION 01 — SITE WORK
            </Reveal>
            <h2 className="h2-xl">
              <RevealLine>Execution Managed</RevealLine>
              <br />
              <RevealLine>
                on Site, <em>Finished to Brief.</em>
              </RevealLine>
            </h2>
            <Reveal as="p" className="div-tagline">
              Residential &amp; commercial · delivered across the UAE.
            </Reveal>
          </div>
          <div className="div-frame-right">
            <Reveal as="p" className="div-detail">
              Real spaces, completed and handed over. Our <strong>site work</strong> covers fit-out,
              joinery, MEP coordination, gypsum, painting, flooring, glass works and final finishing
              for residential and commercial projects across the UAE.
            </Reveal>
            <Reveal as="ul" className="div-list">
              <li>Full Residential Fit-Out</li>
              <li>Renovation &amp; Finishing Works</li>
              <li>Joinery &amp; Custom Carpentry</li>
              <li>MEP Coordination</li>
              <li>Gypsum, Painting &amp; Ceiling Works</li>
              <li>Final Handover Support</li>
            </Reveal>
          </div>
        </div>

        <Gallery
          slides={SITE_SLIDES}
          autoAdvanceMs={5500}
          defaultMeta="SITE PHOTO"
          defaultLabel="Master Bedroom · Handover"
        />
      </div>
    </section>
  );
}

export function DesignConsultant() {
  return (
    <section id="design-consultant" className="section section-tight" data-section="design-consultant">
      <div className="max-w-[1600px] w-full mx-auto">
        <div className="div-frame">
          <div className="div-blueprint" />
          <div className="div-bg-number">02</div>
          <div className="div-frame-left">
            <Reveal className="eyebrow">From First Sketch to Issued Drawings</Reveal>
            <h2 className="h2-xl mt-6">
              <RevealLine>Concept, Space Planning</RevealLine>
              <br />
              <RevealLine>
                &amp; <em>Visual Direction</em> Before Build.
              </RevealLine>
            </h2>
          </div>
          <div className="div-frame-right">
            <Reveal as="p" className="div-detail">
              Our <strong>design consultation</strong> supports clients with space planning, material
              direction, mood boards, photoreal 3D visualisation and practical design guidance before
              site execution begins.
            </Reveal>
            <Reveal as="ul" className="div-list">
              <li>Concept &amp; Space Planning</li>
              <li>Photoreal 3D Visualisation</li>
              <li>Material &amp; Finish Boards</li>
              <li>Budget-Based Design Direction</li>
              <li>Client Presentation Support</li>
            </Reveal>
          </div>
        </div>

        <Gallery
          slides={DESIGN_SLIDES}
          autoAdvanceMs={5000}
          defaultMeta="CONCEPT RENDER"
          defaultLabel="Formal Living & Dining"
        />
      </div>
    </section>
  );
}
