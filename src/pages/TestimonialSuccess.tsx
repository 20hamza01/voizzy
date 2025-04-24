
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const TestimonialSuccess = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow text-center">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        
        <h2 className="mt-2 text-3xl font-extrabold text-gray-900">
          Thank You!
        </h2>
        
        <p className="mt-2 text-gray-600">
          Your testimonial has been submitted successfully. We appreciate you taking the time to share your experience.
        </p>
        
        <div className="pt-4">
          <Button asChild variant="outline">
            <Link to="/">Return to Homepage</Link>
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Powered by Voizzy • The testimonial collection platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSuccess;
