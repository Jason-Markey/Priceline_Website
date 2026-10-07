/**
 * SINGLE SOURCE OF TRUTH for business facts.
 * Everything here feeds the header, footer, Visit/Contact pages, every NAP block
 * and the JSON-LD schema. Change a fact here and it changes everywhere.
 *
 * Hours use 24-hour "HH:MM" strings. Day keys: mon tue wed thu fri sat sun.
 * To close on a day, set it to null.
 */

export type DayKey = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
export type Hours = Record<DayKey, { open: string; close: string } | null>;

export const site = {
  name: 'Priceline Pharmacy Pacific Fair',
  shortName: 'Priceline Pacific Fair',
  legalName: 'Markey Pharmacies Pty Ltd',
  url: 'https://pricelinepacificfair.com.au',
  tagline: 'Your local pharmacy at Pacific Fair, Broadbeach',
  description:
    'An independently owned Priceline Pharmacy franchise store on the ground floor of Pacific Fair Shopping Centre, Broadbeach, open 7 days. Scripts ready in minutes, walk-in vaccinations, pharmacist consultations and beauty advice, with the GPs of Help Medical, an independent general practice located inside our store.',
  foundingDate: '2009-08-27',
  ownerSince: '2023-12',

  phone: '(07) 5592 2099',
  phoneHref: 'tel:+61755922099',
  phoneE164: '+61755922099',
  fax: '(07) 5504 6612',
  emailGeneral: 'info@pricelinepf.com.au',
  emailPharmacy: 'pharmacy@pricelinepf.com.au',

  address: {
    shop: 'Shop 81',
    building: 'Pacific Fair Shopping Centre',
    street: '2/30 Hooker Boulevard',
    suburb: 'Broadbeach',
    state: 'QLD',
    postcode: '4218',
    country: 'AU',
    /** One-line version used in NAP blocks */
    oneLine: 'Shop 81, Pacific Fair Shopping Centre, Hooker Blvd, Broadbeach QLD 4218',
    floor: 'Ground floor, north-eastern side of the centre',
    landmarks: 'Next to Proud Smile, near the outdoor entrance from the river',
  },
  geo: { latitude: -28.03579, longitude: 153.42985 },
  mapsUrl: 'https://maps.app.goo.gl/T8QkWoxSwHfp4RLY9',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Priceline+Pharmacy+Pacific+Fair,+Shop+81,+Pacific+Fair+Shopping+Centre,+Broadbeach+QLD+4218',

  /** Pharmacy trading hours (confirmed by Jason 7 Oct 2026; matches GBP) */
  hours: {
    mon: { open: '08:00', close: '17:30' },
    tue: { open: '08:00', close: '17:30' },
    wed: { open: '08:00', close: '17:30' },
    thu: { open: '08:00', close: '21:00' },
    fri: { open: '08:00', close: '17:30' },
    sat: { open: '09:00', close: '17:30' },
    sun: { open: '09:30', close: '16:30' },
  } as Hours,
  hoursNote:
    'Public holiday hours are updated on our Google listing. Search "Priceline Pharmacy Pacific Fair" to check before you visit.',

  /** Help Medical — independent GP clinic inside the store (hours per Google listing, 7 Oct 2026) */
  helpMedical: {
    name: 'Help Medical',
    fullName: 'Help Medical Pacific Fair',
    relationship: 'an independent general practice located inside our store',
    phone: '(07) 5619 3818',
    phoneHref: 'tel:+61756193818',
    bookingUrl: 'https://helpmedical.au/',
    hotdocUrl: 'https://www.hotdoc.com.au/medical-centres/broadbeach-QLD-4218/help-medical/doctors',
    hours: {
      mon: { open: '08:00', close: '17:00' },
      tue: { open: '08:00', close: '17:00' },
      wed: { open: '08:00', close: '17:00' },
      thu: { open: '08:00', close: '21:00' },
      fri: { open: '08:00', close: '17:00' },
      sat: { open: '09:30', close: '16:00' },
      sun: { open: '09:30', close: '16:00' },
    } as Hours,
    whereInStore: 'On the right-hand side as you walk into the store',
  },

  /** QML Pathology collection room inside Help Medical (qml.com.au, 7 Oct 2026) */
  pathology: {
    name: 'QML Pathology',
    phone: '(07) 2146 3500',
    phoneHref: 'tel:+61721463500',
    url: 'https://www.qml.com.au/locations/broadbeach-k150',
    hoursText: 'Monday to Friday, 8:00am – 1:00pm. Closed weekends.',
    hours: {
      mon: { open: '08:00', close: '13:00' },
      tue: { open: '08:00', close: '13:00' },
      wed: { open: '08:00', close: '13:00' },
      thu: { open: '08:00', close: '13:00' },
      fri: { open: '08:00', close: '13:00' },
      sat: null,
      sun: null,
    } as Hours,
  },

  /** Google Analytics 4 measurement ID (property "pricelinepacificfair.com.au", account under info@, created 7 Oct 2026) */
  ga4MeasurementId: 'G-S6KES0Q8YC',

  /** Booking and external links */
  links: {
    /** Primary booking system for the website (Jason's decision, 7 Oct 2026) */
    book: 'https://app.medadvisor.com.au/Network/PRICELINEPHARMACYPACIFICFAIR',
    /** Fallbacks — same pharmacy, HealthEngine calendar. Not used on pages. */
    bookPriceline: 'https://servicebookings.priceline.com.au/v2/appointment/book_webplugin/54055',
    bookHealthEngine:
      'https://healthengine.com.au/pharmacy/qld/broadbeach/priceline-pharmacy-pacific-fair/s54055',
    pricelineShop: 'https://www.priceline.com.au',
    pricelineNational: 'https://www.priceline.com.au',
    uberEats: 'https://www.ubereats.com/au/brand/priceline',
    appIos: 'https://apps.apple.com/au/app/priceline-pharmacy-app/id1440942154',
    appAndroid: 'https://play.google.com/store/apps/details?id=au.com.priceline.pricelineapp',
    simplyHearing: 'https://simplyhearing.com.au/',
    pacificFairParking:
      'https://www.pacificfair.com.au/centre-info/getting-here-parking1/car-parking',
    pacificFairStorePage: 'https://www.pacificfair.com.au/stores-services/priceline-pharmacy',
    translink: 'https://jp.translink.com.au/',
    googleBusinessProfile: 'https://maps.app.goo.gl/T8QkWoxSwHfp4RLY9',
  },

  social: {
    facebook: 'https://www.facebook.com/PricelineAU',
    instagram: 'https://www.instagram.com/pricelinepf/',
  },

  /** Owner / reviewing pharmacist for E-E-A-T and Article schema */
  reviewer: {
    name: 'Jason Markey',
    role: 'Owner and Pharmacist',
    credentials: 'BPharmSci, MPharm',
    credentialList: ['Bachelor of Pharmaceutical Science', 'Master of Pharmacy'],
    bio: 'Jason bought Priceline Pharmacy Pacific Fair in December 2023, bringing his career full circle: this is the store where he first trained. He completed his Master of Pharmacy at Griffith University, finished his internship in 2015, and spent five years with Priceline before working as a locum pharmacist across North Queensland.',
  },
} as const;

