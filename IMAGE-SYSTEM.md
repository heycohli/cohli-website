# Cohli Image System v1.0

## The Problem

Photos vary wildly across cohorts — Aterra has 11, Casa Sumapaz has 1. Sources are Carrd exports mixed with UI artifacts. The current 2x2 collage approach feels cramped at card size and the hero overlay is too transparent. We need a clear, repeatable system.

---

## Image Taxonomy

Every cohort should aim to collect **6 image categories**. These tell the full story of a place:

| # | Category | What it shows | Example |
|---|----------|---------------|---------|
| 1 | **Venue / Exterior** | The place itself — architecture, entrance, setting | Cabin with garden, tropical casita, art mural building |
| 2 | **Living Space** | Where families actually stay — bedroom, kitchen | Bed with mosquito net, kitchen counter, cozy room |
| 3 | **Community Moment** | Shared experience — meal, gathering, kids together | Buffet dinner, group circle, kids playing |
| 4 | **Activity / Learning** | What happens — workshop, nature, education | Weaving workshop, nature hike, art class |
| 5 | **Landscape / Place** | The broader environment — nature, surroundings | Mountains, beach, forest, village |
| 6 | **Family Moment** | Real families in the experience | Dad with kid, family on beach, morning routine |

**Priority order for cohorts with limited photos:** Venue → Living Space → Landscape → Activity

---

## Image Sizes & Formats

### Card Image (Homepage cohort cards)
- **Purpose:** First impression. One strong image that says "this is the place."
- **Approach:** Single best photo (NOT a collage)
- **Dimensions:** 800 × 500px (8:5 ratio)
- **File:** `/img/{cohort}/card.jpg`
- **Quality:** JPEG 85%
- **Why single:** At 300px card width, a 4-image collage becomes 150px per image — too small to convey anything. One strong photo lands better.

### Hero Image (Cohort page background)
- **Purpose:** Immersive first moment when entering the cohort page.
- **Approach:** Single best landscape photo, full-bleed with dark gradient overlay
- **Dimensions:** 1920 × 1080px (16:9)
- **File:** `/img/{cohort}/hero.jpg`
- **Quality:** JPEG 80% (larger file, balance quality vs speed)
- **Overlay:** Dark gradient from bottom (0.75) to top (0.15) for text readability
- **Can be same photo as card** if only 1-2 photos available

### Gallery Images (Cohort page "The Place" section)
- **Purpose:** Show variety — this is where the multi-image story lives
- **Layout:** Bento grid — 1 large (2 columns, 2 rows) + 4 small (1 column each)
- **Dimensions:** 800 × 600px each (4:3 ratio)
- **Files:** `/img/{cohort}/gallery-01.jpg` through `gallery-06.jpg`
- **Quality:** JPEG 85%
- **Minimum:** 4 images to show a gallery; fewer = show images inline

### Host Photos
- **Purpose:** Put a face to the experience
- **Dimensions:** 400 × 400px (1:1, displayed as circle)
- **File:** `/img/{cohort}/host-{name}.jpg`

### OG/Social Share Image
- **Dimensions:** 1200 × 630px (standard OG)
- **File:** `/img/{cohort}/og.jpg`
- **Contents:** Hero photo with Cohli logo + cohort name overlay

---

## Current Inventory

| Cohort | Photos Available | Card | Hero | Gallery | Gap |
|--------|-----------------|------|------|---------|-----|
| Aterra | 11 images | cabin-exterior | cabin-exterior | 6 ✓ | — |
| Con Smania | 5 images | tropical-casita | herbal-workshop | 5 ✓ | Need 1 more landscape |
| Casa de Mono | 5 images | family-beach | surfboards | 4 ✓ | — |
| Kai | 9 images | photo-22 (art mural) | bedroom-wood-beams | 6 ✓ | — |
| Casa Sumapaz | 1 image | tipi-night | tipi-night | 0 ✗ | **Need 5+ venue photos** |
| Craveiral | 0 images | — | — | — | **Need all photos** |

---

## Naming Convention

```
/img/{cohort-slug}/
  card.jpg          ← Homepage card (800×500)
  hero.jpg          ← Cohort page hero (1920×1080)
  gallery-01.jpg    ← Gallery images (800×600)
  gallery-02.jpg
  ...
  host-name.jpg     ← Host portraits (400×400)
  og.jpg            ← Social share (1200×630)
```

---

## Photography Guidelines (for future cohorts)

When sourcing photos for a new cohort:

1. **Must-haves:** At minimum, get a strong exterior/venue shot and one living space shot
2. **Golden hour preferred:** Morning or late afternoon light looks warmer and more inviting
3. **People > empty rooms:** A bedroom with a family's belongings looks lived-in; an empty room looks like a listing
4. **Landscape orientation only** for card and hero use
5. **Minimum resolution:** 1920px on the long side
6. **No text overlays, logos, or watermarks** on source photos
7. **Release:** Ensure you have permission to use venue photos on the website
