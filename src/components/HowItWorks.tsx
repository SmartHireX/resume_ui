import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    title: "Upload Your Resume",
    description: "Begin by uploading your current resume in PDF or Word format.",
    detailedDescription: "Simply drag and drop your existing resume file onto our platform or use the file browser. We accept PDF, DOC, and DOCX formats up to 5MB in size. No account registration required to get started.",
    icon: "📄"
  },
  {
    number: "02",
    title: "AI Analysis",
    description: "Our AI analyzes your resume for content, formatting, and industry alignment.",
    detailedDescription: "Our advanced AI engine scans your entire resume, analyzing word choice, sentence structure, formatting consistency, and keyword optimization. It compares your resume against industry standards and ATS requirements to identify improvement areas.",
    icon: "🔍"
  },
  {
    number: "03",
    title: "Generate Improvements",
    description: "Receive suggested improvements for language, formatting, and content organization.",
    detailedDescription: "Based on the analysis, our system generates tailored recommendations to enhance your resume. This includes more impactful achievement statements, better keyword placement, improved formatting, and content reorganization for maximum impact.",
    icon: "✨"
  },
  {
    number: "04",
    title: "Download Enhanced Resume",
    description: "Download your professionally enhanced resume ready for job applications.",
    detailedDescription: "Review the enhanced version and download your optimized resume in PDF or Word format. Your new resume will maintain your original information while presenting it in a more professional, ATS-friendly way that significantly improves your chances of getting interviews.",
    icon: "📥"
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="w-full flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-[92rem] mx-auto h-full flex flex-col justify-between">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-foreground">How It Works</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Our simple four-step process transforms your existing resume into an optimized, ATS-friendly document.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 flex-grow my-8 relative mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative bg-card rounded-lg border border-border shadow-sm hover:shadow-md transition-all duration-300 p-4 h-full flex flex-col w-80 mx-auto">
              <div className="absolute -top-3 -left-3 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold z-10">
                {step.number}
              </div>
              <div className="text-3xl mb-4 mt-4 text-center">
                {step.icon}
              </div>
              <div className="flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-center">{step.title}</h3>
                  <p className="text-muted-foreground text-center mb-4">{step.description}</p>
                </div>
                
                <div className="absolute top-[55%] w-full lg:w-[90%] border-t border-border"></div>
                
                <div>
                  <p className="text-sm text-muted-foreground px-2">
                    {step.detailedDescription}
                  </p>
                </div>
              </div>
              
              {/* Arrows connecting steps */}
              {index < steps.length - 1 && (
                <>
                  {/* Arrow for large screens */}
                  <div className="hidden lg:block absolute top-[54%] -right-12 w-10 h-2 bg-primary/20 z-1">
                    <div className="absolute right-[-10px] top-1/2 transform -translate-y-1/2 border-t-[10px] border-r-0 border-b-[10px] border-l-[15px] border-t-transparent border-b-transparent border-l-primary"></div>
                  </div>
                  
                  {/* Arrow for medium screens (vertical between rows) */}
                  <div className="hidden md:block lg:hidden absolute -bottom-8 left-1/2 transform -translate-x-1/2 h-10 w-2 bg-primary/20 z-1">
                    {index % 2 === 0 && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 border-l-[10px] border-r-[10px] border-t-0 border-b-[15px] border-l-transparent border-r-transparent border-b-primary"></div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-10 text-center mb-6">
          <Link to="/enhance">
            <Button size="lg" className="px-10 py-6 text-lg rounded-full hover:scale-105 transition-transform">
              Get Started Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
