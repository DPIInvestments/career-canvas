import type { Sector, ExperienceLevel } from './sectorRules';

interface Recommendation {
  keywords: string[];
  tips: string[];
  avoid: string[];
}

const sectorRecommendations: Record<Sector, Recommendation> = {
  'Technology & Digital': {
    keywords: ['Agile', 'CI/CD', 'Cloud Architecture', 'API Design', 'System Design', 'Microservices', 'TypeScript', 'Python', 'AWS/GCP/Azure', 'Data Structures'],
    tips: ['Quantify impact with metrics (e.g., "Reduced load time by 40%")', 'Include links to GitHub or portfolio', 'List specific technologies and versions', 'Highlight leadership in code reviews and mentoring'],
    avoid: ['Listing every technology ever used', 'Using vague terms like "team player"', 'Including outdated technologies prominently', 'Writing paragraphs instead of bullet points'],
  },
  'Engineering & Construction': {
    keywords: ['AutoCAD', 'BIM', 'Project Planning', 'LEED', 'Structural Analysis', 'Cost Estimation', 'Safety Compliance', 'Lean Construction', 'Risk Assessment', 'Revit'],
    tips: ['Include certifications (PE, LEED, PMP)', 'Quantify project budgets and timelines', 'Mention specific building codes and standards', 'Highlight safety records'],
    avoid: ['Omitting project scale and budget', 'Forgetting safety certifications', 'Using jargon without context', 'Leaving out software proficiency'],
  },
  'Business & Finance': {
    keywords: ['Financial Modeling', 'M&A', 'Due Diligence', 'GAAP/IFRS', 'Risk Management', 'Bloomberg Terminal', 'Valuation', 'Portfolio Management', 'Compliance', 'Excel/VBA'],
    tips: ['Lead with deal sizes and revenue impact', 'Include CFA, CPA, or Series certifications', 'Quantify cost savings and efficiency gains', 'Show progression in responsibility'],
    avoid: ['Being vague about financial impact', 'Omitting regulatory knowledge', 'Not mentioning tools and platforms', 'Focusing on duties instead of achievements'],
  },
  'Healthcare': {
    keywords: ['Patient Care', 'Clinical Research', 'HIPAA', 'EHR/EMR', 'Evidence-Based Practice', 'Pharmacology', 'Diagnostics', 'Care Coordination', 'Quality Improvement', 'Telemedicine'],
    tips: ['Include all licenses and certifications', 'Mention patient outcome metrics', 'Highlight research publications', 'Show continuing education'],
    avoid: ['Violating patient confidentiality in examples', 'Omitting license numbers', 'Using unclear medical abbreviations', 'Forgetting volunteer or residency work'],
  },
  'Education & Research': {
    keywords: ['Curriculum Development', 'Student Engagement', 'Grant Writing', 'Peer Review', 'Data Analysis', 'Pedagogy', 'Research Methodology', 'Publication Record', 'Accreditation', 'LMS'],
    tips: ['List publications and h-index', 'Include grant amounts secured', 'Show teaching evaluations', 'Highlight interdisciplinary work'],
    avoid: ['Listing every course taught', 'Ignoring research impact metrics', 'Not mentioning advising experience', 'Being too academic for industry roles'],
  },
  'Marketing & Communications': {
    keywords: ['Content Strategy', 'SEO/SEM', 'Analytics', 'Brand Management', 'Campaign ROI', 'Social Media', 'CRM', 'A/B Testing', 'Copywriting', 'Marketing Automation'],
    tips: ['Show campaign results with data', 'Include portfolio links', 'Demonstrate multi-channel expertise', 'Highlight audience growth metrics'],
    avoid: ['Not quantifying campaign performance', 'Using buzzwords without substance', 'Omitting tools and platforms', 'Being too creative at expense of clarity'],
  },
  'Legal & Compliance': {
    keywords: ['Contract Negotiation', 'Regulatory Compliance', 'Legal Research', 'Litigation', 'Due Diligence', 'Corporate Governance', 'IP Law', 'Risk Assessment', 'GDPR', 'Case Management'],
    tips: ['Include bar admissions and jurisdictions', 'Mention notable cases or deals', 'Show billable hours or case volume', 'Highlight specialization areas'],
    avoid: ['Being too verbose', 'Omitting bar information', 'Using legalese in resume', 'Not showing business impact'],
  },
  'Creative & Design': {
    keywords: ['Adobe Creative Suite', 'UI/UX Design', 'Branding', 'Typography', 'Motion Graphics', 'Figma', 'Art Direction', 'Visual Storytelling', 'Design Systems', '3D Modeling'],
    tips: ['Always include portfolio link', 'Show range of project types', 'Mention client brands by name', 'Demonstrate design thinking process'],
    avoid: ['Submitting without portfolio', 'Over-designing the resume itself', 'Not showing collaborative work', 'Ignoring business outcomes'],
  },
  'Hospitality & Tourism': {
    keywords: ['Guest Relations', 'Revenue Management', 'F&B Operations', 'Event Planning', 'Booking Systems', 'Customer Satisfaction', 'Team Leadership', 'Budgeting', 'Health & Safety', 'Multilingual'],
    tips: ['Highlight guest satisfaction scores', 'Show revenue growth', 'Mention language skills', 'Include certifications (ServSafe, WSET)'],
    avoid: ['Being too generic about responsibilities', 'Not mentioning property size/scale', 'Omitting language abilities', 'Forgetting seasonal achievements'],
  },
  'Public Sector & NGO': {
    keywords: ['Policy Analysis', 'Stakeholder Engagement', 'Grant Management', 'Program Evaluation', 'Public Speaking', 'Community Outreach', 'Budget Management', 'Advocacy', 'Impact Assessment', 'Cross-Sector Collaboration'],
    tips: ['Quantify community impact', 'Show funding secured', 'Highlight policy influence', 'Demonstrate coalition building'],
    avoid: ['Using overly bureaucratic language', 'Not showing measurable impact', 'Being too political', 'Omitting volunteer leadership'],
  },
};

export function getRecommendations(sector: Sector, _experience: ExperienceLevel): Recommendation {
  return sectorRecommendations[sector] || sectorRecommendations['Technology & Digital'];
}
