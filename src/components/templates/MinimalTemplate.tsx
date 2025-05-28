import React from "react";
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from "lucide-react";
import { ResumeTemplateProps, formatDuration } from "./TemplateInterface";

const MinimalTemplate: React.FC<ResumeTemplateProps> = ({ resumeData }) => {
  const { personalInfo, summary, experience, education, projects, certifications, skills, languages_known, interests } = resumeData;

  return (
    <div className="bg-white p-8 shadow-sm rounded-lg text-black overflow-y-auto max-h-full font-sans smooth-scroll">
      {/* Header / Personal Info - Minimalistic clean design */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{personalInfo.name}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail className="h-3.5 w-3.5 mr-1 text-gray-400" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="h-3.5 w-3.5 mr-1 text-gray-400" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center">
              <MapPin className="h-3.5 w-3.5 mr-1 text-gray-400" />
              <span>{personalInfo.location}</span>
            </div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center">
              <Linkedin className="h-3.5 w-3.5 mr-1 text-gray-400" />
              <a href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} 
                target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
                LinkedIn
              </a>
            </div>
          )}
          {personalInfo.github && (
            <div className="flex items-center">
              <Github className="h-3.5 w-3.5 mr-1 text-gray-400" />
              <a href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`} 
                target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
                GitHub
              </a>
            </div>
          )}
          {personalInfo.website && (
            <div className="flex items-center">
              <Globe className="h-3.5 w-3.5 mr-1 text-gray-400" />
              <a href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} 
                target="_blank" rel="noopener noreferrer" className="hover:text-gray-900">
                Website
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Professional Summary - Simple paragraph */}
      {summary && summary.trim() !== '' && (
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-800 mb-2 uppercase tracking-wider">Summary</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
        </div>
      )}

      {/* Skills - Clean list */}
      {Object.keys(skills).length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-800 mb-2 uppercase tracking-wider">Skills</h2>
          <div className="space-y-2">
            {Object.entries(skills).map(([category, skillsList]) => 
              Array.isArray(skillsList) && skillsList.length > 0 ? (
                <div key={category} className="flex">
                  <span className="text-xs font-semibold text-gray-700 capitalize w-32">
                    {category.replace(/_/g, ' ')}:
                  </span>
                  <span className="text-xs text-gray-600 flex-1">
                    {skillsList.join(', ')}
                  </span>
                </div>
              ) : null
            )}
          </div>
        </div>
      )}

      {/* Experience - Minimal format */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-800 mb-2 uppercase tracking-wider">Experience</h2>
          <div className="space-y-4">
            {experience.map((job, index) => (
              <div key={index}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-medium text-gray-800">{job.title} • <span className="font-normal">{job.company}</span></h3>
                  <span className="text-xs text-gray-500">{formatDuration(job.duration)}</span>
                </div>
                {job.location && <p className="text-xs text-gray-500 mb-1">{job.location}</p>}
                
                {job.responsibilities.length > 0 && (
                  <ul className="list-disc pl-4 text-sm text-gray-700 space-y-1 mt-1">
                    {job.responsibilities.slice(0, 3).map((bullet, i) => (
                      <li key={i} className="text-xs leading-tight">{bullet}</li>
                    ))}
                  </ul>
                )}
                
                {job.achievements.length > 0 && (
                  <div className="mt-1">
                    <p className="text-xs font-medium text-gray-700 mt-1">Key achievements:</p>
                    <ul className="list-disc pl-4 text-xs text-gray-700 space-y-1">
                      {job.achievements.slice(0, 2).map((achievement, i) => (
                        <li key={i} className="leading-tight">{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {job.technologies.length > 0 && (
                  <p className="text-xs text-gray-600 mt-1">
                    <span className="font-medium">Technologies:</span> {job.technologies.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education - Minimal format */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-800 mb-2 uppercase tracking-wider">Education</h2>
          <div className="space-y-3">
            {education.map((edu, index) => (
              <div key={index}>
                <div className="flex justify-between mb-0.5">
                  <h3 className="font-medium text-gray-800 text-sm">{edu.qualification}</h3>
                  <span className="text-xs text-gray-500">{formatDuration(edu.duration)}</span>
                </div>
                <p className="text-xs text-gray-600">{edu.institute}</p>
                {edu.field_of_study && (
                  <p className="text-xs text-gray-600">
                    Field of Study: {edu.field_of_study}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects - Minimal card layout */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-800 mb-2 uppercase tracking-wider">Projects</h2>
          <div className="space-y-4">
            {projects.map((project, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-3">
                <div className="flex justify-between mb-1">
                  <h3 className="font-medium text-gray-800 text-sm">{project.name}</h3>
                  <span className="text-xs text-gray-500">{formatDuration(project.duration)}</span>
                </div>
                
                {project.summary && (
                  <p className="text-xs text-gray-700 mb-1">{project.summary}</p>
                )}
                
                {project.link && (
                  <div className="flex items-center mb-1">
                    <Globe className="h-3 w-3 mr-1 text-gray-400" />
                    <a 
                      href={project.link.startsWith('http') ? project.link : `https://${project.link}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs text-gray-600 hover:text-gray-900"
                    >
                      {project.link.replace(/^https?:\/\/(www\.)?/, '')}
                    </a>
                  </div>
                )}
                
                {project.technologies.length > 0 && (
                  <p className="text-xs text-gray-500">
                    {project.technologies.join(' • ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications - Simple list */}
      {certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-semibold text-gray-800 mb-2 uppercase tracking-wider">Certifications</h2>
          <div className="space-y-2">
            {certifications.map((cert, index) => (
              <div key={index} className="flex justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700">{cert.title}</p>
                  <p className="text-xs text-gray-600">{cert.institution}</p>
                </div>
                <span className="text-xs text-gray-500">{cert.date}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer with extra information - Minimal horizontal layout */}
      <div className="border-t border-gray-200 pt-4 mt-8">
        <div className="grid grid-cols-2 gap-4">
          {/* Languages */}
          {languages_known.length > 0 && (
            <div>
              <h3 className="text-xs font-medium text-gray-700 uppercase tracking-wider mb-1">Languages</h3>
              <p className="text-xs text-gray-600">{languages_known.join(', ')}</p>
            </div>
          )}
          
          {/* Interests */}
          {interests.length > 0 && (
            <div>
              <h3 className="text-xs font-medium text-gray-700 uppercase tracking-wider mb-1">Interests</h3>
              <p className="text-xs text-gray-600">{interests.join(', ')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MinimalTemplate; 