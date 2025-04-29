
import React, { useState, useEffect } from "react";
import type { Testimonial } from "@/types/testimonial";
import { useToast } from "@/hooks/use-toast";
import { useParams, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { StarRating } from "@/components/ui/star-rating";

const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => {
  return (
    <div 
      className={`bg-white p-6 rounded-lg shadow-md border border-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 testimonial-card-animated`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {testimonial.rating && (
        <div className="mb-3">
          <StarRating value={testimonial.rating} readonly />
        </div>
      )}
      <div className="relative">
        <div className="absolute -left-3 -top-3 text-4xl opacity-20 text-sky-300">"</div>
        <p className="text-gray-700 italic mb-4 relative z-10">{testimonial.content}</p>
        <div className="absolute -right-3 -bottom-3 text-4xl opacity-20 text-sky-300">"</div>
      </div>
      <div className="flex items-center mt-6 pt-4 border-t border-gray-100">
        <div>
          <p className="font-semibold text-gray-900">{testimonial.client_name}</p>
          {testimonial.client_role && (
            <p className="text-sm text-sky-600">{testimonial.client_role}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const EmbedWall = () => {
  const { userId } = useParams();
  const [searchParams] = useSearchParams();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Get customization parameters from URL
  const limit = searchParams.get("limit") || "3";
  const layout = searchParams.get("layout") || "grid";
  
  useEffect(() => {
    console.log("🚀 EmbedWall - Component mounted", { userId, limit, layout });
    
    const fetchTestimonials = async () => {
      if (!userId) {
        console.error("❌ EmbedWall - No userId provided");
        setLoading(false);
        return;
      }

      try {
        console.log("📡 EmbedWall - Fetching testimonials from edge function");
        const response = await fetch(
          `https://zksdcehnfspmcxzwnxbk.functions.supabase.co/get-public-testimonials?userId=${userId}&limit=${limit}&layout=${layout}`
        );
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(`✅ EmbedWall - Fetched ${data.testimonials.length} testimonials`);
        setTestimonials(data.testimonials);
      } catch (error) {
        console.error("💥 EmbedWall - Error fetching testimonials:", error);
        toast({
          title: "Error",
          description: "Failed to load testimonials",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [userId, limit, layout, toast]);

  const getLayoutClass = () => {
    switch (layout) {
      case "list":
        return "flex flex-col space-y-4";
      case "grid":
      default:
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No testimonials available.</p>
      </div>
    );
  }

  return (
    <div className="p-6 wall-of-love-gradient rounded-xl shadow-md">
      <div className={`${getLayoutClass()} relative z-10`}>
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
        ))}
      </div>
      <div className="text-center mt-6 text-xs text-sky-600 font-medium">
        Powered by Voizzy
      </div>
    </div>
  );
};

export default EmbedWall;
