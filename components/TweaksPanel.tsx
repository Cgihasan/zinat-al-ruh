'use client';

import { useEffect, useState } from 'react';
import { ACCENTS, ATMOS, FINISH, FINISHES } from '@/lib/data';

const STORAGE_KEY = 'zar-tweaks';

interface Tweaks {
  accent: string;
  atmosphere: string;
  finish: string;
}

const DEFAULTS: Tweaks = { accent: 'champagne', atmosphere: 'midnight', finish: 'matte' };

function applyAccent(k: string) {
  const a = ACCENTS[k] || ACCENTS.champagne;
  const r = document.documentElement.style;
  r.setProperty('--gold', a.gold);
  r.setProperty('--gold-warm', a.warm);
  r.setProperty('--gold-bright', a.bright);
  r.setProperty('--gold-deep', a.deep);
  r.setProperty('--line', a.line);
}
function applyAtmo(k: string) {
  document.body.classList.remove('atmo-midnight', 'atmo-warm', 'atmo-cool');
  document.body.classList.add('atmo-' + k);
}
function applyFinish(k: string) {
  document.documentElement.style.setProperty('--glow-mul', String(FINISH[k] ?? 1));
}

export default function TweaksPanel() {
  const [open, setOpen] = useState(false);
  const [tweaks, setTweaks] = useState<Tweaks>(DEFAULTS);

  // load persisted + apply on mount
  useEffect(() => {
    let init = DEFAULTS;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) init = { ...DEFAULTS, ...JSON.parse(raw) };
    } catch {
      /* ignore */
    }
    setTweaks(init);
    applyAccent(init.accent);
    applyAtmo(init.atmosphere);
    applyFinish(init.finish);
  }, []);

  // Esc closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const update = (patch: Partial<Tweaks>) => {
    const next = { ...tweaks, ...patch };
    setTweaks(next);
    if (patch.accent) applyAccent(patch.accent);
    if (patch.atmosphere) applyAtmo(patch.atmosphere);
    if (patch.finish) applyFinish(patch.finish);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      {/* toggle FAB */}
      <button
        type="button"
        aria-label="Open theme tweaks"
        onClick={() => setOpen((o) => !o)}
        style={{
          position: 'fixed',
          right: 18,
          bottom: 18,
          zIndex: 199,
          width: 44,
          height: 44,
          borderRadius: '50%',
          border: '1px solid rgba(228,194,148,0.4)',
          background: 'rgba(0,13,24,0.8)',
          color: 'var(--gold-bright)',
          cursor: 'pointer',
          display: open ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </button>

      <div id="tweaks-panel" className={open ? 'is-open' : ''} aria-label="Tweaks">
        <div className="tp-head">
          <span className="tp-title">Tweaks</span>
          <button className="tp-close" aria-label="Close" onClick={() => setOpen(false)}>
            ✕
          </button>
        </div>

        <div className="tp-sec">Accent</div>
        <div className="tp-swatches">
          {Object.entries(ACCENTS).map(([k, a]) => (
            <button
              key={k}
              className={`tp-sw${tweaks.accent === k ? ' is-active' : ''}`}
              title={a.label}
              style={{ background: `linear-gradient(135deg, ${a.bright}, ${a.gold} 55%, ${a.deep})` }}
              onClick={() => update({ accent: k })}
            />
          ))}
        </div>

        <div className="tp-sec">Atmosphere</div>
        <div className="tp-seg">
          {ATMOS.map(([k, label]) => (
            <button
              key={k}
              className={tweaks.atmosphere === k ? 'is-active' : ''}
              onClick={() => update({ atmosphere: k })}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="tp-sec">Finish</div>
        <div className="tp-seg">
          {FINISHES.map(([k, label]) => (
            <button
              key={k}
              className={tweaks.finish === k ? 'is-active' : ''}
              onClick={() => update({ finish: k })}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
