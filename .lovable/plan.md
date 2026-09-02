# Handchecks — Agency Landing Page

A single-page, Apple-style site for Handchecks: content-driven lead generation, ads management, and ManyChat DM automations. No pricing. One goal: book a discovery call.

## Look and feel

- Dark cinematic hero (black, white logo) that transitions into a light, airy body as the visitor scrolls — the black-to-white shift is the signature moment.
- Apple product-page restraint: huge type, generous whitespace, one idea per screen, minimal color.
- Scroll animations: fade-and-rise on section entry, sticky pinned headline while cards scroll past, subtle parallax on the hero mark, counters that count up when stats scroll into view.
- Typography and spacing tuned to the logo's geometric sans; black/white with a single soft accent for emphasis.

## Page structure

1. **Nav** — logo, EN/FR toggle, "Book a call" button. Transparent over the hero, turns solid on scroll.
2. **Hero (dark)** — Handchecks logo mark, one strong headline about turning content into qualified leads, single CTA to book a discovery call.
3. **Transition band** — dark fades to light as the next section enters.
4. **What we do (light)** — two focused blocks: Ads Management, and ManyChat DM automations (qualifying leads and organizing the whole Instagram inbox). Animated illustrations of a DM conversation qualifying a lead and an ad-to-inbox flow.
5. **How it works** — 3 steps (content and ads bring attention → DMs qualify automatically → you get an organized inbox of ready leads), revealed one at a time on scroll.
6. **Stats** — placeholder numbers with count-up animation, structured so you drop in real figures later. Clearly marked as placeholders.
7. **Clients** — Moroccan Brothers, Mr Humble, Sofian Immobilier, Society Club Monaco, Hillal Bnb, Padel Plaza, plus "and more". Logo/photo slots left ready; I'll ask you for the image files when we get there.
8. **Booking (dark again)** — closing headline plus the embedded Calendly/Cal.com calendar. Until you give me the link, a styled placeholder sits there with the same layout.
9. **Footer** — logo, support@handchecks.com, Instagram, minimal legal line.

## Language

Full EN/FR toggle in the nav. All copy lives in one translations file so both languages stay in sync and text is easy to edit.

## What I need from you later

- Calendly / Cal.com booking link
- Real stat numbers
- Client logos and photos
- Logo files (I'll ask when building the header and hero)

## Technical notes

- TanStack Start route at `/`, single page with anchored sections.
- Motion for React for scroll-triggered animation; `prefers-reduced-motion` respected.
- Design tokens (dark/light surfaces, radii, type scale) defined in `src/styles.css`; no hardcoded colors in components.
- Calendly embed loaded lazily and client-side only, behind a config constant for the link.
- SEO head: unique title, description, og/twitter tags on the index route.
- No backend needed — booking runs through the embedded calendar.
