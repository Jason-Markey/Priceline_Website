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

/** Help Medical doctors (independent practice inside the store) */
export const helpMedicalDoctors: TeamMember[] = [
  {
    name: 'Dr Dave Seton',
    role: 'General Practitioner',
    photo: 'dr-dave-seton.jpg',
    bio: 'Dr Dave Seton performs IUD insertions and other minor procedures, and has a keen interest in teaching. He has trained many doctors in the insertion of long-acting contraceptive devices.',
  },
  {
    name: 'Dr Robert Seton',
    role: 'General Practitioner',
    credentials: 'MBChB, FRACGP, FACRRM, FPAA',
    photo: 'dr-robert-seton.png',
    bio: 'Dr Robert Seton brings around 40 years of general practice experience, including obstetrics, and holds a certificate in sexual and reproductive health.',
  },
  {
    name: 'Dr Md Tariqul Islam',
    role: 'General Practitioner',
    photo: 'dr-tariqul-islam.avif',
    bio: 'Dr Md Tariqul Islam has a strong interest in general practice, medical education and multidisciplinary care. His background includes paediatrics, obstetrics and gynaecology, psychiatry and emergency medicine, and he teaches medical students and GP registrars.',
  },
];
