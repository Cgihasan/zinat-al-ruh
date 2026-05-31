// Zinat Al Ruh — shared data (ported verbatim from the static build's main.js / tweaks)

export type IconKey =
  | 'building' | 'tools' | 'window' | 'hex'
  | 'bulb' | 'gear' | 'compass' | 'crane';

export interface Service {
  num: string;
  name: string;
  icon: IconKey;
  desc: string;
}

export const SERVICES: Service[] = [
  { num: '01', name: 'Interior Fit-Out',          icon: 'building', desc: 'Turnkey interiors built and finished to a single accountable standard.' },
  { num: '02', name: 'Renovation & Finishing',    icon: 'tools',    desc: 'Refurbishment and finishing works that restore and elevate spaces.' },
  { num: '03', name: 'Glass & Aluminium',         icon: 'window',   desc: 'Façades, partitions, doors and glazing in clean modern lines.' },
  { num: '04', name: 'Flooring Works',            icon: 'hex',      desc: 'Tiling, stone, parquet and resilient floors laid level and lasting.' },
  { num: '05', name: 'Custom Interior Solutions', icon: 'bulb',     desc: 'Bespoke joinery, panelling and feature elements made to brief.' },
  { num: '06', name: 'Technical Coordination',    icon: 'gear',     desc: 'MEP, scheduling and trade coordination aligned by one team.' },
  { num: '07', name: 'Design Consultation',       icon: 'compass',  desc: 'Space planning, 3D visualisation and material direction before build.' },
  { num: '08', name: 'Site Work Execution',       icon: 'crane',    desc: 'On-site delivery, supervision and final handover across the UAE.' },
];

// SVG inner markup for each icon (rendered with currentColor)
export const ICONS: Record<IconKey, string> = {
  building: `<svg viewBox="0 0 48 64" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="8" y="16" width="32" height="42"/><path d="M8 16 L24 6 L40 16"/><rect x="13" y="22" width="6" height="6"/><rect x="29" y="22" width="6" height="6"/><rect x="13" y="34" width="6" height="6"/><rect x="29" y="34" width="6" height="6"/><rect x="21" y="46" width="6" height="12"/></svg>`,
  tools: `<svg viewBox="0 0 48 64" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M14 50 L8 44 L20 32 M10 46 L24 32"/><path d="M38 50 L24 36 L34 26 L42 34 Z"/><path d="M30 18 L38 26"/></svg>`,
  window: `<svg viewBox="0 0 48 64" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="10" y="6" width="28" height="46"/><path d="M10 29 L38 29 M24 6 L24 52"/><rect x="15" y="11" width="6" height="13"/><rect x="27" y="11" width="6" height="13"/><rect x="15" y="34" width="6" height="13"/><rect x="27" y="34" width="6" height="13"/></svg>`,
  hex: `<svg viewBox="0 0 48 64" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M24 6 L40 16 L40 40 L24 50 L8 40 L8 16 Z"/><path d="M24 18 L32 23 L32 33 L24 38 L16 33 L16 23 Z"/><path d="M8 16 L24 28 L40 16 M24 28 L24 50"/></svg>`,
  bulb: `<svg viewBox="0 0 48 64" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M16 26 a8 8 0 1 1 16 0 c0 5 -3 7 -3 12 h-10 c0 -5 -3 -7 -3 -12 Z"/><path d="M20 46 h8 M21 50 h6 M24 54 v2"/><path d="M24 4 L24 8 M8 20 L11 21 M40 20 L37 21 M12 9 L14 12 M36 9 L34 12"/></svg>`,
  gear: `<svg viewBox="0 0 48 64" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="24" cy="32" r="6"/><path d="M24 16 L24 22 M24 42 L24 48 M8 32 L14 32 M34 32 L40 32 M13 21 L17 25 M31 39 L35 43 M13 43 L17 39 M31 25 L35 21"/></svg>`,
  compass: `<svg viewBox="0 0 48 64" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="24" cy="14" r="3"/><path d="M24 17 L13 52 M24 17 L35 52"/><path d="M19 38 a7 7 0 0 0 10 0"/><path d="M13 52 L10 56 M35 52 L38 56"/></svg>`,
  crane: `<svg viewBox="0 0 48 64" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M17 56 L17 14"/><path d="M7 14 L41 14"/><path d="M17 14 L11 22 M17 14 L25 22"/><path d="M34 14 L34 24 M30 24 L38 24"/><path d="M11 56 L23 56"/></svg>`,
};

