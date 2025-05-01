
import React from "react";
import LandingLayout from "@/components/layout/LandingLayout";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import FAQ from "@/components/landing/FAQ";
import CallToAction from "@/components/landing/CallToAction";
import Script from "@/components/landing/Script";
import WidgetExample from "@/components/landing/WidgetExample";

const Index = () => {
  return (
    <LandingLayout>
      <Script />
      <Hero />
      <Features />
      <WidgetExample />
      <HowItWorks />
      <FAQ />
      <CallToAction />
    </LandingLayout>
  );
};

export default Index;
