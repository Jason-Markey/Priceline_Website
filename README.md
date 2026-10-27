# Priceline Pharmacy Pacific Fair — website rebuild

Static rebuild of pricelinepacificfair.com.au. The project brief and status checklist live in Jason's "Website Redo" folder (PROJECT.md), not in this repo.

- `dist/` — built site. A cPanel cron copies this folder to the live site within 5 minutes of a push to `main`.
- `inventory/urls.txt` — frozen list of URLs that must survive the rebuild.
- `src/` — Astro source: pages, layouts, components, data and articles. See `HOW_TO_UPDATE_THE_WEBSITE.md`.
