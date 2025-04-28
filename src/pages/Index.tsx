
import React from "react";
import LandingLayout from "@/components/layout/LandingLayout";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Testimonials from "@/components/landing/Testimonials";
import Stats from "@/components/landing/Stats";
import FAQ from "@/components/landing/FAQ";
import CallToAction from "@/components/landing/CallToAction";
import Script from "@/components/landing/Script";

const Index = () => {
  return (
    <LandingLayout>
      <Script />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CallToAction />
    </LandingLayout>
  );
};

export default Index;
