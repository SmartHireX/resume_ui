import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Menu, X, AlignJustify, Briefcase } from "lucide-react";
import { Chip, LinearProgress, Box, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import InfoSheet from "./InfoSheet";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [infoSheetOpen, setInfoSheetOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Close mobile menu when switching to desktop view
  useEffect(() => {
    if (!isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [isMobile, mobileMenuOpen]);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  return (
    <>
      <header className="w-full py-3 px-4 sm:py-4 sm:px-6 lg:px-8 border-b bg-card shadow-md relative z-50">
        <div className="max-w-7.5xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-primary/80 to-primary p-1.5 sm:p-2 rounded-lg shadow-md">
              <FileSpreadsheet className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold multicolor-text">Resume Align</span>
          </Link>
          
          {/* Mobile buttons */}
          <div className="md:hidden flex items-center space-x-1">
            <ThemeToggle />
            <Tooltip title="Information">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setInfoSheetOpen(true)}
                aria-label="Information"
              >
                <AlignJustify className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </Tooltip>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              onClick={toggleMobileMenu} 
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Menu className="h-[1.2rem] w-[1.2rem]" />
              )}
            </Button>
          </div>
          
          {/* Desktop buttons */}
          <div className="hidden md:flex items-center space-x-1">
            <ThemeToggle />
            <Tooltip title="Information">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setInfoSheetOpen(true)}
                aria-label="Information"
              >
                <AlignJustify className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </Tooltip>
          </div>
        </div>

        {/* Mobile menu dropdown - simplified */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed top-[53px] left-0 right-0 bg-card z-50 shadow-lg border-b animate-fade-in max-h-[calc(100vh-53px)] overflow-y-auto">
            <nav className="flex flex-col py-4">
              <div className="px-6 py-3 space-y-3">
                <Link 
                  to="/job-search"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full"
                >
                  <Button variant="outline" size="sm" className="w-full">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Apply for Job
                  </Button>
                </Link>
                <Link 
                  to="/enhance"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full"
                >
                  <Button size="sm" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
        
        {/* Accessible progress indicator */}
        <Box sx={{ width: '100%', position: 'absolute', bottom: 0, left: 0 }} role="progressbar" aria-label="Page load progress">
          <LinearProgress 
            variant="determinate" 
            value={100} 
            sx={{ 
              height: 2, 
              backgroundColor: 'rgba(255,255,255,0.1)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: 'var(--primary)'
              }
            }} 
          />
        </Box>
      </header>
      
      {/* Info Sheet */}
      <InfoSheet open={infoSheetOpen} onOpenChange={setInfoSheetOpen} />
    </>
  );
};

export default Header;
