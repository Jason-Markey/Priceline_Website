import type { APIRoute } from 'astro';
import { getLiveArticles } from '../lib/articles';
import { site, hoursRows, fmtTime, upcomingSpecialHours, specialRows, visitorFacts } from '../data/site';
import { services } from '../data/services';
import { categories } from '../data/categories';

/** llms.txt: a plain-text map of the site for AI answer engines (https://llmstxt.org). */
export const GET: APIRoute = async () => {
  const posts = (await getLiveArticles()).sort((a, b) => a.data.title.localeCompare(b.data.title));
  const hours = hoursRows(site.hours).map((r) => `${r.label}: ${r.value}`).join('; ');
  const hm = hoursRows(site.helpMedical.hours).map((r) => `${r.label}: ${r.value}`).join('; ');
  const today = new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Australia/Brisbane' });
  const svc = (slug: string) => services.find((s) => s.slug === slug)!;
  const xmas = upcomingSpecialHours();
  const lines = [
    `# ${site.name}`,
    '',
    `Last updated: ${today}`,
    '',
    `> ${site.description}`,
    '',
    '## Key facts',
    `- Vaccinations (ages 5 and over): ${svc('vaccination-information').atAGlance.cost.split(' Private')[0]}`,
    '- Vaccines: COVID-19 vaccines are free only for eligible groups since 1 October 2026 (75+, 65–74, Aboriginal and Torres Strait Islander people 50–74, adults 18–64 with severe immunocompromise). Rabies, dengue, yellow fever and polio vaccines are not offered in store; we refer to a GP or travel clinic.',
    `- Medication packing (Webster packs): ${svc('medication-packing').atAGlance.cost}`,
    `- Ear piercing (ages 8 and over): ${svc('ear-piercings').atAGlance.cost} Walk in. Second holes in the earlobe are fine; sleepers and other earrings are sold in store. No nose piercing; call first about cartilage.`,
    `- Passport and visa photos: ${svc('passport-photos').atAGlance.cost} ${svc('passport-photos').atAGlance.time}`,
    `- Contraception consultation: ${svc('hormonal-contraceptive-pill').atAGlance.cost} ${svc('hormonal-contraceptive-pill').atAGlance.booking}`,
    `- UTI treatment: ${svc('uti-treatment').atAGlance.booking} For ${svc('uti-treatment').atAGlance.who.charAt(0).toLowerCase()}${svc('uti-treatment').atAGlance.who.slice(1)}`,
    '- Sick leave certificates: pharmacists issue absence from work certificates (personal or carer’s leave) for minor, short-term illnesses they can assess. Walk in on the day; certificates can’t be backdated; a consultation fee applies. Some universities and TAFE courses don’t accept pharmacist certificates for assessments.',
    '- Parking: 4 hours of free parking at Pacific Fair each day.',
    `- Delivery: ${svc('delivery').atAGlance.what} ${svc('delivery').atAGlance.who.replace(/^Anyone on the Gold Coast\. /, '')}`,
    `- Send scripts ahead: email the eScript link or QR code to ${site.emailPharmacy} (checked throughout the day while the store is open), or send it through MedAdvisor or the Priceline Pharmacy app. Paper prescriptions must be brought in.`,
    '- Prescription wait: most scripts are ready in 5 minutes or less, sometimes 5 to 10 minutes, rarely longer. A robotic dispensary picks medicines, and extra dispensary staff are rostered so patients still get counselling about their medicine. Names are called when a script is ready; customers who step out can come back to the prescription counter and give their name to check progress.',
    '- Full scripts: the pharmacy supplies the full quantity on a prescription, not part of it; if stock is short, customers are told when they hand the script in and can have it ordered in or take it elsewhere.',
    `- Stock checks: customers can call ${site.phone} or email ${site.emailPharmacy} to check a medicine is in stock before coming in.`,
    '- Early repeats: often possible for regular medicines such as blood pressure and cholesterol medicines; some medicines can’t be supplied early without the doctor’s approval. For people who are travelling, the pharmacy is happy to try calling their doctor for approval.',
    `- Paper scripts held at another pharmacy (for example, visitors on holiday): that pharmacy can email (${site.emailPharmacy}) or fax (${site.fax}) a copy and post the original; the medicine can usually be supplied from the copy.`,
    '- Private consultation room: available for private conversations with a pharmacist; no appointment needed.',
    '- Returns: the store follows Priceline’s Returns and Exchange Policy. Faulty products: refund or exchange under the Australian Consumer Law. Change of mind: within 30 days with proof of purchase, for unopened, unused items in original sealed packaging. Excluded from change-of-mind returns: prescription, Pharmacist Only and Pharmacy Only medicines, vitamins and supplements, infant formula, consumables such as food, gift cards, and products with less than 3 months to expiry.',
    '- Fragrance: every fragrance sold is genuine; testers are available in store, and fragrance can be sprayed on a testing card to take home.',
    '- Payment: Afterpay is available at the till in store.',
    '- Sharps: used needles, syringes and lancets can be dropped off in a sealed sharps container for safe disposal.',
    '- Compounding: the pharmacy does not compound (specially make) medicines; compounded prescriptions need a compounding pharmacy.',
    `- Late night: open until ${fmtTime(site.hours.thu!.close)} on Thursdays.`,
    `- Quietest time: ${site.quietTime.short.charAt(0).toLowerCase()}${site.quietTime.short.slice(1)} (walk-ins are welcome any time).`,
    `- Help Medical: ${site.helpMedical.relationship.charAt(0).toUpperCase()}${site.helpMedical.relationship.slice(1)}, with a QML Pathology collection room open ${site.pathology.hoursText}`,
    '',
    `- Address: ${site.address.oneLine}`,
    `- Phone: ${site.phone}`,
    `- Email: ${site.emailGeneral} (general), ${site.emailPharmacy} (prescriptions)`,
    `- Opening hours: ${hours}. Open on every Queensland public holiday except Christmas Day, Good Friday and Anzac Day; public holiday hours vary and are published on the Google Business Profile (dates: ${site.url}/public-holiday-hours/).`,
    `- Overseas visitors: most international cards accepted, including ${visitorFacts.cards} (for Alipay, ${visitorFacts.alipay}). GST can usually be claimed back through the Tourist Refund Scheme on purchases of AU$300 or more (GST included) made within 60 days of leaving Australia. ${visitorFacts.bulkOrders} Staff speak English and use a translation app.`,
    ...(xmas.length ? [`- Christmas and New Year hours: ${specialRows(xmas).map((r) => `${r.label} ${r.value}`).join('; ')}.`] : []),
    `- Owner and pharmacist: ${site.reviewer.name}, ${site.reviewer.credentials}, Ahpra registration ${site.reviewer.registration}. Independently owned Priceline Pharmacy franchise store, opened 2009.`,
    `- Every advice article is reviewed by ${site.reviewer.name} before it's published: ${site.url}${site.reviewer.profilePath} (how we write and check articles: ${site.url}/editorial-policy/)`,
    `- Book online: ${site.links.book}`,
    `- Help Medical (independent general practice inside the store): ${site.helpMedical.phone}, website ${site.helpMedical.websiteUrl}, online bookings ${site.helpMedical.bookingUrl}. Hours: ${hm}.`,
    `- QML Pathology collection inside Help Medical: ${site.pathology.hoursText}`,
    '',
    '## Services',
    ...services.map((s) => `- [${s.name}](${site.url}/${s.slug}/): ${s.short}`),
    '',
    '## Key pages',
    `- [Opening hours and directions](${site.url}/visit-us/)`,
    `- [Public holiday hours](${site.url}/public-holiday-hours/)`,
    `- [Guide in Simplified Chinese for visitors buying vitamins in bulk (澳洲维生素选购指南)](${site.url}/zh/vitamins-gold-coast/)`,
    `- [Contact](${site.url}/contact-us/)`,
    `- [About the pharmacy and team](${site.url}/about-us/)`,
    `- [Frequently asked questions](${site.url}/frequently-asked-questions/)`,
    `- [Common illnesses A–Z](${site.url}/common-illness-information/)`,
    `- [Visiting the Gold Coast](${site.url}/visiting-the-gold-coast/)`,
    `- [Appointments](${site.url}/appointments/)`,
    `- [Health, beauty and medicines advice hub](${site.url}/health-blog/)`,
    '',
    '## Advice articles (pharmacist-reviewed), by topic',
    ...Object.entries(categories).flatMap(([slug, c]) => {
      const inCat = posts.filter((p) => p.data.category === slug);
      if (!inCat.length) return [];
      return ['', `### ${c.name}`, ...inCat.map((p) => `- [${p.data.title}](${site.url}/${p.id.replace(/\.md$/, '')}/): ${p.data.description}`)];
    }),
    '',
    '## Notes',
    '- Information on this site is general in nature and is not a substitute for personal advice from a pharmacist or doctor.',
    `- Sitemap: ${site.url}/sitemap-index.xml`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
