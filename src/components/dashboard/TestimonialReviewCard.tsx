
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Testimonial } from "@/types/testimonial";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface TestimonialReviewCardProps {
  testimonial: Testimonial;
  onVersionChange?: (version: "original" | "enhanced") => void;
}

const TestimonialReviewCard: React.FC<TestimonialReviewCardProps> = ({
  testimonial,
  onVersionChange,
}) => {
  const handleVersionSelect = async (version: "original" | "enhanced") => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .update({ selected_version: version })
        .eq("id", testimonial.id);

      if (error) throw error;
      
      onVersionChange?.(version);
      toast.success(`${version.charAt(0).toUpperCase() + version.slice(1)} version selected`);
    } catch (error) {
      console.error("Error updating version:", error);
      toast.error("Failed to update version");
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">Compare Versions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="font-medium">Original Version</h3>
            <p className="text-sm text-gray-600">{testimonial.content}</p>
            <Button
              variant={testimonial.selected_version === "original" ? "default" : "outline"}
              onClick={() => handleVersionSelect("original")}
              className="w-full"
            >
              Use Original
            </Button>
          </div>
          
          {testimonial.ai_enhanced_content && (
            <div className="space-y-4">
              <h3 className="font-medium">Enhanced Version</h3>
              <p className="text-sm text-gray-600">{testimonial.ai_enhanced_content}</p>
              <Button
                variant={testimonial.selected_version === "enhanced" ? "default" : "outline"}
                onClick={() => handleVersionSelect("enhanced")}
                className="w-full"
              >
                Use Enhanced
              </Button>
            </div>
          )}
        </div>

        {testimonial.ai_summary && (
          <div className="mt-6 space-y-4">
            <h3 className="font-medium">AI Analysis</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="text-sm font-medium">Summary</h4>
                <p className="text-sm text-gray-600">{testimonial.ai_summary}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Key Points</h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {testimonial.key_points?.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TestimonialReviewCard;
