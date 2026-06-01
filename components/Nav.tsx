'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { NAV_LINKS } from '@/lib/data';
import { useScroll } from './ScrollProvider';

export default function Nav() {
  const { lenis, scrollTo } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) lenis.current?.stop();
    else lenis.current?.start();
  }, [menuOpen, lenis]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const wasOpen = menuOpen;
    if (menuOpen) setMenuOpen(false);
    const el = document.getElementById(href.slice(1));
    if (el) setTimeout(() => scrollTo(el), wasOpen ? 380 : 0);
  };

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
        <a href="#hero" className="logo-mark" onClick={(e) => go(e, '#hero')}>
          <Image
            src="/assets/logo-color.png"
            alt="Zinat Al Ruh Technical Services LLC — Premium Interior Fit-Out Dubai"
            width={51}
            height={72}
            priority
          />
          <span className="logo-name">
            <span className="ln-1">ZINAT AL RUH</span>
            <span className="ln-2">Technical Services LLC</span>
          </span>
        </a>

        <button
          className={`${menuOpen ? 'is-open' : ''}`}
          id="menu-btn"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </nav>

      <div id="menu-overlay" className={menuOpen ? 'is-open' : ''}>
        <div id="menu-bg" onClick={() => setMenuOpen(false)} />
        <div id="menu-panel">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="menu-link" data-num={l.num} onClick={(e) => go(e, l.href)}>
              {l.label}
            </a>
          ))}
          <div className="mt-6 text-[10px] tracking-[0.36em] uppercase text-[var(--gold)]">
            Deira · Dubai · United Arab Emirates
          </div>
        </div>
      </div>
    </>
  );
}
