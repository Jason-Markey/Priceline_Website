# Local SEO and search experience (SXO) review: pricelinepacificfair.com.au

Reviewed 26 October 2026 against `dist/` (byte-identical to the live site) and `src/`, using claude-seo's `seo-local` and `seo-sxo` method (agent and skill files, `local-seo-signals.md`, `local-schema-types.md`, `maps-gbp-checklist.md`). The plugin scripts were replaced by reading files and `crawl.json`. No live SERP, Google Business Profile (GBP), review or citation data was available. Where a finding depends on live data, it says what to check and how (section J).

This is a companion to `seo-audit-2026-10-26.md`, which has the prioritised action plan. `crawl.json`, mentioned below, was a temporary crawl of `dist/` made during the audit and isn't kept in the repo.

Priority uses claude-seo's definitions. **Critical**: blocks indexing or causes penalties. **High**: significantly affects rankings (fix within a week). **Medium**: optimisation opportunity (within a month). **Low**: backlog.

Items already in the main report are not repeated: the shared og:image, sitemap lastmod, Article schema typing, the missing AHPRA number, few links from articles to services, and the checks that already pass. Link counts below exclude article pages for the same reason.

## Snapshot

- **Business type:** brick-and-mortar, one location inside a shopping centre.
- **Vertical:** healthcare (community pharmacy) plus health and beauty retail. Two separate businesses operate inside the store: Help Medical (GP) and QML Pathology (a collection room).
- **What's already right:**
  - One data file (`src/data/site.ts`) holds NAP and hours.
  - Pharmacy JSON-LD has geo to 5 decimal places, weekly and special hours, `containedInPlace` set to Pacific Fair, and a sameAs list limited to this store's own profiles.
  - There are 28 dedicated service pages, most with "Broadbeach" or "Pacific Fair" in the title and H1.
  - Every service page carries a NAP and parking block.
  - Phones get a sticky Call / Directions / Book / Scripts bar.
  - Parking, entrance and light-rail directions are thorough.
  - There are no suburb doorway pages. Keep it that way: pages for Surfers Paradise or Mermaid Beach would fail the swap test.
- **Critical issues:** none found.
- **No 0–100 score is given.** In claude-seo's local score, GBP signals and reviews carry 45% of the weight, and citations are half of the NAP dimension; all of these need live data. On-site dimensions only:

| Dimension | On-site rating |
|---|---|
| Local on-page | Strong |
| NAP on site | Consistent, except one street form that appears only in schema |
| Local schema | Strong |
| Local links | Not assessable offline |

  There is no SXO Gap Score either, because that score is defined against live SERPs.

## Findings, ranked by impact

### 1. High: holiday hours. The page that should rank says "hours vary", and almost nothing links to it

- **Where:**
  - `/public-holiday-hours/` (`src/pages/public-holiday-hours.astro:13, 38–42`)
  - `src/data/site.ts:68–69, 208–224`
  - `src/pages/index.astro:46, 122`
  - `src/components/Footer.astro:117`
  - `src/pages/contact-us.astro:35–36`
- **Evidence:**
  - 6 of the 13 rows in the built table read "Open, hours vary": Australia Day, Easter Saturday, Sunday and Monday, Labour Day and King's Birthday.
  - The lead reads "Hours vary, so check Google or call us before you come in." The meta description promises "Dates and hours."
  - After New Year's Day, every row where the store is open will read "hours vary".
  - Only 3 commercial pages link to it in body content: the FAQ, Visit and the Chinese page.
  - The home hours card, the home FAQ and the Contact hours card all say holiday hours are "updated on our Google listing", with no link to this page.
  - The footer link "Directions, parking and public holiday hours" goes to `/visit-us/`.
- **Why it matters:**
  - "Open at the time of search" is a top-5 local pack factor, and Google reads it from GBP hours.
  - The site hands holiday hours to GBP, so GBP special hours have to be complete.
  - The page itself can't satisfy searches such as "pharmacy open public holiday Gold Coast" or "Priceline Pacific Fair Christmas hours".
  - Black Friday (27 Nov) and Christmas trading are about a month away.
- **Fix** (all respects "don't type hours into page copy"):
  - (a) Enter every `specialHours` date and the three closed holidays as GBP special hours now. Add each remaining holiday's hours to GBP as soon as they're decided.
  - (b) Put decided holiday hours into `specialHours` in `site.ts`. They then flow to the table, header strip, schema and llms.txt.
  - (c) Until hours are known, reword the meta description, for example: "Which Queensland public holidays we're open, with confirmed hours where we have them."
  - (d) Link the page from the home hours section, the Contact hours card and the footer. Split the footer link into "Directions and parking" and "Public holiday hours".
  - (e) From November to January, change the title to "Christmas & Public Holiday Hours | Priceline Pacific Fair" (57 characters).
  - (f) Add the Gold Coast Show holiday (a Gold Coast regional public holiday in late August) once the 2027 date is gazetted.
  - (g) Check on qld.gov.au whether Monday 26 April 2027 is Queensland's Anzac Day holiday. If it is, add it as its own row. Today it appears only as a "call us" paragraph, so the table, schema and GBP don't carry it.
- **How you'll know:**
  - GBP shows no "hours might differ" note on holiday dates.
  - Search Console clicks and impressions for this page, on queries containing "christmas", "boxing day" or "public holiday", rise against last season.
  - A re-crawl shows at least 6 commercial pages linking to it.

### 2. High: the medical certificate page lacks the searcher's words, has one internal link, and doesn't state the fee

- **Where:** `/sick-leave-certificates/` (`src/pages/sick-leave-certificates.astro:21–24, 59`). Unlinked mentions at `src/pages/pharmacy-services.astro:46` and `src/pages/frequently-asked-questions.astro:55`.
- **Evidence:**
  - Title: "Pharmacist Sick Leave Certificates | Priceline Pacific Fair". H1: "Sick leave certificates at Pacific Fair".
  - Neither contains "medical certificate" (it appears only in the lead and an FAQ) or a place name.
  - One commercial page links to it in body content: a card on `/pharmacy-services/`.
  - Two passages mention the service without linking: the "Absence-from-work certificates" line on that same hub, and the FAQ answer "Do you do absence-from-work certificates?".
  - The cost reads: "A consultation fee applies. Ask us in store."
