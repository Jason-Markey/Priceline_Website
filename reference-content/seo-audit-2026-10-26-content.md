# Content quality and E-E-A-T review: pricelinepacificfair.com.au

Reviewer: content-quality agent, SEO audit (claude-seo method). Date: 26 October 2026. Read-only: nothing in the repo was changed.

This is a companion to `seo-audit-2026-10-26.md`, which has the prioritised action plan. The working files mentioned
below (`crawl.json`, the scripts in the appendix) were temporary and aren't kept in the repo. One correction was made
after review: item 1d is not a rule breach, because `tools/PAGE-BRIEF.md` rule 7 allows "open 7 days and until 9pm on
Thursdays". It stays as a maintenance suggestion.

## Scope and method

- **Corpus.** 96 article files in `src/content/articles/`: 87 live, 8 scheduled (2 Nov to 21 Dec 2026), 1 draft (`beach-hair-care-gold-coast`). All 96 front-matter blocks were scanned. The house-rule sweeps ran across all 96 files.
- **Read in full (32 articles, all 10 categories).**
  - health-advice: athletes-foot-treatment, common-cold-remedies, ear-piercing-aftercare, hangover-remedies, heartburn-relief, normal-blood-pressure, padel-health-benefits
  - skincare-beauty: best-sunscreen-gold-coast, christmas-gift-ideas, mineral-vs-chemical-sunscreen, spf30-vs-spf50, sun-safety-gold-coast, sunscreen-under-makeup
  - vaccinations: free-vaccines-pharmacy-queensland, shingles-vaccine-free, vaccines-for-uni-students, when-to-get-flu-shot-queensland, whooping-cough-vaccine-pregnancy
  - prescriptions: contraceptive-pill-pharmacist-queensland, pbs-safety-net-explained, what-can-a-pharmacist-treat-queensland
  - travel: bali-vaccinations, passport-photo-requirements, travel-health-checklist
  - baby-child: baby-sun-protection, childrens-paracetamol-ibuprofen, gastro-in-kids-hydration
  - vitamins-supplements: supplements-that-interact-with-medicines, vitamin-d-gold-coast
  - dental-oral-care: mouth-ulcer-treatment
  - haircare: dandruff-treatment
  - local-guides: forgot-medication-on-holiday
  - Openings and link sections of the other live articles were also read. The service pages for flu, travel, vaccination, contraception and NDSS were read too.
- **Method.** I followed claude-seo's `agents/seo-content.md` and `skills/seo-content/SKILL.md` (the Who/How/Why test, E-E-A-T, templated metadata, AI citation readiness and freshness), plus `eeat-framework.md` and `quality-gates.md`. The plugin isn't installed, so I wrote equivalent scripts in the scratchpad (listed in the appendix). `meta_check.py` applies the same four rules as claude-seo's `metadata_template.py`. Internal-link counts come from the markdown bodies, because `crawl.json`'s `in_main` flag also counts the sidebar cards. `crawl.json` was used for the inbound counts.
- **Priorities** use claude-seo's definitions. Critical means it blocks indexing or causes penalties. High means it significantly hurts rankings (fix within a week). Medium is an optimisation opportunity (fix within a month). Low is nice to have.
- **Scores are claude-seo's own heuristics**, not Google signals.
- **Excluded as already reported:** the shared og:image and missing topical images, the sitemap lastmod, the double-typed Article schema, the missing AHPRA number, and the checks that already pass.

## Scores (heuristic)

| Measure | Score | Basis |
|---|---|---|
| Content quality | **74/100** | Accurate: all 5 spot-checked facts are correct, and I found no errors in the 32 articles read. 82 of 87 open answer-first. Every live article cites 2 or more sources (median 6). 64 of 87 carry a "When to see a pharmacist or GP" safety section. Points lost for 11 generic articles, a pair of duplicated contraception pages that contradict each other, missing service links and templated descriptions. |
| E-E-A-T | **63/100** | Experience 9/20, Expertise 19/25, Authoritativeness 13/25, Trust 22/30 (detail in finding 5) |
| AI citation readiness | **78/100** | Direct first sentences, 50% question-style headings (505 of 1,003 H2/H3), many tables, and named sources inline ("healthdirect says…"). Points lost for 5 openers that only make sense next to the H1, "2026" in titles, and two URLs that give different contraception facts for AI to quote. |

## Findings at a glance (ranked by impact)

| # | Priority | Finding | Scale |
|---|---|---|---|
| 1 | High | House-rule breaches on live pages (Help Medical wording, a prescription-only medicine named, polio implied), plus the Thursday-hours phrase typed in many places (allowed, but fragile) | 56 articles, plus the article template, plus 7 other pages |
| 2 | High | The contraception article and the contraception service page target the same query and contradict each other on fee, availability and scope | 2 URLs |
| 3 | High | The service pages that convert get almost no links from articles, and 8 anchors point to the wrong page | 10 service pages, 8 anchors |
| 4 | High (date-bound) | 2026 figures and end dates go stale on or soon after 1 Jan 2027, including the site's most-cited page | 14 articles, 3 service pages |
| 5 | Medium | Article template E-E-A-T: strong base, but "Reviewed" is just the modified date, and there is no editorial policy, no reviewer page and only generic experience signals | all articles |
| 6 | Medium | The flu, whooping cough and free-vaccine articles overlap their service pages, and eligibility facts are duplicated | 5 URL pairs |
| 7 | Medium | Templated meta descriptions: a stock "Ask our Broadbeach team/pharmacists" closer on 40 of 87 articles | 40 articles |
| 8 | Medium | The "Common illnesses A–Z" batch from 24 Sep reads generic | 11 articles |
| 9 | Low | Sunscreen cluster: repeated sections, and the hub pages don't link down | 7 articles plus 1 service page |
| 10 | Low | Citability tweaks: 5 openers that don't stand alone, checklist pages with no question headings | 10 articles |
| 11 | Low | Pairs checked and found not to cannibalise: passport, ear piercing, country travel pages | keep as is |

---

## 1. House-rule breaches on live pages: High

**Why it matters.** These rules encode AHPRA/TGA advertising limits and decisions Jason has made. On a YMYL health site, trust is the factor that carries the most weight. "Our in-store Help Medical GPs" tells readers the GPs belong to the pharmacy, which is exactly what the fixed wording exists to prevent. The build check (`tools/check-build.py` BLOCKED list, lines 10–22) catches none of these.

