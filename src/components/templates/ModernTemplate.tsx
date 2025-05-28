import React from "react";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Calendar, Building, Award, BookOpen } from "lucide-react";
import { ResumeTemplateProps, formatDuration } from "./TemplateInterface";

const ModernTemplate: React.FC<ResumeTemplateProps> = ({ resumeData }) => {
  const { personalInfo, summary, experience, education, projects, certifications, skills, languages_known, interests } = resumeData;

  return (
    <div className="bg-white p-6 shadow-sm rounded-lg text-black overflow-y-auto max-h-full font-sans smooth-scroll">
      {/* Header with colored background */}
      <div className="bg-primary/10 rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-primary mb-3">{personalInfo.name}</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-700">
          {personalInfo.email && (
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-primary/70" />
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-primary/70" />
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-primary/70" />
              <span>{personalInfo.location}</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-4 mt-3 text-sm">
          {personalInfo.linkedin && (
            <a 
              href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-primary hover:underline"
            >
              <Linkedin className="h-4 w-4 mr-1.5" />
              LinkedIn
            </a>
          )}
          {personalInfo.github && (
            <a 
              href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-primary hover:underline"
            >
              <Github className="h-4 w-4 mr-1.5" />
              GitHub
            </a>
          )}
          {personalInfo.website && (
            <a 
              href={personalInfo.website.startsWith('http') ? personalInfo.website : `https://${personalInfo.website}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-primary hover:underline"
            >
              <Globe className="h-4 w-4 mr-1.5" />
              Portfolio
            </a>
          )}
        </div>
      </div>

      {/* Two column layout for the rest of content */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left column (narrow) - Skills, Languages, Education, Certifications */}
        <div className="col-span-12 sm:col-span-4 space-y-6">
          {/* Skills */}
          {Object.keys(skills).length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-primary mb-3 flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Skills
              </h2>
              <div className="space-y-3">
                {Object.entries(skills).map(([category, skillsList]) => 
                  Array.isArray(skillsList) && skillsList.length > 0 ? (
                    <div key={category}>
                      <h3 className="text-sm font-medium text-gray-800 capitalize mb-1.5">
                        {category.replace(/_/g, ' ')}
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {skillsList.map((skill, index) => (
                          <Badge key={index} className="bg-primary/5 hover:bg-primary/10 text-primary border-primary/20 text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages_known.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-primary mb-3 flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Languages
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {languages_known.map((language, index) => (
                  <Badge key={index} variant="outline" className="bg-primary/5 hover:bg-primary/10 text-primary border-primary/20 text-xs">
                    {language}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-primary mb-3 flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-2 border-primary/30 pl-3">
                    <h3 className="font-semibold text-sm text-gray-800">{edu.qualification}</h3>
                    <p className="text-xs text-gray-600 my-1">{edu.institute}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1 inline" />
                      {formatDuration(edu.duration)}
                    </div>
                    {edu.field_of_study && (
                      <p className="text-xs text-gray-600 mt-1">
                        Field: {edu.field_of_study}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-primary mb-3 flex items-center">
                <Award className="h-5 w-5 mr-2" />
                Certifications
              </h2>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="border-l-2 border-primary/30 pl-3">
                    <h3 className="font-semibold text-sm text-gray-800">{cert.title}</h3>
                    <p className="text-xs text-gray-600 my-1">{cert.institution}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1 inline" />
                      {cert.date}
                    </div>
                    {cert.link && (
                      <div className="mt-1">
                        <a
                          href={cert.link.startsWith('http') ? cert.link : `https://${cert.link}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-primary hover:underline flex items-center"
                        >
                          <Globe className="h-3 w-3 mr-1" />
                          View Certificate
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interests */}
          {interests.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-primary mb-3">Interests</h2>
              <div className="flex flex-wrap gap-1.5">
                {interests.map((interest, index) => (
                  <Badge key={index} variant="outline" className="bg-primary/5 hover:bg-primary/10 text-primary border-primary/20 text-xs">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column (wide) - Summary, Experience, Projects */}
        <div className="col-span-12 sm:col-span-8 space-y-6">
          {/* Professional Summary */}
          {summary && summary.trim() !== '' && (
            <div>
              <h2 className="text-lg font-bold text-primary mb-3">Professional Summary</h2>
              <div className="bg-gray-50 p-3 rounded-md border border-gray-100">
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{summary}</p>
              </div>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-primary mb-3 flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Professional Experience
              </h2>
              <div className="space-y-5">
                {experience.map((job, index) => (
                  <div key={index} className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary/20"></div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-base text-gray-800">{job.title}</h3>
                      <div className="flex items-center text-sm font-medium my-1 text-gray-700">
                        <Building className="h-3.5 w-3.5 mr-1.5 text-primary/60" />
                        {job.company}
                        {job.location ? <span className="ml-1 text-gray-500">, {job.location}</span> : null}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <Calendar className="h-3 w-3 mr-1.5 text-primary/60" />
                        {formatDuration(job.duration)}
                      </div>
                      
                      {job.responsibilities.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs font-semibold text-gray-700 mb-1">Key Responsibilities:</p>
                          <ul className="list-disc pl-4 text-gray-700 space-y-1">
                            {job.responsibilities.map((bullet, i) => (
                              <li key={i} className="text-xs leading-tight">{bullet}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {job.achievements.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs font-semibold text-gray-700 mb-1">Achievements:</p>
                          <ul className="list-disc pl-4 text-gray-700 space-y-1">
                            {job.achievements.map((achievement, i) => (
                              <li key={i} className="text-xs leading-tight">{achievement}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {job.technologies.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs font-semibold text-gray-700 mb-1">Technologies:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {job.technologies.map((tech, i) => (
                              <Badge key={i} variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-primary mb-3">Projects</h2>
              <div className="space-y-5">
                {projects.map((project, index) => (
                  <div key={index} className="p-4 border border-gray-100 rounded-md shadow-sm bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-base text-gray-800">{project.name}</h3>
                      <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full border border-gray-200">
                        {formatDuration(project.duration)}
                      </span>
                    </div>
                    
                    {project.link && (
                      <div className="mt-1 mb-2">
                        <a 
                          href={project.link.startsWith('http') ? project.link : `https://${project.link}`} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-xs text-primary hover:underline flex items-center"
                        >
                          <Globe className="h-3 w-3 mr-1" />
                          {project.link.replace(/^https?:\/\/(www\.)?/, '')}
                        </a>
                      </div>
                    )}
                    
                    {project.summary && (
                      <p className="text-xs text-gray-700 mb-2">{project.summary}</p>
                    )}
                    
                    {project.description && (
                      <p className="text-xs text-gray-600 mb-2 whitespace-pre-line">{project.description}</p>
                    )}
                    
                    {project.deliverables.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs font-semibold text-gray-700 mb-1">Key Deliverables:</p>
                        <ul className="list-disc pl-4 text-gray-700 space-y-1">
                          {project.deliverables.map((bullet, i) => (
                            <li key={i} className="text-xs leading-tight">{bullet}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {project.technologies.length > 0 && (
                      <div className="mt-2">
                        <p className="text-xs font-semibold text-gray-700 mb-1">Technologies:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.map((tech, i) => (
                            <Badge key={i} variant="outline" className="bg-white text-gray-700 border-gray-200 text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate; 