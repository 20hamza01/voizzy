
import React from "react";
import { Check } from "lucide-react";

const features = [
  {
    name: "Easy form creation",
    description: "Create beautiful testimonial forms in minutes with our intuitive builder."
  },
  {
    name: "Multiple formats",
    description: "Collect feedback in text, audio, or video format - whatever suits your clients best."
  },
  {
    name: "Custom branding",
    description: "Match your forms and testimonial wall to your brand's look and feel."
  },
  {
    name: "One-click sharing",
    description: "Share your testimonial form via email, social media, or embed it on your site."
  },
  {
    name: "Smart workflows",
    description: "Automatically notify team members and process new testimonials."
  },
  {
    name: "Seamless integration",
    description: "Connect with your favorite tools through our Zapier integration."
  }
];

const Features = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Powerful features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to collect powerful testimonials
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="feature-card">
                <div className="flex items-center gap-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Check className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold leading-7 text-gray-900">
                    {feature.name}
                  </h3>
                </div>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
