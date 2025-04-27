
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CallToAction = () => {
  return (
    <div className="bg-primary">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to boost your credibility?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/90">
            Start collecting authentic testimonials today and showcase your clients' success stories.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
              <Link to="/register">
                Get started for free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="link" className="text-white hover:text-white/90">
              <Link to="/example-wall">View example wall</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
