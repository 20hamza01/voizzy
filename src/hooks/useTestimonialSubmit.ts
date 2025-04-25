
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { TestimonialFormValues } from "@/schemas/testimonialSchema";

export const useTestimonialSubmit = (userId: string | undefined) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (values: TestimonialFormValues) => {
    if (!userId) {
      toast.error("Invalid form link");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      console.log("📝 Submitting testimonial:", values);
      
      const insertData = {
        client_name: values.client_name,
        content: values.content,
        client_role: values.client_role || null,
        user_id: userId,
        status: "pending" as const,
      };
      
      console.log("🔄 Sending testimonial to Supabase:", insertData);
      
      const { data: testimonialData, error } = await supabase
        .from("testimonials")
        .insert(insertData)
        .select()
        .single();

      if (error) {
        console.error("❌ Error submitting testimonial:", error);
        
        if (error.message.includes("limit")) {
          setSubmitError("This user has reached their testimonial limit. Please contact them directly.");
          toast.error("Testimonial limit reached");
        } else {
          setSubmitError(`Error submitting: ${error.message}`);
          toast.error("Failed to submit testimonial");
        }
        return;
      }

      console.log("✅ Testimonial submitted successfully:", testimonialData);

      try {
        console.log("🧠 Starting AI processing for testimonial:", testimonialData.id);
        
        const processResponse = await supabase.functions.invoke(
          "process-testimonial",
          {
            body: { 
              content: values.content,
              testimonialId: testimonialData.id
            },
          }
        );
        
        if (processResponse.error) {
          console.warn("⚠️ AI processing warning:", processResponse.error);
        } else {
          console.log("✨ AI processing completed successfully:", processResponse.data);
        }
      } catch (aiError) {
        console.warn("⚠️ AI processing error:", aiError);
      }

      setSubmitError(null);
      toast.success("Testimonial submitted successfully!");
      console.log(`🔄 Navigating to success page: /collect/${userId}/success`);
      navigate(`/collect/${userId}/success`);
    } catch (error: any) {
      console.error("💥 Submission error:", error);
      setSubmitError(error.message || "Failed to submit testimonial. Please try again.");
      toast.error("Submission error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    handleSubmit,
    isSubmitting,
    submitError,
  };
};
