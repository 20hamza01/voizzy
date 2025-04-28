
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    id: "01",
    name: "Create your form",
    description: "Customize your testimonial collection form with your branding and preferred color scheme in just minutes."
  },
  {
    id: "02",
    name: "Share with clients",
    description: "Send your unique form link to clients via email, social media, or embed it directly on your website."
  },
  {
    id: "03", 
    name: "Collect testimonials",
    description: "Clients submit testimonials in text, audio, or video formats - no login or account creation required."
  },
  {
    id: "04",
    name: "Review and approve",
    description: "Get notified by email when new testimonials arrive, then review and approve them in your dashboard."
  },
  {
    id: "05",
    name: "Showcase feedback",
    description: "Display approved testimonials on your 'Wall of Love' and embed them strategically across your site."
  }
];

const HowItWorks = () => {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <Badge variant="outline" className="mb-4 bg-primary/5 text-primary border-primary/20">
            Simple process
          </Badge>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How Voizzy works
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Collect, manage, and showcase client testimonials with our seamless 5-step process.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="space-y-8">
            {steps.map((step, index) => (
              <Card key={step.id} className={`overflow-hidden border-0 shadow-sm transition-all duration-300 hover:shadow-md`}>
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    <div className="flex items-center justify-center bg-primary/10 p-6 sm:w-32 sm:p-8">
                      <span className="text-3xl font-bold text-primary">{step.id}</span>
                    </div>
                    <div className="p-6 sm:flex-1">
                      <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">
                        {step.name}
                      </h3>
                      <p className="mt-3 text-base leading-7 text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
