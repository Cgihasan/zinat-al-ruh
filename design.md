# Luxurious Technical Minimalism

## 1. Overview & Creative North Star
**Creative North Star: Architectural Precision & Editorial Elegance**
This design system is rooted in the intersection of high-end architectural precision and editorial elegance. It targets a discerning clientele who values technical expertise delivered with a premium, boutique sensibility. The visual language evokes a sense of calm authority, meticulous craftsmanship, and understated luxury.

The aesthetic follows **Minimalism** with a heavy emphasis on **Architectural Presentation**. This is achieved through expansive whitespace, high-contrast typography, and a "gallery-like" treatment of imagery and content. The interface should feel like a physical space—solid, breathable, and thoughtfully composed.

---

## 2. Colors & Surface Philosophy
The palette is anchored by the deep, authoritative **Charcoal Teal** and the refined **Metallic Gold** derived from the brand identity. 

- **Primary (Charcoal Teal):** `#001a2b` (Used for typography, structural borders, and deep-tonal backgrounds to convey stability).
- **Secondary (Gold):** `#775a19` (Reserved for highlights, active states, and fine architectural details. It should be used sparingly to maintain its premium impact).
- **Surface (White & Off-White):** `#fcf9f8` (Pure White / Off-White is the dominant color to ensure maximum whitespace. Beige and Marble tones provide subtle depth transitions between sections).
- **Accents:** Wood and Marble tones are used as textural backgrounds or image overlays to reinforce the interior technical services niche.

### Surface Hierarchy & Nesting
- **Base Layer (Surface):** `#fcf9f8`
- **Low Layer (Surface Low):** `#f6f3f2`
- **Container Layer (Surface Container):** `#f0eded`
- **High Layer (Surface Container High):** `#eae7e7`
- **Highest Layer (Surface Container Highest):** `#e5e2e1`
- **Lowest Layer (Surface Container Lowest):** `#ffffff`

---

## 3. Typography
Typography is the primary vehicle for the "editorial" feel.

- **Headlines (Bodoni Moda):** A high-contrast serif that embodies luxury. Use for hero sections and major section headers. It should never be crowded; always ensure generous leading.
- **Body (Manrope):** A refined, modern sans-serif that provides technical clarity. It acts as a grounded counter-point to the decorative nature of the headlines.
- **Labels:** Always use Manrope in uppercase with increased letter spacing for navigation, captions, and small metadata to mimic architectural blueprints.

### Typography Scale
- **display-lg:**
  - Font Family: `Bodoni Moda`
  - Font Size: `80px`
  - Font Weight: `400`
  - Line Height: `96px`
  - Letter Spacing: `-0.02em`
- **headline-lg:**
  - Font Family: `Bodoni Moda`
  - Font Size: `48px`
  - Font Weight: `400`
  - Line Height: `56px`
- **headline-md:**
  - Font Family: `Bodoni Moda`
  - Font Size: `32px`
  - Font Weight: `400`
  - Line Height: `40px`
- **body-lg:**
  - Font Family: `Manrope`
  - Font Size: `18px`
  - Font Weight: `400`
  - Line Height: `28px`
- **body-md:**
  - Font Family: `Manrope`
  - Font Size: `16px`
  - Font Weight: `400`
  - Line Height: `24px`
- **label-caps:**
  - Font Family: `Manrope`
  - Font Size: `12px`
  - Font Weight: `600`
  - Line Height: `16px`
  - Letter Spacing: `0.15em`

---

## 4. Spacing & Rhythm
The layout utilizes a **Fixed Grid** system (12 columns for desktop) to create a structured, museum-catalog feel.
- **Rhythm:** A strictly enforced 8px baseline grid ensures technical precision.
- **Whitespace:** Use "uncomfortable" amounts of whitespace (160px+ between sections) to elevate the perceived value of the content.
- **Alignment:** Utilize asymmetrical layouts where text blocks are offset from images, creating a dynamic, editorial flow.
- **Mobile:** Transition to a 4-column grid with reduced margins (24px) but maintain the section-gap ratio to keep the luxury feel even on smaller screens.

---

## 5. Elevation, Shapes & Components

### Depth
This design system avoids heavy drop shadows in favor of **Tonal Layers** and **Soft Ambient Occlusion**.
- **Surface Tiers:** Depth is primarily communicated through color shifts (White to Beige to Marble).
- **Outlines:** Use 0.5px or 1px hairline borders in Gold or light Neutral to define technical areas without adding visual weight.

### Shapes
To reinforce the "Technical Services" and "Architectural" nature of the brand, the shape language is **Sharp (0px)**. Rectangular forms, right angles, and straight lines convey precision, stability, and construction.

### Component Styling
- **Buttons:** Primary buttons are solid Charcoal Teal with White Manrope (Caps) text. Secondary buttons use a Gold hairline border with a hover state that fills with a subtle Gold tint. All buttons are sharp-edged.
- **Input Fields:** Minimalist design—bottom border only (1px Charcoal Teal). Labels sit above the field in `label-caps`. Focus state shifts the border color to Gold.
- **Cards:** Cards should not have shadows by default. Use a "Marble" or "Off-White" background fill to distinguish them from the "White" page background. Text within cards should be heavily inset.
- **Chips/Badges:** Small, sharp rectangles with 1px Gold borders. Used for service categories or project statuses.
