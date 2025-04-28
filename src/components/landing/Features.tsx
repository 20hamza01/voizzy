
import React from "react";
import {
  Check,
  PaletteIcon,
  MessageSquare,
  Share2,
  Workflow,
  Zap
} from "lucide-react";

const features = [
  {
    name: "Easy form creation",
    description: "Create beautiful testimonial forms in minutes with our intuitive drag-and-drop builder.",
    icon: PaletteIcon
  },
  {
    name: "Multiple formats",
    description: "Collect feedback in text, audio, or video format - whatever suits your clients best.",
    icon: MessageSquare
  },
  {
    name: "Custom branding",
    description: "Match your forms and testimonial wall to your brand's unique look and feel.",
    icon: PaletteIcon
  },
  {
    name: "One-click sharing",
    description: "Share your testimonial form via email, social media, or embed it directly on your site.",
    icon: Share2
  },
  {
    name: "Smart workflows",
    description: "Automatically notify team members and process new testimonials with custom workflows.",
    icon: Workflow
  },
  {
    name: "Seamless integration",
    description: "Connect with your favorite tools through our Zapier integration and API.",
    icon: Zap
  }
];

const Features = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <span className="inline-block text-base font-semibold leading-7 text-primary">Powerful features</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to collect powerful testimonials
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our comprehensive toolkit makes it easy to gather and showcase authentic customer stories that build trust and drive conversions.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={feature.name} className="feature-card relative">
                <div className="flex items-center gap-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold leading-7 text-gray-900">
                    {feature.name}
                  </h3>
                </div>
                <p className="mt-4 text-base leading-7 text-gray-600">
                  {feature.description}
                </p>
                
                <ul className="mt-6 space-y-2 text-sm">
                  {[1, 2, 3].map((_, i) => (
                    <li key={i} className="flex items-center text-gray-500">
                      <Check className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                      <span>
                        {index === 0 && i === 0 && "No coding required"}
                        {index === 0 && i === 1 && "Mobile-friendly forms"}
                        {index === 0 && i === 2 && "Easy customization"}
                        
                        {index === 1 && i === 0 && "Text testimonials"}
                        {index === 1 && i === 1 && "Audio recordings"}
                        {index === 1 && i === 2 && "Video testimonials"}
                        
                        {index === 2 && i === 0 && "Custom colors"}
                        {index === 2 && i === 1 && "Upload your logo"}
                        {index === 2 && i === 2 && "Custom fonts"}
                        
                        {index === 3 && i === 0 && "Direct link sharing"}
                        {index === 3 && i === 1 && "Social media integration"}
                        {index === 3 && i === 2 && "Embed code generation"}
                        
                        {index === 4 && i === 0 && "Email notifications"}
                        {index === 4 && i === 1 && "Approval workflows"}
                        {index === 4 && i === 2 && "Team collaboration"}
                        
                        {index === 5 && i === 0 && "Zapier integration"}
                        {index === 5 && i === 1 && "Webhook support"}
                        {index === 5 && i === 2 && "API access"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
