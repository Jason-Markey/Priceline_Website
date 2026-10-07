import type { APIRoute } from 'astro';
import { getLiveArticles } from '../lib/articles';
import { site, hoursRows } from '../data/site';
import { services } from '../data/services';

/** llms.txt: a plain-text map of the site for AI answer engines (https://llmstxt.org). */
export const GET: APIRoute = async () => {
  const posts = (await getLiveArticles()).sort((a, b) => a.data.title.localeCompare(b.data.title));
  const hours = hoursRows(site.hours).map((r) => `${r.label}: ${r.value}`).join('; ');
  const hm = hoursRows(site.helpMedical.hours).map((r) => `${r.label}: ${r.value}`).join('; ');
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
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
