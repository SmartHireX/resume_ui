export interface IDetailedATSScores {
  [key: string]: any; // Allow indexing with string keys for flexibility
  old: number;
  new: number;
  summary?: number;
  experience?: number;
  projects?: number;
  skills?: number;
  achievements?: number;
  education?: number;
  certifications?: number;
  // Add other potential sections here if needed
}

export interface IPersonalInfo {
  [key: string]: string | undefined;
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  website?: string;
};

export interface IExperienceInfo {
  [key: string]: any;
  title: string;
  company: string;
  location?: string;
  duration: string;
  responsibilities: string[];
  achievements?: string[];
  technologies?: string[];
};

export interface IEducationInfo {
  [key: string]: any;
  qualification: string;
  institute: string;
  duration: string;
  marks?: string;
  field_of_study?: string;
};

export interface IProjectInfo {
  [key: string]: any;
  name: string;
  description?: string;
  duration: string;
  summary?: string;
  deliverables?: string[];
  technologies?: string[];
};

export interface ICertificationInfo {
  title: string;
  institution: string;
  date: string;
};

export interface ISkillsInfo {
  programming_languages: string[];
  databases: string[];
  technologies: string[];
  frameworks: string[];
  tools: string[];
  soft_skills: string[];
  other: string[];
};

export interface IFlexibleResumeData {
  [key: string]: any;
  personalInfo: IPersonalInfo;
  experience: IExperienceInfo[];
  education: IEducationInfo[];
  projects?: IProjectInfo[];
  certifications?: ICertificationInfo[];
  achievements?: string[];
  skills: ISkillsInfo;
  summary?: string;
  languages_known?: string[];
  publications?: string[];
  awards?: string[];
  volunteer_experience?: string[];
  interests?: string[];
};

export interface IEnhancementSuggestion {
  section: string;
  original: string | any;
  improved: string | any;
  reason: string;
};

export interface IATSScore {
  old: number;
  new: number;
};

export interface IImprovedResume {
  improved_sections: IEnhancementSuggestion[];
  ats_score: IATSScore;
};

export interface IEnhancementResponse {
  improved_resume: IImprovedResume
};

export interface ResumeSuggestionsProps {
  suggestions: IEnhancementSuggestion[];
  onAcceptSuggestion?: (index: number) => void;
  onRejectSuggestion?: (index: number) => void;
}