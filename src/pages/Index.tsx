
import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-grow flex justify-center overflow-y-auto">
        <Hero />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
