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
  /** Other names people search for (schema alternateName). Locals call the centre "Pac Fair". */
  alternateNames: ['Priceline Pacific Fair', 'Priceline Pac Fair', 'Priceline Pharmacy Pac Fair', 'Priceline Pharmacy Broadbeach'],
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
  faxE164: '+61755046612',
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
  /** Parking: the Orange car park sits directly under the store (Pacific Fair car park map; Jason, 13 Oct 2026) */
  parking: {
    carPark: 'Orange car park',
    gate: 'Gate 7',
    short: 'Park in the Orange car park, directly under us. Gate 7 is the closest entry, and the first 4 hours are free.',
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
  /** Quietest time to visit (Jason, 13 Oct 2026). Shown on walk-in service pages, the visit page and llms.txt. */
  quietTime: {
    short: 'Weekdays, 8am to 10am',
    sentence: 'Weekday mornings, from 8am to 10am, are usually our quietest time.',
  },

  /** Help Medical — independent GP clinic inside the store (hours per Google listing, 7 Oct 2026; confirmed by Jason 29 Oct 2026:
   * the hours on the clinic's HotDoc booking page are out of date, so don't copy them from there) */
  helpMedical: {
    name: 'Help Medical',
    fullName: 'Help Medical Pacific Fair',
    relationship: 'an independent general practice located inside our store',
    phone: '(07) 5619 3818',
    phoneHref: 'tel:+61756193818',
    websiteUrl: 'https://helpmedical.au/',
    /** Help Medical's own 'Book Appointment' button goes to HotDoc (checked 8 Oct 2026) */
    bookingUrl: 'https://www.hotdoc.com.au/medical-centres/broadbeach-QLD-4218/help-medical/doctors',
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
    /** Priceline's national store finder (for visitors who aren't on the Gold Coast) */
    storeFinder: 'https://www.priceline.com.au/store-finder/country/au',
    /** Our own store on Uber Eats (Jason, 29 Oct 2026). Query string dropped: it preset the delivery address to Pacific Fair. */
    uberEats: 'https://www.ubereats.com/au/store/priceline-pharmacy-pacific-fair/sppPOxQ6W-qoMWnRi-Dasw',
    appIos: 'https://apps.apple.com/au/app/priceline-pharmacy-app/id1440942154',
    appAndroid: 'https://play.google.com/store/apps/details?id=au.com.priceline.pricelineapp',
    simplyHearing: 'https://simplyhearing.com.au/',
    pacificFairParking:
      'https://www.pacificfair.com.au/centre-info/getting-here-parking1/car-parking',
    pacificFairStorePage: 'https://www.pacificfair.com.au/stores-services/priceline-pharmacy',
    translink: 'https://jp.translink.com.au/',
    googleBusinessProfile: 'https://maps.app.goo.gl/T8QkWoxSwHfp4RLY9',
    /** All our Google reviews: the Maps listing (CID from the GBP review emails, fid=15048147169970728717) */
    googleReviews: 'https://maps.google.com/?cid=15048147169970728717',
    /** Opens Google's write-a-review box (Jason, 29 Oct 2026). Kept low-key on purpose: one plain text link at the foot of
     *  /reviews/, never a button, and not on the homepage, header or footer. */
    googleWriteReview: 'https://g.page/r/CQ2v52EfwtXQEAE/review',
    /** Our own listings elsewhere (schema sameAs) */
    healthdirect:
      'https://www.healthdirect.gov.au/australian-health-services/20080795/priceline-pharmacy-pacific-fair/services/broadbeach-4218-hooker',
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
    /** Ahpra registration (Jason, 27 Oct 2026). Anyone can check it on the public register. */
    registration: 'PHA0001976405',
    registerUrl: 'https://www.ahpra.gov.au/Registration/Registers-of-Practitioners.aspx',
    /** Profile page: credentials, registration and every article reviewed (src/pages/about-us/jason-markey.astro) */
    profilePath: '/about-us/jason-markey/',
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

/* ---------- one-off trading days ---------- */

export type SpecialDay = { date: string; note?: string; hours: { open: string; close: string } | null };

/**
 * Christmas and New Year 2026: Pacific Fair's extended trading hours (centre memo, 8 Oct 2026), which Jason
 * confirmed the store will trade in full (13 Oct 2026). Weekdays keep the usual 8am start; public holidays use
 * the centre's hours. "24:00" = midnight; hours: null = closed. Dates are Brisbane dates (YYYY-MM-DD).
 * Past dates drop off the site automatically at the next build.
 */
export const specialHours: SpecialDay[] = [
  { date: '2026-11-27', note: 'Black Friday', hours: { open: '08:00', close: '19:00' } },
  { date: '2026-12-18', hours: { open: '08:00', close: '19:00' } },
  { date: '2026-12-19', hours: { open: '09:00', close: '19:00' } },
  { date: '2026-12-20', hours: { open: '09:00', close: '18:00' } },
  { date: '2026-12-21', hours: { open: '08:00', close: '21:00' } },
  { date: '2026-12-22', hours: { open: '08:00', close: '21:00' } },
  { date: '2026-12-23', hours: { open: '08:00', close: '24:00' } },
  { date: '2026-12-24', note: 'Christmas Eve', hours: { open: '08:00', close: '18:00' } },
  { date: '2026-12-25', note: 'Christmas Day', hours: null },
  { date: '2026-12-26', note: 'Boxing Day', hours: { open: '08:00', close: '18:00' } },
  { date: '2026-12-27', hours: { open: '09:00', close: '18:00' } },
  { date: '2026-12-28', note: 'public holiday', hours: { open: '10:00', close: '17:00' } },
  { date: '2026-12-29', hours: { open: '08:00', close: '17:30' } },
  { date: '2026-12-30', hours: { open: '08:00', close: '17:30' } },
  { date: '2026-12-31', note: 'New Year’s Eve', hours: { open: '08:00', close: '21:00' } },
  { date: '2027-01-01', note: 'New Year’s Day', hours: { open: '10:00', close: '17:00' } },
];

/**
 * Queensland public holidays (qld.gov.au, checked 16 Oct 2026) and whether the store trades.
 * Jason (16 Oct 2026): closed only on Christmas Day, Good Friday and Anzac Day; open on every other public
 * holiday, with hours that vary, so the site points people to Google or a phone call for the hours.
 * Where a date is also in specialHours (Christmas/New Year) the confirmed hours are shown instead.
 * Add next year's dates each October. Past dates drop off at the next build.
 */
export type PublicHoliday = { date: string; name: string; open: boolean };
export const publicHolidays: PublicHoliday[] = [
  { date: '2026-12-24', name: 'Christmas Eve (public holiday from 6pm)', open: true },
  { date: '2026-12-25', name: 'Christmas Day', open: false },
  { date: '2026-12-26', name: 'Boxing Day', open: true },
  { date: '2026-12-28', name: 'Boxing Day public holiday', open: true },
  { date: '2027-01-01', name: 'New Year’s Day', open: true },
  { date: '2027-01-26', name: 'Australia Day', open: true },
  { date: '2027-03-26', name: 'Good Friday', open: false },
  { date: '2027-03-27', name: 'Easter Saturday', open: true },
  { date: '2027-03-28', name: 'Easter Sunday', open: true },
  { date: '2027-03-29', name: 'Easter Monday', open: true },
  // 2027: Anzac Day is a Sunday and Queensland's public holiday moves to Monday 26 April. The holiday page
  // asks people to call about the Monday rather than guessing the store's hours.
  { date: '2027-04-25', name: 'Anzac Day', open: false },
  { date: '2027-05-03', name: 'Labour Day', open: true },
  { date: '2027-10-04', name: 'King’s Birthday', open: true },
];

/** Public holidays from today on (Brisbane), with confirmed hours where specialHours has the date */
export function upcomingPublicHolidays(now: Date = new Date()) {
  const today = brisbaneDate(now);
  return publicHolidays
    .filter((h) => h.date >= today)
    .map((h) => {
      const special = specialHours.find((s) => s.date === h.date);
      return { ...h, hours: h.open ? (special ? special.hours : undefined) : null };
    });
}

/** Facts for overseas visitors (Jason, 16 Oct 2026). Alipay isn't confirmed, so pages say to check at the counter. */
export const visitorFacts = {
  cards: 'UnionPay',
  alipay: 'check at the counter',
  language: 'Our team speaks English and is happy to use a translation app.',
  bulkOrders: 'Buying vitamins in bulk? Contact us before you visit: we may be able to offer a discount and help arrange postage.',
};

/** Today's date in Brisbane, "YYYY-MM-DD" */
export function brisbaneDate(d: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Australia/Brisbane', year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
}

/** Special trading days from today on (Brisbane), so a page built during the season only lists what's ahead */
export function upcomingSpecialHours(now: Date = new Date()): SpecialDay[] {
  const today = brisbaneDate(now);
  return specialHours.filter((s) => s.date >= today);
}

/** "2026-11-27" -> "Fri 27 Nov" (or "Friday 27 November" with long) */
export function fmtDay(date: string, long = false): string {
  const [y, m, d] = date.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d))
    .toLocaleDateString('en-AU', { weekday: long ? 'long' : 'short', day: 'numeric', month: long ? 'long' : 'short', timeZone: 'UTC' })
    .replace(',', '');
}

/** Rows for an hours card: "Fri 27 Nov (Black Friday)" / "8am – 7pm" */
export function specialRows(days: SpecialDay[]): { label: string; value: string }[] {
  return days.map((s) => ({ label: `${fmtDay(s.date)}${s.note ? ` (${s.note})` : ''}`, value: fmtRange(s.hours) }));
}

/** schema.org specialOpeningHoursSpecification (closed = 00:00–00:00; midnight close = 23:59) */
export function specialOpeningHoursSpec(days: SpecialDay[]) {
  return days.map((s) => ({
    '@type': 'OpeningHoursSpecification',
    validFrom: s.date,
    validThrough: s.date,
    opens: s.hours ? s.hours.open : '00:00',
    closes: s.hours ? (s.hours.close === '24:00' ? '23:59' : s.hours.close) : '00:00',
  }));
}

/** "17:30" -> "5:30pm"; "24:00" -> "midnight" */
export function fmtTime(t: string): string {
  if (t === '24:00') return 'midnight';
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
