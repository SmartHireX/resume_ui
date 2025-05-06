import React from "react";
import Header from "@/components/Header";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

const FAQPage = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <main className="flex-grow overflow-auto">
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;