- **Why it matters:**
  - People search "medical certificate" plus "pharmacy" or "pharmacist", on the day they're unwell, and they pick the option that looks certain.
  - With the main search term missing from the title and H1, and almost no internal links, this is the weakest of the high-intent pages.
  - A certificate fee isn't a medicine price, so the house rule doesn't stop you publishing it. The site already shows the ear piercing, passport photo and contraception consultation fees.
- **Fix:**
  - Change the title to "Pharmacist Sick & Medical Certificates | Priceline Pac Fair" (59 characters).
  - Change the H1 to "Sick leave and medical certificates from a pharmacist at Pacific Fair". Keep the lead's clarification that it isn't a doctor's certificate.
  - Add "Broadbeach" to the meta description.
  - Link the two unlinked mentions above.
  - Add `sick-leave-certificates` to `related` for `help-medical` in `services.ts`, and add a row to the `/appointments/` table.
  - If you're willing, state the fee in `services.ts` (`atAGlance.cost`) and in the body.
- **How you'll know:**
  - In Search Console, open Pages, then `/sick-leave-certificates/`, then Queries containing "certificate". Compare impressions and average position over 28 days against today's baseline.
  - GA4 `cta_directions` and `cta_call` events on this page rise.
  - A re-crawl shows at least 5 commercial pages linking to it.

### 3. High (live check): GBP categories and the three businesses at Shop 81

- **Where:** your Google Business Profile.
- **Site evidence:**
  - `site.ts:26, 81, 101` list three different phone numbers, for the pharmacy, Help Medical and QML.
  - `schema.ts:29` types the store as `Pharmacy`. `schema.ts:186–207` types Help Medical as a separate `MedicalClinic`.
  - `index.astro:31–32` describes the home tiles as "the eight services people search for most (Search Console, Oct 2026)": ear piercing, vaccinations, doctor, passport photos, UTI, contraception, Click & Collect and medication packing.
- **Evidence:**
  - The site supports these categories for the pharmacy: Pharmacy (primary), Chemist (home title and H1, footer), Vaccination service, Ear piercing service and Passport photo processor.
  - It does not support Medical clinic or Blood testing service for the pharmacy. Help Medical and QML provide those, with their own phones, websites and booking systems.
- **Why it matters:**
  - The primary category is the number 1 local pack factor, and a wrong primary category is the number 1 negative factor.
  - Duplicate or overlapping profiles at one address are the number 2 negative factor.
  - Putting Medical clinic or Blood testing service on the pharmacy profile misrepresents the business and makes it compete with Help Medical's and QML's own listings at the same address.
- **Fix:**
  - Set the primary category to Pharmacy.
  - Add Vaccination service, Ear piercing service and Passport photo processor.
  - Add Chemist if the Australian category list offers it separately; it may be the local label for "Drug store".
  - Cosmetics store or Perfume store is optional, and only worth adding if Search Console shows beauty demand.
  - If Medical clinic or Blood testing service is on the profile, remove it. Treat this as Critical if Google has flagged the profile.
  - Ask Help Medical to keep its own listing, with its own phone and categories (Medical clinic or General practitioner).
  - The full field-by-field list is in section B.
- **How you'll know:**
  - In GBP Performance, "Searches" shows ear piercing, passport photo and vaccination terms growing.
  - A geo-grid check (section J) shows the profile in the local pack for "ear piercing" and "passport photos" around Broadbeach.

### 4. High (set up): there's no route to reviews

- **Where:** the whole site, and GBP.
- **Evidence:**
  - There is no review link, QR target, review request or rating anywhere in `src/`. Searches for review prompts, `g.page` and `writereview` find nothing.
  - There is no `aggregateRating` in the schema, which is correct.
- **Why it matters:**
  - Review signals are about 20% of local pack weight (Whitespark 2026).
  - Review count explains 19.2% of ranking variance (Search Atlas).
  - A steady flow of recent reviews counts for more than the total.
- **Fix:** follow the plan in section H. In short:
  - Use one GBP review link, on a counter QR card and on receipts.
  - Ask every customer the same way. No incentives, and no in-store review kiosk.
  - Never put review text on clinical pages or in schema.
  - Reply to every review without confirming the reviewer was a patient.
- **How you'll know:** track the GBP review count every month, keep any gap without a new review under about 2 to 3 weeks, and reply to 100% of reviews.

### 5. Medium: address. A street form that appears only in schema, and a suburb to confirm

- **Where:**
  - `site.ts:37` (`street: '2/30 Hooker Boulevard'`) and `site.ts:43` (`oneLine: '… Hooker Blvd, Broadbeach QLD 4218'`)
  - `schema.ts:47, 196`
  - Typed copies of the address at `contact-us.astro:10` and `visit-us.astro:29`
  - `schema.ts:62` (areaServed includes "Broadbeach Waters")
- **Evidence:**
  - Every full visible NAP reads "Shop 81, Pacific Fair Shopping Centre, Hooker Blvd, Broadbeach QLD 4218": footer, mobile menu, the NAP block, Visit, Contact, llms.txt and the Chinese page. The header strip uses a short form, "Shop 81, Pacific Fair, Broadbeach".
  - Only the JSON-LD reads "Shop 81, Pacific Fair Shopping Centre, 2/30 Hooker Boulevard".
  - In Australian addressing, "2/30" means unit 2 at number 30, which can't be right alongside "Shop 81".
  - The locality is "Broadbeach" everywhere; "Broadbeach Waters" appears only in areaServed.
  - Phone formats are consistent (section A).
- **Why it matters:**
  - NAP consistency is a top-15 local pack factor, and 3 of the top 5 AI-visibility factors are citations.
  - A street form that exists only in schema gives Google and AI tools a second address to reconcile.
  - If GBP shows a different line or suburb (for example "Broadbeach Waters"), that is an address mismatch. claude-seo rates that High.
- **Fix:**
  - Copy the address line from GBP exactly, character for character.
  - Confirm the centre's official locality with Australia Post's address search.
  - Make `site.address.street`, `oneLine` and the schema all match GBP. For example, drop "2/30" from the schema if GBP has no street number, or show the number everywhere if GBP does.
  - Replace the typed address strings in `contact-us.astro:10` and `visit-us.astro:29` with `site.address.oneLine`.
  - Keep "Broadbeach" as the area name in page copy either way.
