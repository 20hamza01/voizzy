
import React from "react";
import { Testimonial } from "@/types/testimonial";
import { StarRating } from "@/components/ui/star-rating";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
  return (
    <div 
      className="p-3 sm:p-4 rounded-lg transition-colors"
      style={{ 
        backgroundColor: theme === "dark" ? "#1f2937" : "#f9fafb",
        borderLeft: `3px solid ${primaryColor || "#9b87f5"}`,
      }}
    >
      {testimonial.rating && (
        <div className="mb-2">
          <StarRating 
            value={testimonial.rating} 
            readonly 
            className="flex justify-start scale-90 sm:scale-100"
          />
        </div>
      )}
      
      <p 
        className="italic text-xs sm:text-sm mb-2 sm:mb-3 leading-relaxed"
        style={{ 
          color: theme === "dark" ? "#e5e7eb" : "#4b5563",
        }}
      >
        "{testimonial.content}"
      </p>
      
      <div className="flex flex-col gap-0.5">
        <p 
          className="font-medium text-xs sm:text-sm"
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