| Item | Where | Evidence | Fix (house-rule compliant) |
|---|---|---|---|
| 1a. Help Medical described as "ours" | 44 live articles (full list in the appendix), e.g. `common-cold-remedies.md:113`, `pbs-safety-net-explained.md:101`, `sun-safety-gold-coast.md:115` | "Our in-store [Help Medical GPs](/help-medical/) can see you" | Replace every instance with the fixed wording on first mention: "[Help Medical](/help-medical/), an independent general practice located inside our store, …". The 8 scheduled articles already do this. |
| 1b. Help Medical mentioned without the fixed phrase | 12 more articles: `acne-treatment-pharmacy.md:101`, `contraceptive-pill-pharmacist-queensland.md:101`, `forgot-medication-on-holiday.md:74,119`, `how-to-treat-a-cut.md:107`, `mouth-ulcer-treatment.md:96`, `nail-fungus-treatment.md:105`, `scabies-treatment-australia.md:91`, `shingles-vaccine-free.md:83`, `sprain-vs-strain.md:79`, `travel-sickness-tips.md:110`, `when-to-get-flu-shot-queensland.md:69`, `whooping-cough-vaccine-pregnancy.md:61` | "Help Medical GPs are located inside our store"; "Help Medical, the independent GP practice inside our store" (`vitamin-d-gold-coast.md:91`); "a GP clinic right inside our store" (`forgot-medication-on-holiday.md:74`) | Same fixed wording. Outside the article scope, the same gap appears in `<main>` on /common-illness-information/, /ear-piercings/, /flu-vaccination/ (3 mentions), /metagenics-vitamins/, /privacy-policy/, /terms-and-conditions/ and /zh/vitamins-gold-coast/. |
| 1c. Prescription-only medicine named | `supplements-that-interact-with-medicines.md:28, 47, 52, 58` | "vitamin K-rich foods with the blood thinner warfarin" | Rewrite without the name, e.g. "an older type of blood thinner that works against vitamin K", and keep the vitamin K, grapefruit and cranberry advice. Add warfarin to BLOCKED. |
| 1d. The Thursday-hours phrase is typed into copy (allowed by PAGE-BRIEF rule 7, so not a breach) | `src/layouts/ArticlePage.astro:97` (renders on all 87 live and 8 scheduled articles); `contraceptive-pill-pharmacist-queensland.md:54`; `when-to-get-flu-shot-queensland.md:67` | "open 7 days and until 9pm on Thursdays"; "we're open until 9pm on Thursdays" | Optional, for maintenance: build the CTA sentence from `site.hours` (a helper in `site.ts`), or drop the time and keep the existing "Hours & directions" link. One change to Thursday trading would otherwise leave about 90 pages wrong while `site.ts` is right. |
| 1e. Polio vaccine implied | `vaccines-for-uni-students.md:94`, under the line 33 intro "Our pharmacist immunisers … can give most of the vaccines below" | "free as catch-ups … including measles, mumps and rubella, hepatitis B, chickenpox and polio" | Add "(we don't give polio vaccine; a GP can)". /travel-health/ already says the store doesn't give polio. |
| 1f. Draft not ready to publish | `beach-hair-care-gold-coast.md:35` (draft: true) | Names a supplement brand in the body ("[Metagenics range](/metagenics-vitamins/)"), has `references: []`, and claims "Gold Coast locals … nutrient needs run a bit higher" without support | Before publishing: replace with a generic anchor ("vitamins and supplements advice"), add sources, and cut the unsupported claim. |

**How the owner will know it worked:** `grep -rli "our in-store \[Help Medical" src/content/articles` returns 0. A new check in `tools/check-build.py` fails any page that mentions Help Medical in `<main>` without "an independent general practice located inside our store". `check-build.py` passes with warfarin added to BLOCKED.

---

## 2. Contraception: two URLs, one intent, conflicting facts. High

**Where.** `/contraceptive-pill-pharmacist-queensland/` (`src/content/articles/contraceptive-pill-pharmacist-queensland.md`) and `/hormonal-contraceptive-pill/` (`src/pages/hormonal-contraceptive-pill.astro`).

**Evidence.**
- **Same answer.** The article (line 27) says "In Queensland, a specially trained pharmacist can now … write you a prescription for the contraceptive pill." The service page lead says "Yes, in Queensland a trained pharmacist can prescribe the pill…".
- **Mirrored outline: 6 of 7 H2s match.**

  | Article H2 | Service page H2 |
  |---|---|
  | What is the Queensland pharmacist contraception service? | What can a pharmacist prescribe? |
  | Who is eligible…? | Who can use this service? |
  | What happens at your appointment | What happens in the consultation? |
  | How much does it cost? | How much does it cost? |
  | When will the pharmacist refer you to a GP? | When would a GP be the better option? |
  | Is it private? | Is the consultation private? |

- **The two pages contradict each other.**
  - **Fee.** The article (line 88) says "a consultation fee applies. Ask us for the current fee." The service page says "$35", and so does `what-can-a-pharmacist-treat-queensland.md:91`.
  - **Availability.** The article (line 54) says "It's a good idea to book… We're open 7 days, and until 9pm on Thursdays, which helps if you work or study during the day." The service page says "trained pharmacists are usually available Monday to Friday… please call first."
  - **Scope.** The article (line 35) says it "can also include some other hormonal options. Ask us." The service page says "the pill, the vaginal ring or the contraceptive injection".

**Why it matters.** Google ranks one URL per query. Two near-identical pages split the signals, and the article can outrank the page that converts. Worse, the article invites people to come on Thursday evenings or weekends when a trained pharmacist may not be rostered. That damages trust on a YMYL service, and an AI answer may quote the article's version.

**Fix: merge, then redirect.**
1. Move the article's unique, accurate material into `/hormonal-contraceptive-pill/` (currently 913 words):
   - the health-history checklist (lines 62–70)
   - "bring your medicine packets"
   - the GP-referral criteria (lines 92–99)
   - the GP summary step (line 84)
   - the red flags (lines 105–114)

   The $35 is a service fee, so it can stay. The house rules ban prices only for medicines and vaccines.
