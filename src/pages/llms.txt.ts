import type { APIRoute } from 'astro';
import { getLiveArticles } from '../lib/articles';
import { site, hoursRows, fmtTime } from '../data/site';
import { services } from '../data/services';

/** llms.txt: a plain-text map of the site for AI answer engines (https://llmstxt.org). */
export const GET: APIRoute = async () => {
  const posts = (await getLiveArticles()).sort((a, b) => a.data.title.localeCompare(b.data.title));
  const hours = hoursRows(site.hours).map((r) => `${r.label}: ${r.value}`).join('; ');
  const hm = hoursRows(site.helpMedical.hours).map((r) => `${r.label}: ${r.value}`).join('; ');
  const today = new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Australia/Brisbane' });
  const svc = (slug: string) => services.find((s) => s.slug === slug)!;
  const lines = [
    `# ${site.name}`,
    '',
    `Last updated: ${today}`,
    '',
    `> ${site.description}`,
    '',
    '## Key facts',
    `- Vaccinations (ages 5 and over): ${svc('vaccination-information').atAGlance.cost.split(' Private')[0]}`,
    `- Medication packing (Webster packs): ${svc('medication-packing').atAGlance.cost}`,
    `- Ear piercing (ages 8 and over): ${svc('ear-piercings').atAGlance.cost}`,
    `- Passport and visa photos: ${svc('passport-photos').atAGlance.cost} ${svc('passport-photos').atAGlance.time}`,
    `- Contraception consultation: ${svc('hormonal-contraceptive-pill').atAGlance.cost} ${svc('hormonal-contraceptive-pill').atAGlance.booking}`,
    `- UTI treatment: ${svc('uti-treatment').atAGlance.booking} For ${svc('uti-treatment').atAGlance.who.charAt(0).toLowerCase()}${svc('uti-treatment').atAGlance.who.slice(1)}`,
    '- Parking: 4 hours of free parking at Pacific Fair each day.',
    `- Delivery: ${svc('delivery').atAGlance.what} ${svc('delivery').atAGlance.who.replace(/^Anyone on the Gold Coast\. /, '')}`,
    `- Late night: open until ${fmtTime(site.hours.thu!.close)} on Thursdays.`,
    `- Help Medical: ${site.helpMedical.relationship.charAt(0).toUpperCase()}${site.helpMedical.relationship.slice(1)}, with a QML Pathology collection room open ${site.pathology.hoursText}`,
    '',
    `- Address: ${site.address.oneLine}`,
    `- Phone: ${site.phone}`,
    `- Email: ${site.emailGeneral} (general), ${site.emailPharmacy} (prescriptions)`,
    `- Opening hours: ${hours}. Public holiday hours are published on the Google Business Profile.`,
    `- Owner and pharmacist: ${site.reviewer.name}, ${site.reviewer.credentials}. Independently owned Priceline Pharmacy franchise store, opened 2009.`,
    `- Book online: ${site.links.book}`,
    `- Help Medical (independent general practice inside the store): ${site.helpMedical.phone}, ${site.helpMedical.bookingUrl}. Hours: ${hm}.`,
    `- QML Pathology collection inside Help Medical: ${site.pathology.hoursText}`,
    '',
    '## Services',
    ...services.map((s) => `- [${s.name}](${site.url}/${s.slug}/): ${s.short}`),
    '',
    '## Key pages',
    `- [Opening hours and directions](${site.url}/visit-us/)`,
    `- [Contact](${site.url}/contact-us/)`,
    `- [About the pharmacy and team](${site.url}/about-us/)`,
    `- [Frequently asked questions](${site.url}/frequently-asked-questions/)`,
    `- [Common illnesses A–Z](${site.url}/common-illness-information/)`,
    `- [Visiting the Gold Coast](${site.url}/visiting-the-gold-coast/)`,
    `- [Appointments](${site.url}/appointments/)`,
    '',
    '## Health advice articles (pharmacist-reviewed)',
    ...posts.map((p) => `- [${p.data.title}](${site.url}/${p.id.replace(/\.md$/, '')}/): ${p.data.description}`),
    '',
    '## Notes',
    '- Information on this site is general in nature and is not a substitute for personal advice from a pharmacist or doctor.',
    `- Sitemap: ${site.url}/sitemap-index.xml`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
