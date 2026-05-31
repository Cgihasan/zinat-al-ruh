# Zinat Al Ruh — Next.js + React Three Fiber

Cinematic 3D-scroll port of the Zinat Al Ruh Technical Services site (Dubai interior fit-out),
built from the original design brief: **Next.js (App Router) · React Three Fiber · Three.js ·
GSAP ScrollTrigger · Lenis · Tailwind · Framer Motion**.

The static HTML/CSS/JS prototype it was ported from lives in `../zinatalruh-website/` (reference).

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start
```

## How it works

- **3D layer** (`components/three/`): a fixed full-viewport `<Canvas>` (client-only via
  `next/dynamic`, `ssr:false`) sits behind the DOM. `CameraRig` flies the camera down a
  procedural luxury corridor (`InteriorSpace`) as you scroll, with mouse parallax. The bundle's
  photos hang as framed planes (`GalleryPlanes`); six service cards float in a slow ring
  (`ServiceCards`). `Lights` provides the gold/champagne mood. The accent colour follows the
  live `--gold-bright` CSS var, so the Tweaks panel recolours the 3D scene too.
- **Scroll** (`components/ScrollProvider.tsx`): Lenis smooth scroll wired to GSAP ScrollTrigger,
  publishing a normalized `0..1` progress ref the camera reads each frame; also drives the top
  progress bar.
- **Reveals** (`components/Reveal.tsx`): Framer Motion reproductions of the prototype's masked
  line slide-up, translate-fade, and blur-in patterns.
- **Fallback** (`components/SceneMount.tsx`): on mobile (<768px), `prefers-reduced-motion`, or
  when WebGL is unavailable, the Canvas is skipped and the ported CSS ambient background
  (`components/Ambient.tsx`) carries the mood. The page stays fully functional.
- **Content**: all copy, sections, SEO metadata, JSON-LD, the WhatsApp CTA payload, the enquiry
  form, and the Tweaks panel (accent / atmosphere / finish, persisted to `localStorage`) are
  ported verbatim from the prototype.

## Project map

```
app/
  layout.tsx     SEO metadata + GeneralContractor JSON-LD; next/font (Bodoni Moda + Manrope)
  page.tsx       composes the scene + all sections
  globals.css    design tokens + every component style (font literals → next/font vars)
lib/data.ts      typed SERVICES, ICONS, SITE/DESIGN slides, ACCENTS/ATMOS/FINISH
components/      ScrollProvider, Reveal, Loader, Nav, Hero, Services, Gallery, Divisions,
                 About, Enquiry, Contact, TweaksPanel, Ambient, SceneMount
components/three/ Scene, CameraRig, InteriorSpace, GalleryPlanes, ServiceCards, Lights
public/assets/   logo, hero video, design/ + site/ photos, team photo
```

## Notes

- Bodoni Moda's lightest hosted weight is 400; the design's `font-weight:300` falls back to it.
  Next prints a harmless "Failed to find font override values for font Bodoni Moda" line at
  build/dev — it only means no layout-shift metrics are bundled, not an error.
