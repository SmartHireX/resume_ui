import React, { useState, useRef } from "react";
import Header from "@/components/Header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Loader2, XCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import ResumeUploader from "@/components/ResumeUploader";
import ResumeSuggestions from "@/components/ResumeSuggestions";
import ResumePreview from "@/components/ResumePreview";
import { parseResume, getEnhancementSuggestions } from "@/services/resumeService";
import { useIsMobile } from "@/hooks/use-mobile";
import Footer from "@/components/Footer";
import { useReactToPrint } from 'react-to-print';
import '../components/PrintStyles.css';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';
import { IATSScore, IDetailedATSScores, IEnhancementSuggestion, IFlexibleResumeData, IImprovedResume } from "@/interfaces/interfaces";
import { convertToResumeData } from "@/lib/resumeHelpers";
import { ENHANCE_SUGGESTIONS_ERROR, ENHANCE_SUGGESTIONS_INFO, JOB_DESCRIPTION_INFO, PARSE_ERROR, TRY_AGAIN, UPLOAD_SUCCESS } from "@/lib/alerts";
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';


const DesktopLayout: React.FC<{
  children: React.ReactNode;
  resumePreviewRef: React.RefObject<HTMLDivElement>;
  resumeData: IFlexibleResumeData;
  isLoading: boolean;
}> = ({ children, resumePreviewRef, resumeData, isLoading }) => {
  return (
    <section className="split-layout">
      <div className="description-side bg-muted/30 p-8">
        <div className="h-full w-full flex items-center justify-center p-6">
          <div ref={resumePreviewRef} className="resume-preview w-full h-[70vh] rounded-lg shadow-sm overflow-hidden">
            {isLoading ? (
              <div className="w-full h-full flex items-center justify-center bg-card text-card-foreground">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2 text-sm">Parsing resume...</span>
              </div>
            ) : (
              <ResumePreview resumeData={resumeData as any} />
            )}
          </div>
        </div>
      </div>
      <div className="upload-side">
        <div className="flex flex-col justify-center w-full max-w-[53rem] px-4 h-[42rem]">
          {children}
        </div>
      </div>
    </section>
  );
};

const MobileLayout: React.FC<{
  children: React.ReactNode;
  resumePreviewRef: React.RefObject<HTMLDivElement>;
  resumeData: IFlexibleResumeData;
  isLoading: boolean;
}> = ({ children, resumePreviewRef, resumeData, isLoading }) => {
  return (
    <section className="flex flex-col">
      <div className="p-2 bg-muted/30 border-b border-border/50">
        <div ref={resumePreviewRef} className="w-full h-[38vh] rounded-lg shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-card text-card-foreground">
              <Loader2 className="h-5 w-5 animate-spin text-primary mb-2" />
              <span className="text-xs">Parsing resume...</span>
            </div>
          ) : (
            <ResumePreview resumeData={resumeData as any} />
          )}
        </div>
      </div>
      <div className="p-3 flex-1 overflow-y-auto safe-area-padding-bottom pb-20">
        <div className="w-full">
          {children}
        </div>
      </div>
    </section>
  );
};

