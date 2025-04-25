
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
      const insertData = {
        client_name: values.client_name,
        content: values.content,
        client_role: values.client_role || null,
        rating: values.rating,
        user_id: userId,
        status: "pending" as const,
      };
      
      const { error } = await supabase
        .from("testimonials")
        .insert(insertData);

      if (error) {
        if (error.message.includes("limit")) {
          setSubmitError("This user has reached their testimonial limit. Please contact them directly.");
          toast.error("Testimonial limit reached");
        } else {
          setSubmitError(`Error submitting: ${error.message}`);
          toast.error("Failed to submit testimonial");
        }
        return;
      }

      setSubmitError(null);
      toast.success("Testimonial submitted successfully!");
      navigate(`/collect/${userId}/success`);
    } catch (error: any) {
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
