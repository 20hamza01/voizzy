
import React from "react";
import {
  Check,
  PaletteIcon,
  MessageSquare,
  Share2,
} from "lucide-react";

const features = [
  {
    name: "Easy form creation",
    description: "Create beautiful testimonial forms in minutes with our intuitive builder.",
    icon: PaletteIcon
  },
  {
    name: "Text testimonials",
    description: "Collect feedback in text format from your satisfied clients.",
    icon: MessageSquare
  },
  {
    name: "Simple branding",
    description: "Match your forms and testimonial wall to your company's style.",
    icon: PaletteIcon
  },
  {
    name: "One-click sharing",
    description: "Share your testimonial form via email or embed it directly on your site.",
    icon: Share2
  }
];

const Features = () => {
  return (
    <div id="features" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <span className="inline-block text-base font-semibold leading-7 text-sky-600">Powerful features</span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to collect powerful testimonials
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Our comprehensive toolkit makes it easy to gather and showcase authentic customer stories that build trust and drive conversions.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-2">
            {features.map((feature, index) => (
              <div key={feature.name} className="feature-card relative">
                <div className="flex items-center gap-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-100">
                    <feature.icon className="h-5 w-5 text-sky-600" aria-hidden="true" />
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
                      <Check className="h-4 w-4 text-sky-500 mr-2 flex-shrink-0" />
                      <span>
                        {index === 0 && i === 0 && "No coding required"}
                        {index === 0 && i === 1 && "Mobile-friendly forms"}
                        {index === 0 && i === 2 && "Easy customization"}
                        
                        {index === 1 && i === 0 && "Text testimonials"}
                        {index === 1 && i === 1 && "Written feedback"}
                        {index === 1 && i === 2 && "Star ratings"}
                        
                        {index === 2 && i === 0 && "Basic styling options"}
                        {index === 2 && i === 1 && "Professional appearance"}
                        {index === 2 && i === 2 && "Consistent look and feel"}
                        
                        {index === 3 && i === 0 && "Direct link sharing"}
                        {index === 3 && i === 1 && "Email sharing"}
                        {index === 3 && i === 2 && "Embed code generation"}
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
