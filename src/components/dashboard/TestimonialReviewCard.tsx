
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StarRating } from "@/components/ui/star-rating";
import type { Testimonial } from "@/types/testimonial";

interface TestimonialReviewCardProps {
  testimonial: Testimonial;
}

const TestimonialReviewCard: React.FC<TestimonialReviewCardProps> = ({
  testimonial,
}) => {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">Testimonial Review</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{testimonial.client_name}</h3>
              {testimonial.client_role && (
                <p className="text-sm text-gray-500">{testimonial.client_role}</p>
              )}
            </div>
            <StarRating value={testimonial.rating} readonly />
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Testimonial</h4>
            <p className="text-sm text-gray-600">{testimonial.content}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialReviewCard;
