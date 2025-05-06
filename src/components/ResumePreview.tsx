import React from "react";
import { Badge } from "@/components/ui/badge";
import { useIsMobile } from "@/hooks/use-mobile";
import { FileText, Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

interface Experience {
  title: string;
  company: string;
  location: string;
  duration: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
}

interface Education {
  qualification: string;
  institute: string;
  duration: string;
  marks?: string;
  field_of_study?: string;
}

interface Project {
  name: string;
  duration: string;
  summary: string;
  description: string | null;
  deliverables: string[];
  technologies: string[];
}

interface Certification {
  title: string;
  institution: string;
  date: string;
}

interface Skills {
  programming_languages: string[];
  databases: string[];
  technologies: string[];
  frameworks: string[];
  tools: string[];
  soft_skills: string[];
  other: string[];
}

interface ResumeData {
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

interface ResumePreviewProps {
  resumeData: ResumeData | null;
}

// Add helper function to format backend duration strings to readable format
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const formatDuration = (duration: string): string => {
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

// Desktop version of the resume preview
const DesktopResumePreview: React.FC<ResumePreviewProps> = ({ resumeData }) => {
  if (!resumeData) {
    return (
      <div className="w-full h-full flex items-center justify-center flex-col p-8 bg-card rounded-lg border border-border/40">
        <div className="p-6 rounded-full bg-muted/30 mb-4">
          <FileText className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground text-center font-medium text-base">
          Upload your resume to see a preview here
        </p>
        <p className="text-sm text-muted-foreground mt-2 text-center max-w-xs">
          Your resume will be displayed in our professional template format
        </p>
      </div>
    );
  }

  const { personalInfo, summary, experience, education, projects, certifications, skills, languages_known, interests } = resumeData;

  return (
    <div className="bg-white p-8 shadow-sm rounded-lg text-black overflow-y-auto max-h-full font-sans smooth-scroll">
      {/* Header / Personal Info */}
      <div className="border-b border-gray-300 pb-5 mb-5">
        <h1 className="text-2xl font-bold text-center mb-2 text-black">{personalInfo.name}</h1>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-black">
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-1.5" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-1.5" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1.5" />
              <span>{personalInfo.location}</span>
            </div>
          )}
        </div>
        <div className="flex flex-wrap justify-center gap-3 text-sm text-black mt-2">
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <Linkedin className="h-4 w-4 mr-1.5" />
              <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center">
              <Github className="h-4 w-4 mr-1.5" />
              <a href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`} target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center">
              <Globe className="h-4 w-4 mr-1.5" />
              <a href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} target="_blank" rel="noopener noreferrer">Portfolio</a>
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      <div className="mb-5">
        <h2 className="text-base font-bold text-black border-b border-gray-200 mb-2 pb-1 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
            <path d="M18 6H5a2 2 0 0 0-2 2v3"></path>
            <path d="M18 6v12c0 1-1 2-2 2s-2-1-2-2 1-2 2-2c1.7 0 3 1.3 3 3"></path>
            <path d="m7 16 3-2 5 4"></path>
            <path d="M7 19h9"></path>
          </svg>
          Professional Summary
        </h2>
        <p className="text-sm text-black leading-relaxed whitespace-pre-line">{summary}</p>
      </div>

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-bold text-black border-b border-gray-200 mb-3 pb-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
              <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            Professional Experience
          </h2>
          
          {experience.map((job, index) => (
            <div key={index} className={`mb-4 ${index !== experience.length - 1 ? "pb-3 border-b border-gray-100" : ""}`}>
              <div className="flex flex-row justify-between items-start">
                <h3 className="font-semibold text-sm text-black">{job.title}</h3>
                <span className="text-xs font-medium text-black bg-gray-100 px-1.5 py-0.5 rounded">
                  {formatDuration(job.duration)}
                </span>
              </div>
              <p className="text-xs font-medium my-1 text-black">{job.company}{job.location ? `, ${job.location}` : ''}</p>
              
              {job.responsibilities.length > 0 && (
                <>
                  <p className="text-xs font-semibold mt-2 mb-1 text-black">Responsibilities:</p>
                  <ul className="list-disc pl-4 text-black space-y-1">
                    {job.responsibilities.map((bullet, i) => (
                      <li key={i} className="text-xs leading-tight">{bullet}</li>
                    ))}
                  </ul>
                </>
              )}
              
              {job.achievements.length > 0 && (
                <>
                  <p className="text-xs font-semibold mt-2 mb-1 text-black">Achievements:</p>
                  <ul className="list-disc pl-4 text-black space-y-1">
                    {job.achievements.map((achievement, i) => (
                      <li key={i} className="text-xs leading-tight">{achievement}</li>
                    ))}
                  </ul>
                </>
              )}
              
              {job.technologies.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs font-semibold mb-1 text-black">Technologies:</p>
                  <div className="flex flex-wrap gap-1">
                    {job.technologies.map((tech, i) => (
                      <Badge key={i} variant="outline" className="text-[10px] bg-gray-50 text-black">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-bold text-black border-b border-gray-200 mb-3 pb-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
            Education
          </h2>
          
          {education.map((edu, index) => (
            <div key={index} className={`mb-3 ${index !== education.length - 1 ? "pb-2 border-b border-gray-100" : ""}`}>
              <div className="flex flex-row justify-between items-start">
                <h3 className="font-semibold text-sm text-black">{edu.qualification}</h3>
                <span className="text-xs text-black bg-gray-100 px-1.5 py-0.5 rounded">
                  {formatDuration(edu.duration)}
                </span>
              </div>
              <p className="text-xs text-black mt-0.5">
                {edu.institute}
                {edu.field_of_study && <span className="ml-1">• {edu.field_of_study}</span>}
                {edu.marks && <span className="ml-2 font-medium text-black text-xs">• {edu.marks}</span>}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-bold text-black border-b border-gray-200 mb-3 pb-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
              <path d="M12 13V2l8 4-8 4"></path>
              <path d="M20.55 10.23A9 9 0 1 1 8 4.94"></path>
              <path d="M8 10a5 5 0 1 0 8.9 2.02"></path>
            </svg>
            Projects
          </h2>
          
          {projects.map((project, index) => (
            <div key={index} className={`mb-4 ${index !== projects.length - 1 ? "pb-3 border-b border-gray-100" : ""}`}>
              <div className="flex flex-row justify-between items-start">
                <h3 className="font-semibold text-sm text-black">{project.name}</h3>
                {project.duration && (
                  <span className="text-xs text-black bg-gray-100 px-1.5 py-0.5 rounded">
                    {formatDuration(project.duration)}
                  </span>
                )}
              </div>
              
              {project.summary && (
                <p className="text-xs leading-tight mt-1 text-black">{project.summary}</p>
              )}
              
              {project.description && (
                <p className="text-xs leading-tight mt-1.5 text-black whitespace-pre-line">{project.description}</p>
              )}
              
              {project.deliverables.length > 0 && (
                <>
                  <p className="text-xs font-semibold mt-2 mb-1 text-black">Deliverables:</p>
                  <ul className="list-disc pl-4 text-black space-y-0.5">
                    {project.deliverables.map((deliverable, i) => (
                      <li key={i} className="text-xs leading-tight">{deliverable}</li>
                    ))}
                  </ul>
                </>
              )}
              
              {project.technologies.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs font-semibold mb-1 text-black">Technologies:</p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, i) => (
                      <Badge key={i} variant="outline" className="text-[10px] bg-gray-50 text-black">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Achievements */}
      {resumeData.achievements && resumeData.achievements.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-bold text-black border-b border-gray-200 mb-3 pb-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
              <path d="M8 6v12"></path>
              <path d="M20 6v12"></path>
              <path d="M8 12h12"></path>
              <path d="M8 18h12"></path>
              <path d="M8 6h12"></path>
            </svg>
            Achievements
          </h2>
          <ul className="list-disc pl-4 text-sm">
            {resumeData.achievements.map((achievement, index) => (
              <li key={index} className="text-xs text-black mb-1">
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-bold text-black border-b border-gray-200 mb-3 pb-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
              <path d="M21.27 10.9c-1.21-.33-2.42-.67-3.63-1.01-1.77-.5-3.53-1-5.3-1.5-1.77-.5-3.53-1-5.3-1.5-1.21-.33-2.42-.67-3.63-1.01-.51-.14-1.12.11-1.37.58-.31.58-.05 1.27.55 1.55 1.21.55 2.43 1.04 3.64 1.54 1.77.73 3.54 1.46 5.31 2.2 1.77.73 3.54 1.46 5.31 2.2 1.21.5 2.43.99 3.64 1.54.51.22 1.18-.05 1.42-.54.32-.64.03-1.48-.64-1.71"></path>
              <path d="M11.5 14.25V20.5"></path>
              <path d="M12.5 14.25V20.5"></path>
              <path d="M11.25 21.25h1.5l.9-2 .9 2h1.5"></path>
            </svg>
            Certifications
          </h2>
          
          <div className="grid grid-cols-1 gap-2">
            {certifications.map((cert, index) => (
              <div key={index} className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-medium text-black">{cert.title}</p>
                  <p className="text-xs text-black">{cert.institution}</p>
                </div>
                <span className="text-xs text-black bg-gray-100 px-1.5 py-0.5 rounded">
                  {cert.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      <div className="mb-5">
        <h2 className="text-base font-bold text-black border-b border-gray-200 mb-3 pb-1 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
            <path d="m12 14 4-4"></path>
            <path d="M3.34 19a10 10 0 1 1 17.32 0"></path>
          </svg>
          Skills
        </h2>
        
        <div className="grid grid-cols-1 gap-y-3">
          {skills.programming_languages.length > 0 && (
            <div>
              <p className="text-xs font-medium mb-1">Programming Languages:</p>
              <div className="flex flex-wrap gap-1.5">
                {skills.programming_languages.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-100 text-[10px] text-black hover:bg-gray-200 border-gray-200 px-2 py-0.5">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {skills.databases.length > 0 && (
            <div>
              <p className="text-xs font-medium mb-1">Databases:</p>
              <div className="flex flex-wrap gap-1.5">
                {skills.databases.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-100 text-[10px] text-black hover:bg-gray-200 border-gray-200 px-2 py-0.5">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {skills.tools.length > 0 && (
            <div>
              <p className="text-xs font-medium mb-1">Tools:</p>
              <div className="flex flex-wrap gap-1.5">
                {skills.tools.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-100 text-[10px] text-black hover:bg-gray-200 border-gray-200 px-2 py-0.5">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {skills.technologies.length > 0 && (
            <div>
              <p className="text-xs font-medium mb-1">Technologies:</p>
              <div className="flex flex-wrap gap-1.5">
                {skills.technologies.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-100 text-[10px] text-black hover:bg-gray-200 border-gray-200 px-2 py-0.5">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {skills.frameworks.length > 0 && (
            <div>
              <p className="text-xs font-medium mb-1">Frameworks:</p>
              <div className="flex flex-wrap gap-1.5">
                {skills.frameworks.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-100 text-[10px] text-black hover:bg-gray-200 border-gray-200 px-2 py-0.5">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {skills.other.length > 0 && (
            <div>
              <p className="text-xs font-medium mb-1">Other Skills:</p>
              <div className="flex flex-wrap gap-1.5">
                {skills.other.map((skill, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-100 text-[10px] text-black hover:bg-gray-200 border-gray-200 px-2 py-0.5">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Languages */}
      {languages_known.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-bold text-black border-b border-gray-200 mb-2 pb-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
              <path d="m5 8 6 6"></path>
              <path d="m4 14 6-6 2-3"></path>
              <path d="M2 5h12"></path>
              <path d="M7 2h1"></path>
              <path d="m22 22-5-10-5 10"></path>
              <path d="M14 18h6"></path>
            </svg>
            Languages
          </h2>
          <div className="flex flex-wrap gap-2">
            {languages_known.map((lang, index) => (
              <Badge key={index} variant="outline" className="bg-gray-100 text-xs text-black">
                {lang}
              </Badge>
            ))}
          </div>
        </div>
      )}
      
      {/* Interests */}
      {interests.length > 0 && (
        <div>
          <h2 className="text-base font-bold text-black border-b border-gray-200 mb-2 pb-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" x2="12" y1="8" y2="12"></line>
              <line x1="12" x2="12.01" y1="16" y2="16"></line>
            </svg>
            Interests
          </h2>
          <div className="flex flex-wrap gap-2">
            {interests.map((interest, index) => (
              <Badge key={index} variant="outline" className="bg-gray-100 text-xs text-black">
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Mobile version of the resume preview - simplified for smaller screens
const MobileResumePreview: React.FC<ResumePreviewProps> = ({ resumeData }) => {
  // Mobile implementation similar to desktop but with scaled down elements
  if (!resumeData) {
    return (
      <div className="w-full h-full flex items-center justify-center flex-col p-4 bg-card rounded-lg border border-border/40">
        <div className="p-4 rounded-full bg-muted/30 mb-3">
          <FileText className="h-5 w-5 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground text-center font-medium text-sm">
          Upload your resume
        </p>
        <p className="text-xs text-muted-foreground mt-1 text-center max-w-xs">
          Professional template format
        </p>
      </div>
    );
  }

  const { personalInfo, summary, experience, education, skills } = resumeData;

  return (
    <div className="bg-white p-4 shadow-sm rounded-lg text-black overflow-y-auto max-h-full font-sans smooth-scroll">
      {/* Header / Personal Info */}
      <div className="border-b border-gray-300 pb-3 mb-3">
        <h1 className="text-lg font-bold text-center mb-1.5 text-black">{personalInfo.name}</h1>
        <div className="flex flex-wrap justify-center gap-2 text-xs text-black">
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail className="h-3 w-3 mr-1" />
              <span className="text-[10px]">{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="h-3 w-3 mr-1" />
              <span className="text-[10px]">{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              <span className="text-[10px]">{personalInfo.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary */}
      <div className="mb-3">
        <h2 className="text-sm font-bold text-black border-b border-gray-200 mb-1.5 pb-1 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5 text-primary">
            <path d="M18 6H5a2 2 0 0 0-2 2v3"></path>
            <path d="M18 6v12c0 1-1 2-2 2s-2-1-2-2 1-2 2-2c1.7 0 3 1.3 3 3"></path>
            <path d="m7 16 3-2 5 4"></path>
            <path d="M7 19h9"></path>
          </svg>
          Summary
        </h2>
        <p className="text-[10px] text-black leading-tight whitespace-pre-line">{summary}</p>
      </div>

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-3">
          <h2 className="text-sm font-bold text-black border-b border-gray-200 mb-2 pb-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5 text-primary">
              <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            Experience
          </h2>
          
          {experience.slice(0, 2).map((job, index) => (
            <div key={index} className={`mb-2 ${index !== Math.min(experience.length, 2) - 1 ? "pb-2 border-b border-gray-100" : ""}`}>
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-xs text-black">{job.title}</h3>
                <span className="text-[9px] font-medium text-black bg-gray-100 px-1 py-0.5 rounded">
                  {formatDuration(job.duration)}
                </span>
              </div>
              <p className="text-[10px] my-0.5 text-black">{job.company}{job.location ? `, ${job.location}` : ''}</p>
              
              {job.responsibilities.length > 0 && (
                <ul className="list-disc pl-3 text-black space-y-0.5 mt-1">
                  {job.responsibilities.slice(0, 3).map((bullet, i) => (
                    <li key={i} className="text-[9px] leading-tight">{bullet}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-3">
          <h2 className="text-sm font-bold text-black border-b border-gray-200 mb-2 pb-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5 text-primary">
              <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
              <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
            </svg>
            Education
          </h2>
          
          {education.map((edu, index) => (
            <div key={index} className={`mb-1.5 ${index !== education.length - 1 ? "pb-1.5 border-b border-gray-100" : ""}`}>
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-xs text-black">{edu.qualification}</h3>
                <span className="text-[9px] text-black bg-gray-100 px-1 py-0.5 rounded">
                  {formatDuration(edu.duration)}
                </span>
              </div>
              <p className="text-[9px] text-black mt-0.5">
                {edu.institute}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {Object.keys(skills).length > 0 && (
        <div className="mb-3">
          <h2 className="text-sm font-bold text-black border-b border-gray-200 mb-2 pb-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5 text-primary">
              <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"></path>
              <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
              <path d="M12 2v2"></path>
              <path d="M12 22v-2"></path>
              <path d="m17 20.66-1-1.73"></path>
              <path d="M11 10.27 7 3.34"></path>
              <path d="m20.66 17-1.73-1"></path>
              <path d="m3.34 7 1.73 1"></path>
              <path d="M14 12h8"></path>
              <path d="M2 12h2"></path>
              <path d="m20.66 7-1.73 1"></path>
              <path d="m3.34 17 1.73-1"></path>
              <path d="m17 3.34-1 1.73"></path>
              <path d="m7 20.66 1-1.73"></path>
            </svg>
            Skills
          </h2>
          <div className="mt-1.5 space-y-1.5">
            {Object.entries(skills).map(([category, skillsList]) => 
              Array.isArray(skillsList) && skillsList.length > 0 ? (
                <div key={category} className="mt-1">
                  <h3 className="text-[10px] font-semibold text-black capitalize mb-1">
                    {category.replace(/_/g, ' ')}:
                  </h3>
                  <div className="flex flex-wrap gap-1 mt-0.5">
                    {skillsList.map((skill, index) => (
                      <span key={index} className="text-[9px] bg-gray-100 text-black px-1.5 py-0.5 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null
            )}
          </div>
        </div>
      )}

      {/* Achievements */}
      {resumeData.achievements && resumeData.achievements.length > 0 && (
        <div className="mb-3">
          <h2 className="text-sm font-bold text-black border-b border-gray-200 mb-2 pb-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5 text-primary">
              <path d="M8 6v12"></path>
              <path d="M20 6v12"></path>
              <path d="M8 12h12"></path>
              <path d="M8 18h12"></path>
              <path d="M8 6h12"></path>
            </svg>
            Achievements
          </h2>
          <ul className="list-disc pl-4">
            {resumeData.achievements.map((achievement, index) => (
              <li key={index} className="text-[10px] text-black mb-1">
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Main component that decides which version to render
const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData }) => {
  const isMobile = useIsMobile();
  
  return isMobile ? (
    <MobileResumePreview resumeData={resumeData} />
  ) : (
    <DesktopResumePreview resumeData={resumeData} />
  );
};

export default ResumePreview;