- **How you'll know:**
  - GBP, the footer and the schema `streetAddress` match exactly.
  - The citation sheet (section J) shows no address mismatches.

### 6. Medium: breadcrumb parent pages don't link to most of their child pages

- **Where:**
  - `tools/PAGE-BRIEF.md:32–35`
  - The `hub=` prop on 15 pages
  - `src/pages/vaccination-information.astro:47–62`
  - `src/pages/beauty-fragrance.astro`
- **Evidence:**
  - Nine pages show the breadcrumb "Home / Vaccinations & health / …", pointing at `/vaccination-information/`. That page links to only three of them: flu, whooping cough and travel. UTI, contraception, emergency contraception, sick leave, quit smoking and women's health get no link back.
  - Six pages show "Beauty & everyday", pointing at `/beauty-fragrance/`. That page links only to fragrance and skincare. Ear piercing, passport photos, vitamins and Metagenics get no link back.
  - The parent names don't match: `/beauty-fragrance/` is called "Beauty & everyday" in its children's breadcrumbs but "Makeup & fragrance" in its own. Likewise "Vaccinations & health" versus "Vaccinations".
- **Why it matters:**
  - The visible breadcrumbs and the BreadcrumbList schema name a parent page that doesn't list the child. That weakens the hub-and-spoke structure claude-seo's local method calls for.
  - It also sends breadcrumb clicks somewhere unrelated: from UTI treatment, the parent link lands on a vaccinations page.
- **Fix:** choose one of these:
  - Point the non-vaccine health pages, plus passport photos, ear piercing, vitamins and Metagenics, at `/pharmacy-services/`, which lists every service.
  - Or add an "Other health services" card block (built from `servicesInGroup('health')`) to `/vaccination-information/`, and a "More in store" block to `/beauty-fragrance/`.

  Either way, use each parent page's own name in the breadcrumb, and update `PAGE-BRIEF.md` to match.
- **How you'll know:**
  - A re-crawl shows every child page linked from its breadcrumb parent.
  - Breadcrumb names match the parent pages' H1s.

### 7. Medium: home, Visit and the visitor guide don't link to some high-intent pages

- **Where and evidence** (body links from commercial pages, excluding articles):
  - **`/blood-tests/`: 2.** The home page says "QML Pathology collects inside Help Medical on weekday mornings" without a link (`index.astro:188`). Visit links pathology to `/help-medical/` instead (`visit-us.astro:72`).
  - **`/appointments/`: 1.** Its table has no rows for sick leave certificates or blood tests.
  - **`/emergency-contraception/` and `/travel-health/`: 5 each,** none from the home page.
  - **`/visiting-the-gold-coast/`** doesn't link to `/vitamins-supplements/` from its bulk-vitamins section (line 51), or to `/travel-health/` from "a travel vaccine" (line 62).
- **Why it matters:** links from the home page and the location pages are the strongest internal signals you control for which page answers "blood test Broadbeach" or "travel vaccines Gold Coast". At the moment these pages rely on dropdown menus.
- **Fix:**
  - Link "QML Pathology" to `/blood-tests/` on the home page and on Visit.
  - Add one sentence under the home tiles (`index.astro:137`) linking to travel vaccines, sick leave certificates, emergency contraception and blood tests.
  - Add the two missing rows to `/appointments/`.
  - Add the two links on the visitor guide.
  - Add `blood-tests` to `related` for `help-medical` in `services.ts`.
- **How you'll know:**
  - A re-crawl shows at least 4 commercial pages linking to each of these, including the home page.
  - Search Console impressions for the matching queries rise.

### 8. Medium: titles and H1s that miss the words people search for

| Page | Now | Suggested (60 characters or fewer) |
|---|---|---|
| `/emergency-contraception/` (`:19`) | Emergency Contraception Broadbeach \| Priceline Pacific Fair | **Title:** Morning-After Pill Broadbeach \| Priceline Pacific Fair (54).<br>**H1:** "Emergency contraception (the morning-after pill) at Pacific Fair, Broadbeach". This is the wording PAGE-BRIEF rule 6 already requires. |
| `/ear-piercings/` (`:27`) | Priceline Ear Piercing Pacific Fair \| $65 Both Ears, Walk In | Priceline Ear Piercing Gold Coast \| Pacific Fair, $65 (53) |
| `/blood-tests/` (`:23`) | Blood Tests at Pacific Fair \| QML Pathology inside Priceline | Blood Tests Broadbeach \| QML Pathology inside Priceline (55) |
| `/help-medical/` (`:36`) | Help Medical Pacific Fair \| Bulk-Billing GP inside Priceline | Bulk-Billing GP Broadbeach \| Help Medical inside Priceline (58) |
| `/public-holiday-hours/`, `/sick-leave-certificates/` | See findings 1 and 2 | |

- **Why it matters:**
  - "Morning-after pill" is the everyday term, and today it appears only in the lead.
  - "Gold Coast" and "Broadbeach" are the place words in the target queries.
  - The title is still the main relevance and click-through signal for a service page.
- **How you'll know:** check Search Console impressions and CTR for each page's query group 4 to 8 weeks after the change.

### 9. Medium: on the GP and pathology pages, the sticky Call and Book buttons reach the pharmacy

- **Where:** `src/layouts/Base.astro:201–219` (the sticky bar on phones) and `src/components/Header.astro:49` (the desktop "Book online" button).
- **Evidence:**
  - On `/help-medical/` and `/blood-tests/`, the sticky bar's "Call" dials the pharmacy, (07) 5592 2099, and "Book" opens the pharmacy's MedAdvisor page. The desktop header's "Book online" also opens MedAdvisor.
  - Meanwhile those pages' own buttons go to the right places: HotDoc and Help Medical's phone, or QML's booking page and phone.
  - On `/hormonal-contraceptive-pill/`, where the instruction is to call first, and on walk-in-only pages, "Book" also opens MedAdvisor.
- **Why it matters:**
  - Someone searching "bulk billing doctor Broadbeach" on a phone has their thumb on the sticky bar. Sending them to another business's phone line or booking system is the clearest conversion leak found in this review.
  - It also puts GP booking calls onto the pharmacy line.
- **Fix:**
  - Add optional `actionCall` and `actionBook` props to `Base`.
  - Pass Help Medical's phone and HotDoc link from `/help-medical/`, and QML's phone and booking link from `/blood-tests/`.
  - On call-first pages, swap "Book" for "Call" if MedAdvisor can't book that service. First check which services MedAdvisor lists.
