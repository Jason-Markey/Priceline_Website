/**
 * `title` overrides the default page title of "<name> advice" where that would read badly.
 * `image` is the share image (og:image and schema) for the category's articles: a file in src/assets/images/.
 * An article can name its own with `image:` in its front-matter.
 */
export const categories: Record<string, { name: string; description: string; title?: string; image: string }> = {
  'health-advice': { name: 'Health advice', image: 'scripts-in-counter.jpg', title: 'Everyday health advice', description: 'Plain-English pharmacist advice on common conditions, first aid and seasonal health on the Gold Coast, reviewed by our pharmacist at Pacific Fair.' },
  'skincare-beauty': { name: 'Skincare & beauty', image: 'beauty-aisle.jpg', description: 'Skincare, sunscreen, self-tan, makeup, fragrance and beauty tools advice from the beauty team and pharmacists at Priceline Pharmacy Pacific Fair, Broadbeach.' },
  'local-guides': { name: 'Local guides', image: 'shopfront.jpg', title: 'Gold Coast local guides', description: 'Finding us at Pacific Fair, what to do if you need a pharmacy or doctor while visiting the Gold Coast, and useful healthcare options nearby in Broadbeach.' },
  'prescriptions': { name: 'Prescriptions & medicines', image: 'prescriptions-and-advice.jpg', description: 'Plain-English guides to eScripts, Active Script Lists, repeats, medication packing and managing medicines for yourself or someone you care for.' },
  'vaccinations': { name: 'Vaccinations', image: 'team-pacific-fair.jpg', title: 'Vaccination advice', description: 'Flu, whooping cough, shingles, COVID-19 and travel vaccines explained by our Pacific Fair pharmacist immunisers: who\'s eligible, when to book, what to expect.' },
  'travel': { name: 'Travel health', image: 'team-pacific-fair.jpg', description: 'Preparing for overseas travel from the Gold Coast: which vaccines you need, when to start, travelling with medicines and what to pack in a travel health kit.' },
  'vitamins-supplements': { name: 'Vitamins & supplements', image: 'vitamins-aisle.jpg', description: 'What the evidence says about vitamin D, magnesium, probiotics and more, which supplements interact with medicines, and when to ask our Pacific Fair pharmacists.' },
  'dental-oral-care': { name: 'Dental & oral care', image: 'prescriptions-and-advice.jpg', description: 'Toothbrushes, teeth whitening, dry mouth, mouth ulcers and everyday oral care advice from the pharmacists at Priceline Pharmacy Pacific Fair, Broadbeach.' },
  'baby-child': { name: 'Baby & child', image: 'scripts-in-counter.jpg', title: 'Baby & child health advice', description: 'Practical, pharmacist-reviewed advice for Gold Coast parents: pain relief doses, gastro, threadworms and keeping babies safe in the sun.' },
  'haircare': { name: 'Hair & scalp', image: 'beauty-aisle.jpg', description: 'Hair and scalp advice from our Broadbeach pharmacists: dandruff, head lice, hair loss after pregnancy and caring for hair in Gold Coast sun, salt and humidity.' },
};
