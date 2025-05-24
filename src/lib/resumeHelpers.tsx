export const convertToResumeData = (data: any)=> {
  return {
    personalInfo: {
      name: data.name || '',
      email: data.email || '',
      phone: data.phone || '',
      location: data.location || '',
      linkedin: data.linkedin,
      github: data.github,
      website: data.website
    },
    summary: data.summary || "",
    experience: Array.isArray(data.experience) ? data.experience.map(exp => ({
      ...exp,
      location: exp.location || "",
      achievements: Array.isArray(exp.achievements) ? exp.achievements : [],
      technologies: Array.isArray(exp.technologies) ? exp.technologies : []
    })) : [],
    education: Array.isArray(data.education) ? data.education : [],
    projects: Array.isArray(data.projects) ? data.projects.map(project => ({
      ...project,
      summary: project.summary || "",
      description: project.description || null,
      deliverables: Array.isArray(project.deliverables) ? project.deliverables : [],
      technologies: Array.isArray(project.technologies) ? project.technologies : []
    })) : [],
    certifications: Array.isArray(data.certifications) ? data.certifications : [],
    achievements: Array.isArray(data.achievements) ? data.achievements : [],
    skills: data.skills || {
      programming_languages: [],
      databases: [],
      technologies: [],
      frameworks: [],
      tools: [],
      soft_skills: [],
      other: []
    },
    languages_known: Array.isArray(data.languages_known) ? data.languages_known : [],
    publications: Array.isArray(data.publications) ? data.publications : [],
    awards: Array.isArray(data.awards) ? data.awards : [],
    volunteer_experience: Array.isArray(data.volunteer_experience) ? data.volunteer_experience : [],
    interests: Array.isArray(data.interests) ? data.interests : [],
  };
}