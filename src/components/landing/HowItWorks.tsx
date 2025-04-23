
import React from "react";

const steps = [
  {
    id: "01",
    name: "Create your form",
    description: "Customize your testimonial collection form with your branding and preferred color scheme."
  },
  {
    id: "02",
    name: "Share with clients",
    description: "Send your unique form link to clients via email, social media, or embed it on your website."
  },
  {
    id: "03", 
    name: "Collect testimonials",
    description: "Clients submit testimonials through your form in text, audio, or video formats - no login required."
  },
  {
    id: "04",
    name: "Review and approve",
    description: "Get notified by email when new testimonials arrive, then review and approve them in your dashboard."
  },
  {
    id: "05",
    name: "Showcase feedback",
    description: "Display approved testimonials on your public 'Wall of Love' and embed them on your site."
  }
];

const HowItWorks = () => {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-voizzy-purple">Simple process</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How Voizzy works
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Collect, manage, and showcase client testimonials with our easy 5-step process.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24">
          <ol className="space-y-10">
            {steps.map((step) => (
              <li key={step.id} className="relative flex gap-6">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-voizzy-purple text-white ring-1 ring-voizzy-purple">
                  <div className="font-semibold">{step.id}</div>
                </div>
                <div className="flex-auto">
                  <h3 className="text-lg font-semibold leading-8 tracking-tight text-gray-900">{step.name}</h3>
                  <p className="mt-2 text-base leading-7 text-gray-600">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
