
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative hero-gradient">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center space-y-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Collect and showcase{" "}
            <span className="text-primary">authentic</span>
            <br />
            client testimonials
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-600">
            Create beautiful testimonial forms in minutes, collect feedback in any format,
            and showcase your social proof with our easy-to-use platform.
          </p>
          <div className="flex gap-x-4 justify-center">
            <Button asChild size="lg" className="px-8">
              <Link to="/register">
                Get started for free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/example-wall">View examples</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