- **How you'll know:**
  - In GA4, on `/help-medical/`, `cta_book_gp` rises and `cta_book` falls. Tracking already separates the two.
  - Staff take fewer GP booking calls.

### 10. Medium: listings (citations) and local links to claim or check

- **Where:** off-site; `schema.ts:74` (sameAs); `Footer.astro:100`; `site.ts:123–126, 144`.
- **Evidence:**
  - sameAs lists GBP (as a `maps.app.goo.gl` short link), the Pacific Fair store page, Instagram, healthdirect and HealthEngine. In `site.ts` HealthEngine is marked "Not used on pages".
  - Nothing on the site references Apple Business Connect, Bing Places or a Facebook page for this store.
  - The footer's Facebook link goes to Priceline's national page.
- **Why it matters:**
  - Bing Places feeds Copilot and ChatGPT local answers.
  - Apple Maps is the default on iPhones, including visitors' phones; BrightLocal puts its use at 27%.
  - Three of the top five AI-visibility factors are citations.
- **Fix:**
  - Claim Bing Places (you can import from GBP) and Apple Business Connect.
  - Check name, address, phone, hours and website link on each of these:
    - the priceline.com.au store finder
    - the Pacific Fair directory page
    - the healthdirect service finder
    - findapharmacy.com.au
    - HealthEngine
    - MedAdvisor
    - Uber Eats
    - Yellow Pages
    - TrueLocal
  - Ask Pacific Fair and Help Medical to link to pricelinepacificfair.com.au rather than priceline.com.au. They're the most relevant local links available to you.
  - If the store has its own Facebook page, link it in the footer and add it to sameAs.
  - In sameAs, swap the short link for the profile's CID URL (`https://maps.google.com/?cid=…`).
  - Add `destination_place_id` to `directionsUrl`.
- **How you'll know:**
  - The citation sheet shows matching NAP and hours everywhere.
  - GA4 shows referrals from pacificfair.com.au and helpmedical.au.

### 11. Low: the header strip shows crawlers a fixed day's hours

- **Where:** `src/components/Header.astro:17, 29`.
- **Evidence:**
  - The built HTML on every page reads "Open today 8am – 5:30pm", generated at build time on a Monday.
  - JavaScript corrects it for visitors, but the weekly build leaves Monday's text in the HTML all week. That's wrong on Thursdays, at weekends and on special days such as Christmas Day.
- **Why it matters:** most AI crawlers read the raw HTML. The footer's full hours lower the risk but don't remove it.
- **Fix:** use "Open 7 days" as the fallback text, as the home page's "Today at Shop 81" box already does, and let the script fill in today's status.
- **How you'll know:** view-source on any page shows no day-specific hours.

### 12. Low: hours and prices typed outside `site.ts`

- **Where and evidence:**
  - **`visit-us.astro:26`.** The Christmas FAQ types "8am to 6pm on Boxing Day … 10am to 5pm on New Year's Day", and that text also goes into the FAQPage schema. This breaks PAGE-BRIEF rule 7 and the house rule on hours, although today it matches `specialHours`.
  - **`services.ts:448`.** The blood-test hours, "Monday to Friday, 8am to 1pm", duplicate `site.pathology`.
  - **`zh/vitamins-gold-coast.astro:44, 129`.** The Thursday closing time and the closed holidays are typed in.
  - **"until 9pm on Thursdays".** PAGE-BRIEF approves this phrase, but it's typed in 17 places across 12 files, including `Nap.astro:10` and `ArticlePage.astro:97`.
  - **`services.ts:126`.** `price: 5` for medication packing makes the schema show a one-off $5 offer. The real price is $5 a week.
- **Fix:**
  - Generate the Christmas FAQ from `specialHours`.
  - Read the blood-test time from `site.pathology.hoursText`.
  - Build the Thursday phrase from `site.hours.thu`.
  - Give the packing offer a unit (a `UnitPriceSpecification` of 1 week), or remove its price from schema.
- **How you'll know:**
  - Changing a time in `site.ts` changes every page.
  - `grep -r "9pm" src/pages` returns nothing.

### 13. Low: pages that drift from the house rules

- **Help Medical wording.**
  - Five passages on four pages mention Help Medical without "an independent general practice located inside our store": `common-illness-information.astro:56`, `ear-piercings.astro:81`, `flu-vaccination.astro:9` and `:34`, and `metagenics-vitamins.astro:37`.
  - Variant wording, "…located inside Priceline Pharmacy Pacific Fair", appears at `blood-tests.astro:11, 26` and `services.ts:431`. `blood-tests.astro:17` reads "Help Medical is an independent general practice", and `help-medical.astro:22` reads "Help Medical, an independent general practice, is inside Priceline Pharmacy".
- **Vaccine lists (rule dated 26 Oct).**
  - The travel list at `travel-health.astro:35–42` and `services.ts:103` leaves out meningococcal.
  - The "we don't give" lists at `vaccination-information.astro:11, 63` and `llms.txt.ts:24` leave out polio. The travel page includes it.
- **"Dermatologist-recommended".** `skincare-tanning.astro:11, 24, 48` use the phrase. It isn't in the every-page rules, but the repo's compliance notes say "no 'dermatologist recommended'" (`reference-content/research/2026-10-content-research.md:35`), and the page mentions sunscreens.
- **Fix:** each is a one-line edit.

### 14. Low: "what to bring" is missing where it decides the visit

| Page | What to list |
|---|---|
| `/travel-health/` | Vaccination record, trip dates and destinations, list of medicines, Medicare card |
| `/hormonal-contraceptive-pill/` | Current pill packet or script, list of medicines, Medicare card |
| `/uti-treatment/` | Photo ID and list of medicines (confirm what your process needs) |

- Flu, whooping cough, vaccinations, blood tests and sick leave pages already have one.
- **How you'll know:** fewer "what do I need to bring?" calls (ask staff to keep a tally).

### 15. Low: on phones, long leads push the buttons and "At a glance" below the first screen

- **Evidence:**
  - Service page leads run 291–430 characters.
  - `ContentPage.astro:19–20` says leads in the title band should stay under about 160 characters. Visit (380), Appointments, About, Pharmacy services and the visitor guide all exceed that.
  - On a 390 px phone, the Visit hours card starts about one and a half screens down. This is estimated from the CSS; confirm it with a screenshot.
  - The sticky bar and the header strip's open/closed status soften the problem.