export interface Slide {
  src: string;
  label: string;
  meta: string;
}

export const SITE_SLIDES: Slide[] = [
  { src: '/assets/site/05-living-handover.jpg', label: 'Formal Living · Handover',     meta: 'COMPLETED SITE · DUBAI' },
  { src: '/assets/site/06-dining-handover.jpg', label: 'Dining Lounge · Pre-Handover', meta: 'COMPLETED SITE · DUBAI' },
  { src: '/assets/site/02-master-bedroom.jpg',  label: 'Master Bedroom · Furnished',   meta: 'RESIDENTIAL FIT-OUT' },
  { src: '/assets/site/03-living-tv.png',       label: 'Living Room · Joinery',        meta: 'RESIDENTIAL FIT-OUT' },
  { src: '/assets/site/01-bedroom-wardrobe.png',label: 'Bedroom · Custom Wardrobe',    meta: 'RESIDENTIAL FIT-OUT' },
  { src: '/assets/site/04-kitchen-units.jpg',   label: 'Kitchen · Cabinetry',          meta: 'RESIDENTIAL FIT-OUT' },
];

export const DESIGN_SLIDES: Slide[] = [
  { src: '/assets/design/04-formal-living.jpg',  label: 'Formal Living & Dining',   meta: 'CONCEPT RENDER · VILLA' },
  { src: '/assets/design/05-living-dining.jpg',  label: 'Living & Dining Area',     meta: 'CONCEPT RENDER · VILLA' },
  { src: '/assets/design/07-stair.jpg',          label: 'Double-Height Stair',      meta: 'CONCEPT RENDER · VILLA' },
  { src: '/assets/design/03-entrance.jpg',       label: 'Entrance Foyer',           meta: 'CONCEPT RENDER · VILLA' },
  { src: '/assets/design/06-office-library.jpg', label: 'Home Office & Library',    meta: 'CONCEPT RENDER · VILLA' },
  { src: '/assets/design/02-bathroom-marble.jpg',label: 'Master Bathroom · Marble', meta: 'CONCEPT RENDER · VILLA' },
  { src: '/assets/design/01-master-bathroom.jpg',label: 'Guest Bathroom · Stone',   meta: 'CONCEPT RENDER · VILLA' },
];

// ===== Tweaks (accent / atmosphere / finish) =====
export interface Accent {
  label: string;
  gold: string;
  warm: string;
  bright: string;
  deep: string;
  line: string;
}

export const ACCENTS: Record<string, Accent> = {
  champagne: { label: 'Champagne',   gold: '#c39a4a', warm: '#d4b07a', bright: '#e4c294', deep: '#775a19', line: 'rgba(195,154,74,0.22)' },
  bronze:    { label: 'Rose Bronze', gold: '#b27a52', warm: '#d3a079', bright: '#e7bd99', deep: '#6e4322', line: 'rgba(178,122,82,0.24)' },
  platinum:  { label: 'Platinum',    gold: '#9aa6ad', warm: '#c2ccd2', bright: '#dfe6ea', deep: '#5d666b', line: 'rgba(154,166,173,0.22)' },
  emerald:   { label: 'Emerald',     gold: '#3f8f73', warm: '#6fb497', bright: '#a8d8c2', deep: '#245040', line: 'rgba(63,143,115,0.24)' },
};

export const ATMOS: [string, string][] = [
  ['midnight', 'Midnight'],
  ['warm', 'Warm'],
  ['cool', 'Cool'],
];

export const FINISH: Record<string, number> = { matte: 0.45, satin: 1, luminous: 1.8 };
export const FINISHES: [string, string][] = [
  ['matte', 'Matte'],
  ['satin', 'Satin'],
  ['luminous', 'Luminous'],
];

export const HERO_ROLES = ['Residential', 'Commercial', 'Retail', 'Hospitality'];

export const NAV_LINKS: { href: string; label: string; num: string }[] = [
  { href: '#hero', label: 'Home', num: '01' },
  { href: '#services', label: 'Services', num: '02' },
  { href: '#site-work', label: 'Site Work', num: '03' },
  { href: '#design-consultant', label: 'Design', num: '04' },
  { href: '#about', label: 'About', num: '05' },
  { href: '#contact', label: 'Contact', num: '06' },
];

export const WHATSAPP_HREF =
  "https://wa.me/971585258199?text=Hi%20Zinat%20Al%20Ruh%2C%20I'd%20like%20to%20discuss%20an%20interior%20project.";
