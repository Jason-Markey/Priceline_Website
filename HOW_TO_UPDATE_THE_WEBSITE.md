# How to update the website

The site is a static site built with Astro. All content lives in this repository on GitHub
(`Jason-Markey/priceline_website`). Pushing to `main` deploys automatically (the cPanel cron pulls and
copies `dist/` to the web root within 5 minutes). There is no admin panel and nothing to log into.

The easiest way to make a change is to ask Claude in a chat with this repo attached: describe the change,
Claude edits the file, rebuilds, checks, and pushes. The notes below tell you (or Claude) where everything is.

## Where things live

| What you want to change | File |
|---|---|
| Opening hours, phone, email, address, Help Medical hours, QML hours, booking link | `src/data/site.ts` (one place; header strip, footer, Visit page, Contact page, schema and llms.txt all read from it) |
| A service's name, one-line description, "At a glance" facts, price, related services | `src/data/services.ts` |
| Menus (header, mobile drawer, footer) | `src/data/navigation.ts` |
| Team bios and Help Medical doctors | `src/data/team.ts` |
| A service page's body text and FAQs | `src/pages/<slug>.astro` (e.g. `src/pages/prescriptions.astro`) |
| Home page | `src/pages/index.astro` |
| A blog article | `src/content/articles/<slug>.md` (front-matter at the top: title, description, dates, category, tags, references) |
| Add a new article | Copy an existing file in `src/content/articles/`, change the file name (that becomes the URL), update the front-matter. It appears automatically in the blog index, category page, RSS, sitemap and llms.txt |
| Photos | `src/assets/images/` then reference from the page with `import` + `<Image>` |
| Redirects, caching, security headers | `public/.htaccess` |
| Robots rules | `public/robots.txt` |
| Design tokens (colours, spacing, buttons) | `src/styles/global.css` |

Rules that must hold on every page (the build check enforces most of them):
- Never name a prescription-only medicine or brand. Over-the-counter mentions need
  "Always read the label and follow the directions for use." on the page.
- No testimonials or review quotes on clinical pages. No "guaranteed", "cure", "clinically proven".
- Help Medical is "an independent general practice located inside our store".
- Don't type opening hours into page copy; link to `/visit-us/` or use `HoursCard`.

## Build and publish (what Claude does, or you can do locally)

```bash
npm install            # first time only (needs Node 20+)
npm run build          # builds dist/ and the search index
python3 tools/check-build.py   # one H1, unique titles, meta lengths, internal links, blocked words
git add -A && git commit -m "Describe the change" && git push
```

`dist/` is committed on purpose so the server never needs Node. Always commit after a build.

Preview locally before pushing: `npm run preview` then open http://127.0.0.1:4321/.

## After a content change, check

1. The page renders (open it in the preview or on staging).
2. `python3 tools/check-build.py` passes.
3. If you changed hours or contact details, also update the Google Business Profile so the two agree.

## Deploy details (for reference)

- Server: VentraIP cPanel, account `pricelin`. Repo clone at `/home/pricelin/repos/priceline_website`.
- Cron (every 5 min): `cd /home/pricelin/repos/priceline_website && git pull -q origin main && /bin/cp -R dist/. /home/pricelin/<web-root>/`
- `.cpanel.yml` copies `dist/` to the web root when deployed from cPanel's Git Version Control screen.
- Staging: new.pricelinepf.com.au. Live: pricelinepacificfair.com.au (switch the document root or the cron target at cutover).
- Keep `public/googlee1e8a4de870e1a5f.html` (Search Console verification).
- Cron (added 8 Oct 2026, every 5 min): pulls main and copies `dist/` to `/home/pricelin/new.pricelinepf.com.au/`.
- Cutover plan: in cPanel change the document root of the addon domain `pricelinepacificfair.com.au` to `new.pricelinepf.com.au`; WordPress stays in `public_html` as rollback.
- TODO at cutover: add `pricelinepacificfair.com` as an alias domain in cPanel (and check its DNS A record) so the .htaccess rule 301s it to the .com.au site.
