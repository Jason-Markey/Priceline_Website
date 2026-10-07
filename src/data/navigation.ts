/**
 * Site navigation. Edit here to change menus everywhere (header, mobile drawer, footer).
 * Paths must match the page files in src/pages. Keep trailing slashes.
 */
export type NavItem = { label: string; href: string; external?: boolean; badge?: string };
export type NavGroup = { label: string; href: string; items?: NavItem[] };

export const primaryNav: NavGroup[] = [
  {
    label: 'Pharmacy',
    href: '/pharmacy-services/',
    items: [
      { label: 'Prescriptions & eScripts', href: '/prescriptions/' },
      { label: 'Priceline Pharmacy app', href: '/download-the-priceline-app/' },
      { label: 'Medication packing', href: '/medication-packing/' },
      { label: 'Medication reviews', href: '/medication-reviews/' },
      { label: 'Diabetes & NDSS', href: '/national-diabetes-services-scheme/' },
      { label: 'Health Station checks', href: '/health-station/' },
      { label: 'Weight management support', href: '/weight-loss-counselling-and-advice/' },
      { label: 'Delivery', href: '/delivery/' },
      { label: 'Click & Collect', href: '/click-and-collect/' },
    ],
  },
  {
    label: 'Vaccinations & health',
    href: '/vaccination-information/',
    items: [
      { label: 'Vaccinations', href: '/vaccination-information/' },
      { label: 'Flu vaccination', href: '/flu-vaccination/' },
      { label: 'Travel health & vaccines', href: '/travel-health/' },
      { label: "Women's health", href: '/womens-health/' },
      { label: 'Contraception consultations', href: '/hormonal-contraceptive-pill/' },
      { label: 'UTI treatment', href: '/uti-treatment/' },
      { label: 'Emergency contraception', href: '/emergency-contraception/' },
      { label: 'Quit smoking', href: '/quit-smoking/' },
    ],
  },
  {
    label: 'Beauty & everyday',
    href: '/beauty-fragrance/',
    items: [
      { label: 'Skincare & self-tan', href: '/skincare-tanning/' },
      { label: 'Makeup & fragrance', href: '/beauty-fragrance/' },
      { label: 'Vitamins & supplements', href: '/vitamins-supplements/' },
      { label: 'Metagenics', href: '/metagenics-vitamins/' },
      { label: 'Passport & visa photos', href: '/passport-photos/' },
      { label: 'Ear piercing', href: '/ear-piercings/' },
    ],
  },
  // "doctors" not "GPs": the desktop nav is uppercase, which would render "GPS"
  { label: 'Help Medical doctors', href: '/help-medical/' },
  {
    label: 'Advice',
    href: '/health-blog/',
    items: [
      { label: 'Health advice', href: '/category/health-advice/' },
      { label: 'Skincare & beauty', href: '/category/skincare-beauty/' },
      { label: 'Common illnesses A–Z', href: '/common-illness-information/' },
      { label: 'FAQs', href: '/frequently-asked-questions/' },
      { label: 'Visiting the Gold Coast?', href: '/visiting-the-gold-coast/' },
    ],
  },
  { label: 'About', href: '/about-us/' },
  {
    label: 'Visit',
    href: '/visit-us/',
    items: [
      { label: 'Opening hours & directions', href: '/visit-us/' },
      { label: 'Contact us', href: '/contact-us/' },
      { label: 'Appointments', href: '/appointments/' },
    ],
  },
];

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: 'Pharmacy',
    items: [
      { label: 'Prescriptions & eScripts', href: '/prescriptions/' },
      { label: 'Vaccinations', href: '/vaccination-information/' },
      { label: 'Flu vaccination', href: '/flu-vaccination/' },
      { label: 'Travel health', href: '/travel-health/' },
      { label: 'Medication packing', href: '/medication-packing/' },
      { label: 'Pharmacy services', href: '/pharmacy-services/' },
      { label: 'Book an appointment', href: '/appointments/' },
    ],
  },
  {
    heading: 'Health & beauty',
    items: [
      { label: 'Skincare & self-tan', href: '/skincare-tanning/' },
      { label: 'Makeup & fragrance', href: '/beauty-fragrance/' },
      { label: 'Vitamins & supplements', href: '/vitamins-supplements/' },
      { label: "Women's health", href: '/womens-health/' },
      { label: 'Help Medical GPs', href: '/help-medical/' },
      { label: 'Health & beauty advice', href: '/health-blog/' },
      { label: 'FAQs', href: '/frequently-asked-questions/' },
    ],
  },
];

export const legalNav: NavItem[] = [
  { label: 'Privacy policy', href: '/privacy-policy/' },
  { label: 'Terms & conditions', href: '/terms-and-conditions/' },
];
