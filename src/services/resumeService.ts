export interface FlexibleResumeData {
  [key: string]: any;
  personalInfo: {
    [key: string]: string | undefined;
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  experience: Array<{
    [key: string]: any;
    title: string;
    company: string;
    location?: string;
    duration: string;
    responsibilities: string[];
    achievements?: string[];
    technologies?: string[];
  }>;
  education: Array<{
    [key: string]: any;
    qualification: string;
    institute: string;
    duration: string;
    marks?: string;
    field_of_study?: string;
  }>;
  projects?: Array<{
    [key: string]: any;
    name: string;
    description?: string;
    duration: string;
    summary?: string;
    deliverables?: string[];
    technologies?: string[];
  }>;
  certifications?: Array<{
    title: string;
    institution: string;
    date: string;
  }>;
  achievements?: string[];
  skills: {
    programming_languages: string[];
    databases: string[];
    technologies: string[];
    frameworks: string[];
    tools: string[];
    soft_skills: string[];
    other: string[];
  };
  summary?: string;
  languages_known?: string[];
  publications?: string[];
  awards?: string[];
  volunteer_experience?: string[];
  interests?: string[];
}

export interface EnhancementSuggestion {
  section: string;
  original: string | any;
  improved: string | any;
  reason: string;
}

export interface ATSScore {
  old: number;
  new: number;
}

export interface EnhancementResponse {
  improved_resume: {
    improved_sections: EnhancementSuggestion[];
    ats_score: ATSScore;
  }
}

export const parseResume = async (file: File): Promise<FlexibleResumeData> => {
  try {
    // Create FormData and append the file
    const formData = new FormData();
    formData.append('file', file);
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    
    // Call the API to process the resume
    const response = await fetch(`${BASE_URL}/process-pdf`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();

  //  const data = preview;
    
    if (data.status !== "success") {
      throw new Error(data.message || 'Failed to process resume');
    }
    
    // Transform API response to our app format, but keep it flexible
    return {
      personalInfo: {
        name: data.resume_data.name || '',
        email: data.resume_data.email || '',
        phone: data.resume_data.phone || '',
        location: data.resume_data.location || '',
        linkedin: data.resume_data.linkedin,
        github: data.resume_data.github,
        website: data.resume_data.website
      },
      summary: data.resume_data.summary || '',
      experience: Array.isArray(data.resume_data.experience) ? data.resume_data.experience : [],
      education: Array.isArray(data.resume_data.education) ? data.resume_data.education : [],
      projects: Array.isArray(data.resume_data.projects) ? data.resume_data.projects : [],
      certifications: Array.isArray(data.resume_data.certifications) ? data.resume_data.certifications : [],
      achievements: Array.isArray(data.resume_data.achievements) ? data.resume_data.achievements : [],
      skills: data.resume_data.skills || { 
        programming_languages: [], 
        databases: [], 
        technologies: [], 
        frameworks: [], 
        tools: [], 
        soft_skills: [], 
        other: [] 
      },
      languages_known: Array.isArray(data.resume_data.languages_known) ? data.resume_data.languages_known : [],
      publications: Array.isArray(data.resume_data.publications) ? data.resume_data.publications : [],
      awards: Array.isArray(data.resume_data.awards) ? data.resume_data.awards : [],
      volunteer_experience: Array.isArray(data.resume_data.volunteer_experience) ? data.resume_data.volunteer_experience : [],
      interests: Array.isArray(data.resume_data.interests) ? data.resume_data.interests : []
    };
  } catch (error) {
    console.error('Error parsing resume:', error);
    throw error;
  }
};

export const getEnhancementSuggestions = async (resumeData: FlexibleResumeData, jobDescription: string): Promise<{suggestions: EnhancementSuggestion[], atsScore?: ATSScore}> => {
  try {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const response = await fetch(`${BASE_URL}/optimize-resume`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resume: resumeData,
        job_description: jobDescription
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    //const data = enhance;

    if (data.improved_resume && data.improved_resume.improved_sections) {
      return {
        suggestions: data.improved_resume.improved_sections,
        atsScore: data.improved_resume.ats_score
      };
    }
    
    
    // If no recognized format found
    console.warn('No enhancement suggestions found in API response');
    return { suggestions: [] };
  } catch (error) {
    console.error('Error getting enhancement suggestions:', error);
    throw error;
  }
};