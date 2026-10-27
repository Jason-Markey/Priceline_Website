/**
 * Service configuration. One entry per service page.
 * The "atAGlance" block renders at the top of every service page and feeds Service schema.
 * Keep facts verifiable — never invent prices or eligibility. Use "Ask us" when unknown.
 *
 * Fields:
 *  slug         URL path segment (must match the page file)
 *  name         Display name (used in cards, breadcrumbs, schema)
 *  short        One-line description for cards and hubs
 *  group        Which hub it belongs to
 *  icon         Optional icon key in src/assets/icons (home-page tiles)
 *  atAGlance    What it is / who it's for / cost / time / booking / how to book
 *  related      Slugs of related services for cross-links
 *  price        Numeric price for schema Offer (omit if not a fixed public price)
 */
export type Service = {
  slug: string;
  name: string;
  short: string;
  group: 'pharmacy' | 'health' | 'beauty' | 'partner';
  icon?: string;
  atAGlance: {
    what: string;
    who: string;
    cost: string;
    time?: string;
    booking: string;
    howToBook: string;
  };
  related: string[];
  price?: number;
  /** Set when `price` is charged per period, e.g. 'week' (schema: UnitPriceSpecification) */
  priceUnit?: 'week';
  /** Share image for the service page (og:image and schema): a file in src/assets/images/ */
  image?: string;
};

