# HEXACHEM — Website (self-contained / foolproof)

Every page in this folder has its CSS and JavaScript built INSIDE the file — there are
no separate styles.css / app.js to go missing. Upload and it cannot render unstyled.
Recommended for hand-upload to GitHub + Cloudflare Pages.

## Deploy
Upload ALL files in this folder to the **root** of your GitHub repo (index.html at the
top level), commit, and connect Cloudflare Pages (Framework preset **None**, Build
command **empty**, Output directory **/**).

## Editing later
Because the code is baked into each page, a change (e.g. your phone number, CIN/GSTIN,
or the legal entity name after the MCA rename) must be made in each HTML file — search
and replace the value across the files, or send the change to your developer to
regenerate the set. The values to replace before launch:
- Phone / WhatsApp / email, [city] in Terms, and YOUR-DOMAIN in robots.txt / sitemap.xml.
- Have Privacy / Terms / Cookies reviewed by your CA / legal adviser.

## Brand vs legal entity
HEXACHEM is the brand (everywhere visible). INDEUR INNOVATION SERVICES PRIVATE LIMITED
is the registered company and appears only in the footer legal block, the Contact
"Legal Information" block, and the Privacy / Terms / Cookies pages. After the MCA rename
to HEXACHEM PERFORMANCE PRIVATE LIMITED, replace that name wherever it appears in these
files (footer, contact, privacy, terms, cookies).

© 2026 HEXACHEM · Six Strong
