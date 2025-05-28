import React from "react";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";
import { ResumeTemplateProps, formatDuration } from "./TemplateInterface";

const ClassicTemplate: React.FC<ResumeTemplateProps> = ({ resumeData }) => {
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
      {summary && summary.trim() !== '' && (
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
      )}

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
                      <span key={i} className="text-xs bg-gray-100 text-black px-1.5 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
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
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-sm text-black mr-2">{project.name}</h3>
                <span className="text-xs text-black bg-gray-100 px-1.5 py-0.5 rounded whitespace-nowrap">
                  {formatDuration(project.duration)}
                </span>
              </div>
              
              {project.link && (
                <div className="flex items-center mt-1">
                  <Globe className="h-3 w-3 mr-1 text-primary" />
                  <a href={project.link.startsWith('http') ? project.link : `https://${project.link}`} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                    {project.link.replace(/^https?:\/\/(www\.)?/, '')}
                  </a>
                </div>
              )}
              
              {project.summary && (
                <p className="text-xs mt-1 text-black">{project.summary}</p>
              )}
              
              {project.description && (
                <p className="text-xs mt-1 text-black whitespace-pre-line">{project.description}</p>
              )}
              
              {project.deliverables.length > 0 && (
                <>
                  <p className="text-xs font-semibold mt-2 mb-1 text-black">Key Deliverables:</p>
                  <ul className="list-disc pl-4 text-black space-y-1">
                    {project.deliverables.map((bullet, i) => (
                      <li key={i} className="text-xs leading-tight">{bullet}</li>
                    ))}
                  </ul>
                </>
              )}
              
              {project.technologies.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs font-semibold mb-1 text-black">Technologies:</p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-black px-1.5 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {Object.keys(skills).length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-bold text-black border-b border-gray-200 mb-2 pb-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
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
          <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(skills).map(([category, skillsList]) => 
              Array.isArray(skillsList) && skillsList.length > 0 ? (
                <div key={category}>
                  <h3 className="text-xs font-semibold text-black capitalize">
                    {category.replace(/_/g, ' ')}:
                  </h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {skillsList.map((skill, index) => (
                      <span key={index} className="text-xs bg-gray-100 text-black px-1.5 py-0.5 rounded">
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
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-sm text-black">{edu.qualification}</h3>
                <span className="text-xs text-black bg-gray-100 px-1.5 py-0.5 rounded">
                  {formatDuration(edu.duration)}
                </span>
              </div>
              <p className="text-xs text-black mt-1">
                {edu.institute}
              </p>
              {edu.field_of_study && (
                <p className="text-xs text-black mt-0.5">
                  Field of Study: {edu.field_of_study}
                </p>
              )}
              {edu.marks && (
                <p className="text-xs text-black mt-0.5">
                  Grade: {edu.marks}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-bold text-black border-b border-gray-200 mb-2 pb-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
              <path d="M21.27 10.9c-1.21-.33-2.42-.67-3.63-1.01-1.77-.5-3.53-1-5.3-1.5-1.77-.5-3.53-1-5.3-1.5-1.21-.33-2.42-.67-3.63-1.01-.51-.14-1.12.11-1.37.58-.31.58-.05 1.27.55 1.55 1.21.55 2.43 1.04 3.64 1.54 1.77.73 3.54 1.46 5.31 2.2 1.77.73 3.54 1.46 5.31 2.2 1.21.5 2.43.99 3.64 1.54.51.22 1.18-.05 1.42-.54.32-.64.03-1.48-.64-1.71"></path>
              <path d="M11.5 14.25V20.5"></path>
              <path d="M12.5 14.25V20.5"></path>
              <path d="M11.25 21.25h1.5l.9-2 .9 2h1.5"></path>
            </svg>
            Certifications
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {certifications.map((cert, index) => (
              <div key={index} className="border-b border-gray-100 pb-2 last:border-b-0 last:pb-0">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <p className="text-sm font-medium text-black">{cert.title}</p>
                    <p className="text-xs text-black">{cert.institution}</p>
                  </div>
                  <span className="text-xs text-black bg-gray-100 px-1.5 py-0.5 rounded whitespace-nowrap">{cert.date}</span>
                </div>
                {cert.link && (
                  <div className="flex items-center mt-1">
                    <Globe className="h-3 w-3 mr-1 text-primary" />
                    <a href={cert.link.startsWith('http') ? cert.link : `https://${cert.link}`} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">Certificate Link</a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Languages */}
      {languages_known.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-bold text-black border-b border-gray-200 mb-2 pb-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
              <path d="M17 7h-5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2Z"></path>
              <path d="M10 11h4v5h-4v-5Z"></path>
            </svg>
            Languages
          </h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {languages_known.map((language, index) => (
              <Badge key={index} variant="outline" className="bg-gray-100 text-xs text-black">
                {language}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Interests */}
      {interests.length > 0 && (
        <div className="mb-5">
          <h2 className="text-base font-bold text-black border-b border-gray-200 mb-2 pb-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" x2="12" y1="8" y2="12"></line>
              <line x1="12" x2="12.01" y1="16" y2="16"></line>
            </svg>
            Interests
          </h2>
          <div className="flex flex-wrap gap-2 mt-2">
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

export default ClassicTemplate; 