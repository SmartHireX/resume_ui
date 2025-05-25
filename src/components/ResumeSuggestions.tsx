import React from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { IEnhancementSuggestion, ResumeSuggestionsProps } from "@/interfaces/interfaces";

// Helper function to render complex objects (like skills)
const renderContent = (content: any): React.ReactNode => {
  if (content === null || content === undefined) {
    return "N/A";
  }
  
  if (typeof content === 'string') {
    return content;
  }
  
  // Special handling for experience objects (could be an array)
  if (Array.isArray(content) && content.length > 0 && content[0].title && content[0].company) {
    return (
      <div className="space-y-4">
        {content.map((exp, idx) => (
          <div key={idx} className="border-l-2 border-gray-200 pl-2">
            <div className="font-medium">{exp.title} at {exp.company}</div>
            <div className="text-[10px] text-gray-600">{exp.duration}</div>
            
            {Array.isArray(exp.responsibilities) && exp.responsibilities.length > 0 && (
              <div className="mt-1">
                <div className="text-[10px] font-medium">Responsibilities:</div>
                <ul className="list-disc pl-4 text-[9px] space-y-0.5">
                  {exp.responsibilities.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {Array.isArray(exp.technologies) && exp.technologies.length > 0 && (
              <div className="mt-1">
                <div className="text-[10px] font-medium">Technologies:</div>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {exp.technologies.map((tech: string, i: number) => (
                    <span key={i} className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-[8px]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
  
  // Special handling for projects (could be an array)
  if (Array.isArray(content) && content.length > 0 && content[0].name && 'summary' in content[0]) {
    return (
      <div className="space-y-4">
        {content.map((project, idx) => (
          <div key={idx} className="border-l-2 border-gray-200 pl-2">
            <div className="font-medium">{project.name}</div>
            {project.duration && <div className="text-[10px] text-gray-600">{project.duration}</div>}
            
            {project.summary && (
              <div className="mt-1">
                <div className="text-[10px] font-medium">Summary:</div>
                <div className="text-[9px]">{project.summary}</div>
              </div>
            )}
            
            {project.description && (
              <div className="mt-1">
                <div className="text-[10px] font-medium">Description:</div>
                <div className="text-[9px]">{project.description}</div>
              </div>
            )}
            
            {Array.isArray(project.deliverables) && project.deliverables.length > 0 && (
              <div className="mt-1">
                <div className="text-[10px] font-medium">Deliverables:</div>
                <ul className="list-disc pl-4 text-[9px] space-y-0.5">
                  {project.deliverables.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {Array.isArray(project.technologies) && project.technologies.length > 0 && (
              <div className="mt-1">
                <div className="text-[10px] font-medium">Technologies:</div>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {project.technologies.map((tech: string, i: number) => (
                    <span key={i} className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-[8px]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
  
  // Regular array handling
  if (Array.isArray(content)) {
    return (
      <ul className="list-disc pl-4 text-xs">
        {content.map((item, idx) => <li key={idx}>{typeof item === 'string' ? item : renderContent(item)}</li>)}
      </ul>
    );
  }
  
  // Special case for individual experience object
  if (typeof content === 'object' && content.title && content.company) {
    return (
      <div className="border-l-2 border-gray-200 pl-2">
        <div className="font-medium">{content.title} at {content.company}</div>
        <div className="text-[10px] text-gray-600">{content.duration}</div>
        
        {Array.isArray(content.responsibilities) && content.responsibilities.length > 0 && (
          <div className="mt-1">
            <div className="text-[10px] font-medium">Responsibilities:</div>
            <ul className="list-disc pl-4 text-[9px] space-y-0.5">
              {content.responsibilities.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        
        {Array.isArray(content.technologies) && content.technologies.length > 0 && (
          <div className="mt-1">
            <div className="text-[10px] font-medium">Technologies:</div>
            <div className="flex flex-wrap gap-1 mt-0.5">
              {content.technologies.map((tech: string, i: number) => (
                <span key={i} className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-[8px]">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // Special case for individual project object
  if (typeof content === 'object' && content.name && 'summary' in content) {
    return (
      <div className="border-l-2 border-gray-200 pl-2">
        <div className="font-medium">{content.name}</div>
        {content.duration && <div className="text-[10px] text-gray-600">{content.duration}</div>}
        
        {content.summary && (
          <div className="mt-1">
            <div className="text-[10px] font-medium">Summary:</div>
            <div className="text-[9px]">{content.summary}</div>
          </div>
        )}
        
        {content.description && (
          <div className="mt-1">
            <div className="text-[10px] font-medium">Description:</div>
            <div className="text-[9px]">{content.description}</div>
          </div>
        )}
        
        {Array.isArray(content.deliverables) && content.deliverables.length > 0 && (
          <div className="mt-1">
            <div className="text-[10px] font-medium">Deliverables:</div>
            <ul className="list-disc pl-4 text-[9px] space-y-0.5">
              {content.deliverables.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        
        {Array.isArray(content.technologies) && content.technologies.length > 0 && (
          <div className="mt-1">
            <div className="text-[10px] font-medium">Technologies:</div>
            <div className="flex flex-wrap gap-1 mt-0.5">
              {content.technologies.map((tech: string, i: number) => (
                <span key={i} className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-[8px]">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
  
  // Skills object or other complex objects
  if (typeof content === 'object') {
    return (
      <div className="text-xs">
        {Object.entries(content).map(([key, value]) => {
          if (Array.isArray(value) && value.length > 0) {
            return (
              <div key={key} className="mb-2">
                <p className="font-medium capitalize">{key.replace(/_/g, ' ')}:</p>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {(value as any[]).map((item, idx) => (
                    <span key={idx} className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-[9px]">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          }
          return null;
        }).filter(Boolean)}
      </div>
    );
  }
  
  return String(content);
};

const capitalizeWords = (str: string): string => {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};


const MobileSuggestion: React.FC<{
  suggestion: IEnhancementSuggestion;
  index: number;
  onAccept: (index: number) => void;
  onReject: (index: number) => void;
}> = ({ suggestion, index, onAccept, onReject }) => {
  return (
    <Card key={index} className="border border-muted p-3 animate-fade-in">
      <div className="mb-1.5">
        <span className="text-[10px] font-medium bg-muted px-1.5 py-0.5 rounded">
          {capitalizeWords(suggestion.section)}
        </span>
      </div>
      
      <div className="flex flex-col gap-2">
        <div className="bg-muted/30 p-2 rounded border-l-2 border-destructive">
          <div className="text-[10px] line-through text-muted-foreground">
            {renderContent(suggestion.original)}
          </div>
        </div>
        
        <div className="bg-muted/30 p-2 rounded border-l-2 border-primary">
          <div className="text-[10px] font-medium">
            {renderContent(suggestion.improved)}
          </div>
        </div>
        
        <div className="bg-primary/5 p-2 rounded border-l-2 border-primary/50">
          <p className="text-[9px] text-muted-foreground"><span className="font-medium">Why:</span> {suggestion.reason}</p>
        </div>
        
        <div className="flex justify-end gap-1.5 mt-1">
          <Button
            variant="outline"
            size="sm"
            className="gap-1 text-[10px] h-7 px-2"
            onClick={() => onReject(index)}
          >
            <XCircle className="h-3 w-3" />
            Ignore
          </Button>
          <Button
            variant="default"
            size="sm"
            className="gap-1 text-[10px] h-7 px-2"
            onClick={() => onAccept(index)}
          >
            <CheckCircle className="h-3 w-3" />
            Apply
          </Button>
        </div>
      </div>
    </Card>
  );
};

const DesktopSuggestion: React.FC<{
  suggestion: IEnhancementSuggestion;
  index: number;
  onAccept: (index: number) => void;
  onReject: (index: number) => void;
}> = ({ suggestion, index, onAccept, onReject }) => {
  return (
    <Card key={index} className="border border-muted p-4 animate-fade-in">
      <div className="mb-2">
        <span className="text-xs font-medium bg-muted px-2 py-1 rounded">
          {capitalizeWords(suggestion.section)}
        </span>
      </div>
      
      <div className="flex flex-col gap-4">
        <div className="bg-muted/30 p-3 rounded border-l-2 border-destructive">
          <div className="text-sm line-through text-muted-foreground">
            {renderContent(suggestion.original)}
          </div>
        </div>
        
        <div className="bg-muted/30 p-3 rounded border-l-2 border-primary">
          <div className="text-sm font-medium">
            {renderContent(suggestion.improved)}
          </div>
        </div>
        
        <div className="bg-primary/5 p-3 rounded border-l-2 border-primary/50">
          <p className="text-xs text-muted-foreground"><span className="font-medium">Why:</span> {suggestion.reason}</p>
        </div>
        
        <div className="flex justify-end gap-2 mt-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={() => onReject(index)}
          >
            <XCircle className="h-4 w-4" />
            Ignore
          </Button>
          <Button
            variant="default"
            size="sm"
            className="gap-1"
            onClick={() => onAccept(index)}
          >
            <CheckCircle className="h-4 w-4" />
            Apply
          </Button>
        </div>
      </div>
    </Card>
  );
};

const ResumeSuggestions: React.FC<ResumeSuggestionsProps> = ({
  suggestions,
  onAcceptSuggestion,
  onRejectSuggestion,
}) => {
  const isMobile = useIsMobile();

  if (suggestions.length === 0) {
    return (
      <Card className="p-4 sm:p-6 text-center">
        <p className="text-muted-foreground text-xs sm:text-sm">No suggestions available yet.</p>
      </Card>
    );
  }

  const handleAccept = (index: number) => {
    if (onAcceptSuggestion) {
      onAcceptSuggestion(index);
    }
  };

  const handleReject = (index: number) => {
    if (onRejectSuggestion) {
      onRejectSuggestion(index);
    }
  };

  return (
    <div className="flex flex-col gap-3 sm:gap-6 max-w-4xl mx-auto">
      {suggestions.map((suggestion, index) => (
        isMobile ? (
          <MobileSuggestion 
            key={index}
            suggestion={suggestion} 
            index={index}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        ) : (
          <DesktopSuggestion 
            key={index}
            suggestion={suggestion} 
            index={index}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        )
      ))}
    </div>
  );
};

export default ResumeSuggestions;
