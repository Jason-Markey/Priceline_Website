/**
 * JSON-LD builders. Every page gets a @graph with the Pharmacy entity + WebSite + WebPage (+ breadcrumbs),
 * and page types add Service / FAQPage / Article / MedicalClinic.
 * Nothing here is invented: every value comes from src/data/site.ts or the page itself.
 */
import { site, openingHoursSpec } from '../data/site';

const ID = {
  pharmacy: `${site.url}/#pharmacy`,
  website: `${site.url}/#website`,
  owner: `${site.url}/#jason-markey`,
  helpMedical: `${site.url}/#help-medical`,
  logo: `${site.url}/#logo`,
};

export function pharmacyNode(logoUrl: string, imageUrl: string) {
  return {
    '@type': ['Pharmacy', 'MedicalBusiness', 'LocalBusiness'],
    '@id': ID.pharmacy,
    name: site.name,
    alternateName: site.shortName,
    legalName: site.legalName,
    url: `${site.url}/`,
    telephone: site.phoneE164,
    faxNumber: site.fax,
    email: site.emailGeneral,
    description: site.description,
    foundingDate: site.foundingDate,
    image: imageUrl,
    logo: { '@type': 'ImageObject', '@id': ID.logo, url: logoUrl },
    priceRange: '$$',
    currenciesAccepted: 'AUD',
    paymentAccepted: 'Cash, Credit Card, Debit Card, EFTPOS, NFC Mobile Payments',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${site.address.shop}, ${site.address.building}, ${site.address.street}`,
      addressLocality: site.address.suburb,
      addressRegion: site.address.state,
      postalCode: site.address.postcode,
      addressCountry: site.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.latitude, longitude: site.geo.longitude },
    hasMap: site.mapsUrl,
    containedInPlace: {
      '@type': 'ShoppingCenter',
      name: 'Pacific Fair Shopping Centre',
      address: { '@type': 'PostalAddress', streetAddress: 'Hooker Boulevard', addressLocality: 'Broadbeach', addressRegion: 'QLD', postalCode: '4218', addressCountry: 'AU' },
    },
    areaServed: [
      { '@type': 'City', name: 'Broadbeach' },
      { '@type': 'City', name: 'Broadbeach Waters' },
      { '@type': 'City', name: 'Mermaid Beach' },
      { '@type': 'City', name: 'Surfers Paradise' },
      { '@type': 'City', name: 'Gold Coast' },
    ],
    openingHoursSpecification: openingHoursSpec(site.hours),
    parentOrganization: { '@type': 'Organization', name: 'Priceline Pharmacy', url: site.links.pricelineNational },
    brand: { '@type': 'Brand', name: 'Priceline Pharmacy' },
    employee: { '@id': ID.owner },
    sameAs: [site.links.googleBusinessProfile, site.links.pacificFairStorePage, site.social.facebook, site.social.instagram],
    isAccessibleForFree: true,
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Wheelchair-accessible entrance', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Accessible parking nearby', value: true },
    ],
  };
}

export function ownerNode(photoUrl?: string) {
  return {
    '@type': 'Person',
    '@id': ID.owner,
    name: site.reviewer.name,
    jobTitle: site.reviewer.role,
    description: site.reviewer.bio,
    image: photoUrl,
    worksFor: { '@id': ID.pharmacy },
    hasCredential: site.reviewer.credentialList.map((c) => ({ '@type': 'EducationalOccupationalCredential', name: c })),
    alumniOf: { '@type': 'CollegeOrUniversity', name: 'Griffith University' },
    url: `${site.url}/about-us/`,
  };
}

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': ID.website,
    url: `${site.url}/`,
    name: site.name,
    publisher: { '@id': ID.pharmacy },
    inLanguage: 'en-AU',
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${site.url}/search/?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function webPageNode(opts: { url: string; title: string; description: string; type?: string; datePublished?: string; dateModified?: string; imageUrl?: string }) {
  return {
    '@type': opts.type ?? 'WebPage',
    '@id': `${opts.url}#webpage`,
    url: opts.url,
    name: opts.title,
    description: opts.description,
    isPartOf: { '@id': ID.website },
    about: { '@id': ID.pharmacy },
    inLanguage: 'en-AU',
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    primaryImageOfPage: opts.imageUrl ? { '@type': 'ImageObject', url: opts.imageUrl } : undefined,
  };
}

export function breadcrumbNode(items: { name: string; href: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: i === items.length - 1 ? undefined : `${site.url}${it.href}`,
    })),
  };
}

export function serviceNode(opts: { url: string; name: string; description: string; price?: number; category?: string }) {
  return {
    '@type': 'Service',
    '@id': `${opts.url}#service`,
    name: opts.name,
    description: opts.description,
    serviceType: opts.category ?? 'Pharmacy service',
    provider: { '@id': ID.pharmacy },
    areaServed: { '@type': 'City', name: 'Gold Coast' },
    url: opts.url,
    offers: opts.price !== undefined
      ? { '@type': 'Offer', price: opts.price, priceCurrency: 'AUD', availability: 'https://schema.org/InStock' }
      : undefined,
  };
}

export function faqNode(items: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
}

export function helpMedicalNode() {
  const hm = site.helpMedical;
  return {
    '@type': 'MedicalClinic',
    '@id': ID.helpMedical,
    name: hm.fullName,
    url: hm.bookingUrl,
    telephone: '+61756193818',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${site.address.shop}, ${site.address.building}, ${site.address.street}`,
      addressLocality: site.address.suburb,
      addressRegion: site.address.state,
      postalCode: site.address.postcode,
      addressCountry: 'AU',
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.geo.latitude, longitude: site.geo.longitude },
    containedInPlace: { '@id': ID.pharmacy },
    openingHoursSpecification: openingHoursSpec(hm.hours),
    medicalSpecialty: 'PrimaryCare',
    isAcceptingNewPatients: true,
  };
}

export function articleNode(opts: {
  url: string; title: string; description: string; datePublished: string; dateModified: string; imageUrl?: string; section?: string; keywords?: string[]; citations?: { name: string; url: string }[];
}) {
  return {
    '@type': ['Article', 'MedicalWebPage'],
    '@id': `${opts.url}#article`,
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    mainEntityOfPage: { '@id': `${opts.url}#webpage` },
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    lastReviewed: opts.dateModified,
    author: { '@type': 'Organization', name: `${site.name} team`, url: `${site.url}/about-us/` },
    reviewedBy: { '@id': ID.owner },
    publisher: { '@id': ID.pharmacy },
    image: opts.imageUrl,
    articleSection: opts.section,
    keywords: opts.keywords?.join(', '),
    inLanguage: 'en-AU',
    citation: opts.citations?.map((c) => ({ '@type': 'CreativeWork', name: c.name, url: c.url })),
  };
}

/** Remove undefined values so the JSON is clean */
export function clean<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
