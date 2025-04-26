
import React, { useEffect, useState } from "react";
import { Testimonial } from "@/types/testimonial";
import { TestimonialCard } from "@/components/widget/TestimonialCard";

interface TestimonialWidgetProps {
  userId: string;
  limit: number;
  theme: string;
  primaryColor: string;
  showBranding: boolean;
  onError: (message: string) => void;
  onLoad: () => void;
}

export const TestimonialWidget: React.FC<TestimonialWidgetProps> = ({
  userId,
  limit,
  theme,
  primaryColor,
  showBranding,
  onError,
  onLoad,
}) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [page, setPage] = useState(1);
  
  // Fetch testimonials from edge function
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(
          `https://zksdcehnfspmcxzwnxbk.functions.supabase.co/get-public-testimonials?userId=${userId}&limit=${limit}`
        );
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        setTestimonials(data.testimonials || []);
        onLoad();
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        onError("Failed to load testimonials");
      }
    };
    
    fetchTestimonials();
  }, [userId, limit, onError, onLoad]);

  // No testimonials to display
  if (testimonials.length === 0) {
    return (
      <div 
        className="p-4 text-center"
        style={{ 
          color: theme === "dark" ? "#e5e7eb" : "#4b5563",
        }}
      >
        No testimonials available yet.
      </div>
    );
  }

  return (
    <div className="widget-container">
      <div className="p-4">
        <h3 
          className="font-medium text-lg mb-4 text-center"
          style={{ 
            color: theme === "dark" ? "#f3f4f6" : "#111827",
          }}
        >
          What people are saying
        </h3>
        
        <div className="space-y-4 max-h-[400px] overflow-y-auto p-1">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              theme={theme}
              primaryColor={primaryColor}
            />
          ))}
        </div>

        {/* Pagination controls can be added here */}
        
        {/* Branding */}
        {showBranding && (
          <div 
            className="text-center mt-4 pt-2 text-xs"
            style={{ 
              color: theme === "dark" ? "#9ca3af" : "#9ca3af",
              borderTop: `1px solid ${theme === "dark" ? "#374151" : "#f3f4f6"}`,
            }}
          >
            Powered by Voizzy
          </div>
        )}
      </div>
    </div>
  );
};
