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

export interface KeyProject {
  title: string;
  client: string;
  scope: string;
  technologies: string[];
  metrics: string[];
  icon: string;
}

export interface ImpactMetric {
  value: string;
  label: string;
  icon: string;
  color: string;
}

export interface ProfileData {
  name: string;
  title: string;
  summary: string;
  contact: ContactInfo;
  skills: SkillCategory[];
  experience: Job[];
  certifications: Certification[];
  keyProjects?: KeyProject[];
  impactMetrics?: ImpactMetric[];
}