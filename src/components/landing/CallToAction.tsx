
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const CallToAction = () => {
  return (
    <div className="bg-primary relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-white/10"></div>
      </div>
      
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to boost your credibility?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/90">
            Start collecting authentic testimonials today and showcase your clients' success stories.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button asChild size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90">
              <Link to="/register">
                Get started for free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-x-6 gap-y-3 flex-wrap text-sm text-white/80">
            <div className="flex items-center">
              <Check className="h-4 w-4 text-white mr-2" /> No credit card required
            </div>
            <div className="flex items-center">
              <Check className="h-4 w-4 text-white mr-2" /> Cancel anytime
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