- **Fix:** cut each lead to one or two sentences (the direct answer plus the price or booking rule) and move the rest into the body.
- **How you'll know:**
  - A phone screenshot shows the page's buttons on the first screen.
  - GA4 CTA events per page view rise.

### 16. Low: the Chinese page is sound; more people could find it

See section F. In short:
- `lang`, `og:locale` and `inLanguage` are correct.
- hreflang isn't needed, because there is no English equivalent page.
- The page isn't thin.
- **Fix:** add a "中文" link in the footer or on Visit, and generate its hours from `site.ts`.

### 17. Low: the Uber Eats buttons open Priceline's brand page, not this store

- **Where:** `site.ts:129` (`/au/brand/priceline`), the primary button on `/delivery/` and `/beauty-fragrance/`. The copy itself tells people to "search for Priceline Pharmacy Pacific Fair".
- **Fix:** use the store's own share link from the Uber Eats app.
- **How you'll know:** the Uber Eats merchant dashboard shows more store visits converting to orders.

## Supporting detail

### A. NAP across sources (scope item 1)

| Source | Name | Address | Phone | Verdict |
|---|---|---|---|---|
| `site.ts` | Priceline Pharmacy Pacific Fair | `street` "2/30 Hooker Boulevard"; `oneLine` "Shop 81, Pacific Fair Shopping Centre, Hooker Blvd, Broadbeach QLD 4218" | (07) 5592 2099 | Two street forms in the one source |
| Header strip (every page) | logo | "Shop 81, Pacific Fair, Broadbeach" (links to `/visit-us/`) | (07) 5592 2099 | Short form; fine |
| Mobile menu | | oneLine | (07) 5592 2099 | Matches |
| Footer (every page) | Priceline Pharmacy Pacific Fair | oneLine | (07) 5592 2099; fax (07) 5504 6612 | Matches |
| NAP block (service and content pages) | Priceline Pharmacy Pacific Fair | oneLine, plus parking | (07) 5592 2099 | Matches |
| `/visit-us/` | Priceline Pharmacy Pacific Fair | oneLine; map embed query typed in the page (`:29`) | (07) 5592 2099 | Matches; typed string |
| `/contact-us/` | Priceline Pharmacy Pacific Fair | oneLine; meta description types the address (`:10`) | Title and body (07) 5592 2099 | Matches; typed string |
| JSON-LD Pharmacy (every page) | Same, plus 4 alternate names | "Shop 81, Pacific Fair Shopping Centre, 2/30 Hooker Boulevard", Broadbeach QLD 4218 AU | +61755922099 | The only place "2/30" appears |
| JSON-LD Help Medical | Help Medical Pacific Fair | Same "2/30" form | +61756193818 | Separate business; fine |
| llms.txt | Priceline Pharmacy Pacific Fair | oneLine | (07) 5592 2099 | Matches |
| `directionsUrl` | Priceline Pharmacy Pacific Fair | "Shop 81, Pacific Fair Shopping Centre, Broadbeach QLD 4218" | | No street; text destination (finding 10) |
| `/zh/vitamins-gold-coast/` | Priceline 药房（太平洋购物中心店） | oneLine (in English, for navigation) | +61 7 5592 2099 | Matches (international format for visitors) |

- **Suburb:** "Broadbeach" in all visible text and in `addressLocality`. "Broadbeach Waters" appears only in areaServed.
- **Phone formats:** consistent. National format in text, E.164 in `tel:` links and schema, international format on the Chinese page.

### B. GBP checklist (scope item 2)

| Field | Set it to, or check | Basis on the site |
|---|---|---|
| Name | Priceline Pharmacy Pacific Fair, with no added keywords | `site.ts:14` |
| Primary category | Pharmacy | Schema type; every page |
| Additional categories | Vaccination service; Ear piercing service; Passport photo processor; Chemist if listed separately; optionally Cosmetics store or Perfume store. **Not** Medical clinic, **not** Blood testing service. Those belong on Help Medical's and QML's own listings | Finding 3 |
| Address | Exactly the same line as the site (finding 5). Confirm the listing shows "Located in: Pacific Fair Shopping Centre" | `schema.ts:55–59` |
| Phone | (07) 5592 2099, not Help Medical's number | `site.ts:26` |
| Website | `https://pricelinepacificfair.com.au/?utm_source=google&utm_medium=organic&utm_campaign=gbp`. Keep the home page, since for a single store it is the location page. Only test `/visit-us/` if the profile and the home page seem to filter each other out | GA4 is installed |
| Appointment link | The MedAdvisor URL (`site.ts:122`), with UTM tags. Remove any old `servicebookings.priceline.com.au` or HealthEngine booking link; both are blocked words in `tools/check-build.py` | |
| Hours | Mon–Wed 8am–5:30pm, Thu 8am–9pm, Fri 8am–5:30pm, Sat 9am–5:30pm, Sun 9:30am–4:30pm | `site.ts:59–67` |
| Special hours | Every `specialHours` date (27 Nov, then 18 Dec to 1 Jan), plus closed on Christmas Day, Good Friday and Anzac Day. Add other holidays as soon as they're decided | `site.ts:181–224` |
| Services, with descriptions | One entry per pharmacy service in `services.ts`, using its `short` line as the description (already compliant copy). Leave the price blank for vaccines and anything that includes a medicine: vaccinations, flu, whooping cough, travel, UTI, emergency contraception. Prices are fine for ear piercing ($65), passport photos ($25), contraception consultation ($35) and Webster packs ($5 a week; free for concession card holders). Don't list Help Medical or QML services as the pharmacy's own | `services.ts` |
| Description (750 characters max) | Draft below (715 characters) | `site.description` |
| Attributes | Wheelchair-accessible entrance; accessible parking; in-store pickup (Click & Collect); delivery (Uber Eats); online appointments; the payment types shown on the site (cards, NFC, UnionPay, Afterpay) | Schema `amenityFeature` and `paymentAccepted`; `visitorFacts` |
| Service area | Leave empty, because this is a storefront | |
| Photos | The site's own shopfront, interior, prescription counter, beauty aisle and fragrance cabinet photos, plus the Orange car park and Gate 7 entrance. Add new photos monthly | `src/assets/images/` |
| Opening date | August 2009 | `site.ts:23` |
| Posts (optional) | Christmas hours, flu season. No vaccine prices or brand names | House rules |
| Q&A | Google is phasing it out; the site's FAQs already answer the common questions | |

