# Brief: building a service page

Read this whole file, then `src/pages/prescriptions.astro` (the worked example), `src/layouts/ServicePage.astro`, the service's entry in `src/data/services.ts`, and the captured live page in `reference-content/pages/<slug>.md`.

## What to produce
One file `src/pages/<slug>.astro` per service, using `ServicePage`. The URL is `/<slug>/` and must match the `slug` in `services.ts` exactly.

```astro
---
import ServicePage from '../layouts/ServicePage.astro';
import { site } from '../data/site';
import { serviceBySlug } from '../data/services';
const service = serviceBySlug('<slug>')!;
const faqs = [ { q: '…?', a: '…' }, … ];   // 4–7 questions; answers are plain text or small inline HTML (<a>, <strong>)
---
<ServicePage
  service={service}
  title="…"            // <title>, ≤60 chars, pattern "<Service> <Broadbeach/Pacific Fair> | Priceline Pacific Fair" — reuse the live title from the reference file's front-matter unless it's over 60 chars
  description="…"      // meta description 140–160 chars; reuse the live one unless weak
  h1="…"               // sentence case; keep the live H1's meaning; include "Pacific Fair" or "Broadbeach" once where natural
  lead="…"             // 1–3 sentences that directly answer "what is this and can I get it here" — this is what AI answer engines quote
  faqs={faqs}
  hub={{ name: 'Pharmacy services', href: '/pharmacy-services/' }}   // hub per group below
  primaryCta={{ label: 'Book online', href: site.links.book, external: true, event: 'book' }}   // choose per page, see CTAs
  secondaryCta={{ label: `Call ${site.phone}`, href: site.phoneHref, event: 'call' }}
  dateModified="2026-10-07"
>
  <h2>…</h2> <p>…</p> …   body, see rules
</ServicePage>
```

### Hubs (breadcrumb parent)
- group `pharmacy` → `{ name: 'Pharmacy services', href: '/pharmacy-services/' }` (default, can omit)
- group `health` → `{ name: 'Vaccinations & health', href: '/vaccination-information/' }`
- group `beauty` → `{ name: 'Beauty & everyday', href: '/beauty-fragrance/' }`
- group `partner` (help-medical) → `{ name: 'Pharmacy services', href: '/pharmacy-services/' }`

### CTAs
- Bookable services (vaccinations, flu, travel, contraception, UTI, emergency contraception, quit smoking, ear piercing): primary = Book online → `site.links.book` (MedAdvisor; `external: true`, `event: 'book'`); secondary = Call.
- Walk-in services: primary = Call; secondary = `{ label: 'Hours & directions', href: '/visit-us/' }`.
- App page: primary = `{ label: "Get the app", href: site.links.appIos, external: true }`; secondary = `{ label: "Android", href: site.links.appAndroid, external: true }`. Other link keys: `site.links.uberEats`, `site.links.pricelineShop`, `site.links.appAndroid`.
- Help Medical: primary = `{ label: 'Book a GP', href: site.helpMedical.bookingUrl, external: true, event: 'book-gp' }`; secondary = `{ label: `Call Help Medical ${site.helpMedical.phone}`, href: site.helpMedical.phoneHref }`.

## Body rules
1. Keep every fact from the live page (`reference-content/pages/<slug>.md`). Do not invent prices, eligibility, hours, brands or claims. If something is unknown, write "ask us" rather than guessing.
2. Convert the markdown to clean HTML: `<h2>`, `<h3>`, `<p>`, `<ul>/<ol>`, `<strong>`, `<a>`. No inline styles, no classes except `class="table-wrap"` around a `<table>` if there is one.
3. Phrase the main H2s as the questions people ask ("Who is eligible for a free flu shot?", "How much does it cost?", "Do I need to book?"), in sentence case. Keep 4–8 H2s. Do not add numbered steps unless the content is a real sequence.
4. Drop from the live page: the breadcrumb line, the duplicated H1, the booking button paragraphs under the H1 (the template renders CTAs), the "Talk to our pharmacists" closing block, any NAP/address block at the end (the template adds one), any "related services" lists (the template adds them from `services.ts`), and any testimonials or review quotes.
5. Links: internal links are relative with trailing slash (`/help-medical/`). Replace every HealthEngine or `servicebookings.priceline.com.au` booking URL with `{site.links.book}` (write it as `<a href={site.links.book} rel="noopener">`). Keep external authority links (health.gov.au, healthdirect, Cancer Council, etc.) with `rel="noopener"`.
6. Compliance (Australian TGA advertising rules — non-negotiable):
   - Never name a prescription-only (Schedule 4/8) medicine or brand, including weight-loss injections, contraceptive pill brands, antibiotics, vaccines by brand name (generic vaccine names like "influenza vaccine" are fine). If the live page names one, replace it with the class ("a prescribed weight-loss medicine", "the pill").
   - Pharmacist-only / over-the-counter products may be mentioned generically; when you do, include the line "Always read the label and follow the directions for use." once in the body.
   - No testimonials, star ratings, "best", "guaranteed", "cure", "safe" (use "suitable"), or claims that something works for everyone.
   - Emergency contraception: refer to it as "the emergency contraceptive pill (the morning-after pill)"; say it's a pharmacist-only medicine available without a prescription after a short private consultation; no brand names.
7. Hours: never hard-code opening hours in body text. Say "open 7 days and until 9pm on Thursdays" or link to `/visit-us/`. Help Medical hours likewise link to `/help-medical/`.
8. Phone numbers: use `{site.phone}` / `{site.phoneHref}`; emails `{site.emailGeneral}` / `{site.emailPharmacy}`.
9. Wording: "Priceline Pharmacy Pacific Fair" on first mention, then "we"/"our pharmacists". The store is "an independently owned Priceline Pharmacy franchise store". Help Medical is "an independent general practice located inside our store". Never say Help Medical is ours.
10. Keep paragraphs short (≤3 sentences). Australian spelling. Sentence case headings. No em-dash clusters; plain sentences.
11. FAQs: 4–7 real questions people ask, each answered in 1–3 sentences; they're rendered as collapsible `<details>` and emitted as FAQPage schema, so answers must stand alone (no "see above").
12. Do not import or place images unless the reference page had a meaningful photo that exists in `src/assets/images/` — list what's there with `ls` and only use an existing file. Passport photos → `passport-photos.jpg`-style file if present; ear piercing → `ear-piercing*.jpg` if present; help-medical → `help-medical-reception.jpg` and the doctor photos. Place a photo with `<Image src={img} alt="…" widths={[480, 760]} sizes="(max-width: 760px) 100vw, 760px" />` after the first H2 (import `{ Image } from 'astro:assets'`).

## New pages (no reference file)
Write from the facts in `services.ts` plus authoritative public information (healthdirect, health.gov.au, Queensland Health, Pharmacy Guild). Keep claims general and link the source. Mark the FAQ answers conservative. Pages: `flu-vaccination`, `emergency-contraception`, `quit-smoking`.

## Check before you finish
Run `npx astro check` and `npx astro build` from the repo root; both must pass. Then `grep -il "healthengine\|servicebookings" src/pages/<your files>` must return nothing.
