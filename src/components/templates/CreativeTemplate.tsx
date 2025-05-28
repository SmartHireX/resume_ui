import React from "react";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Calendar, Award, Briefcase, BookOpen, Code } from "lucide-react";
import { ResumeTemplateProps, formatDuration } from "./TemplateInterface";

const CreativeTemplate: React.FC<ResumeTemplateProps> = ({ resumeData }) => {
  const { personalInfo, summary, experience, education, projects, certifications, skills, languages_known, interests } = resumeData;

  return (
    <div className="bg-white p-0 shadow-sm rounded-lg text-black overflow-y-auto max-h-full font-sans smooth-scroll">
      {/* Header with accent color background */}
      <div className="bg-gradient-to-r from-primary/80 to-primary p-8 rounded-t-lg">
        <h1 className="text-3xl font-bold text-white mb-2">{personalInfo.name}</h1>
        <p className="text-white/80 text-sm mb-4 font-light italic">
          {experience.length > 0 ? experience[0].title : 'Professional'}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-white/90 mt-5">
          {personalInfo.email && (
            <div className="flex items-center">
              <div className="bg-white/10 p-1.5 rounded-full mr-2">
                <Mail className="h-3.5 w-3.5 text-white" />
              </div>
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center">
              <div className="bg-white/10 p-1.5 rounded-full mr-2">
                <Phone className="h-3.5 w-3.5 text-white" />
              </div>
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center">
              <div className="bg-white/10 p-1.5 rounded-full mr-2">
                <MapPin className="h-3.5 w-3.5 text-white" />
              </div>
              <span>{personalInfo.location}</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-3 mt-5">
          {personalInfo.linkedin && (
            <a 
              href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <Linkedin className="h-4 w-4 text-white" />
            </a>
          )}
          {personalInfo.github && (
            <a 
              href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <Github className="h-4 w-4 text-white" />
            </a>
          )}
          {personalInfo.website && (
            <a 
              href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <Globe className="h-4 w-4 text-white" />
            </a>
          )}
        </div>
      </div>

      {/* Main content area */}
      <div className="p-8">
        {/* Professional Summary with creative style */}
        {summary && summary.trim() !== '' && (
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <Award className="h-4 w-4 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-black border-b-2 border-primary/30 pb-1">About Me</h2>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
            </div>
          </div>
        )}

        {/* Experience with creative timeline */}
        {experience.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <Briefcase className="h-4 w-4 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-black border-b-2 border-primary/30 pb-1">Experience</h2>
            </div>
            
            <div className="space-y-6">
              {experience.map((job, index) => (
                <div key={index} className="relative">
                  <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent"></div>
                  <div className="absolute left-0 top-0 h-4 w-4 rounded-full border-2 border-primary bg-white"></div>
                  
                  <div className="ml-8">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                      <h3 className="font-bold text-black text-base">{job.title}</h3>
                      <span className="text-xs text-gray-600 mt-1 sm:mt-0">
                        <Calendar className="h-3 w-3 inline mr-1 text-primary/80" />
                        {formatDuration(job.duration)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-primary/90 mt-1 mb-2">{job.company}{job.location ? `, ${job.location}` : ''}</p>
                    
                    {job.responsibilities.length > 0 && (
                      <div className="mt-2 bg-gray-50 p-3 rounded-md">
                        <ul className="space-y-1.5">
                          {job.responsibilities.slice(0, 3).map((bullet, i) => (
                            <li key={i} className="text-xs text-gray-700 leading-tight flex items-start">
                              <span className="text-primary mr-1.5 mt-0.5">›</span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {job.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {job.technologies.map((tech, i) => (
                          <Badge key={i} variant="outline" className="bg-primary/5 text-primary/90 border-primary/20 text-[9px]">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills with creative visualization */}
        {Object.keys(skills).length > 0 && (
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <Code className="h-4 w-4 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-black border-b-2 border-primary/30 pb-1">Skills</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(skills)
                .filter(([_, skillsList]) => Array.isArray(skillsList) && skillsList.length > 0)
                .slice(0, 6)
                .map(([category, skillsList]) => (
                  <div key={category} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="text-sm font-bold text-primary mb-2 capitalize">
                      {category.replace(/_/g, ' ')}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {(skillsList as string[]).map((skill, index) => (
                        <Badge 
                          key={index} 
                          className="bg-primary/10 hover:bg-primary/20 transition-colors text-black border-0 text-xs"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        )}

        {/* Projects with cards */}
        {projects.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <Code className="h-4 w-4 text-primary" />
              </div>
              <h2 className="text-xl font-bold text-black border-b-2 border-primary/30 pb-1">Projects</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.slice(0, 4).map((project, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-100 to-gray-200 p-4 rounded-lg border border-gray-300 hover:border-primary/30 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-black">{project.name}</h3>
                    <span className="text-[10px] text-gray-700 bg-black/5 px-2 py-0.5 rounded-full">
                      {formatDuration(project.duration)}
                    </span>
                  </div>
                  
                  {project.summary && (
                    <p className="text-xs text-gray-700 mb-2">{project.summary}</p>
                  )}
                  
                  {project.link && (
                    <a 
                      href={project.link.startsWith('http') ? project.link : `https://${project.link}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-xs text-primary hover:text-primary/80 flex items-center"
                    >
                      <Globe className="h-3 w-3 mr-1" />
                      View Project
                    </a>
                  )}
                  
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {project.technologies.slice(0, 5).map((tech, i) => (
                        <span key={i} className="text-[9px] text-gray-700 bg-black/5 px-1.5 py-0.5 rounded">
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="text-[9px] text-gray-700 bg-black/5 px-1.5 py-0.5 rounded">
                          +{project.technologies.length - 5} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer with Education/Certifications and other info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Education */}
          {education.length > 0 && (
            <div>
              <div className="flex items-center mb-4">
                <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                  <BookOpen className="h-3.5 w-3.5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-black">Education</h2>
              </div>
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <div key={index} className="bg-gray-50 p-3 rounded-md">
                    <h3 className="font-semibold text-sm text-black">{edu.qualification}</h3>
                    <p className="text-xs text-primary/90">{edu.institute}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{edu.duration}</p>
                    {edu.field_of_study && (
                      <p className="text-xs text-gray-600 mt-0.5">Field: {edu.field_of_study}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <div className="flex items-center mb-4">
                <div className="h-7 w-7 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                  <Award className="h-3.5 w-3.5 text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-black">Certifications</h2>
              </div>
              <div className="space-y-2">
                {certifications.map((cert, index) => (
                  <div key={index} className="text-sm">
                    <div className="flex items-center">
                      <span className="text-primary mr-1.5 text-xs">◆</span>
                      <h3 className="font-medium text-black">{cert.title}</h3>
                    </div>
                    <p className="text-xs text-gray-600 ml-3.5">{cert.institution} ({cert.date})</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Languages Known and Interests (if they exist) in a two-column layout or stacked on small screens */}
        {(languages_known.length > 0 || interests.length > 0) && (
          <div className="mt-8 pt-6 border-t border-gray-200">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {languages_known.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-black mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {languages_known.map((lang, index) => (
                      <Badge key={index} variant="secondary" className="bg-gray-200 text-gray-700 text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {interests.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-black mb-2">Interests</h3>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest, index) => (
                      <Badge key={index} variant="outline" className="border-primary/30 text-primary/90 bg-primary/5 text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreativeTemplate; 