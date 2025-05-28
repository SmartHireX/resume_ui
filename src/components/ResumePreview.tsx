import React, { useState } from "react";
import { FileText } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { TemplateSelector, TemplateId, templates } from "@/components/templates";
import { ResumeData } from "@/components/templates/TemplateInterface";

interface ResumePreviewProps {
  resumeData: ResumeData | null;
  isDownloading?: boolean;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData, isDownloading = false }) => {
  const isMobile = useIsMobile();
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>("classic");
  
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

  // Get the correct template component from our registry
  const SelectedTemplate = templates[selectedTemplate];
  
  return (
    <div className="flex flex-col h-full print:bg-transparent print:p-0">
      {!isMobile && !isDownloading && (
        <div className="mb-4 no-print">
          <TemplateSelector 
            selectedTemplate={selectedTemplate}
            onTemplateChange={setSelectedTemplate}
          />
        </div>
      )}
      
      <div className="flex-grow overflow-hidden rounded-lg shadow-sm print:overflow-visible print:rounded-none print:shadow-none print:bg-transparent">
        <SelectedTemplate resumeData={resumeData} />
      </div>
      
      {isMobile && !isDownloading && (
        <div className="mt-4 no-print">
          <TemplateSelector 
            selectedTemplate={selectedTemplate}
            onTemplateChange={setSelectedTemplate}
          />
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
