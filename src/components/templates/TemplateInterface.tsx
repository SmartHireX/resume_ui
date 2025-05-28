import React from "react";

export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  duration: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
}

export interface Education {
  qualification: string;
  institute: string;
  duration: string;
  marks?: string;
  field_of_study?: string;
}

export interface Project {
  name: string;
  duration: string;
  summary: string;
  description: string | null;
  deliverables: string[];
  technologies: string[];
  link?: string;
}

export interface Certification {
  title: string;
  institution: string;
  date: string;
  link?: string;
}

export interface Skills {
  programming_languages: string[];
  databases: string[];
  technologies: string[];
  frameworks: string[];
  tools: string[];
  soft_skills: string[];
  other: string[];
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  certifications: Certification[];
  achievements: string[];
  skills: Skills;
  languages_known: string[];
  publications: string[];
  awards: string[];
  volunteer_experience: string[];
  interests: string[];
}

export interface ResumeTemplateProps {
  resumeData: ResumeData;
  isPrintMode?: boolean;
}

// Helper function for formatting duration strings
export const formatDuration = (duration: string): string => {
  if (!duration) return '';

  // Split into start and end segments on dash (– or -) or whitespace
  let startPart = '';
  let endPart = '';
  if (duration.includes('-') || duration.includes('–')) {
    [startPart, endPart] = duration.split(/\s*[–-]\s*/);
  } else {
    const parts = duration.trim().split(/\s+/);
    startPart = parts[0];
    endPart = parts[1] || '';
  }

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const formatPart = (part: string): string => {
    const trimmed = part.trim();
    // Handle 'Present'
    if (/^present$/i.test(trimmed)) return 'Present';
    // Handle numeric month/year (e.g. "01/2024")
    if (trimmed.includes('/')) {
      const [month, year] = trimmed.split('/');
      const m = parseInt(month, 10);
      if (!isNaN(m) && m >= 1 && m <= 12 && year) {
        return `${monthNames[m - 1]} ${year}`;
      }
      return trimmed;
    }
    // Handle month name and year (e.g. "July 2024")
    const monthYearMatch = trimmed.match(/^([A-Za-z]+)\.?\s*(\d{4})$/);
    if (monthYearMatch) {
      let [, mon, yr] = monthYearMatch;
      mon = mon.replace('.', '');
      const idx = monthNames.findIndex(mn => mn.toLowerCase().startsWith(mon.toLowerCase()));
      if (idx !== -1) {
        return `${monthNames[idx]} ${yr}`;
      }
      return trimmed;
    }
    return trimmed;
  };

  const start = formatPart(startPart);
  const end = endPart ? formatPart(endPart) : '';
  return end ? `${start} - ${end}` : start;
}; 