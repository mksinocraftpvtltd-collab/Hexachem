# HEXACHEM — Website (multi-file repo)

Static site for HEXACHEM (Specialty Chemical Trading & Distribution), built to the
**Six & Sun** brand guidelines and the **INDEUR Placement Developer Brief v1.0**.
No build step — plain HTML/CSS/JS, deploys on Cloudflare Pages via GitHub.

## Edit these files (everything you'll normally change lives here)

1. **config.js** — contact details (`HX`), office locations (`OFFICES`), and the
   **legal entity** (`LEGAL_ENTITY`). Single source of truth.
2. **content.js** — `CERTIFICATIONS` and `OPENINGS`. Empty = hidden / "none" state.

## Before launch — replace placeholders

- `config.js` → `HX`: real phone, WhatsApp (digits only, country code, no "+"), email.
- `config.js` → `OFFICES`: real locations.
- `terms.html` (or pages/terms.html): replace **[city]** in the Governing law clause.
- `robots.txt` / `sitemap.xml`: replace **YOUR-DOMAIN** with your real domain.
- Have the Privacy, Terms and Cookies pages reviewed by your CA / legal adviser.

## Brand vs legal entity (per the Developer Brief)

- **HEXACHEM** is the brand — hero, nav, titles, product copy, meta tags. (No INDEUR here.)
- **INDEUR INNOVATION SERVICES PRIVATE LIMITED** is the registered company — it appears
  ONLY in the footer legal block, the Contact "Legal Information" block, and the
  Privacy / Terms / Cookies pages. It is driven entirely by `LEGAL_ENTITY` in config.js.

### After the MCA rename → HEXACHEM PERFORMANCE PRIVATE LIMITED
Change **one line** in `config.js`:
```js
name: "HEXACHEM PERFORMANCE PRIVATE LIMITED",   // was INDEUR...
```
That updates the footer, Contact block, Privacy and Terms automatically. CIN does not
change; GSTIN may need a separate GST update (your CA handles this). Meta tags, OG tags,
sitemap and domain need no change — they were always HEXACHEM.

Note: this static site does not generate tax invoices, so the GST invoice rule in the
brief (supplier name = INDEUR) applies to your invoicing system, not this website.

## Deploy (Cloudflare Pages + GitHub)

1. Upload everything in this folder to the **root** of a GitHub repo (so `index.html`
   is at the top level — not inside a subfolder).
2. Cloudflare → Workers & Pages → Create → Pages → Connect to Git → select the repo.
3. Framework preset **None**, Build command **empty**, Output directory **/**. Deploy.

## Files
index, products, industries, quality, about, careers, contact, privacy, terms, cookies, 404
· styles.css · app.js · config.js · content.js · favicon.svg · robots.txt · sitemap.xml · _headers

© 2026 HEXACHEM · Six Strong
