import React from "react";
import { RocketIcon, UsersIcon, LayoutDashboard } from "lucide-react";

const features = [
  {
    name: "Collect Testimonials",
    description:
      "Easily gather testimonials from your customers using a simple link. No coding required.",
    icon: UsersIcon,
  },
  {
    name: "Customize & Embed",
    description:
      "Create you form, then embed a wall of love on your website to showcase your testimonials.",
    icon: LayoutDashboard,
  },
  {
    name: "Share & Promote",
    description:
      "Share your testimonials on social media to amplify your brand's message and reach a wider audience.",
    icon: RocketIcon,
  },
];

const HowItWorks = () => {
  return (
    <div className="bg-white py-24 sm:py-32" id="how-it-works">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-gray-600">
            Effortlessly collect, customize, and showcase testimonials to build
            trust and drive conversions.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="text-center p-6 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center justify-center h-12 w-12 mx-auto bg-primary/10 text-primary rounded-full mb-4">
                <feature.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {feature.name}
              </h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