export const services: Service[] = [
  {
    slug: 'prescriptions',
    name: 'Prescriptions & eScripts',
    short: 'Paper scripts, eScripts, Active Script Lists, hospital, interstate and vet scripts. Send yours ahead.',
    group: 'pharmacy',
    image: 'scripts-in-counter.jpg',
    icon: 'priceline-app',
    atAGlance: {
      what: 'Dispensing of paper prescriptions, eScripts, hospital, private, interstate and veterinary prescriptions, with repeats kept on file.',
      who: 'Anyone with a valid Australian prescription, including visitors to the Gold Coast.',
      cost: 'PBS and private prices apply to the medicine. No fee for dispensing or for sending your script ahead.',
      time: 'Most scripts are ready in minutes. Send it ahead and collect when it suits you.',
      booking: 'No appointment needed.',
      howToBook: 'Email your eScript to pharmacy@pricelinepf.com.au, send it through the Priceline Pharmacy app or MedAdvisor, or bring it to the prescription counter at the back of the store.',
    },
    related: ['download-the-priceline-app', 'medication-packing', 'medication-reviews', 'help-medical'],
  },
  {
    slug: 'vaccination-information',
    name: 'Vaccinations',
    short: 'Flu, COVID-19, whooping cough, shingles, RSV, pneumococcal and travel vaccines. Walk in or book.',
    group: 'health',
    image: 'consult-room.jpg',
    icon: 'vaccinations',
    atAGlance: {
      what: 'Vaccinations given by our pharmacist immunisers in a private consultation area.',
      who: 'Adults and children aged 5 and over. Younger children can see the GPs at Help Medical inside our store.',
      cost: 'Free for eligible people under the National Immunisation Program, with no service fee. Private vaccines: you’ll see the price when you book.',
      time: 'Allow about 20 minutes, including a 15-minute wait afterwards.',
      booking: 'Walk-ins welcome every day we’re open. Booking optional.',
      howToBook: 'Book online, or scan the QR code at the counter to join the queue.',
    },
    related: ['flu-vaccination', 'whooping-cough-vaccine', 'travel-health', 'help-medical'],
  },
  {
    slug: 'flu-vaccination',
    name: 'Flu vaccination',
    short: 'Yearly flu shot, walk in or book. Free for eligible people under the NIP.',
    group: 'health',
    image: 'consult-room.jpg',
    atAGlance: {
      what: 'The seasonal influenza vaccine, given by a pharmacist immuniser.',
      who: 'Ages 5 and over. Free for people 65 and over, pregnant women, children under 5 (via Help Medical), Aboriginal and Torres Strait Islander people, and people with certain medical conditions.',
      cost: 'Free for eligible people, no service fee. Otherwise a private fee applies; you’ll see the price when you book.',
      time: 'About 20 minutes including the wait afterwards.',
      booking: 'Walk in, or book a time.',
      howToBook: 'Book online or ask at the counter.',
    },
    related: ['vaccination-information', 'whooping-cough-vaccine', 'travel-health'],
  },
  {
    slug: 'whooping-cough-vaccine',
    name: 'Whooping cough vaccine',
    short: 'Whooping cough booster for ages 5 and over, walk in or book. Free in pregnancy under the NIP.',
    group: 'health',
    image: 'consult-room.jpg',
    atAGlance: {
      what: 'The whooping cough vaccine (combined with tetanus and diphtheria), given by a pharmacist immuniser.',
      who: 'Ages 5 and over. Recommended in every pregnancy, and if your last dose was over 10 years ago for partners, grandparents and carers of babies under 6 months, adults 65 and over, and healthcare and early childhood workers.',
      cost: 'Free with no service fee in pregnancy, for catch-up doses under 20, for refugees and humanitarian entrants, and for Aboriginal and Torres Strait Islander people aged 20 and over who are due a dose (Queensland program). Otherwise a private fee applies; you’ll see the price when you book.',
      time: 'About 20 minutes including the wait afterwards.',
      booking: 'Walk in, or book a time.',
      howToBook: 'Book online or ask at the counter.',
    },
    related: ['vaccination-information', 'flu-vaccination', 'travel-health'],
  },
  {
    slug: 'travel-health',
    name: 'Travel health & vaccinations',
    short: 'Travel vaccines, a travel health kit and advice on taking your medicines overseas.',
    group: 'health',
    image: 'consult-room.jpg',
    atAGlance: {
      what: 'Travel vaccines (hepatitis A and B, typhoid, cholera, Japanese encephalitis, meningococcal, MMR, flu, whooping cough) plus travel health advice and kits.',
      who: 'Anyone aged 5 and over heading overseas. Ideally 6 to 8 weeks before you fly.',
      cost: 'Most travel vaccines are private; you’ll see prices when you book.',
      time: 'Allow 20 to 30 minutes.',
      booking: 'Walk in or book.',
      howToBook: 'Book online or ask at the counter.',
    },
    related: ['vaccination-information', 'passport-photos', 'prescriptions'],
  },
  {
    slug: 'medication-packing',
    name: 'Medication packing (Webster packs)',
    short: 'Your medicines sorted by day and time in weekly blister packs.',
    group: 'pharmacy',
    image: 'dispensary.jpg',
    icon: 'medication-packing',
    atAGlance: {
      what: 'Weekly blister packs with each dose labelled by day and time, checked by a pharmacist.',
      who: 'People taking several medicines, anyone who forgets doses, and carers managing someone else’s medicines.',
      cost: 'Free for concession and health care card holders. $5 a week otherwise.',
      booking: 'No appointment needed.',
      howToBook: 'Call, email us or ask at the prescription counter.',
    },
    related: ['medication-reviews', 'prescriptions'],
    price: 5,
    priceUnit: 'week',
  },
  {
    slug: 'medication-reviews',
    name: 'Medication reviews',
    short: 'A free one-on-one check of all your medicines with a pharmacist.',
    group: 'pharmacy',
    image: 'dispensary.jpg',
    icon: 'medication-reviews',
    atAGlance: {
      what: 'A one-on-one conversation with a pharmacist about everything you take, including vitamins and over-the-counter products.',
      who: 'People taking five or more medicines, anyone recently home from hospital, or anyone unsure about a medicine.',
      cost: 'Free for Medicare card holders.',
      time: 'About 20 to 30 minutes.',
      booking: 'No booking needed.',
      howToBook: 'Ask one of our pharmacists.',
    },
    related: ['medication-packing', 'health-station', 'help-medical'],
  },
  {
    slug: 'health-station',
    name: 'Free health checks',
    short: 'Free blood pressure, heart rate, weight, BMI, body fat and diabetes risk checks, by SiSU Health.',
    group: 'pharmacy',
    image: 'health-check-kiosk.jpg',
    icon: 'health-station',
    atAGlance: {
      what: 'Self-service health checks inside the store, provided by SiSU Health, including the Shane Warne Legacy Health Check, with a pharmacist nearby to explain results.',
      who: 'Anyone. Worth checking each time you fill a script.',
      cost: 'Free.',
      time: 'About 4 minutes.',
      booking: 'No appointment needed.',
      howToBook: 'Just come in during opening hours.',
    },
    related: ['weight-loss-counselling-and-advice', 'national-diabetes-services-scheme', 'medication-reviews'],
  },
  {
    slug: 'national-diabetes-services-scheme',
    name: 'Diabetes & NDSS',
    short: 'NDSS access point for subsidised diabetes supplies, with pharmacist advice.',
    group: 'pharmacy',
    image: 'dispensary.jpg',
    icon: 'diabetes',
    atAGlance: {
      what: 'Collection of subsidised NDSS supplies (test strips, pen needles, pump consumables, glucose monitoring products) and advice on managing diabetes.',
      who: 'People registered with the NDSS. The GPs at Help Medical can help you register.',
      cost: 'NDSS subsidised prices apply.',
      booking: 'No appointment needed.',
      howToBook: 'Show your NDSS card or number at the counter.',
    },
    related: ['health-station', 'prescriptions', 'help-medical'],
  },
  {
    slug: 'weight-loss-counselling-and-advice',
    name: 'Weight management support',
    short: 'Free, private one-on-one support from our pharmacists.',
    group: 'pharmacy',
    image: 'weight-management-shelves.jpg',
    atAGlance: {
      what: 'Private conversations, free health checks and practical advice, including support if your doctor has prescribed a medicine for weight management.',
      who: 'Anyone who wants support managing their weight.',
      cost: 'Free.',
      booking: 'No booking needed.',
      howToBook: 'Ask at the counter.',
    },
    related: ['health-station', 'help-medical'],
  },
  {
    slug: 'delivery',
    name: 'Delivery',
    short: 'Health and beauty products delivered across the Gold Coast via Uber Eats.',
    group: 'pharmacy',
    image: 'shopfront.jpg',
    atAGlance: {
      what: 'Everyday health, beauty and wellbeing products delivered through Uber Eats.',
      who: 'Anyone on the Gold Coast. Prescription medicines can’t be delivered this way.',
      cost: 'Uber Eats delivery fees apply.',
      booking: 'Order any time.',
      howToBook: 'Open the Uber Eats app and search for Priceline Pharmacy Pacific Fair.',
    },
    related: ['click-and-collect', 'prescriptions'],
  },
  {
    slug: 'click-and-collect',
    name: 'Click & Collect',
    short: 'Shop online at priceline.com.au and collect from us, usually within 15 minutes.',
    group: 'pharmacy',
    image: 'checkout-counter.jpg',
    atAGlance: {
      what: 'Order from the full Priceline range online and collect in store.',
      who: 'Anyone. Prescription medicines are not available this way.',
      cost: 'No delivery fee.',
      time: 'Usually ready within 15 minutes; within 2 hours at the latest when everything is in stock. Held for up to 14 days.',
      booking: 'Order any time.',
      howToBook: 'Choose Priceline Pacific Fair at checkout on priceline.com.au, then bring your order confirmation and photo ID.',
    },
    related: ['delivery'],
  },
  {
    slug: 'download-the-priceline-app',
    name: 'Priceline Pharmacy app',
    short: 'Order scripts ahead, get reminders and manage your Pulse Rewards.',
    group: 'pharmacy',
    image: 'dispensary.jpg',
    icon: 'priceline-app',
    atAGlance: {
      what: 'The Priceline Pharmacy app for ordering prescriptions ahead, eScript reminders and rewards.',
      who: 'Anyone with an iPhone or Android phone.',
      cost: 'Free.',
      booking: 'Not needed.',
      howToBook: 'Download the app and choose Priceline Pharmacy Pacific Fair as your store.',
    },
    related: ['prescriptions'],
  },
  {
    slug: 'hormonal-contraceptive-pill',
    name: 'Contraception consultations',
    short: 'Start, change or continue the pill, ring or injection with a trained pharmacist. $35.',
    group: 'health',
    image: 'consult-room.jpg',
    atAGlance: {
      what: 'A private consultation with a trained pharmacist who can prescribe the pill, vaginal ring or contraceptive injection under the Queensland pharmacy service.',
      who: 'Women aged 16 and over who want to start, restart, change or continue their contraception.',
      cost: '$35 consultation. Your contraception is charged separately; ask us about the cost of your option.',
      time: '10 to 20 minutes.',
      booking: 'Please call first; trained pharmacists are usually available Monday to Friday.',
      howToBook: 'Call us to book.',
    },
    related: ['womens-health', 'uti-treatment', 'emergency-contraception', 'help-medical'],
    price: 35,
  },
  {
    slug: 'uti-treatment',
    name: 'UTI treatment',
    short: 'Assessment and treatment for uncomplicated bladder infections, women 18 to 65.',
    group: 'health',
    image: 'consult-room.jpg',
    atAGlance: {
      what: 'A private assessment by a trained pharmacist who can supply treatment for an uncomplicated urinary tract infection if suitable.',
      who: 'Women aged 18 to 65 with symptoms of an uncomplicated bladder infection.',
      cost: 'One fee covers the consultation and any treatment, if suitable. It isn’t covered by Medicare; ask us when you call.',
      time: 'About 15 minutes.',
      booking: 'No booking needed. Walk in.',
      howToBook: 'Come in and ask for a trained pharmacist at the prescription counter.'
    },
    related: ['womens-health', 'hormonal-contraceptive-pill', 'help-medical'],
  },
  {
    slug: 'sick-leave-certificates',
    name: 'Sick leave certificates',
    short: 'Absence from work certificates for minor, short-term illnesses, after a private chat with a pharmacist.',
    group: 'health',
    image: 'consult-room.jpg',
    atAGlance: {
      what: 'A certificate for a short absence from work because of a minor illness, or to care for someone who is unwell, issued by a pharmacist after a private consultation.',
      who: 'People with a minor, short-term illness that a pharmacist can assess. For carer’s leave, the person who is unwell needs to come in too.',
      cost: 'A consultation fee applies. Ask us in store.',
      booking: 'No booking needed. Walk in on the day you’re unwell.',
      howToBook: 'Come in and ask for a pharmacist at the prescription counter. Bring photo ID.',
    },
    related: ['help-medical', 'uti-treatment', 'prescriptions'],
  },
  {
    slug: 'emergency-contraception',
    name: 'Emergency contraception',
    short: 'No appointment or consultation fee. Fill in a short questionnaire and you only pay for the pill.',
    group: 'health',
    image: 'scripts-in-counter.jpg',
    atAGlance: {
      what: 'The emergency contraceptive pill (the morning-after pill), supplied by a pharmacist if it’s suitable after you fill in a short private questionnaire.',
      who: 'Anyone who needs it. The sooner the better.',
      cost: 'No consultation fee. You only pay for the pill.',
      time: 'A few minutes.',
      booking: 'No appointment needed.',
      howToBook: 'Ask at the counter for the questionnaire.',
    },
    related: ['hormonal-contraceptive-pill', 'womens-health'],
  },
  {
    slug: 'womens-health',
    name: "Women's health",
    short: 'Contraception, UTI treatment, pregnancy, periods and menopause support from our pharmacists.',
    group: 'health',
    image: 'consult-room.jpg',
    atAGlance: {
      what: 'Pharmacist support for contraception, UTIs, pregnancy supplements and vaccines, periods, menopause and everyday health, in a private consultation room.',
      who: 'Women of all ages.',
      cost: 'Advice is free. Some consultations have a fee (see each service).',
      booking: 'Most things need no appointment.',
      howToBook: 'Ask at the counter, or call first for a contraception consultation.',
    },
    related: ['hormonal-contraceptive-pill', 'uti-treatment', 'emergency-contraception', 'vaccination-information'],
  },
  {
    slug: 'quit-smoking',
    name: 'Quit smoking',
    short: 'Help choosing quit options, making a plan and staying on track.',
    group: 'health',
    image: 'nicotine-replacement-shelf.jpg',
    atAGlance: {
      what: 'A conversation with a pharmacist about the quit-smoking options available, help making a plan, and referral to your GP or Quitline for extra support.',
      who: 'Anyone who wants to quit.',
      cost: 'Advice is free. Products are charged separately.',
      booking: 'No appointment needed.',
      howToBook: 'Ask at the counter.',
    },
    related: ['help-medical', 'health-station'],
  },
  {
    slug: 'passport-photos',
    name: 'Passport & visa photos',
    short: 'Australian and overseas passport and visa photos while you wait. $25.',
    group: 'beauty',
    image: 'shopfront.jpg',
    atAGlance: {
      what: 'Passport and visa photos taken in store and printed while you wait, with digital copies.',
      who: 'Ages 5 and over. Australian and overseas formats.',
      cost: '$25.',
      time: 'About 10 minutes.',
      booking: 'No appointment needed.',
      howToBook: 'Come in any time during opening hours.',
    },
    related: ['travel-health'],
    price: 25,
  },
  {
    slug: 'ear-piercings',
    name: 'Ear piercing',
    short: 'Both ears, with earrings and antiseptic spray included. $65, walk in.',
    group: 'beauty',
    image: 'ear-piercing.jpg',
    atAGlance: {
      what: 'Ear piercing for both ears, including second holes in the earlobe, with a hygienic single-use system. Your earrings, an antiseptic aftercare spray and a consultation are included.',
      who: 'Ages 8 and over. Under-16s need a parent or guardian with them.',
      cost: '$65 for both ears, including earrings and an antiseptic aftercare spray.',
      time: 'About 15 minutes.',
      booking: 'Walk in.',
      howToBook: 'Come in during opening hours.',
    },
    related: ['skincare-tanning'],
    price: 65,
  },
  {
    slug: 'skincare-tanning',
    name: 'Skincare & self-tan',
    short: 'Free advice from trained beauty advisors, and brands that suit the Gold Coast climate.',
    group: 'beauty',
    image: 'skincare-aisle.jpg',
    icon: 'cosmetics',
    atAGlance: {
      what: 'Skincare, sun care and self-tan ranges with free advice from trained beauty advisors.',
      who: 'Anyone building a routine for sensitive, dry, oily, ageing or sun-exposed skin.',
      cost: 'Advice is free.',
      booking: 'No booking needed.',
      howToBook: 'Come in and ask a beauty advisor.',
    },
    related: ['beauty-fragrance', 'vitamins-supplements'],
  },
  {
    slug: 'beauty-fragrance',
    name: 'Makeup & fragrance',
    short: 'Makeup, fragrance, dental care and men’s grooming with help from our beauty team.',
    group: 'beauty',
    image: 'beauty-aisle.jpg',
    atAGlance: {
      what: 'Makeup, fragrance, dental and personal care ranges with help choosing shades, scents and gifts.',
      who: 'Anyone.',
      cost: 'Advice is free.',
      booking: 'No booking needed.',
      howToBook: 'Come in and ask a beauty advisor.',
    },
    related: ['skincare-tanning', 'delivery'],
  },
  {
    slug: 'fragrance',
    name: 'Perfume & fragrance gifts',
    short: 'Designer and celebrity fragrance with testers in store, and free help choosing a scent or gift.',
    group: 'beauty',
    atAGlance: {
      what: 'Designer and celebrity fragrance for women and men, with testers in store and help choosing a scent or a gift.',
      who: 'Anyone, including gift shoppers who aren’t sure what to buy.',
      cost: 'Advice is free. Prices depend on the brand and size.',
      booking: 'No booking needed.',
      howToBook: 'Come in any day we’re open and ask a beauty advisor.',
    },
    related: ['beauty-fragrance', 'click-and-collect', 'skincare-tanning'],
  },
  {
    slug: 'vitamins-supplements',
    name: 'Vitamins & supplements',
    short: 'Everyday and practitioner ranges, checked against your medicines by a pharmacist.',
    group: 'beauty',
    image: 'vitamins-aisle.jpg',
    atAGlance: {
      what: 'Vitamins, minerals, probiotics, pregnancy and children’s supplements and practitioner ranges, with a pharmacist to check them against your medicines.',
      who: 'Anyone. Especially worth asking if you take prescription medicines.',
      cost: 'Advice is free.',
      booking: 'No booking needed.',
      howToBook: 'Ask a pharmacist before you buy.',
    },
    related: ['metagenics-vitamins', 'skincare-tanning'],
  },
  {
    slug: 'metagenics-vitamins',
    name: 'Metagenics',
    short: 'Practitioner-range supplements in stock or ordered in, with pharmacist advice.',
    group: 'beauty',
    image: 'vitamins-aisle.jpg',
    atAGlance: {
      what: 'A selection of Metagenics practitioner products on the shelf, with anything else from the range special-ordered.',
      who: 'People recommended a practitioner supplement by a health professional.',
      cost: 'Product prices apply.',
      booking: 'No booking needed.',
      howToBook: 'Ask in store or call to order.',
    },
    related: ['vitamins-supplements'],
  },
  {
    slug: 'help-medical',
    name: 'Help Medical GPs',
    short: 'An independent general practice located inside our store. Bulk billing for everyone with a Medicare card, QML pathology collection, walk-ins welcome.',
    group: 'partner',
    image: 'help-medical-reception.jpg',
    icon: 'doctor',
    atAGlance: {
      what: 'An independent general practice located inside Priceline Pharmacy Pacific Fair, with a QML Pathology collection room.',
      who: 'Everyone, including visitors without Medicare (a private fee applies).',
      cost: 'Bulk billed for everyone with a Medicare card. Patients without Medicare, such as overseas visitors, pay a private fee.',
      booking: 'Walk-ins welcome, subject to doctor availability. Booking ahead is the surest way to be seen.',
      howToBook: 'Book at helpmedical.au or call Help Medical.',
    },
    related: ['blood-tests', 'prescriptions', 'sick-leave-certificates', 'vaccination-information'],
  },
  {
    slug: 'blood-tests',
    name: 'Blood tests (QML Pathology)',
    short: 'QML Pathology collection room inside Help Medical, in our store. Walk in with your request form, weekday mornings.',
    group: 'partner',
    image: 'store-entrance-qml.jpg',
    atAGlance: {
      what: 'Blood and other pathology tests collected by QML Pathology, in a collection room inside Help Medical, an independent general practice located inside our store.',
      who: 'Anyone with a pathology request form, usually from a doctor, paper or electronic.',
      cost: 'Set by QML. Concession card holders are bulk billed for Medicare-covered tests; some tests cost extra.',
      time: 'Monday to Friday, 8am to 1pm. Closed weekends.',
      booking: 'Walk in for most tests. Glucose tolerance tests must be booked with QML.',
      howToBook: 'Walk in with your request form and Medicare card, or book online with QML (Broadbeach, K150).',
    },
    related: ['help-medical', 'prescriptions'],
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const servicesInGroup = (group: Service['group']) => services.filter((s) => s.group === group);
