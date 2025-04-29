
import React from "react";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { testimonialSchema, type TestimonialFormValues } from "@/schemas/testimonialSchema";
import { useTestimonialSubmit } from "@/hooks/useTestimonialSubmit";
import { TestimonialFormFields } from "@/components/testimonial/TestimonialFormFields";

const TestimonialForm = () => {
  const { userId } = useParams<{ userId: string }>();
  const { handleSubmit, isSubmitting, submitError } = useTestimonialSubmit(userId);
  
  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      client_name: "",
      client_role: "",
      content: "",
      rating: 0,
    },
  });

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      style={{background: "linear-gradient(135deg, #e7f5fe 0%, #bae6fd 100%)"}}
    >
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg transition-all duration-500 hover:shadow-xl">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900">Share Your Experience</h2>
          <p className="mt-2 text-sm text-gray-600">
            Thank you for taking the time to share your feedback
          </p>
        </div>
        
        {submitError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{submitError}</span>
          </div>
        )}
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <TestimonialFormFields form={form} />
            
            <Button 
              type="submit" 
              className="w-full bg-sky-500 hover:bg-sky-600"
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
          <p className="text-xs text-sky-500">
            Powered by Voizzy • The testimonial collection platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialForm;
