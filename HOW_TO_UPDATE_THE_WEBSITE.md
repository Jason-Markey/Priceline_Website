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
| Christmas/New Year trading days | `specialHours` in `src/data/site.ts` |
| Public holidays and whether we open | `publicHolidays` in `src/data/site.ts` (feeds /public-holiday-hours/, schema and llms.txt). Add next year's Queensland dates each October |
| Facts for overseas visitors (cards, Alipay, language, bulk orders) | `visitorFacts` in `src/data/site.ts` (visitor page, vitamins page, llms.txt) |
| Chinese guide for visitors buying vitamins | `src/pages/zh/vitamins-gold-coast.astro`; English copy for checking in `reference-content/zh-vitamins-gold-coast-english.md` (keep the two in step) |
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
- No prices for medicines or vaccines (Jason, 16 Oct 2026); say "you'll see the price when you book".
- Vaccines: anything free under the NIP or a Queensland Government program is given completely free, with no fee,
  even when Queensland Health doesn't reimburse the pharmacy (Jason, 25 Oct 2026).
  We don't give rabies, dengue, yellow fever or polio vaccines (Jason, 17 and 26 Oct 2026). Travel vaccines we do give:
  hepatitis A and B, typhoid, cholera, Japanese encephalitis, plus whooping cough and meningococcal (Jason, 26 Oct 2026). Vaccine brand names are blocked words.
- We don't compound medicines (Jason, 17 Oct 2026).
- Help Medical bulk bills everyone with a Medicare card; patients without Medicare are private patients and pay a fee
  (Jason, 17 Oct 2026). Say "bulk bills everyone with a Medicare card", not "eligible patients".
- Health checks: lead with the free service and name SiSU Health as the provider; don't promote the station itself as a product
  (TGA health-service advertising guidance). Priceline isn't a Shane Warne Legacy partner; SiSU Health is (fact-check, 26 Oct 2026).
- Re-check /normal-blood-pressure/ when the final "2027" Australian guideline on elevated blood pressure and hypertension is
  published (draft consultation closed 12 Oct 2026); its categories may change.
- Australian Padel Shop: customers can pick up their online orders in store. Mention it only in the padel article,
  never on the homepage, in the menus or on service pages (Jason, 17 Oct 2026).

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
- Bing Webmaster Tools: site added 16 Oct 2026 under jason@ (imported from Search Console). Its AI Performance
  report shows how often Microsoft Copilot cites our pages (40 citations on 12–14 Oct, led by the PBS Safety Net article).
- Weekly check: the scheduled task "Pharmacy website weekly check" (Tuesdays 8:48am Brisbane) reads Search Console,
  Bing and GA4 and sends Jason a short summary. It changes nothing.
- Bing, ChatGPT search, Copilot, DuckDuckGo: IndexNow. After every push that changes `dist/`, GitHub Actions waits for
  the deploy and sends the changed page addresses to IndexNow (`.github/workflows/indexnow.yml`, `tools/indexnow.py`).
  The key file is `public/d453aba426cec5f9df251eb8c387754c.txt`; keep it.
- `/llms.txt` lists the key facts, services and every live article by topic for AI assistants. It rebuilds itself.

## SEO audits (claude-seo)

- The claude-seo plugin (github.com/AgriciDaniel/claude-seo, MIT licence, v2.5.0 when added on 26 Oct 2026) is switched
  on for this repo in `.claude/settings.json`. Claude Code picks it up from there (it may ask you to trust or install it
  the first time). If `/seo` isn't available, run `/plugin install claude-seo@agricidaniel-claude-seo`, then `/seo setup` once.
- Useful commands: `/seo audit https://pricelinepacificfair.com.au` (full audit with parallel agents), `/seo page <url>`,
  `/seo schema <url>`, `/seo local <url>`, `/seo geo <url>`, `/seo agentic <url>`, `/seo google` (Search Console,
  GA4 and PageSpeed data).
- **Network access.** The cloud environment "Default" allows these domains (set 26 Oct 2026):
  `pricelinepacificfair.com.au`, `*.pricelinepacificfair.com.au`, `pricelinepacificfair.com`, `*.pricelinepacificfair.com`,
  `index.commoncrawl.org`, `data.commoncrawl.org` and `ssl.bing.com`, plus the default package-manager list. Google's
  APIs are reachable by default.
- **Data access (read-only, set up 26 Oct 2026).** The same environment holds four environment variables:

  | Variable | What it holds |
  |---|---|
  | `GOOGLE_API_KEY` | PageSpeed Insights and Chrome UX Report key, Google Cloud project `priceline-seo`, restricted to those APIs |
  | `GA4_PROPERTY_ID` | The GA4 property number |
  | `BING_WEBMASTER_API_KEY` | The Bing Webmaster Tools API key |
  | `GOOGLE_SERVICE_ACCOUNT_JSON` | The key for `claude-seo-reader@priceline-seo.iam.gserviceaccount.com`, which is Restricted in Search Console (property `https://pricelinepacificfair.com.au/`) and Viewer in GA4 |

  Never print or commit these values. To use them, at the start of a session:
  1. Write `GOOGLE_SERVICE_ACCOUNT_JSON` to `~/.config/claude-seo/service-account.json` with `umask 077`.
  2. Write `~/.config/claude-seo/google-api.json` with these keys:
     - `service_account_path`
     - `ga4_property_id` (from `GA4_PROPERTY_ID`)
     - `default_property`: `https://pricelinepacificfair.com.au/`
  3. Run `claude-seo run google_auth.py --check`. It should report "Tier 2 -- Full".

  The Bing API is `https://ssl.bing.com/webmaster/api.svc/json/<Method>?siteUrl=…&apikey=$BING_WEBMASTER_API_KEY`, for
  example `GetQueryStats`, `GetPageStats`, `GetCrawlStats` or `GetCrawlIssues`.
- Without network access to the site, a session can still audit the built files in `dist/`. That's how the first audit
  was run (`reference-content/seo-audit-2026-10-26.md`).
- Its suggestions never override the page rules above (no prescription-only medicine names, no medicine or vaccine
  prices, no testimonials on clinical pages, and so on).
- It adds about 4,700 tokens to every Claude session in this repo. To switch it off, set it to `false` under
  `enabledPlugins` in `.claude/settings.json`.
- Known issue in v2.5.0: its schema check (a hook that runs after file edits) only looks at `.html` files, and it crashes
  on a JSON-LD `@type` given as a list, which our schema uses. It never runs on `.astro` edits, so normal updates aren't affected.

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