2. Add `Redirect 301 /contraceptive-pill-pharmacist-queensland/ /hormonal-contraceptive-pill/` to `public/.htaccess`. Set the article to `draft: true` or remove it.
3. No article body links to it. The inbound links come from generated lists (the blog index, the category page and "More advice" sidebars) and from the service, women's health and pharmacist-treat pages. Rebuild, and let `check-build.py` confirm nothing is broken.

If Jason prefers to keep an article, re-angle it to a distinct informational query instead, such as "Run out of the pill in Queensland? Your options". That piece would cover continued dispensing, the pharmacist script for up to 12 months (`what-can-a-pharmacist-treat-queensland.md:61`) and emergency contraception, and send booking to the service page. Delete the duplicated cost, process and eligibility sections.

**How the owner will know it worked:**
- Search Console's Pages report shows the old URL as "Page with redirect" within about 2–4 weeks.
- In Performance, filtered to queries containing "pill" and "pharmacist", only `/hormonal-contraceptive-pill/` appears, with the combined impressions and a better average position.
- The GA4 `call` event on that page rises.

---

## 3. The service pages that convert get almost no links from articles. High

**Evidence.** Body links are counted from the markdown of the 87 live articles. Sidebar cards come from `relatedServices`. Every service page also gets about 140 nav and footer links, which carry the same weight on every page.

