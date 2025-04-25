
import * as z from "zod";

export const testimonialSchema = z.object({
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

export type TestimonialFormValues = z.infer<typeof testimonialSchema>;