**Draft GBP description** (715 characters; no medicine or vaccine prices; uses the fixed Help Medical wording):

> Priceline Pharmacy Pacific Fair is an independently owned Priceline Pharmacy franchise store on the ground floor of Pacific Fair Shopping Centre, Broadbeach, open 7 days. Our pharmacists fill paper scripts and eScripts in minutes and give walk-in vaccinations, including flu, whooping cough and travel vaccines. We also offer contraception and UTI consultations, sick leave certificates, Webster packs, free blood pressure checks, ear piercing and passport photos, and our beauty advisors help with skincare, makeup and fragrance. Help Medical, an independent general practice located inside our store, has GPs and a QML Pathology collection room. Park in the Orange car park, directly under us (Gate 7 is closest).

### C. High-intent local queries (scope item 3)

"Links" counts body links (inside `<main>`, including breadcrumbs and the NAP block) from in-scope pages, taken from `crawl.json`.

| Query | Page that should rank | Title and H1 match | Links | Verdict |
|---|---|---|---|---|
| chemist Broadbeach | `/` | Title "…Broadbeach Chemist, 7 Days"; H1 "…Your local chemist in Broadbeach" | 39 | Strong; GBP decides the local pack |
| pharmacy Pacific Fair | `/`, then `/visit-us/` | Both lead with "Priceline Pharmacy Pacific Fair" | 39 / 37 | Strong |
| late night chemist Gold Coast | None; the store is open until 9pm on Thursdays only | Home: "Late night: Thursdays until 9pm" | | Weak by nature; don't chase it. Keep Thursday and the Christmas late nights exact in GBP |
| pharmacy open Sunday Gold Coast | `/visit-us/` | Description says "Open 7 days"; FAQ "Are you open on Sundays?" (on home too) | 37 | OK; GBP hours decide |
| pharmacy open public holiday Gold Coast | `/public-holiday-hours/` | No place name in the title; the content says "hours vary" | 3 | Gap (finding 1) |
| medical certificate pharmacist Gold Coast | `/sick-leave-certificates/` | Main term missing from title and H1 | 1 | Gap (finding 2) |
| travel vaccines Gold Coast | `/travel-health/` | Title matches exactly | 5 | Good. Add what to bring, and meningococcal |
| ear piercing Gold Coast | `/ear-piercings/` | No "Gold Coast" or "Broadbeach" in the title | 5 (including a home tile) | Weak title (finding 8) |
| passport photos Broadbeach | `/passport-photos/` | Title says "Gold Coast"; description and lead say "Broadbeach" | 6 | Good |
| blood test Broadbeach | `/blood-tests/` | Title says "Pacific Fair"; lead says "Broadbeach" | 2 | Gap (findings 7 and 8). QML's own listing will also compete |
| bulk billing doctor Broadbeach | `/help-medical/`; Help Medical's own site and listing should lead | Title "Bulk-Billing GP" but no place name | 30 | Good; fix the sticky bar (finding 9) |
| Webster pack Gold Coast | `/medication-packing/` | Title "Webster Packs Broadbeach…"; description says "Gold Coast" | 5 | Good |
| UTI treatment pharmacy Gold Coast | `/uti-treatment/` | "Walk-In UTI Treatment Broadbeach" | 7 | Good |
| morning after pill Broadbeach | `/emergency-contraception/` | The term appears only in the lead and description | 5 | Weak title (finding 8) |

### D. Search experience by page (scope item 4)

Page type and intent are judged from the query and the page, not from a live SERP. This table lists only pages where something needs attention.

| Page | Page type vs intent | Primary button | Title, H1 and lead agree? | Friction |
|---|---|---|---|---|
| `/` | Location page; matches intent | "Send a script ahead", "Get directions"; sticky bar on phones | Yes | QML mention not linked; holiday hours referred to Google with no link |
| `/visit-us/` | Location page; matches intent | "Call", "Open in Google Maps" | Yes | Hours card below the first phone screen |
| `/public-holiday-hours/` | Information page; partly matches | "Call", "Check hours on Google" | No: the description promises hours the page doesn't give | Finding 1 |
| `/appointments/` | Utility page; matches intent | "Book online", "Call" | Mostly | Table has no rows for sick leave or blood tests |
| `/sick-leave-certificates/` | Service page with information; matches intent | "Hours & directions", "Call" | Main term only in the lead | Fee not stated; 1 internal link |
| `/emergency-contraception/` | Service page; matches intent | "Call", "Hours & directions" | Everyday term only in the lead | Price withheld under the house rule (correct) |
| `/help-medical/`, `/blood-tests/` | Partner service pages; match intent | "Book a GP" / "Book with QML" | Yes | Sticky bar and header go to the pharmacy and MedAdvisor (finding 9) |
| `/hormonal-contraceptive-pill/` | Service page; matches intent | "Call" (call first) | Yes | Sticky "Book" opens MedAdvisor; no what-to-bring list |
| `/travel-health/` | Service page; matches intent | "Book online", "Call" | Yes | No what-to-bring list; meningococcal missing |
| `/uti-treatment/` | Service page; matches intent | "Call", "Hours & directions" | Yes | Fee only available by phone. Withholding it is allowed, since it includes the medicine. In `services.ts`, "ask us when you call" sits beside "Walk in"; use "ask us in store or by phone" |
| `/delivery/`, `/beauty-fragrance/` | Service and retail pages; match intent | "Order on Uber Eats" | Yes | Links to the brand page (finding 17) |
| `/passport-photos/` | Service page; matches intent | "Get directions", "Call" | Yes | Under-5s are asked to call. That's the owner's choice and is fine |

All other in-scope pages:
- the page type matches the intent;
- a suitable button sits in the first block of the page;
- the title, H1 and lead agree.

Parking and entrance directions appear on every service page through the NAP block (`Nap.astro:11`), so none are missing.

### E. Internal links among commercial pages (scope item 5)

Counted from `crawl.json` `inbound` entries where `in_main` is true and the linking page is in scope. Articles are excluded.

