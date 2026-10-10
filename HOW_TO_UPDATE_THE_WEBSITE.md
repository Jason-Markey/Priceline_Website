# How to update the website

The site is a static site built with Astro. All content lives in this repository on GitHub
(`Jason-Markey/Priceline_Website`). Pushing to `main` deploys automatically (the cPanel cron pulls and
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
| Article categories (topics) | `src/data/categories.ts` and the `category` list in `src/content.config.ts` (keep both in step). A category page is noindex and left out of the sitemap until it has 3 live articles |
| Research behind the article plan, verified priceline.com.au range links, ideas for future articles | `reference-content/research/2026-10-content-research.md` |
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
python3 tools/check-articles.py   # article front-matter, scheduled-link order, blocked words (no build needed)
python3 tools/check-build.py   # one H1, unique titles, meta lengths, internal links, blocked words
python3 tools/seo-audit.py     # canonical, schema, alt text, sitemap, image weight, AI crawler rules
git add -A && git commit -m "Describe the change" && git push
```

`dist/` is committed on purpose so the server never needs Node. Always commit after a build.

Preview locally before pushing: `npm run preview` then open http://127.0.0.1:4321/.

## Scheduling articles

- An article is live once its `publishDate` (Brisbane date) has arrived and `draft` isn't true. Scheduled articles go
  live at the next build on or after that date; the weekly rebuild runs every Monday at 6am Brisbane, so date scheduled
  articles on a Monday.
- An article may only link to articles that are live on or before its own `publishDate`, otherwise the weekly rebuild
  fails its link check and nothing publishes. `python3 tools/check-articles.py` checks this (and titles, descriptions,
  categories and blocked words) without a build. Run it after adding or editing any article.
- To preview everything that's scheduled: `ARTICLES_AS_OF=2027-12-31 npm run build`, then rebuild normally before committing.
- Product mentions: link to the matching range page on priceline.com.au (a `/c/` URL from the research notes), not to a
  single product, and never name brands of therapeutic goods (medicines, sunscreens, supplements).

## Search engines and AI assistants

- Google: Search Console (sitemap `/sitemap-index.xml` submitted). Request indexing for new pages in URL Inspection
  (about 10 a day).
- Bing, ChatGPT search, Copilot, DuckDuckGo: IndexNow. After every push that changes `dist/`, GitHub Actions waits for
  the deploy and sends the changed page addresses to IndexNow (`.github/workflows/indexnow.yml`, `tools/indexnow.py`).
  The key file is `public/d453aba426cec5f9df251eb8c387754c.txt`; keep it.
- `/llms.txt` lists the key facts, services and every live article by topic for AI assistants. It rebuilds itself.

## After a content change, check

1. The page renders (open it in the preview or on staging).
2. `python3 tools/check-build.py` passes.
3. If you changed hours or contact details, also update the Google Business Profile so the two agree.

## Deploy details (for reference)

- Server: VentraIP cPanel, account `pricelin`. Repo clone at `/home/pricelin/repos/priceline_website`.
- Cron (every 5 min): `cd /home/pricelin/repos/priceline_website && git pull -q origin main && /bin/cp -R dist/. /home/pricelin/<web-root>/`
- `.cpanel.yml` copies `dist/` to the web root when deployed from cPanel's Git Version Control screen.
- LIVE since 8 Oct 2026 21:16 AEST: pricelinepacificfair.com.au's document root in cPanel points at `/home/pricelin/new.pricelinepf.com.au`, the same folder the cron deploys to, so every push to main goes live within 5 minutes. new.pricelinepf.com.au still serves the same files (handy for previewing nothing; there is no separate staging now).
- Old WordPress site is parked, untouched, at `/home/pricelin/pricelinepacificfair.com.au` (files + database). Rollback = set the document root back to that folder in cPanel > Domains > Manage. Jason intends to delete it once the new site has run for a while.
- Keep `public/googlee1e8a4de870e1a5f.html` (Search Console verification).
- Cron (added 8 Oct 2026, every 5 min): pulls main and copies `dist/` to `/home/pricelin/new.pricelinepf.com.au/`.
- `pricelinepacificfair.com` (8 Oct 2026): added in cPanel as an addon domain with document root `new.pricelinepf.com.au`, and its DNS switched in VIPcontrol from a forwarder to the hosting (A 110.232.143.7). The .htaccess rule 301s it to the .com.au site; AutoSSL covers https.
- DOMAIN RENEWAL: VIPcontrol showed `pricelinepacificfair.com.au` as EXPIRING (about 1 Nov 2026) on 8 Oct 2026. Auto-renew is on; Jason to confirm the renewal goes through.