/* ---------- helpers ---------- */

export const dayNames: Record<DayKey, string> = {
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
  sun: 'Sunday',
};
export const dayOrder: DayKey[] = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

/** "17:30" -> "5:30pm" */
export function fmtTime(t: string): string {
  const [h, m] = t.split(':').map(Number);
  const suffix = h >= 12 ? 'pm' : 'am';
  const hh = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hh}${suffix}` : `${hh}:${String(m).padStart(2, '0')}${suffix}`;
}

export function fmtRange(d: { open: string; close: string } | null): string {
  return d ? `${fmtTime(d.open)} – ${fmtTime(d.close)}` : 'Closed';
}

/** Rows for a hours table, merging consecutive identical days ("Monday to Wednesday") */
export function hoursRows(hours: Hours): { label: string; value: string }[] {
  const rows: { label: string; value: string; days: DayKey[] }[] = [];
  for (const d of dayOrder) {
    const v = fmtRange(hours[d]);
    const last = rows[rows.length - 1];
    if (last && last.value === v) {
      last.days.push(d);
    } else {
      rows.push({ label: dayNames[d], value: v, days: [d] });
    }
  }
  return rows.map((r) => ({
    label:
      r.days.length === 1
        ? dayNames[r.days[0]]
        : r.days.length === 2
          ? `${dayNames[r.days[0]]} and ${dayNames[r.days[1]]}`
          : `${dayNames[r.days[0]]} to ${dayNames[r.days[r.days.length - 1]]}`,
    value: r.value,
  }));
}

/** schema.org OpeningHoursSpecification array */
export function openingHoursSpec(hours: Hours) {
  const map: Record<DayKey, string> = {
    mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday',
  };
  return dayOrder
    .filter((d) => hours[d])
    .map((d) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: map[d],
      opens: hours[d]!.open,
      closes: hours[d]!.close,
    }));
}
