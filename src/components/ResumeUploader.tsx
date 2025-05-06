import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Upload, FileText, CheckCircle, AlertCircle, Shield, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { Paper, Stepper, Step, StepLabel, Typography, LinearProgress, Box, StepConnector, stepConnectorClasses } from "@mui/material";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { styled } from '@mui/material/styles';

interface ResumeUploaderProps {
  onFileUpload?: (file: File) => void;
  onEnhanceResume?: (jobDescription: string) => void;
  isProcessing?: boolean;
  isResumeUploaded?: boolean;
}

// Custom styling for the stepper connector
const CustomConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 11.5,
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    backgroundColor: 'rgb(179, 189, 204)',
    borderRadius: 1,
  },
}));

// Custom styling for step icon
const CustomStepIconRoot = styled('div')<{ active?: boolean }>(({ theme, active }) => ({
  color: '#fff',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1,
  '& .StepIcon-completedIcon': {
    fontSize: 18,
    color: '#4CAF50',
  },
  '& .StepIcon-circle': {
    width: 23,
    height: 23,
    borderRadius: '50%',
    backgroundColor: active ? '#3366FF' : 'rgb(179, 189, 204)',
    color: active ? '#FFFFFF' : '#333',
    border: active ? '2px solid #3366FF' : '2px solid rgb(179, 189, 204)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 12,
  },
}));

function CustomStepIcon(props: any) {
  const { active, completed, className, icon } = props;
  
  return (
    <CustomStepIconRoot active={active} className={className}>
      {completed ? (
        <CheckCircle className="StepIcon-completedIcon" />
      ) : (
        <div className="StepIcon-circle">{icon}</div>
      )}
    </CustomStepIconRoot>
  );
}

