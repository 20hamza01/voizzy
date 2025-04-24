
import React from "react";
import type { Testimonial } from "@/types/testimonial";
import { Eye } from "lucide-react";

interface TestimonialStatusBadgeProps {
  status: Testimonial["status"];
  views?: number;
}

export const TestimonialStatusBadge: React.FC<TestimonialStatusBadgeProps> = ({ 
  status,
  views = 0
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
    <div className="flex items-center gap-2">
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
          status
        )}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
      <span className="inline-flex items-center gap-1 text-xs text-gray-500">
        <Eye className="h-3 w-3" />
        {views}
      </span>
    </div>
  );
};