| Page | Body links from commercial pages | Also in nav or footer | Note |
|---|---|---|---|
| `/sick-leave-certificates/` | 1 | Nav | Finding 2 |
| `/appointments/` | 1 | Nav, footer | Add from home and the services hub text |
| `/blood-tests/` | 2 | Footer | Finding 7 |
| `/national-diabetes-services-scheme/` | 2 | Nav | It lists `/prescriptions/` as related, but `/prescriptions/` doesn't link back |
| `/weight-loss-counselling-and-advice/` | 2 | Nav | |
| `/metagenics-vitamins/` | 2 | Nav | Fine for a niche page |
| `/zh/vitamins-gold-coast/` | 2 | None | Finding 16 |
| `/public-holiday-hours/` | 3 | Nav | Finding 1 |
| `/quit-smoking/` | 3 | Nav | `/health-station/` doesn't return its link |
| `/whooping-cough-vaccine/` | 3 | Nav | `/womens-health/` links "Whooping cough and flu vaccines" to the vaccinations page instead; `/travel-health/` doesn't link it |
| `/download-the-priceline-app/` | 3 | Nav | Fine |
| `/emergency-contraception/`, `/travel-health/`, `/ear-piercings/` | 5 each | Nav (travel also in footer) | Not linked from home (ear piercing has a home tile) |
| `/vaccination-information/` | 15 | Nav, footer | Links to only 3 of its 9 breadcrumb children (finding 6) |
| `/pharmacy-services/` | 13 | Nav, footer | Links to all 28 services |
| `/help-medical/` | 30 | Nav, footer | |
| `/visit-us/` | 37 | Nav, footer | |

### F. The Chinese visitor page (scope item 6)

- **Language signals.** The page has `<html lang="zh-Hans">`, `og:locale` `zh_CN` and WebPage `inLanguage` `zh-Hans` (`Base.astro:37`, `zh/vitamins-gold-coast.astro:57`). All correct.
- **hreflang.** There is none in the head, and that is correct. No published English page has the same content: the English copy in `reference-content/` isn't a live page, and `/vitamins-supplements/` and `/visiting-the-gold-coast/` are related but not equivalent. The links to the page already carry `hreflang` on the anchor. Add reciprocal `<link rel="alternate">` tags (zh-Hans, en-AU, x-default) only if you publish the English version as its own page.
- **Thinness.** Not thin: 1,531 Chinese characters, 8 sections and 6 FAQs. `crawl.json` reports 237 words only because it splits text on spaces, which Chinese doesn't use.
- **How people find it.**
  - Linked from `/visiting-the-gold-coast/` and `/vitamins-supplements/` only, both with clear Chinese anchor text.
  - Not in the nav or footer, and not on Visit. It is in llms.txt and the sitemap.
  - Add a small "中文" link in the footer, or on `/visit-us/` and `/about-us/`.
- **Title and description.** The title is 37 characters (about 58 bytes) and the description 94 characters. Both fit Baidu's and Google's display limits; Baidu shows titles of up to about 30 Chinese characters. The title leads with 黄金海岸 and 澳洲维生素, and the description puts "contact us first" early. Fine for both engines.
- **Where Chinese visitors search.**
  - Google works in Australia.
  - In mainland China, Bing (cn.bing.com) is reachable, and you already use Bing Webmaster Tools and IndexNow. Check the page is indexed there.
  - robots.txt allows Baidu's crawler. Submitting the URL through Baidu's webmaster platform is optional.
  - People planning a trip lean on Xiaohongshu and Dianping more than on search engines. Check whether the store appears on Dianping.
  - iPhone visitors see Apple Maps, so claiming Apple Business Connect (finding 10) helps them too.
- **Typed facts.** The Thursday closing time and the closed holidays (lines 44 and 129) should come from `site.ts` (finding 12).
- **Measuring it.** The email button pre-fills the subject "批量购买维生素咨询 Bulk vitamin enquiry", so enquiries can be counted in the info@ inbox. GA4 can also report `/zh/` page views by browser language.

### G. `services.ts` against the page copy, and the hours data (scope item 7)

- **Prices.** Ear piercing ($65), passport photos ($25), contraception consultation ($35) and Webster packs ($5 a week) are consistent across `services.ts`, page copy, FAQs and llms.txt. No medicine or vaccine prices appear anywhere. One schema mismatch: packing's `price: 5` loses "a week" (finding 12).
- **Eligibility.** Consistent across `services.ts`, pages and llms.txt:
  - vaccinations: ages 5 and over;
  - ear piercing: 8 and over, with a guardian if under 16;
  - passport photos: 5 and over;
  - contraception: women 16 and over;
  - UTI: women 18 to 65;
  - Help Medical: bulk bills everyone with a Medicare card.
- **Booking method.** Consistent between `services.ts`, the pages and `/appointments/`, with two exceptions:
  - the sticky "Book" contradicts "please call first" for contraception (finding 9);
  - the UTI wording ("ask us when you call" beside "Walk in"), noted in section D.
- **Travel vaccines.** `services.ts` and the page both leave out meningococcal (finding 13).
- **Special hours.** Everything is generated from `specialHours` except the Visit Christmas FAQ (finding 12), and today's values match: late night on Fri 18 Dec, until midnight on Wed 23 Dec, closed Christmas Day, 8am–6pm on Boxing Day, 10am–5pm on New Year's Day.
- **Public holidays.** The table, schema and llms.txt agree with `publicHolidays`. The gaps are the Gold Coast Show holiday and the question of Monday 26 April 2027 (finding 1).

### H. Reviews and reputation plan (scope item 8)

1. **Get the link.** In GBP, use "Ask for reviews" to get the review link. Optionally add a `/review/` redirect to it in `public/.htaccess`, so printed QR codes never need reprinting.
2. **Ask everyone the same way.**
   - Put a QR card at the front tills and on Click & Collect bags, add a line to receipts if your point-of-sale system allows it, and add a line to the info@ email signature.
   - Use neutral wording, such as "How did we do? Tell others on Google."
   - Don't screen for happy customers first, and don't ask only some people. Google's fake-engagement policy and the ACCC's online reviews guidance both cover this.
   - No discounts or prize draws for reviews.
   - No in-store tablet or kiosk for leaving reviews (Google discourages it).
   - No reviews from staff or their families.
