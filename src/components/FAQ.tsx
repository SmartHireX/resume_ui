import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "How does the AI enhance my resume?",
    answer: "Our AI analyzes your existing resume and enhances it by improving language, formatting, and content organization. It optimizes keywords for ATS systems, transforms job descriptions into achievement statements, and tailors content to your target industry."
  },
  {
    question: "What file formats are supported?",
    answer: "Currently, we support PDF (.pdf), Microsoft Word (.doc, .docx) formats for resume uploads. The maximum file size is 5MB."
  },
  {
    question: "How long does the AI enhancement process take?",
    answer: "Most resumes are processed within minutes. Complex resumes or high traffic periods might take slightly longer, but you'll receive a notification when your enhanced resume is ready."
  },
  {
    question: "Is my resume data secure?",
    answer: "Yes, we take data security seriously. Your resume data is encrypted during transfer and storage. We use it only for processing your improvements and never share it with third parties. Your data is automatically deleted after 30 days."
  },
  {
    question: "Can I see examples before uploading my resume?",
    answer: "Yes, we provide before-and-after examples for different industries in our 'Examples' section. This gives you an idea of the kinds of improvements our AI can make to your resume."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30 h-full">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Find answers to common questions about our AI resume enhancement service.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent>
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