| Service page | Body links from articles | Sidebar cards | Articles that discuss the topic but don't link |
|---|---|---|---|
| /sick-leave-certificates/ | **0** | 0 | common-cold-remedies (lines 76–78, "push through and go to work"); gastro-in-kids-hydration (lines 87–91, carer's leave); dry-cough-vs-chesty-cough (scheduled for 30 Nov, line 107) |
| /flu-vaccination/ | **0** | 3 | when-to-get-flu-shot-queensland (its body links go to the hub at lines 25 and 63); common-cold-remedies:60; free-vaccines:48; vaccines-for-uni-students:75, 97, 119 |
| /whooping-cough-vaccine/ | 1 | 1 | whooping-cough-vaccine-pregnancy:31, 61, 71; vaccines-for-uni-students:63, 119; how-to-treat-a-cut:83 (tetanus); the "Tetanus, diphtheria and whooping cough" table row on all six country pages (bali:46, china:88, fiji:80, india:90, thailand-vietnam:48, japan:39) |
| /national-diabetes-services-scheme/ | **0** | 0 | forgot-medication-on-holiday:42 (insulin); how-to-dispose-of-old-medicines:65 (pen needles and sharps) |
| /quit-smoking/ | **0** | 0 | normal-blood-pressure:94; heartburn-relief:74; what-can-a-pharmacist-treat-queensland:52, 72 |
| /weight-loss-counselling-and-advice/ | **0** | 0 | normal-blood-pressure:93; heartburn-relief:74; what-can-a-pharmacist-treat-queensland:54, 72 |
| /blood-tests/ | **0** | 0 | vitamin-d-gold-coast:91; postpartum-hair-loss:74; mosquito-bites-ross-river-virus:88; vaccines-for-uni-students:88 (all mention the QML collection room) |
| /emergency-contraception/ | **0** | 0 | contraceptive-pill-pharmacist-queensland:110. This becomes moot after the merge, because the service page already links there. |
| /public-holiday-hours/ | **0** | 0 | christmas-gift-ideas:72 ("How to make Christmas shopping easier") |
| /uti-treatment/ | 1 | 1 | None with a natural fit. Only what-can-a-pharmacist-treat discusses UTIs. Don't force links. |
| *For contrast:* /help-medical/ | **70** | 24 | an independent business |

Three live articles link to no service page at all: athletes-foot-treatment, dandruff-treatment and hangover-remedies.

**Anchors pointing to the wrong page (8), plus 3 missing links.**

| Where | Anchor | Points to | Should point to |
|---|---|---|---|
| `common-cold-remedies.md:60` | walk-in flu vaccinations in store | /vaccination-information/ | /flu-vaccination/ |
| `travel-health-checklist.md:33` | travel health services at Pacific Fair | /vaccination-information/ | /travel-health/ |
| `travel-sickness-tips.md:21` | travel health advice at Pacific Fair | /vaccination-information/ | /travel-health/ |
| `whooping-cough-vaccine-pregnancy.md:99` | women's health services | /hormonal-contraceptive-pill/ (a contraception page, in a pregnancy article) | /womens-health/ |
| `forgot-medication-on-holiday.md:25` | prescription and dispensing service at Pacific Fair | /pharmacy-services/ | /prescriptions/ |
| `how-to-use-escripts.md:19` | prescription service at Priceline Pharmacy Pacific Fair | /pharmacy-services/ | /prescriptions/ |
| `travel-health-checklist.md:86` | prescription team | /pharmacy-services/ | /prescriptions/ |
| `fragrance-gift-ideas.md:23` | beauty and fragrance range | /skincare-tanning/ | /fragrance/ |
| `when-to-get-flu-shot-queensland.md:92` | "See our travel health page" (no link) | none | /travel-health/ |
| `travel-health-checklist.md:151` | closing CTA (no link) | none | /travel-health/ |
| `src/pages/travel-health.astro` | doesn't link the checklist | none | /travel-health-checklist/ |

**Why it matters.** Contextual links and their anchors are how Google learns which page should rank for "flu shot Broadbeach" or "pharmacist sick certificate". At the moment these pages lean on site-wide nav links. Readers who land on informational articles are sent 70 times to an independent GP practice and almost never to the pharmacy's own paid or booked services.

**Fix: proposed links.** None of these anchors includes a price, typed hours or a medicine name. Help Medical wording follows finding 1.

| Article (line) | Add or change | Target |
|---|---|---|
| common-cold-remedies (78) | "If your workplace needs evidence, a pharmacist can assess you and, if suitable, give you an [absence from work certificate]." | /sick-leave-certificates/ |
| gastro-in-kids-hydration (91) | "Need to stay home to care for them? A pharmacist can see your child and may give you a [carer's leave certificate]. Bring your child with you." | /sick-leave-certificates/ |
| dry-cough-vs-chesty-cough (107, before 30 Nov) | Same sentence as common-cold-remedies | /sick-leave-certificates/ |
| when-to-get-flu-shot-queensland (25, 65) | "[walk-in flu shots at Pacific Fair]" replacing the hub link | /flu-vaccination/ |
| free-vaccines-pharmacy-queensland (48, flu row) | "See [flu vaccination at Pacific Fair]." | /flu-vaccination/ |
| whooping-cough-vaccine-pregnancy (61, 71) | "[whooping cough vaccine at Pacific Fair]"; "[whooping cough booster]" for partners and grandparents | /whooping-cough-vaccine/ |
| vaccines-for-uni-students (119) | Link "whooping cough" and "flu" in the FAQ answer | /whooping-cough-vaccine/, /flu-vaccination/ |
| 6 country pages (rows above) | Link the vaccine name in the table | /whooping-cough-vaccine/ (the page covers tetanus boosters for travellers) |
| how-to-treat-a-cut (83) | "[tetanus booster (given as the whooping cough vaccine)]". Keep "see a doctor within a day" for dirty wounds. | /whooping-cough-vaccine/ |
| forgot-medication-on-holiday (42) | "Left diabetes supplies behind? If you're registered with the NDSS, you can collect subsidised test strips and pen needles from us: [diabetes supplies and the NDSS]." | /national-diabetes-services-scheme/ |
| how-to-dispose-of-old-medicines (65) | "…pen needles and syringes through the [NDSS]" | /national-diabetes-services-scheme/ |
| normal-blood-pressure (93, 94) | "[free weight management support]"; "[help to quit smoking]" | /weight-loss-counselling-and-advice/, /quit-smoking/ |
| heartburn-relief (74) | Same two links | same |
| what-can-a-pharmacist-treat-queensland (72) | "…for example for heartburn and reflux, [quitting smoking] and [weight management]". Also link the table rows for acne, eczema, shingles, minor wounds and ear infections to the matching articles. | /quit-smoking/, /weight-loss-counselling-and-advice/ |
| vitamin-d-gold-coast (91), postpartum-hair-loss (74), mosquito-bites-ross-river-virus (88), vaccines-for-uni-students (88) | "[QML Pathology collection room]" | /blood-tests/ |
| christmas-gift-ideas (72–77) | New bullet: "Check our [Christmas and public holiday hours] before you visit." This follows the rule to link hours rather than type them. | /public-holiday-hours/ |
| forgot-medication-on-holiday (99) | "[guide for visitors to the Gold Coast]" | /visiting-the-gold-coast/ |

Also update the sidebar cards (`relatedServices`):
- `common-cold-remedies`: replace `["prescriptions"]` with `["sick-leave-certificates", "flu-vaccination"]`
- `gastro-in-kids-hydration`: add `"sick-leave-certificates"`
- `head-lice-treatment` and `padel-health-benefits` have none. For padel, add `"skincare-tanning"` for the sun-care angle. Don't touch the Padel Shop rule.

**How the owner will know it worked:**
- Re-run `crawl.py`: every target above has 3 or more in-content article links.
- In GA4, look for sessions where `page_referrer` is an article and the page is a service page, and watch the `call` and `book-vaccination` events on those pages.
- In Search Console (Pages, then each service URL, then Queries), non-brand impressions for the service pages rise over 4–8 weeks.

---

## 4. Freshness: claims that go stale on or soon after 1 Jan 2027. High, date-bound

**Why it matters.** Stale figures on YMYL pages undermine trust, and "2026" in a title looks dated in search results from January. `HOW_TO_UPDATE_THE_WEBSITE.md` (line 82) says the PBS Safety Net article leads the site's Copilot citations, so it is the most important page to update on time. Schedule this now.

| Update by | File:line | Claim | Check against |
|---|---|---|---|
| **2 Jan 2027** | `pbs-safety-net-explained.md:2,4` (title, seoTitle), 23, 25, 27, 29, 34, 37, 59 | "PBS Safety Net 2026"; "$1,748.20 … $277.20"; co-payments of $25 and $7.70 | Services Australia's PBS Safety Net thresholds page (republished each January) |
| 2 Jan 2027 | `60-day-prescriptions-explained.md:27, 29, 57, 59, 65–66, 80` | "In 2026, with the general PBS co-payment at $25"; the H2 "How much can you save in 2026?"; "what you'll pay this year"; the savings table; the thresholds | health.gov.au Cheaper Medicines; PBS fees page. Check whether the $25 general co-payment is indexed. |
| 2 Jan 2027 | `generic-vs-brand-medicines.md:64` | "In 2026 that co-payment is up to $25 … $7.70" | same |
| 2 Jan 2027 | `passport-photo-requirements.md:89` | "visit China without a visa for up to 30 days, until 31 December 2026" | Chinese Embassy in Australia notices; Smartraveller |
| 2 Jan 2027 | `free-vaccines-pharmacy-queensland.md:2,4` (title "…in 2026"), 31 ("the new RSV vaccine"), 35, 37–40, 44 ("as at October 2026"), 76, 106, 110 | 2026 eligibility, "What changed in 2026?", Queensland program dates | health.gov.au NIP schedule; Queensland Health 2027 flu program announcement |
| Jan 2027 (when the trial starts) | `what-can-a-pharmacist-treat-queensland.md:91, 95` | "the contraception consultation is $35"; "a 12-month trial from January 2027 … at the $7.70 concession rate" | Department of Health trial page. Trial patients may not pay the $35 consult, so the service page title "Contraception Consultations, $35" and its FAQ need a note as well. |
| Late Jan 2027 | `first-aid-kit-checklist.md:37` | "Term 4 2026 finishes on Friday 11 December and Term 1 2027 starts on Tuesday 27 January" | Qld Department of Education term dates |
| Feb 2027 | `china-vaccinations.md:111` | "Lunar New Year (6 February 2027)" | make it evergreen |
| **Before March 2027** (flu season) | `when-to-get-flu-shot-queensland.md:49, 61, 63` | "In 2026, the flu vaccine was free under the NIP for…"; "the vaccines that are free in 2026" | NIP 2027 influenza eligibility; whether Queensland runs a free program in 2027 |
| Early 2027 | `shingles-vaccine-free.md:46` | "(as at 2026)" | NIP schedule |
| Before Semester 1, 2027 | `vaccines-for-uni-students.md:70, 75` | Queensland Health placement minimums; "Bond University asks … by 1 June each year" | Qld Health student placement requirements; Bond and Griffith placement hubs |
| Check now | `travel-health-checklist.md:102` | "a fine of up to $16,500 (as of February 2026)" | Services Australia. Commonwealth penalty units are indexed periodically, so confirm the amount. |
| When published | `normal-blood-pressure.md:44–54` | "The Heart Foundation is also updating Australia's hypertension guideline in stages" | Heart Foundation. The thresholds in the category table may change. |
| When published | `mineral-vs-chemical-sunscreen.md:76` | TGA 2025 review: "recommended regulatory controls … homosalate and oxybenzone" | TGA final decision and implementation date |
| Periodically | `fiji-vaccinations.md:158` ("dengue outbreak … in June 2026"); `india-vaccinations.md:147` (counterfeit rabies vaccine warning, Dec 2025 and Jan 2026); `gastro-in-kids-hydration.md:89` ("Time out poster (last revised January 2026)"); `what-can-a-pharmacist-treat-queensland.md:57` (pilot "runs until 30 June 2027") | outbreak and policy news | Smartraveller; Qld Health |
| Feb 2027 (seasonal tone) | `alcohol-and-antibiotics.md:30` ("work Christmas parties"); `teeth-whitening-safety.md:29, 79` (H2 "…in time for Christmas?"); `help-elderly-parent-with-medication.md:3, 25`; `swimmers-ear.md:25`; `mosquito-bites-ross-river-virus.md:3, 114`; `padel-health-benefits.md:190` | Christmas and summer framing in evergreen articles | make it evergreen or rotate it seasonally |

The same facts also appear on service pages, which must change at the same time: `vaccination-information.astro:9, 10, 36, 37, 45`, `flu-vaccination.astro:38` and `whooping-cough-vaccine.astro:54`.

**Spot-checks (5 of 5 allowed; all confirmed correct today):**

| Fact on site | Result | Official source |
|---|---|---|
| PBS Safety Net 2026: $1,748.20 general, $277.20 concession; co-payments of $25 and $7.70 | Confirmed (the October 2026 PBS schedule still lists them) | Services Australia, https://www.servicesaustralia.gov.au/pbs-safety-net-thresholds; PBS, https://www.pbs.gov.au/about/what-is-the-pbs/what-are-the-current-patient-fees-and-charges |
| COVID-19 vaccines moved to the NIP on 1 Oct 2026: 75+ get 2 doses a year; 65–74 get 1; Aboriginal and Torres Strait Islander people aged 50–74 get 1; ages 18–64 severely immunocompromised get 1 | Confirmed. Some official pages simplify this to "65 and over". | health.gov.au, https://www.health.gov.au/topics/immunisation/when-to-get-vaccinated/immunisation-for-adults; ATAGI transition statement (Sept 2026) |
| Queensland free flu program ran 1 Mar to 30 Sep 2026 for everyone aged 6 months and over | Confirmed ended | Queensland Health, https://www.health.qld.gov.au/clinical-practice/guidelines-procedures/diseases-infection/immunisation/schedule/2026-free-flu-vaccination-program |
| Australians can enter China visa-free for 30 days until 31 Dec 2026 | Confirmed | Chinese Embassy in Australia, https://au.china-embassy.gov.cn/eng/tzgg/202511/t20251105_11747334.htm |
| Pharmacist contraception and UTI trial from Jan 2027 for concession card holders aged 18–55 at $7.70 | Confirmed | Minister for Health release, https://www.health.gov.au/ministers/the-hon-mark-butler-mp/media/womens-health-trial-to-expand-access-to-cheaper-medicines |

**Fix.**
- Put the update list in the calendar for the first week of January. Remove years from titles where the page is evergreen, for example "PBS Safety Net: this year's thresholds…". Keep the year in the body table and update it.
- Make `tools/check-articles.py` warn when a past year appears in a title, seoTitle, description or H2, or in phrases like "in 2026" or "until 31 December 2026".
- Keep vaccine eligibility in one place (see finding 6).

**How the owner will know it worked:**
- By 9 Jan 2027, `grep -rn "2026" src/content/articles` returns only past-tense history.
- Search Console shows impressions for "pbs safety net 2027".
- Bing's AI Performance report keeps citing the PBS article.

---

## 5. Article template E-E-A-T: strong base, gaps in experience and the "How". Medium

**What's strong** (`src/layouts/ArticlePage.astro`, `src/lib/schema.ts`):
- **Reviewer.** A named reviewer appears on every article with photo, credentials and role: "Reviewed by Jason Markey, BPharmSci, MPharm, Owner and Pharmacist" (line 79), linked to /about-us/, which carries his bio, training store and career history.
- **Dates.** Published and Reviewed dates are visible with `<time>` (lines 72–73). The schema has datePublished, dateModified and lastReviewed, and `reviewedBy` points to a Person with `hasCredential`.
- **Sources.** Every live article has a Sources section (minimum 2, median 6, up to 32) drawn from Australian authorities: healthdirect, TGA, Cancer Council, Queensland Health, RCH and Services Australia. Attribution is inline throughout.
- **Safety.** A disclaimer, the label statement and 000 guidance appear on every article (line 93). 64 of 87 have a "When to see a pharmacist or GP" section.
- **Transparent scope.** Articles say what the store does and doesn't do: no rabies, dengue or yellow fever vaccines, and only UTI and contraception from the Queensland prescribing list (`what-can-a-pharmacist-treat-queensland.md:67–72`).
- **Local relevance** in many articles: the year-round UV, a local pollen calendar, Safe Night Precincts, Bond and Griffith placement rules, and parking at Gate 7.

**What's missing:**

| Gap | Evidence | Fix | How to know |
|---|---|---|---|
| 5a. "Reviewed" is just `modifiedDate` | `ArticlePage.astro:73` and `schema.ts:222` (`lastReviewed: opts.dateModified`). paracetamol-and-ibuprofen-together got new dosing content in commit f00b97e (25 Oct) and now shows "Reviewed 25 October 2026", but nothing records whether Jason signed it off. 67 of 96 articles show identical Published and Reviewed dates. | Add `reviewedDate` to `src/content.config.ts`. Render "Updated {modifiedDate} · Reviewed by Jason Markey on {reviewedDate}" and feed `lastReviewed` from it. Make `check-articles.py` warn when modifiedDate is later than reviewedDate on health categories. | The panel shows two dates; the schema validator shows `lastReviewed` equal to `reviewedDate`. |
| 5b. No editorial policy (the "How") | The only statement is buried in `terms-and-conditions.astro:21`. The workflow uses Claude to edit content (`HOW_TO_UPDATE_THE_WEBSITE.md:7`). | Publish /editorial-policy/. Cover who writes, how articles are researched from cited sources, any use of AI drafting tools, Jason's review before publishing, update and correction practice, a corrections contact and the advertising rules followed. Link it from the reviewer line ("How we write and review"). | The page is indexed and linked from every article. |
| 5c. No reviewer profile page | "Reviewed by Jason Markey" links to the general /about-us/ | Create a profile at /about-us/jason-markey/ or an anchored section. Include the credentials already in `site.ts`, practising since his 2015 internship, any clinical service training that is true (owner to confirm: immuniser, Queensland pharmacist prescribing) and an auto-generated list of the articles he has reviewed. Point the Person `url` there. | The schema validator shows the Person `url` pointing at the profile. |
| 5d. Author entity is detached | `schema.ts:223`: the author is a separate Organization "Priceline Pharmacy Pacific Fair team", not `{ '@id': ID.pharmacy }` | Reference the Pharmacy `@id`, or a named Person where one wrote the piece. Coordinate with the schema reviewer. | One organisation entity in the graph |
| 5e. Experience signals are generic | Claims like "the flu shot questions we hear most at the counter" (`when-to-get-flu-shot-queensland.md:25`), "questions we hear most often from mums-to-be" (`whooping-cough-vaccine-pregnancy.md:31`) and "what we tell customers at the counter every week" (`heartburn-relief.md:22`) appear, but no article gives a specific first-hand observation | Add a 2–3 sentence "Pharmacist's note" from Jason to the 10–15 most-visited articles: real seasonal patterns he sees, common mistakes, what people ask. No testimonials, outcomes or claims. | Search Console clicks and Bing AI citations on those pages |
| 5f. Pharmacist-review panel on shopping guides | christmas-gift-ideas, fragrance-gift-ideas and make-perfume-last-longer carry "General health information from a registered pharmacist" | For non-health beauty pieces, show "Written by our beauty team" without the clinical-review line, so the badge keeps its meaning (Low) | The panel varies by category |

**E-E-A-T breakdown (heuristic).**
- **Experience 9/20.** Local context is good, but first-hand detail is generic.
- **Expertise 19/25.** A named, credentialed reviewer and accurate, well-sourced content. Points lost for organisation authorship and a thin reviewer profile.
- **Authoritativeness 13/25.** Authoritative citations; the house doc reports 40 Copilot citations in 3 days. Little else can be verified offline.
- **Trust 22/30.** NAP, disclaimers and an honest scope. Points lost for the Help Medical wording, the conflated review date and the contraception contradictions.

---

## 6. Vaccine cluster overlaps. Medium

| Pair | Evidence | Recommendation | How to know |
|---|---|---|---|
| `/when-to-get-flu-shot-queensland/` and `/flu-vaccination/` | Six sections mirror each other. Service page: "When should I get my flu shot?", "Why do I need a flu shot every year?", "Who is eligible for a free flu shot?", "Do I need to book?", "Can I have the flu shot with other vaccines?", "What are the side effects?". Article: "So when should I get my flu shot?", "Do I need a flu shot every year?", "Is the flu vaccine free?", "Can I just walk in at Pacific Fair?", "Can I have it with other vaccines?", "What are the side effects of the flu vaccine?". The article body links only to the hub. | **Differentiate.** The article owns timing: the Queensland season; over-65s; pregnancy; children's first-year 2 doses; Northern Hemisphere travel; "is it too late?". Cut eligibility, walk-in, what-to-expect and side effects to 2–3 sentences plus "[walk-in flu shots at Pacific Fair](/flu-vaccination/)". The service page's 3-sentence timing section links to the article. Refresh both before March 2027 (finding 4). | In Search Console, "flu shot gold coast/broadbeach" lands on /flu-vaccination/ and "when to get flu shot" on the article, with no URL swapping. |
| `/whooping-cough-vaccine-pregnancy/` and `/whooping-cough-vaccine/` | The new service page (26 Oct, 2,393 words) has the description "Free in pregnancy under the NIP" and covers grandparents and carers. The article doesn't link to it in the body, and its line 99 sends "women's health services" to the contraception page. | **Keep both.** Add the article-to-service links from finding 3. Shorten the service page's pregnancy content to a summary plus its existing link to the article. Fix line 99 to point at /womens-health/. | Pregnancy queries land on the article; local queries land on the service page. |
| `/free-vaccines-pharmacy-queensland/` and `/vaccination-information/` | The hub's "Which vaccines are free?" list (`vaccination-information.astro:33–45`) duplicates the article's table (`free-vaccines…md:46–59`). The same eligibility text also lives in `flu-vaccination.astro:29–39`, `whooping-cough-vaccine.astro`, `shingles-vaccine-free.md:44–54` and `vaccines-for-uni-students.md:46–49, 90–97`. All agree today. | Make the article the single eligibility reference. Cut the hub list to 2–3 lines plus the existing link. Alternatively, move the table into one data file rendered in both places, so the January update happens once. | Next year's update touches one file; no drift between pages. |

---

## 7. Templated meta descriptions. Medium

**Evidence** (`meta_check.py` over all 141 crawled pages):
- **Strict claude-seo rules:** `templated_metadata` on 0 pages (site_risk low); `description_echoes_title` on 11 article pages; `brand_suffix_in_description` on 25 pages (24 service or hub pages plus christmas-gift-ideas); `description_duplicates_title` on 0.
- **Site-specific stock closers:** 40 of 87 article descriptions (46%) end with one:
  - "Ask our Broadbeach team." (15)
  - "Ask our Broadbeach pharmacists." (11)
  - plus variants: "Ask our Pacific Fair team" (2), "Ask our Pacific Fair beauty team" (2), "Ask us in Broadbeach" (2), "Walk-ins at Pacific Fair" (2) and singles such as "Plain guide from Pacific Fair."
- **The full templated shape.** Treat those closers as stock CTAs and 8 pages show the exact pattern claude-seo calls templated metadata: the description echoes the title, then ends on a stock CTA. Those pages are 60-day-prescriptions-explained, baby-sun-protection, electric-vs-manual-toothbrush, fragrance-sensitive-skin, how-to-dispose-of-old-medicines, mineral-vs-chemical-sunscreen, vitamin-d-gold-coast and when-to-get-flu-shot-queensland. That is 9% of articles, and the shared-CTA-tail flag fires.
- **A uniform shape.** 65 of 87 descriptions use "Topic: list of subtopics." 32 of 87 start with the H1's first three words.
- **Country pages.** 5 of 6 share one frame: "Heading to/Going to X? The vaccines to check before you go, from measles, hepatitis A and typhoid to…".

**Why it matters.** The closer spends 25–35 of about 155 snippet characters on words that don't set the page apart, and a uniform shape is what bulk jobs produce. This is a heuristic quality signal; I don't claim it triggers any particular penalty.

**Fix.** Rewrite the 40 descriptions, starting with the 8 templated ones. Drop the closer and spend the space on the page's unique fact or local proof. Examples (all 145–160 characters, facts taken from each article, no prices or hours):
- **60-day-prescriptions-explained:** "Two months' supply for one PBS co-payment: who can get a 60-day script, how to check if your medicine qualifies, and what it saves a general patient." This also drops "2026".
- **how-to-dispose-of-old-medicines:** "Unwanted medicines go back to any pharmacy for free, safe disposal. What we accept at our Pacific Fair counter, where sharps go, and how to read expiry dates."
- **vitamin-d-gold-coast:** "Most Gold Coast locals get enough vitamin D from everyday sun. Who still runs low, when Medicare covers a test, and dose guides from Healthy Bones Australia."
- **Country pages:** lead with the country hook. India: the counterfeit rabies vaccine warning. China: Tibet altitude and live-animal markets. Fiji: rabies-free, but dengue and leptospirosis after floods.

Add a warning to `check-articles.py` for any description ending "Ask our…", or when more than 5 descriptions share a last sentence.

**How the owner will know it worked:** re-run `meta_check.py` and see 5 or fewer stock closers and no echo-plus-CTA pages. Compare Search Console CTR on the rewritten URLs with the previous 28 days at similar positions.

---

## 8. The "Common illnesses A–Z" batch (24 Sep) reads generic. Medium

**Where.** 11 articles:

| Article | Words | Sources |
|---|---|---|
| acne-treatment-pharmacy | 952 | 2 |
| athletes-foot-treatment | 879 | 6 |
| constipation-relief | 981 | 4 |
| dandruff-treatment | 907 | 3 |
| dry-skin-remedies | 951 | 3 |
| haemorrhoids-treatment | 911 | 4 |
| headache-relief | 926 | 5 |
| heartburn-relief | 876 | 2 |
| migraine-relief | 954 | 4 |
| mouth-ulcer-treatment | 904 | 3 |
| nail-fungus-treatment | 852 | 3 |

**Evidence.**
- **Openings are fine.** All open answer-first.
- **Templated second paragraph.** 17 articles link the A–Z hub with the identical anchor "our common illnesses A–Z", 13 of them in a near-identical second paragraph.
- **Bolted-on local angle.** Usually one sentence, e.g. `dandruff-treatment.md:56`: "That's handy news on the Gold Coast, where heat, humidity…".
- **Options described only by vague category.** One article declines outright: `dandruff-treatment.md:60` says "We can't recommend one here, as the best choice depends on your scalp…".
- **No range links.** None of the batch links to a priceline.com.au range page; newer articles do.
- **No sibling links.** None links to another article. Athlete's foot mentions toenail spread (line 82) but doesn't link nail-fungus-treatment; headache-relief and migraine-relief don't link each other.
- **No first-hand pharmacist observation** in any of them.

**Why it matters.** These match the QRG markers of low-quality content: generic phrasing, no specificity, no first-hand experience. They compete with healthdirect and Better Health. AI answers tend to cite pages that name specifics. They are not thin in the spam sense, but they are the weakest part of the blog.

**Fix: 300–500 words of substance each, not padding.**
1. Name the generic active-ingredient types of non-prescription options in a small table showing how each works, how long to use it and cautions. Never name brands, and skip prescription-only actives. The template already carries the label statement. For dandruff, for example: ketoconazole, selenium sulfide, zinc pyrithione, coal tar and salicylic acid shampoos (owner to confirm each is non-prescription in the strengths stocked).
2. Add a short "What we see at Pacific Fair" note from Jason.
3. Add a range link from the verified list in `reference-content/research/2026-10-content-research.md`:
   - dandruff: `/c/antidandruff-treatments`
   - mouth ulcer: `/c/mouth-treatments`
   - common cold: `/c/cold-flu-immunity-allergy`
   - heartburn, constipation and haemorrhoids: `/c/digestive-health`
4. Add sibling links: athlete's foot and nail fungus; headache, migraine and paracetamol-and-ibuprofen-together; dry skin and eczema-summer; acne, retinol-for-beginners and skincare-routine-order.
5. Use question H2s that match long-tail searches, e.g. "How long does athlete's foot cream take to work?".

**How the owner will know it worked:** Search Console impressions, long-tail query counts and average position for these 11 URLs over 8 weeks, plus citations in Bing's AI Performance report.

---

## 9. Sunscreen cluster: repeated sections, hubs don't link down. Low

**Evidence.**
- **Primary intents are distinct**, judging by the title tags: sun safety, choosing a sunscreen, SPF30 vs SPF50+, mineral vs chemical, under makeup, babies, sunburn. No merge is needed.
- **Repeated sections:**
  - The Cancer Council "35 mL, seven teaspoons" block appears three times: `sun-safety-gold-coast.md:68–70`, `best-sunscreen-gold-coast.md:91–96` and `spf30-vs-spf50.md:65–70`.
  - The label checklist (SPF50+, broad spectrum, water resistant, the SPF60 test) appears in both `best-sunscreen-gold-coast.md:33–51` and `spf30-vs-spf50.md:47–59`.
  - "Do you need sunscreen every day on the Gold Coast?" is an H2 on spf30-vs-spf50 (line 79) and on /skincare-tanning/, and it is the whole thesis of sun-safety-gold-coast.
- **Links only run upwards.** The spokes link up (spf30-vs-spf50 links 5 cluster pages), but best-sunscreen-gold-coast links only to /skincare-tanning/, and sun-safety-gold-coast links only to /skincare-tanning/ and /help-medical/.

**Fix.**
- **Assign query ownership.**
  - sun-safety-gold-coast: "sun safety / sunscreen every day in Queensland"
  - best-sunscreen-gold-coast: "how to choose sunscreen", acting as the hub
  - spf30-vs-spf50: the numbers only
  - /skincare-tanning/: transactional
- **Trim the repeats** to one sentence plus a link.
- **Add hub links** from best-sunscreen: step 1 to spf30-vs-spf50, sensitive skin to mineral-vs-chemical, under makeup to sunscreen-under-makeup, and kids to baby-sun-protection. From sun-safety: the "Slop" step to best-sunscreen, and "When to see…" to sunburn-treatment.

**How the owner will know it worked:** each URL ranks for its own head query in Search Console, with no alternation on "do I need sunscreen every day queensland".

---

## 10. Answer-first structure and citability. Low

**Strong.**
- 82 of 87 live articles open with a self-contained answer, often carrying a number: `childrens-paracetamol-ibuprofen.md:30`, `passport-photo-requirements.md:39`, `pbs-safety-net-explained.md:23`.
- Half of all H2/H3 headings are questions.
- Tables are common, and sources are named inline, which suits AI citation.

**Gaps.**
- **Five openers only make sense with the H1 next to them:**
  - `generic-vs-brand-medicines.md` ("Yes, in the ways that matter for your health.")
  - `alcohol-and-antibiotics.md` ("It depends on the antibiotic.")
  - `mineral-vs-chemical-sunscreen.md` ("Both types work.")
  - `retinol-for-beginners.md` ("Start low and slow.")
  - `hayfever-gold-coast.md` ("…doesn't follow the southern script.")

  Restate the subject, for example "Generic medicines work the same way as brand-name medicines: same active ingredient, same amount, checked by the TGA." Or: "Hayfever on the Gold Coast usually builds through summer and autumn, not spring, because most local grasses are subtropical."
- **Checklist-style pages with almost no question headings:** best-sunscreen-gold-coast (0 of 17), help-elderly-parent-with-medication (0 of 10), eczema-summer (1 of 15), heat-exhaustion-symptoms (1 of 11) and skincare-humid-weather (1 of 13). Add a 3–4 question FAQ block using real search phrasings.

**How the owner will know it worked:** Copilot citations per page in Bing's AI Performance report, and question-form queries in Search Console.

---

## 11. Pairs checked and found not to cannibalise (keep as is). Low

- **`/passport-photo-requirements/` and `/passport-photos/`.** The article is informational (sizes, guarantor, visa formats); the service page is transactional and local ($25, no booking). They cross-link both ways (article lines 41 and 105, plus a service-page link back). Keep both. The only action is the China date in finding 4.
- **`/ear-piercing-aftercare/` and `/ear-piercings/`.** Informational aftercare against a transactional service. The facts agree (ages 8+; studs in for 6 weeks for lobes and 12 for cartilage), and the pages cross-link. Keep both. Optionally shorten the service page's "How do I look after a new piercing?" to a summary plus a link.
- **Country travel pages against `/travel-health/` and `/travel-health-checklist/`.** Each country page owns "[country] vaccinations". /travel-health/ is a proper hub linking all six, and the checklist owns the countdown query. Keep all. Actions: link the checklist from /travel-health/, fix the checklist's misdirected anchors (finding 3), and rewrite the templated country descriptions (finding 7).

## Checked and none found

- **Factual errors:** none found in the 32 articles read, and all 5 spot-checked facts are current.
- **Testimonials or review quotes on clinical pages:** none.
- **"Guaranteed", "clinically proven" or "miracle":** none. "Cure" appears only in negative statements ("There's no cure for the common cold", `common-cold-remedies.md:24, 90`), which is fine in spirit. Note that "cure" isn't in BLOCKED.
- **Vaccine brand names:** none.
- **Prices for medicines or vaccines:** none. The dollar figures are government PBS amounts and the $35 contraception consultation fee, which is a service fee that matches the service page.
- **Fees on free vaccines:** none. Articles say "completely free, with no service fee".
- **Rabies, dengue or yellow fever presented as given:** none; every country page says "No". The Bali page alone says dengue is "Not yet" / "We don't offer it yet" (lines 53 and 94), which hints at future supply. That's the owner's call; the hub says "not at the moment". The polio ambiguity is item 1e.
- **Compounding claims:** none.
- **Australian Padel Shop outside the padel article:** none.
- **Scaled-content boilerplate:** none. Only 10 sentences repeat verbatim across 5 or more live articles, mostly compliance lines.
- **Thin pages:** none below 684 words. The shortest, christmas-gift-ideas, is a store-specific gift guide that's adequate for its intent.

## Appendix

**The 44 articles using "our in-store Help Medical GPs":** 60-day-prescriptions-explained, alcohol-and-antibiotics, baby-sun-protection, childrens-paracetamol-ibuprofen, cold-sore-sun-trigger, common-cold-remedies, constipation-relief, dry-mouth-causes-relief, eczema-summer, electric-vs-manual-toothbrush, fake-tan-guide, first-aid-kit-checklist, fragrance-sensitive-skin, gastro-in-kids-hydration, gel-nails-uv-lamp-safety, generic-vs-brand-medicines, hayfever-gold-coast, head-lice-treatment, headache-relief, heat-exhaustion-symptoms, how-to-clean-makeup-brushes, how-to-dispose-of-old-medicines, magnesium-supplements-guide, make-perfume-last-longer, makeup-expiry-dates, migraine-relief, mineral-vs-chemical-sunscreen, normal-blood-pressure, paracetamol-and-ibuprofen-together, pbs-safety-net-explained, pigmentation-melasma-queensland, postpartum-hair-loss, probiotics-and-antibiotics, retinol-for-beginners, skincare-humid-weather, skincare-routine-order, spf30-vs-spf50, sun-safety-gold-coast, sunscreen-under-makeup, supplements-that-interact-with-medicines, teeth-whitening-safety, threadworms-treatment, vitamin-d-gold-coast, what-can-a-pharmacist-treat-queensland.

**Scripts and data** (temporary working files from the audit session; not kept in the repo):
- `fm.py` turns the front-matter of all 96 articles into `fm.json`.
- `meta_check.py` applies claude-seo's four metadata rules plus closing-sentence counts, writing `meta_res.json`.
- `links.py` extracts body links from the 87 live articles into `links.json`.
- `boiler.py` finds repeated sentences and counts H2s.
- `signals.py` records first sentences, question headings and local mentions in `signals.json`.
