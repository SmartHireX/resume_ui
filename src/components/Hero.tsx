import { useState } from "react";
import { FileSpreadsheet, Award, Shield, Zap } from "lucide-react";
import { Paper, Typography, Box, Chip, Divider } from "@mui/material";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="split-layout">
      <div className="description-side bg-muted/30">
        {/* Show promotional content */}
        <div className="max-w-xl mx-auto px-4">
          <div className="flex justify-center mb-6 sm:mb-8">
            <Paper elevation={4} className="bg-primary/10 p-4 sm:p-6 rounded-full">
              <FileSpreadsheet className="h-10 w-10 sm:h-16 sm:w-16 text-primary" />
            </Paper>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground text-center mb-4 sm:mb-6 animate-fade-in">
            Upgrade Your Resume With AI
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground text-center mb-6 sm:mb-8 animate-fade-in">
            Upload your existing resume and let our AI enhance it with tailored improvements, 
            better phrasing, and industry-specific optimizations to help you land your dream job.
          </p>
          
          {/* Trust indicators */}
          <Box className="flex justify-center gap-2 sm:gap-4 mb-6 sm:mb-8 flex-wrap">
            <Chip 
              icon={<Shield className="h-3 w-3 sm:h-4 sm:w-4" style={{ color: "#333" }} />}
              label="100% Secure" 
              className="font-bold text-xs sm:text-sm border-2"
              size={isMobile ? "small" : "medium"}
              style={{ backgroundColor: "rgb(179, 189, 204)", color: "#333", borderColor: "#666" }}
            />
            <Chip 
              icon={<Award className="h-3 w-3 sm:h-4 sm:w-4" style={{ color: "#333" }} />}
              label="Industry Leading" 
              className="font-bold text-xs sm:text-sm border-2"
              size={isMobile ? "small" : "medium"}
              style={{ backgroundColor: "rgb(179, 189, 204)", color: "#333", borderColor: "#666" }}
            />
            <Chip 
              icon={<Zap className="h-3 w-3 sm:h-4 sm:w-4" style={{ color: "#333" }} />}
              label="24hr Turnaround" 
              className="font-bold text-xs sm:text-sm border-2"
              size={isMobile ? "small" : "medium"}
              style={{ backgroundColor: "rgb(179, 189, 204)", color: "#333", borderColor: "#666" }}
            />
          </Box>
          
          <Divider className="mb-4 sm:mb-6" />
          
          <div className="space-y-3 sm:space-y-6 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-start gap-2">
              <div className="bg-primary/10 p-1.5 sm:p-2 rounded-full mt-0.5 sm:mt-1">
                <FileSpreadsheet className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
              </div>
              <p>Our AI analyzes your resume against industry standards and job requirements to provide targeted improvements.</p>
            </div>
            
            <div className="flex items-start gap-2">
              <div className="bg-primary/10 p-1.5 sm:p-2 rounded-full mt-0.5 sm:mt-1">
                <FileSpreadsheet className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
              </div>
              <p>Get professional wording suggestions that highlight your skills and achievements effectively.</p>
            </div>
            
            <div className="flex items-start gap-2">
              <div className="bg-primary/10 p-1.5 sm:p-2 rounded-full mt-0.5 sm:mt-1">
                <FileSpreadsheet className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
              </div>
              <p>Receive instant feedback on how to structure your resume for maximum impact with hiring managers.</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="upload-side">
        <div className="w-full max-w-lg flex flex-col items-center justify-center px-4">
          <h2 className="text-xl sm:text-2xl font-bold mb-6">Ready to upgrade your career?</h2>
          <Link to="/enhance">
            <Button size={isMobile ? "default" : "lg"} className={`${isMobile ? 'px-6 py-4 text-base' : 'px-8 py-6 text-lg'}`}>
              Enhance Your Resume Now
            </Button>
          </Link>
          <p className="mt-4 text-xs sm:text-sm text-muted-foreground">
            Free during beta period. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
