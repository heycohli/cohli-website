# Cohli Website

Production website for Cohli, a family coliving community.

## Brand

- **Primary color:** Terracotta `#b46b52`
- **CTA color:** Golden Ember `#c98e30`
- **Background:** Alabaster Sand `#f3ede4`
- **Fonts:** Fraunces (headlines), DM Sans (body), Cormorant Garamond (testimonials/quotes)
- **Tone:** Warm, grounded, community-first. Honest about the mess. Not a travel product, a shared life experience.
- **Voice guide:** Speak like a thoughtful host who genuinely cares. Clear enough for a tired parent reading at 10pm. Use "we" not "you."

## Structure

```
/index.html                - Homepage
/cohorts/*.html            - One page per cohort (from template)
/css/tokens.css            - Brand variables (single source of truth)
/css/base.css              - Shared components: nav, footer, animations, buttons, FAQ, testimonials
/css/home.css              - Homepage-specific styles
/css/cohort.css            - Cohort page-specific styles
/js/main.js                - Shared JS: nav scroll, mobile menu, fade-in observer, FAQ accordion, count-up
/img/home/                 - Homepage images
/img/[cohort-slug]/        - Cohort-specific images
/img/team/                 - Founder and host photos
```

## Rules

1. Every cohort page MUST include a "Letter from Lauren & Tiago" section below the hero/sticky bar
2. Use semantic HTML. No frameworks. Pure CSS + vanilla JS.
3. Images: WebP preferred, max 1600px wide, under 200KB each
4. All brand colors come from CSS custom properties in tokens.css. Never hardcode hex values in HTML.
5. Commit messages: descriptive, in English
6. After any change: `git push` triggers auto-deploy via Cloudflare Pages
7. Cohort cards on homepage link to `/cohorts/[slug].html`

## Adding a New Cohort

1. Copy `/cohorts/_TEMPLATE.html` (or use `casa-sumapaz.html` as a live reference)
2. Replace all cohort-specific content (name, dates, pricing, location, letter, FAQ, etc.)
3. Add cohort card to homepage grid in `index.html`
4. Add photos to `/img/[cohort-slug]/`
5. Update `sitemap.xml`
6. Commit and push

## Integrations (TODO - add IDs when ready)

- **GA4:** G-XXXXXXXXX (add to all pages)
- **Apply forms:** Typeform embed (replace # links on Apply buttons)
- **Newsletter:** ActiveCampaign form (replace newsletter form in homepage)
- **Chat:** WhatsApp link (add floating button)
- **Instagram:** @heycohli feed embed

## Deployment

- **Hosting:** Cloudflare Pages (auto-deploys from this repo's `main` branch)
- **Domain:** cohli.com
- **SSL:** Automatic via Cloudflare
- **Fallback:** OVH web hosting via SFTP (credentials in 1Password)
