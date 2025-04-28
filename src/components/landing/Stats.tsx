
import React from "react";

const stats = [
  { label: "Active users", value: "8,000+", description: "businesses collecting testimonials" },
  { label: "Testimonials collected", value: "250,000+", description: "authentic client stories" },
  { label: "Conversion increase", value: "34%", description: "average boost after implementation" },
  { label: "Customer satisfaction", value: "98%", description: "of users recommend Voizzy" },
];

const Stats = () => {
  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">Proven results</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by thousands of businesses
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-y-3 border-l border-gray-200 px-8 first:border-0 sm:items-start sm:border-l-0 sm:border-t lg:items-center lg:border-l lg:border-t-0">
              <dt className="text-sm leading-6 text-gray-600">{stat.label}</dt>
              <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                {stat.value}
              </dd>
              <p className="text-sm text-gray-500">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;
