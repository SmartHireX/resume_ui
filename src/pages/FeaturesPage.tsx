import React from "react";
import Header from "@/components/Header";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

const FeaturesPage = () => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Header />
      <main className="flex-grow w-full overflow-y-auto">
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
