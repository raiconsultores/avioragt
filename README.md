# AVIORA — Next.js

Port of the single-file `aviora.html` prototype to Next.js (App Router).

```
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

- `app/layout.js` — metadata, fonts, JSON-LD
- `app/globals.css` — all styles
- `components/SiteMarkup.js` — page markup (texts are filled in by language via `data-i` keys)
- `components/AvioraClient.js` — loads GSAP, ScrollTrigger and Lenis from npm and starts the site script
- `lib/aviora.js` — translations, maps, carousel, form, animations (integration points at the top: `WA_NUMBER`, `CALENDLY_URL`, `HERO_VIDEO`, `submitInquiry`)
- `public/img/` — images (extracted from the embedded base64)

## Deploy (Cloudflare)

The site is a static export (`output: 'export'` in `next.config.mjs`).

- Build command: `npm run build`
- Output directory: `out`

When a server feature is added (e.g. an API route for the inquiry form), remove `output: 'export'` and deploy with `@opennextjs/cloudflare` instead.