const ResumeUploader = ({ 
  onFileUpload, 
  onEnhanceResume,
  isProcessing = false,
  isResumeUploaded = false
}: ResumeUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [jobDescription, setJobDescription] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const steps = ['Upload Resume', 'Add Job Description', 'AI Processing'];

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      handleFileSelection(droppedFile);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      handleFileSelection(selectedFile);
    }
  };

  const handleFileSelection = (selectedFile: File) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!allowedTypes.includes(selectedFile.type)) {
      toast("Invalid file format", {
        description: "Please upload a PDF or Word document",
        icon: <AlertCircle className="h-5 w-5 text-destructive" />,
      });
      return;
    }
    
    if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
      toast("File too large", {
        description: "File size exceeds 5MB limit",
        icon: <AlertCircle className="h-5 w-5 text-destructive" />,
      });
      return;
    }
    
    // Generate preview URL
    const fileUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(fileUrl);
    
    setFile(selectedFile);
    setActiveStep(1);

    // Notify parent component about the uploaded file
    if (onFileUpload) {
      onFileUpload(selectedFile);
    }
  };

  const handleFileUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    if (!file) {
      toast("Missing resume", {
        description: "Please upload a resume first",
        icon: <AlertCircle className="h-5 w-5 text-destructive" />,
      });
      return;
    }

    if (!jobDescription.trim()) {
      toast("Missing job description", {
        description: "Please add the job description you're targeting",
        icon: <AlertCircle className="h-5 w-5 text-destructive" />,
      });
      return;
    }
    
    setActiveStep(2);
    
    if (onEnhanceResume) {
      onEnhanceResume(jobDescription);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    if (isResumeUploaded && !file) {
      setActiveStep(1);
    }
  }, [isResumeUploaded]);

  if (!file && !isResumeUploaded) {
    return (
      <div className="w-full mx-auto">
        <Box sx={{ width: '100%', mb: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel connector={<CustomConnector />}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel StepIconComponent={CustomStepIcon}>
                  <span style={{ 
                    color: index === activeStep ? '#3366FF' : 'rgb(100, 116, 139)', 
                    fontWeight: index === activeStep ? 'bold' : 'normal',
                    fontSize: index === activeStep ? '0.95rem' : '0.875rem'
                  }}>
                    {label}
                  </span>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          className="hidden"
          accept=".pdf,.doc,.docx"
        />
        
        <Card 
          className={cn(
            "border-2 border-dashed p-10 text-center cursor-pointer transition-all duration-200 gradient-border bg-card/50 mx-12 my-0",
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary/50"
          )}
          onClick={handleFileUploadClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Upload className="h-8 w-8 text-primary animate-pulse-subtle" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Upload Your Resume</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Drag and drop your resume file here, or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                Supports PDF, DOC, DOCX (Max 5MB)
              </p>
            </div>
          </div>
        </Card>
        
        <div className="flex items-center justify-center mt-4">
          <Shield className="h-4 w-4 mr-2 text-muted-foreground/70" />
          <p className="text-xs text-muted-foreground text-center">
            Your resume data is processed securely and never shared
          </p>
        </div>
      </div>
    );
  }

  if (!isProcessing && activeStep === 1) {
    return (
      <div className="w-full">
        <Box sx={{ width: '100%', mb: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel connector={<CustomConnector />}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel StepIconComponent={CustomStepIcon}>
                  <span style={{ 
                    color: index === activeStep ? '#3366FF' : 'rgb(100, 116, 139)', 
                    fontWeight: index === activeStep ? 'bold' : 'normal',
                    fontSize: index === activeStep ? '0.95rem' : '0.875rem'
                  }}>
                    {label}
                  </span>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        
        <Card className="p-6 border shadow-sm mx-12 my-0">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="rounded-full bg-primary/10 p-2 flex-shrink-0">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="space-y-1">
                <h3 className="text-md font-medium truncate max-w-[200px] sm:max-w-xs">
                  {file ? file.name : "Resume uploaded"}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "Ready for enhancement"}
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4 m-4">
            <div>
              <Label htmlFor="job-description" className="flex items-center gap-2 font-medium">
                <Briefcase className="h-4 w-4" />
                Job Description
              </Label>
              <Textarea 
                id="job-description"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description you're applying for here..."
                className="h-[150px] mt-2 resize-none"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Our AI will tailor your resume to match this job description
              </p>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <Button 
              variant="default" 
              onClick={handleSubmit}
              className={cn(
                jobDescription.replace(/\s/g, '').length > 30 ? "hover:animate-pulse-subtle" : "",
                "transition-all duration-200"
              )}
              disabled={jobDescription.replace(/\s/g, '').length <= 30}
            >
              Enhance Resume
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Card className="p-6 border">
        <Box sx={{ width: '100%', mb: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel connector={<CustomConnector />}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel StepIconComponent={CustomStepIcon}>
                  <span style={{ 
                    color: index === activeStep ? '#3366FF' : 'rgb(100, 116, 139)', 
                    fontWeight: index === activeStep ? 'bold' : 'normal',
                    fontSize: index === activeStep ? '0.95rem' : '0.875rem'
                  }}>
                    {label}
                  </span>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        
        <div className="space-y-4">
          <div className="flex items-center justify-center mb-4">
            <Paper elevation={3} className="p-4 bg-primary/5 rounded-full">
              <FileText className="h-8 w-8 text-primary animate-pulse" />
            </Paper>
          </div>
          
          <Typography variant="h6" className="text-center">
            Enhancing Your Resume
          </Typography>
          
          <Typography variant="body2" className="text-center text-muted-foreground mb-4">
            Our AI is analyzing your document and making improvements...
          </Typography>
          
          <LinearProgress 
            color="primary" 
            sx={{ 
              height: 8, 
              borderRadius: 4,
              bgcolor: 'rgba(99, 102, 241, 0.1)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                bgcolor: 'var(--primary)',
              }
            }} 
          />
          
          <ul className="text-xs space-y-2 text-muted-foreground mt-4">
            <li className="flex items-center">
              <CheckCircle className="h-3 w-3 mr-2 text-primary" />
              Analyzing document structure...
            </li>
            <li className="flex items-center">
              <CheckCircle className="h-3 w-3 mr-2 text-primary" />
              Checking for industry keywords...
            </li>
            <li className="flex items-center animate-pulse">
              <div className="h-3 w-3 mr-2 rounded-full bg-primary" />
              Optimizing achievements and skills...
            </li>
          </ul>
        </div>
      </Card>
      
      <div className="flex items-center justify-center mt-4">
        <Shield className="h-4 w-4 mr-2 text-muted-foreground/70" />
        <p className="text-xs text-muted-foreground text-center">
          Your resume data is processed securely and never shared
        </p>
      </div>
    </div>
  );
};

export default ResumeUploader;
