
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { testimonialSchema, type TestimonialFormValues } from "@/schemas/testimonialSchema";
import { useTestimonialSubmit } from "@/hooks/useTestimonialSubmit";
import { TestimonialFormFields } from "@/components/testimonial/TestimonialFormFields";
import { useFormCustomization } from "@/hooks/useFormCustomization";

const TestimonialForm = () => {
  const { userId } = useParams<{ userId: string }>();
  const { handleSubmit, isSubmitting, submitError } = useTestimonialSubmit(userId);
  const { primaryColor, showBranding, logoUrl, isLoading } = useFormCustomization(userId);
  
  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      client_name: "",
      client_role: "",
      content: "",
      rating: 0,
    },
  });

  // Apply custom styles using CSS variables
  useEffect(() => {
    if (primaryColor) {
      document.documentElement.style.setProperty('--primary-color', primaryColor);
      console.log("Applied primary color:", primaryColor);
    }
  }, [primaryColor]);

  return (
    <div 
      className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        {logoUrl && (
          <div className="flex justify-center mb-6">
            <img 
              src={logoUrl} 
              alt="Company logo" 
              className="h-16 object-contain" 
              onError={(e) => {
                console.error("Error loading logo:", e);
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}
        
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
              className="w-full"
              disabled={isSubmitting}
              style={{ backgroundColor: primaryColor }}
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
        
        {showBranding && (
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Powered by Voizzy • The testimonial collection platform
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialForm;