3. **Keep the ask about the store, not the treatment.**
   - Don't ask in the consultation room, or straight after sensitive consultations (UTI, emergency contraception, contraception, certificates).
   - Never ask people to mention a medicine or condition.
   - Check the card's wording against AHPRA's advertising guidelines and testimonial tool before printing.
4. **Reply to every review within two business days.**
   - Never confirm that the reviewer was a patient, and never mention any medicine, service or condition. The Privacy Act 1988 and pharmacist confidentiality both apply.
   - Take complaints offline, by phone or email.
   - If a review is really about Help Medical or QML, reply with the fixed wording ("Help Medical is an independent general practice located inside our store") and give their contact details.
5. **Where reviews may appear on the site.**
   - Only on non-clinical pages: `/beauty-fragrance/`, `/fragrance/`, `/skincare-tanning/`, `/ear-piercings/`, `/passport-photos/`, `/click-and-collect/` and `/delivery/`.
   - Only quotes about the store, the staff or the range, and none that make health claims.
6. **Where reviews may not appear.**
   - the home page, because it advertises clinical services;
   - every clinical page: prescriptions, all vaccine pages, contraception, UTI, emergency contraception, sick leave, medication packing and reviews, Health Station, NDSS, weight management, quit smoking and women's health;
   - `/help-medical/` and `/blood-tests/`, because they describe other businesses;
   - `/vitamins-supplements/` and `/metagenics-vitamins/`, because they cover therapeutic goods;
   - `/about-us/`, to be safe.

   The build check blocks the word "testimonial", so title any review block something like "What customers say about the store".
7. **No review markup.** Add no `aggregateRating` or `Review` markup. Google doesn't show self-serving review stars for a LocalBusiness, and the Pharmacy schema node is on every page, so markup would place review content on clinical pages.
8. **Track monthly:** new reviews, average rating, longest gap without a review, and reply rate. Also check Facebook and HealthEngine reviews if those profiles exist.

### I. House-rule check results

| Rule | Result |
|---|---|
| Never name a prescription-only medicine or brand | None found on in-scope pages. "Insulin" appears only as a class, in the NDSS context. |
| Over-the-counter mentions carry the label line | Present on every in-scope page that mentions over-the-counter products. |
| No testimonials or review quotes on clinical pages | None found; there is no review content anywhere. |
| No "guaranteed", "cure" or "clinically proven" | None found on in-scope pages. |
| Help Medical's fixed wording | Missing in five passages on four pages; variant wording in five places (finding 13). |
| Don't type opening hours into page copy | Broken in the Visit Christmas FAQ, by the blood-test hours in `services.ts`, and in the Chinese FAQ (finding 12). "Open 7 days and until 9pm on Thursdays" is the phrase PAGE-BRIEF allows. |
| No prices for medicines or vaccines | None found. |
| NIP and Queensland program vaccines free with no fee | Consistent ("no service fee"). |
| Vaccines given and not given | Meningococcal missing from the travel list; polio missing from two "we don't give" lists (finding 13). |
| No compounding | Consistent. |
| Help Medical bulk bills everyone with a Medicare card | Consistent; no "eligible patients" wording. |
| Padel shop mentioned only in the padel article | Compliant (only `/padel-health-benefits/`). |
| Fixes in this report | All respect the rules: no medicine or vaccine prices, reviews only on non-clinical pages, and hours entered through `site.ts`. |

### J. What to check live, and how

1. **GBP.** At business.google.com, or in the Maps "Your business" panel, check and record:
   - name, primary and additional categories;
   - the exact address line and suburb, and whether "Located in: Pacific Fair" shows;
   - phone, website URL and appointment URL;
   - weekly hours and special hours;
   - services, description, attributes, and the number and age of photos;
   - review count, average rating, date of the last review, and reply rate.
2. **Duplicate listings.** Search Google Maps for "Priceline Pacific Fair", "Priceline Pharmacy Broadbeach" and "Priceline Pac Fair". There should be one pharmacy listing. Help Medical and QML should each have their own, with their own phone numbers and categories.
3. **Search results** (instead of WebSearch, which shows US results).
   - For real Australian queries and positions, use Search Console: Performance, filtered by page and by query.
   - For the local pack, search on a phone at or near Pacific Fair in a private tab. Or use a geo-grid tool (Local Falcon or BrightLocal Local Search Grid; 5×5 grid, 1 km spacing, centred on Shop 81).
   - Queries to check: "chemist", "pharmacy", "ear piercing", "passport photos", "medical certificate", "travel vaccines", "blood test".
   - Record whether you appear, which businesses do, their GBP categories (a GBP category inspector browser extension shows these), and whether AI Overviews or "People also ask" appear.
4. **Citation sheet.** For each listing, record name, address line, suburb, phone, hours and website URL:
   - GBP, Apple Business Connect and Bing Places;
   - Facebook;
   - the priceline.com.au store finder and pacificfair.com.au;
   - healthdirect, findapharmacy.com.au and HealthEngine;
   - MedAdvisor and Uber Eats;
   - Yellow Pages and TrueLocal.
5. **Official facts.**
   - Australia Post address search: the centre's official locality.
   - qld.gov.au: whether there's a Monday Anzac Day holiday in 2027, and the 2027 Gold Coast Show holiday date.
6. **MedAdvisor.** Which services can be booked (contraception, travel consultations, ear piercing?), and whether prices show. The pages promise "you'll see the price when you book".

### K. Limitations

- No live data: GBP, reviews, citations, SERPs and Search Console were not available. The live domain is blocked from this sandbox, and WebSearch returns US results, so neither was used as evidence for Australian search results.
- Page type and intent were judged from the queries and the pages, not from what Google currently ranks. For the same reason, there is no SXO Gap Score.
- The crawl reads static HTML. Changes made by JavaScript (the header strip and the desktop "At a glance" box) were read from the source instead.
- The above-the-fold judgements are estimates from the CSS, not device screenshots.
- Distance from the searcher explains about 55% of local pack ranking variance (Search Atlas), and that is outside anyone's control.

### Outside this review's scope, but urgent

`HOW_TO_UPDATE_THE_WEBSITE.md` (Deploy details) says `pricelinepacificfair.com.au` showed as expiring around 1 November 2026, that auto-renew is on, and that Jason is to confirm the renewal goes through. That date is six days away. Confirm the renewal in VIPcontrol.
