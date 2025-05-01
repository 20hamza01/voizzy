
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const Hero = () => {
  return <div className="relative hero-gradient overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 md:py-40 lg:px-8 relative z-10">
        <div className="text-center space-y-8 lg:w-4/5 mx-auto">
          <div>
            <span className="inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-8">Building your reputation</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-gray-900 sm:leading-tight float-up-animation">
            Transform <span className="text-primary">customer stories</span> into your most powerful sales tool
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-600 float-up-animation float-up-delay-1">
            Collect, manage, and showcase authentic testimonials that build trust and boost conversions. Text, audio, or video — all with one simple platform.
          </p>
          
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 float-up-animation float-up-delay-2">
            <Button asChild size="lg" className="text-lg px-8 py-6 cta-button bg-primary hover:bg-primary/90">
              <Link to="/register">
                Start for free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-x-6 gap-y-3 flex-wrap text-sm text-gray-600 float-up-animation float-up-delay-3">
            <div className="flex items-center">
              <Check className="h-4 w-4 text-primary mr-2" /> No credit card required
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-primary mr-2" /> Cancel anytime
            </div>
          </div>
        </div>
      </div>
      
      {/* Abstract shapes in background */}
      <div className="absolute top-1/4 -right-64 w-96 h-96 rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-tr from-primary/5 to-transparent blur-3xl"></div>
    </div>;
};

export default Hero;
