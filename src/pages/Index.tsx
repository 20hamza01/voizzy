
import React from "react";
import LandingLayout from "@/components/layout/LandingLayout";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import CallToAction from "@/components/landing/CallToAction";

const Index = () => {
  return (
    <LandingLayout>
      <Hero />
      <Features />
      <HowItWorks />
      <CallToAction />
    </LandingLayout>
  );
};

export default Index;
