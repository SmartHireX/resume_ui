import { Card, CardContent } from "@/components/ui/card";
import { ArrowUp, FileText, BookOpen, Zap, Award, BarChart, Shield, UserCheck } from "lucide-react";

const features = [
  {
    icon: <FileText className="h-10 w-10 text-primary" />,
    title: "Industry-Specific Optimization",
    description: "Our AI analyzes your resume and optimizes it for your target industry with relevant keywords and phrasing.",
  },
  {
    icon: <ArrowUp className="h-10 w-10 text-primary" />,
    title: "Achievement Highlighting",
    description: "Transform job descriptions into achievement statements that showcase your impact and quantifiable results.",
  },
  {
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    title: "ATS-Friendly Formatting",
    description: "Ensure your resume passes through Applicant Tracking Systems with optimized formatting and keywords.",
  },
  {
    icon: <Zap className="h-10 w-10 text-primary" />,
    title: "Quick Turnaround",
    description: "Get your enhanced resume back within 24 hours, ready to submit for your next job application.",
  },
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    title: "Professional Wording",
    description: "Upgrade your language with professional, industry-standard terminology that impresses hiring managers.",
  },
  {
    icon: <BarChart className="h-10 w-10 text-primary" />,
    title: "Skill Analysis",
    description: "Identify skill gaps and strengths based on your target position to highlight what matters most.",
  },
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: "Privacy Guaranteed",
    description: "Your data is secure and confidential. We never share your information with third parties.",
  },
  {
    icon: <UserCheck className="h-10 w-10 text-primary" />,
    title: "Personalized Approach",
    description: "Each resume gets personalized attention to match your unique career goals and background.",
  },
];

const Features = () => {
  return (
    <div className="w-full overflow-y-auto">
      <section id="features-hero" className="py-8 px-4 sm:px-6 lg:px-8 bg-primary/10 w-full">
        <div className="w-full max-w-7.5xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">Features</h1>
            <p className="mt-6 text-xl text-muted-foreground mx-auto">
              Our AI-powered platform offers comprehensive tools to optimize your resume and maximize your chances of landing your dream job.
            </p>
          </div>
        </div>
      </section>

      <section id="features" className="py-8 px-4 sm:px-6 lg:px-8 bg-secondary/30 w-full">
        <div className="w-full max-w-7.5xl mx-auto">
          <div className="text-center mb-4">
            <h2 className="text-3xl font-bold text-foreground">How AI Enhances Your Resume</h2>
            <p className="mt-4 text-lg text-muted-foreground mx-auto">
              Our AI-powered tools analyze and improve multiple aspects of your resume to make it stand out to employers and recruiters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border hover:shadow-md transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="rounded-full bg-primary/10 p-3 w-fit mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