const EnhancePage = () => {
  const [resumeData, setResumeData] = useState<IFlexibleResumeData>(null);
  const [showEnhancements, setShowEnhancements] = useState(false);
  const [suggestions, setSuggestions] = useState<IEnhancementSuggestion[]>([]);
  const [atsScore, setAtsScore] = useState<IATSScore | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);
  const [allSuggestionsDone, setAllSuggestionsDone] = useState(false);
  const resumePreviewRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const navigate = useNavigate();

  // Keep track of the detailed ATS score breakdown received from the API
  const [detailedAtsScore, setDetailedAtsScore] = useState<IDetailedATSScores>(undefined);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);

    try {
      const parsedResumeData: any = await parseResume(file);

      if (parsedResumeData.status === "success") {
        // Ensure parsedResumeData has the structure expected by ResumePreview
        const formattedResumeData: IFlexibleResumeData = convertToResumeData(parsedResumeData.resume_data);
        setResumeData(formattedResumeData);
        toast(UPLOAD_SUCCESS, {
          description: JOB_DESCRIPTION_INFO,
          duration: 2000,
        });
      }
      else {
        setErrorMessage(PARSE_ERROR);
        setShowErrorDialog(true);
      }
    } catch (error) {
      console.error(PARSE_ERROR, error);
      setErrorMessage(PARSE_ERROR);
      setShowErrorDialog(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseErrorDialog = () => {
    setShowErrorDialog(false);
    setErrorMessage(null);
    navigate('/');
  };

  const handleEnhanceResume = async (jobDesc: string) => {
    if (!resumeData) return;

    setIsGeneratingSuggestions(true);

    try {
      // Convert to the format expected by the API
      const apiResumeData = {
        personalInfo: resumeData.personalInfo,
        summary: resumeData.summary,
        experience: resumeData.experience.map(exp => ({
          title: exp.title,
          company: exp.company,
          location: exp.location,
          duration: exp.duration,
          responsibilities: exp.responsibilities,
          achievements: exp.achievements,
          technologies: exp.technologies
        })),
        education: resumeData.education,
        projects: resumeData.projects,
        skills: resumeData.skills,
        certifications: resumeData.certifications,
        achievements: resumeData.achievements,
        languages_known: resumeData.languages_known
      } as unknown as IFlexibleResumeData;

      const enhancementResponse: IImprovedResume = await getEnhancementSuggestions(apiResumeData, jobDesc);

      if (enhancementResponse.improved_sections.length > 0) {
        setSuggestions(enhancementResponse.improved_sections);
        setAtsScore(enhancementResponse.ats_score);
        setDetailedAtsScore(enhancementResponse.ats_score);
        setShowEnhancements(true);
        setAllSuggestionsDone(false);
      } else {
        console.warn(ENHANCE_SUGGESTIONS_INFO);
        toast(ENHANCE_SUGGESTIONS_INFO, {
          description: TRY_AGAIN,
        });
      }
    } catch (error) {
      console.error(ENHANCE_SUGGESTIONS_ERROR, error);
      toast(ENHANCE_SUGGESTIONS_ERROR, {
        description: TRY_AGAIN,
      });
    } finally {
      setIsGeneratingSuggestions(false);
    }
  };

  const handleAcceptSuggestion = (index: number) => {
    if (!resumeData) return;

    const suggestion = suggestions[index];
    const updatedResumeData = { ...resumeData };

    switch (suggestion.section.toLowerCase()) {
      case "summary":
        if (suggestion.improved)
          updatedResumeData.summary = suggestion.improved;
        break;

      case "experience":
        // Handle experience improvements
        if (typeof suggestion.original === 'object' && typeof suggestion.improved === 'object' && suggestion.improved !== null) {

          // Check if the experience data is an array (multiple entries)
          if (Array.isArray(suggestion.improved)) {

            // Replace all experience entries with the improved ones
            updatedResumeData.experience = suggestion.improved.map((improvExp: any) => ({
              title: improvExp.title || "",
              company: improvExp.company || "",
              duration: improvExp.duration || "",
              location: improvExp.location || "",
              responsibilities: Array.isArray(improvExp.responsibilities) ? improvExp.responsibilities : [],
              achievements: Array.isArray(improvExp.achievements) ? improvExp.achievements : [],
              technologies: Array.isArray(improvExp.technologies) ? improvExp.technologies : []
            }));

          } else {
            // Single experience object
            const origExp = suggestion.original as any;
            const improvedExp = suggestion.improved as any;

            // Find the matching experience entry
            const expIndex = updatedResumeData.experience.findIndex(exp =>
              exp.title === origExp.title &&
              exp.company === origExp.company
            );

            if (expIndex !== -1) {
              // Create a new object that combines the existing experience with improved fields
              const existingExp = updatedResumeData.experience[expIndex];
              const updatedExp = {
                ...existingExp,
                title: improvedExp.title || existingExp.title,
                company: improvedExp.company || existingExp.company,
                duration: improvedExp.duration || existingExp.duration,
                location: improvedExp.location || existingExp.location || "",
                technologies: Array.isArray(improvedExp.technologies)
                  ? improvedExp.technologies
                  : existingExp.technologies
              };

              // Handle the responsibilities array specifically since it's a common field to update
              if (Array.isArray(improvedExp.responsibilities)) {
                updatedExp.responsibilities = [...improvedExp.responsibilities];
              }

              // Handle achievements if they exist in the improved experience
              if (Array.isArray(improvedExp.achievements)) {
                updatedExp.achievements = [...improvedExp.achievements];
              }

              updatedResumeData.experience[expIndex] = updatedExp;

            } else {
              // If experience not found but we have complete data, create a new entry
              if (improvedExp.title && improvedExp.company && improvedExp.duration) {
                const newExp = {
                  title: improvedExp.title,
                  company: improvedExp.company,
                  duration: improvedExp.duration,
                  location: improvedExp.location || "",
                  responsibilities: Array.isArray(improvedExp.responsibilities) ? improvedExp.responsibilities : [],
                  achievements: Array.isArray(improvedExp.achievements) ? improvedExp.achievements : [],
                  technologies: Array.isArray(improvedExp.technologies) ? improvedExp.technologies : []
                };
                updatedResumeData.experience.push(newExp);
              }
            }
          }
        }
        break;

      case "skills":
        // Handle skills category improvements
        if (typeof suggestion.original === 'object' && typeof suggestion.improved === 'object' && suggestion.improved !== null) {
          const improvedSkills = suggestion.improved as any;

          // Check that improvedSkills has the expected properties
          if (improvedSkills.programming_languages ||
            improvedSkills.databases ||
            improvedSkills.technologies ||
            improvedSkills.frameworks ||
            improvedSkills.tools ||
            improvedSkills.soft_skills ||
            improvedSkills.other) {

            // Update each skill category if it exists
            const skillCategories = [
              'programming_languages', 'databases', 'technologies',
              'frameworks', 'tools', 'soft_skills', 'other'
            ];

            skillCategories.forEach(category => {
              if (Array.isArray(improvedSkills[category])) {
                updatedResumeData.skills[category] = [...improvedSkills[category]];
              }
            });
          }
        }
        break;

      case "projects":
        // Handle project improvements
        if (typeof suggestion.original === 'object' && typeof suggestion.improved === 'object' && suggestion.improved !== null) {

          // Check if the project data is an array
          if (Array.isArray(suggestion.improved)) {

            // Replace all projects with the improved ones
            updatedResumeData.projects = suggestion.improved.map((proj: any) => ({
              name: proj.name || "",
              duration: proj.duration || "",
              summary: proj.summary || "",
              description: proj.description || null,
              deliverables: Array.isArray(proj.deliverables) ? proj.deliverables : [],
              technologies: Array.isArray(proj.technologies) ? proj.technologies : []
            }));
          } else {
            // Single project object
            const origProject = suggestion.original as any;
            const improvedProject = suggestion.improved as any;

            // Find the matching project
            const projectIndex = updatedResumeData.projects.findIndex(proj =>
              proj.name === origProject.name
            );

            if (projectIndex !== -1) {
              const existingProject = updatedResumeData.projects[projectIndex];
              // Update project properties
              updatedResumeData.projects[projectIndex] = {
                ...existingProject,
                name: improvedProject.name || existingProject.name,
                duration: improvedProject.duration || existingProject.duration,
                description: improvedProject.description || existingProject.description,
                summary: improvedProject.summary || existingProject.summary || "",
                deliverables: Array.isArray(improvedProject.deliverables) ? improvedProject.deliverables : existingProject.deliverables,
                technologies: Array.isArray(improvedProject.technologies) ? improvedProject.technologies : existingProject.technologies
              };
            }
          }
        }
        break;

      case "education":
        // Handle education improvements
        if (typeof suggestion.original === 'object' && typeof suggestion.improved === 'object' && suggestion.improved !== null) {

          // Check if the education data is an array
          if (Array.isArray(suggestion.improved)) {
            // Replace all education entries with the improved ones
            updatedResumeData.education = suggestion.improved.map((edu: any) => ({
              qualification: edu.qualification || "",
              institute: edu.institute || "",
              duration: edu.duration || "",
              marks: edu.marks || "",
              field_of_study: edu.field_of_study || ""
            }));
          } else {
            // Single education object
            const origEdu = suggestion.original as any;
            const improvedEdu = suggestion.improved as any;

            // Find the matching education entry
            const eduIndex = updatedResumeData.education.findIndex(edu =>
              edu.qualification === origEdu.qualification &&
              edu.institute === origEdu.institute
            );

            if (eduIndex !== -1) {
              const existingEdu = updatedResumeData.education[eduIndex];
              // Update education properties
              updatedResumeData.education[eduIndex] = {
                ...existingEdu,
                qualification: improvedEdu.qualification || existingEdu.qualification,
                institute: improvedEdu.institute || existingEdu.institute,
                duration: improvedEdu.duration || existingEdu.duration,
                marks: improvedEdu.marks || existingEdu.marks || "",
                field_of_study: improvedEdu.field_of_study || existingEdu.field_of_study || ""
              };
            }
          }
        }
        break;

      default:
        // For any other section, attempt to directly update it if it exists
        if (updatedResumeData[suggestion.section.toLowerCase()] && suggestion.improved) {
          updatedResumeData[suggestion.section.toLowerCase()] = suggestion.improved;
        }
    }

    setResumeData(updatedResumeData);

    const updatedSuggestions = [...suggestions];
    updatedSuggestions.splice(index, 1);
    setSuggestions(updatedSuggestions);

    if (updatedSuggestions.length === 0) {
      setAllSuggestionsDone(true);
      toast("All suggestions applied!", {
        description: "Your resume is now ready to download",
        duration: 2000,
      });
    } else {
      toast("Suggestion applied", {
        description: `Updated ${suggestion.section}`,
        duration: 2000,
      });
    }
  };

  const handleRejectSuggestion = (index: number) => {
    // Get the suggestion being rejected
    const suggestion = suggestions[index];
    const section = suggestion.section.toLowerCase();

    // Find the points associated with this section from the detailed ATS score
    // Use the detailedAtsScore state which holds the breakdown
    const pointsToSubtract = detailedAtsScore?.[section] || 0;

    // Update the overall ATS score, subtracting points only from the 'new' score
    // Ensure the new score doesn't drop below the original score
    setAtsScore(prevScore => {
      if (!prevScore) return undefined; // Should not happen if suggestions exist, but good practice
      const potentialNewScore = prevScore.new - pointsToSubtract;
      // Prevent the new score from dropping below the original score
      const clampedNewScore = Math.max(potentialNewScore, prevScore.old);
      return {
        ...prevScore,
        new: clampedNewScore
      };
    });

    // Remove the suggestion from the list
    const updatedSuggestions = [...suggestions];
    updatedSuggestions.splice(index, 1);
    setSuggestions(updatedSuggestions);

    if (updatedSuggestions.length === 0) {
      setAllSuggestionsDone(true);
      toast("All suggestions processed!", {
        description: "Your resume is now ready to download",
        duration: 2000,
      });
    } else {
      toast("Suggestion ignored", {
        description: "You can continue with remaining suggestions",
        duration: 2000,
      });
    }
  };

  const handleRejectAll = () => {
    if (!suggestions.length) return;

    // Store the current suggestions length
    const totalSuggestions = suggestions.length;

    // Clear all suggestions at once
    setSuggestions([]);
    setAllSuggestionsDone(true);

    // When rejecting all, reset the ATS score to the original score
    setAtsScore(prevScore => {
      if (!prevScore) return undefined;
      return {
        ...prevScore,
        new: prevScore.old // Reset new score back to original
      };
    });

    toast(`${totalSuggestions} suggestions rejected`, {
      description: "Your resume remains unchanged",
      duration: 2000,
    });
  };

  const handleAcceptAll = () => {
    if (!suggestions.length) return;

    // Store the current suggestions and resume data
    const allSuggestions = [...suggestions];
    const updatedResumeData = { ...resumeData };

    // Process all suggestions and update resume data
    allSuggestions.forEach((suggestion) => {
      const section = suggestion.section.toLowerCase();

      switch (section) {
        case "summary":
          if (suggestion.improved) {
            updatedResumeData.summary = suggestion.improved;
          }
          break;
        case "experience":
          if (typeof suggestion.improved === 'object' && suggestion.improved !== null) {
            if (Array.isArray(suggestion.improved)) {
              updatedResumeData.experience = suggestion.improved.map(improvExp => ({
                title: improvExp.title || "",
                company: improvExp.company || "",
                duration: improvExp.duration || "",
                location: improvExp.location || "",
                responsibilities: Array.isArray(improvExp.responsibilities) ? improvExp.responsibilities : [],
                achievements: Array.isArray(improvExp.achievements) ? improvExp.achievements : [],
                technologies: Array.isArray(improvExp.technologies) ? improvExp.technologies : []
              }));
            } else {
              const improvedExp = suggestion.improved;
              const expIndex = updatedResumeData.experience.findIndex(exp =>
                exp.title === improvedExp.title && exp.company === improvedExp.company
              );

              if (expIndex !== -1) {
                updatedResumeData.experience[expIndex] = {
                  ...updatedResumeData.experience[expIndex],
                  ...improvedExp,
                  responsibilities: Array.isArray(improvedExp.responsibilities) ? improvedExp.responsibilities : [],
                  achievements: Array.isArray(improvedExp.achievements) ? improvedExp.achievements : [],
                  technologies: Array.isArray(improvedExp.technologies) ? improvedExp.technologies : []
                };
              }
            }
          }
          break;
        case "skills":
          if (typeof suggestion.improved === 'object' && suggestion.improved !== null) {
            const improvedSkills = suggestion.improved;
            const skillCategories = [
              'programming_languages', 'databases', 'technologies',
              'frameworks', 'tools', 'soft_skills', 'other'
            ];

            skillCategories.forEach(category => {
              if (Array.isArray(improvedSkills[category])) {
                updatedResumeData.skills[category] = [...improvedSkills[category]];
              }
            });
          }
          break;
        case "projects":
          if (typeof suggestion.improved === 'object' && suggestion.improved !== null) {
            if (Array.isArray(suggestion.improved)) {
              updatedResumeData.projects = suggestion.improved.map(proj => ({
                name: proj.name || "",
                duration: proj.duration || "",
                summary: proj.summary || "",
                description: proj.description || null,
                deliverables: Array.isArray(proj.deliverables) ? proj.deliverables : [],
                technologies: Array.isArray(proj.technologies) ? proj.technologies : []
              }));
            } else {
              const improvedProj = suggestion.improved;
              const projIndex = updatedResumeData.projects.findIndex(proj =>
                proj.name === improvedProj.name
              );

              if (projIndex !== -1) {
                updatedResumeData.projects[projIndex] = {
                  ...updatedResumeData.projects[projIndex],
                  ...improvedProj,
                  deliverables: Array.isArray(improvedProj.deliverables) ? improvedProj.deliverables : [],
                  technologies: Array.isArray(improvedProj.technologies) ? improvedProj.technologies : []
                };
              }
            }
          }
          break;
        case "education":
          if (typeof suggestion.improved === 'object' && suggestion.improved !== null) {
            if (Array.isArray(suggestion.improved)) {
              updatedResumeData.education = suggestion.improved.map(edu => ({
                qualification: edu.qualification || "",
                institute: edu.institute || "",
                duration: edu.duration || "",
                marks: edu.marks || "",
                field_of_study: edu.field_of_study || ""
              }));
            } else {
              const improvedEdu = suggestion.improved;
              const eduIndex = updatedResumeData.education.findIndex(edu =>
                edu.qualification === improvedEdu.qualification &&
                edu.institute === improvedEdu.institute
              );

              if (eduIndex !== -1) {
                updatedResumeData.education[eduIndex] = {
                  ...updatedResumeData.education[eduIndex],
                  ...improvedEdu
                };
              }
            }
          }
          break;
        default:
          // For any other section, directly update if it exists
          if (updatedResumeData[section] && suggestion.improved) {
            updatedResumeData[section] = suggestion.improved;
          }
      }
    });

    // Update resume data with all changes at once
    setResumeData(updatedResumeData);

    // Clear all suggestions and mark as done
    setSuggestions([]);
    setAllSuggestionsDone(true);

    toast(`${allSuggestions.length} suggestions applied!`, {
      description: "Your resume has been fully enhanced",
    });
  };

  const handlePrint = useReactToPrint({
    content: () => resumePreviewRef.current,
    documentTitle: resumeData?.personalInfo?.name
      ? `${resumeData.personalInfo.name.split(' ')[0]}'s Enhanced Resume`
      : "Enhanced Resume",
    onBeforeGetContent: () => { toast("Preparing for download..."); },
    onAfterPrint: () => {
      // Show success toast but don't navigate away
      toast("Resume download initiated", {
        description: "Please check your downloads folder or browser download dialog"
      });

      // Show a follow-up toast after a short delay to check if download was successful
      setTimeout(() => {
        toast("Did you get your resume?", {
          description: "If download failed, try again or check browser settings",
          action: {
            label: "Try Again",
            onClick: () => handlePrint()
          }
        });
      }, 3000);
    },
    onPrintError: (error) => {
      toast("Resume download failed", {
        description: "Please try again or check your browser settings.",
        action: {
          label: "Try Again",
          onClick: () => handlePrint()
        }
      });
    }
  });

  // Fallback download for mobile devices using html2canvas and jsPDF
  const handleDownload = async () => {
    if (isMobile) {
      if (resumePreviewRef.current) {
        try {
          const canvas = await html2canvas(resumePreviewRef.current);
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('p', 'mm', 'a4');
          const { width: pdfWidth } = pdf.internal.pageSize;
          const imgProps = pdf.getImageProperties(imgData);
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          const fileName = resumeData?.personalInfo?.name
            ? `${resumeData.personalInfo.name.split(' ')[0]}-Resume.pdf`
            : 'resume.pdf';
          pdf.save(fileName);
          toast('Resume download initiated', { description: 'Please check your downloads folder' });
        } catch (error) {
          console.error('Download PDF error:', error);
          toast('Resume download failed', { description: 'Please try again' });
        }
      }
    } else {
      handlePrint();
    }
  };

  const renderContent = () => {
    if (allSuggestionsDone) {
      return (
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          <div className="bg-primary/10 p-4 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h2 className="text-xl font-bold">Resume Enhanced Successfully!</h2>
          {atsScore && (
            <div className="p-4 border rounded-md my-2 w-3/5">
              <h3 className="text-sm font-semibold mb-2">ATS Score Improvement</h3>
              <div className="flex justify-between">
                <div className="text-center">
                  <span className="text-xs text-muted-foreground">Original</span>
                  <p className="text-xl font-bold">{atsScore.old}%</p>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
                <div className="text-center">
                  <span className="text-xs text-muted-foreground">Enhanced</span>
                  <p className="text-xl font-bold text-primary">{atsScore.new}%</p>
                </div>
              </div>
            </div>
          )}
          <p className="text-sm text-muted-foreground text-center">
            All suggestions have been processed. Your resume is now optimized for the job you're targeting.
          </p>

          <Button
            variant="default"
            className="gap-2 text-sm sm:text-base w-full sm:w-auto mt-4"
            onClick={handleDownload}
          >
            <Download className="h-4 w-4 sm:h-5 sm:w-5" />
            Download Enhanced Resume
          </Button>
        </div>
      );
    }

    if (!showEnhancements) {
      return (
        <>
          <h2 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-center">Enhance Your Resume</h2>
          <p className="text-muted-foreground text-center mb-4 sm:mb-6 text-xs sm:text-sm">Your improved resume is just a few clicks away</p>

          <ResumeUploader
            onFileUpload={handleFileUpload}
            onEnhanceResume={handleEnhanceResume}
            isProcessing={isGeneratingSuggestions}
            isResumeUploaded={!!resumeData}
          />
        </>
      );
    }

    return (
      <div className="space-y-3 sm:space-y-6 h-full">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
          <h2 className="text-lg sm:text-xl font-bold">AI Suggestions</h2>
          {atsScore && (
            <div className="p-2 bg-muted/50 rounded-md text-xs flex items-center gap-2">
              <span>ATS Score: <span className="line-through">{atsScore.old}%</span> → <span className="font-bold text-primary">{atsScore.new}%</span></span>
            </div>
          )}
        </div>

        <ScrollArea className="h-[92%] sm:h-[500px] rounded-md border">
          <div className="p-6 sm:p-6">
            {isGeneratingSuggestions ? (
              <div className="flex flex-col items-center justify-center h-40 sm:h-64">
                <Loader2 className="h-5 w-5 sm:h-8 sm:w-8 animate-spin text-primary mb-3 sm:mb-4" />
                <p className="text-xs sm:text-sm">Generating enhancement suggestions...</p>
              </div>
            ) : (
              <ResumeSuggestions
                suggestions={suggestions}
                onAcceptSuggestion={handleAcceptSuggestion}
                onRejectSuggestion={handleRejectSuggestion}
              />
            )}
          </div>
        </ScrollArea>
        <div className="flex justify-end p-4 gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={handleRejectAll}
            disabled={!suggestions.length}
          >
            <XCircle className="h-4 w-4" />
            Ingore All
          </Button>
          <Button
            variant="default"
            size="sm"
            className="gap-1"
            onClick={handleAcceptAll}
            disabled={!suggestions.length}
          >
            <CheckCircle className="h-4 w-4" />
            Apply All
          </Button>

        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <main className="flex-grow overflow-y-auto">
        {isMobile ? (
          <MobileLayout
            resumePreviewRef={resumePreviewRef}
            resumeData={resumeData}
            isLoading={isLoading}
          >
            {renderContent()}
          </MobileLayout>
        ) : (
          <DesktopLayout
            resumePreviewRef={resumePreviewRef}
            resumeData={resumeData}
            isLoading={isLoading}
          >
            {renderContent()}
          </DesktopLayout>
        )}
      </main>
      <Footer />

      {/* Error Dialog */}
      <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-destructive flex items-center"><AlertCircle className="h-5 w-5 mr-2" /> Error</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {errorMessage}
          </DialogDescription>
          <DialogFooter>
            <Button onClick={handleCloseErrorDialog}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EnhancePage;
