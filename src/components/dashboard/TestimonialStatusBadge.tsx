
import React from "react";
import type { Testimonial } from "@/types/testimonial";

interface TestimonialStatusBadgeProps {
  status: Testimonial["status"];
}

export const TestimonialStatusBadge: React.FC<TestimonialStatusBadgeProps> = ({ 
  status
}) => {
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
        status
      )}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};
