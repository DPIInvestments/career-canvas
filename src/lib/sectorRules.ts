export const SECTORS = [
  'Technology & Digital',
  'Engineering & Construction',
  'Business & Finance',
  'Healthcare',
  'Education & Research',
  'Marketing & Communications',
  'Legal & Compliance',
  'Creative & Design',
  'Hospitality & Tourism',
  'Public Sector & NGO',
] as const;

export type Sector = (typeof SECTORS)[number];

export const PROFESSIONS: Record<Sector, string[]> = {
  'Technology & Digital': ['Software Engineer', 'Data Scientist', 'Product Manager', 'UX Designer', 'DevOps Engineer', 'Cybersecurity Analyst'],
  'Engineering & Construction': ['Civil Engineer', 'Mechanical Engineer', 'Project Manager', 'Architect', 'Structural Engineer', 'Site Manager'],
  'Business & Finance': ['Financial Analyst', 'Accountant', 'Management Consultant', 'Investment Banker', 'Auditor', 'Business Analyst'],
  'Healthcare': ['Physician', 'Nurse Practitioner', 'Pharmacist', 'Medical Researcher', 'Healthcare Administrator', 'Clinical Psychologist'],
  'Education & Research': ['Professor', 'Research Scientist', 'Curriculum Designer', 'Academic Advisor', 'Education Consultant', 'Lab Technician'],
  'Marketing & Communications': ['Marketing Manager', 'Content Strategist', 'PR Specialist', 'SEO Analyst', 'Brand Manager', 'Social Media Manager'],
  'Legal & Compliance': ['Attorney', 'Paralegal', 'Compliance Officer', 'Legal Counsel', 'Contract Manager', 'Regulatory Analyst'],
  'Creative & Design': ['Graphic Designer', 'Art Director', 'Copywriter', 'Animator', 'Creative Director', 'Photographer'],
  'Hospitality & Tourism': ['Hotel Manager', 'Event Coordinator', 'Travel Agent', 'Chef', 'Tourism Director', 'Restaurant Manager'],
  'Public Sector & NGO': ['Policy Analyst', 'Program Manager', 'Grant Writer', 'Social Worker', 'Public Affairs Specialist', 'Community Organizer'],
};

export const EXPERIENCE_LEVELS = ['Student', 'Junior', 'Mid', 'Senior', 'Executive'] as const;
export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number];

const ADVANCED_ATS_SECTORS: Sector[] = [
  'Technology & Digital',
  'Engineering & Construction',
  'Business & Finance',
  'Healthcare',
];

export function requiresAdvancedATS(sector: Sector): boolean {
  return ADVANCED_ATS_SECTORS.includes(sector);
}
