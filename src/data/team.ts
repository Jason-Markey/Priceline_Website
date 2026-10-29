/**
 * Team members shown on the About page and used for author/reviewer panels.
 * Photos: put the file in src/assets/images and reference it by filename (or omit).
 */
export type TeamMember = {
  name: string;
  role: string;
  credentials?: string;
  bio: string;
  photo?: string;
  reviewsArticles?: boolean;
  /** Languages spoken, as listed by the practice */
  languages?: string[];
};

export const pharmacyTeam: TeamMember[] = [
  {
    name: 'Jason Markey',
    role: 'Owner and Pharmacist',
    credentials: 'BPharmSci, MPharm',
    photo: 'jason-pharmacist-portrait.jpg',
    reviewsArticles: true,
    bio: 'Jason bought Priceline Pharmacy Pacific Fair in December 2023, bringing his career full circle: this is the store where he first trained. He completed his Master of Pharmacy at Griffith University, finished his internship in 2015, and spent five years with Priceline before working as a locum pharmacist across North Queensland. That experience of seeing what works, and what doesn’t, in many different pharmacies shapes how the store runs today. Jason also reviews the health articles on our website.',
  },
  {
    name: 'Chelsea Morey',
    role: 'Dispensary Manager',
    bio: 'Chelsea has worked in pharmacies across the Gold Coast and brings strong organisational skills to our dispensary, making sure every prescription is handled accurately and efficiently.',
  },
  {
    name: 'Ben Wilson',
    role: 'Store Manager',
    bio: 'Ben has been part of Priceline Pharmacy Pacific Fair since it opened in 2009. With deep experience in retail and management, and a keen interest in technology, he keeps the store running smoothly and has led many of the improvements customers notice.',
  },
];

/** Help Medical doctors (independent practice inside the store). Details from the clinic's HotDoc booking page
 * (Jason's screenshots, 29 Oct 2026), with the clinic's permission. */
export const helpMedicalDoctors: TeamMember[] = [
  {
    name: 'Dr David Seton',
    role: 'General Practitioner',
    credentials: 'MBBS, FRACGP',
    photo: 'dr-dave-seton.jpg',
    languages: ['English', 'Afrikaans'],
    bio: 'Dr David (Dave) Seton has practised medicine for more than 24 years. He studied medicine at the University of the Witwatersrand and is a Fellow of the Royal Australian College of General Practitioners. He has a special interest in children’s health, skin checks, pregnancy care and mental health, and performs IUD insertions and other minor procedures. He has trained hundreds of doctors in inserting long-acting contraceptive devices.',
  },
  {
    name: 'Dr Robert Seton',
    role: 'General Practitioner',
    credentials: 'MBChB, FRACGP, FACRRM, FPAA',
    photo: 'dr-robert-seton.png',
    languages: ['English', 'Afrikaans'],
    bio: 'Dr Robert Seton brings more than 40 years of experience in general practice, including 36 years of delivering babies, and holds an FPAA certificate in sexual and reproductive health. He joined his brother, Dr David Seton, at Help Medical, and both have a keen interest in teaching and training young doctors. Outside work, he enjoys watching golf and tennis.',
  },
  {
    name: 'Dr Md Tariqul Islam',
    role: 'General Practitioner',
    credentials: 'MBBS, FRACGP, AMC, ECFMG (USA), DPH (NZ)',
    photo: 'dr-tariqul-islam.avif',
    languages: ['Bengali', 'English', 'Hindi', 'Urdu'],
    bio: 'Dr Md Tariqul Islam has a strong interest in general practice, medical education and multidisciplinary care. His background includes paediatrics, obstetrics and gynaecology, psychiatry and emergency medicine, and he teaches and supervises medical students and GP registrars. His areas of interest include family medicine, women’s and men’s health, children’s health, mental health, skin cancer checks, chronic disease management, travel medicine, occupational and drivers’ medicals, and minor procedures.',
  },
];
