
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "@/components/ui/star-rating";
import type { TestimonialFormValues } from "@/schemas/testimonialSchema";

interface TestimonialFormFieldsProps {
  form: UseFormReturn<TestimonialFormValues>;
}

export const TestimonialFormFields: React.FC<TestimonialFormFieldsProps> = ({ form }) => {
  return (
    <>
      <FormField
        control={form.control}
        name="rating"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Rating</FormLabel>
            <FormControl>
              <StarRating 
                value={field.value || 0} 
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

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
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};
