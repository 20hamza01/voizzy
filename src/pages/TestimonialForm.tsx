
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const testimonialSchema = z.object({
  client_name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  client_role: z.string().optional(),
  content: z.string().min(10, {
    message: "Testimonial must be at least 10 characters.",
  }).max(1000, {
    message: "Testimonial cannot exceed 1000 characters."
  })
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

const TestimonialForm = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      client_name: "",
      client_role: "",
      content: "",
    },
  });

  const onSubmit = async (values: TestimonialFormValues) => {
    if (!userId) {
      toast.error("Invalid form link");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      console.log("📝 Submitting testimonial:", values);
      
      // Create an insert object with the correct required fields
      const insertData = {
        client_name: values.client_name,
        content: values.content,
        client_role: values.client_role || null,
        user_id: userId,
        status: "pending" as const,
      };
      
      console.log("🔄 Sending testimonial to Supabase:", insertData);
      
      // Submit testimonial to Supabase
      const { data: testimonialData, error } = await supabase
        .from("testimonials")
        .insert(insertData)
        .select()
        .single();

      if (error) {
        console.error("❌ Error submitting testimonial:", error);
        
        // Show a more specific error message
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

      // Process testimonial with AI
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
          // Non-blocking - we continue even if AI processing fails
        } else {
          console.log("✨ AI processing completed successfully:", processResponse.data);
        }
      } catch (aiError) {
        console.warn("⚠️ AI processing error:", aiError);
        // Non-blocking - we continue even if AI processing fails
      }

      // Clear any previous errors
      setSubmitError(null);
      
      // Show success message
      toast.success("Testimonial submitted successfully!");
      
      // Navigate to success page - ensure the path is correct
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">Share Your Experience</h2>
          <p className="mt-2 text-sm text-gray-600">
            Thank you for taking the time to share your feedback. Your testimonial helps others understand our service quality.
          </p>
        </div>
        
        {submitError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{submitError}</span>
          </div>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="client_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Smith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="client_role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Role/Title (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="CEO at Example Corp" {...field} />
                  </FormControl>
                  <FormDescription>
                    This helps provide context to your testimonial
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Testimonial</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your experience working with us..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {field.value ? `${field.value.length}/1000 characters` : "0/1000 characters"}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <Loader className="h-4 w-4 animate-spin" />
                  Submitting...
                </span>
              ) : (
                "Submit Testimonial"
              )}
            </Button>
          </form>
        </Form>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Powered by Voizzy • The testimonial collection platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialForm;
