
import React, { useState, useEffect } from "react";
import type { Testimonial } from "@/types/testimonial";
import { useToast } from "@/hooks/use-toast";
import { useParams, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
      <p className="text-gray-700 italic mb-4">"{testimonial.content}"</p>
      <div className="flex items-center">
        <div>
          <p className="font-semibold">{testimonial.client_name}</p>
          {testimonial.client_role && (
            <p className="text-sm text-gray-500">{testimonial.client_role}</p>
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
          `https://zksdcehnfspmcxzwnxbk.functions.supabase.co/get-public-testimonials?userId=${userId}&limit=${limit}&layout=${layout}&format=json`
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
        return "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-48">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
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
    <div className="p-4 bg-gray-50 rounded-md">
      <div className={getLayoutClass()}>
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
      <div className="text-center mt-4 text-xs text-gray-400">
        Powered by Voizzy
      </div>
    </div>
  );
};

export default EmbedWall;
