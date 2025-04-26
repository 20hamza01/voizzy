
import React from "react";
import { Testimonial } from "@/types/testimonial";
import { StarRating } from "@/components/ui/star-rating";

interface TestimonialCardProps {
  testimonial: Testimonial;
  theme: string;
  primaryColor: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  testimonial,
  theme,
  primaryColor,
}) => {
  return (
    <div 
      className="p-4 rounded-lg"
      style={{ 
        backgroundColor: theme === "dark" ? "#374151" : "#f9fafb",
        borderLeft: `3px solid ${primaryColor || "#9b87f5"}`,
      }}
    >
      {testimonial.rating && (
        <div className="mb-2">
          <StarRating 
            value={testimonial.rating} 
            readonly 
            className="flex justify-start"
          />
        </div>
      )}
      
      <p 
        className="italic text-sm mb-3"
        style={{ 
          color: theme === "dark" ? "#e5e7eb" : "#4b5563",
        }}
      >
        "{testimonial.content}"
      </p>
      
      <div>
        <p 
          className="font-medium text-sm"
          style={{ 
            color: theme === "dark" ? "#f3f4f6" : "#111827",
          }}
        >
          {testimonial.client_name}
        </p>
        
        {testimonial.client_role && (
          <p 
            className="text-xs"
            style={{ 
              color: theme === "dark" ? "#9ca3af" : "#6b7280",
            }}
          >
            {testimonial.client_role}
          </p>
        )}
      </div>
    </div>
  );
};
