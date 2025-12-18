export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Job {
  company: string;
  role: string;
  period: string;
  details: string[];
}

export interface Certification {
  name: string;
  level: 'Expert' | 'Specialty' | 'Associate' | 'Fundamentals';
  badgeColor: string;
}

export interface ProfileData {
  name: string;
  title: string;
  summary: string;
  contact: ContactInfo;
  skills: SkillCategory[];
  experience: Job[];
  certifications: Certification[];
}