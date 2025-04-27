
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { Testimonial } from "@/types/testimonial";
import { StarRating } from "@/components/ui/star-rating";

interface RecentTestimonialsProps {
  testimonials: Testimonial[];
  loading: boolean;
}

const RecentTestimonials: React.FC<RecentTestimonialsProps> = ({ testimonials, loading }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Testimonials</CardTitle>
        <CardDescription>
          Your most recent testimonials and their status.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="py-8 text-center">Loading recent testimonials...</div>
        ) : testimonials.length > 0 ? (
          <div className="space-y-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="flex flex-col gap-2 border-b pb-3 last:border-0 last:pb-0"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{testimonial.client_name}</p>
                    {testimonial.rating && (
                      <StarRating 
                        value={testimonial.rating} 
                        readonly 
                        className="scale-75 origin-left mt-1" 
                      />
                    )}
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      testimonial.status === "approved"
                        ? "bg-green-100 text-green-800"
                        : testimonial.status === "rejected"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {testimonial.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-1">
                  {testimonial.content}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500">
            No testimonials yet
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="w-full" size="sm">
          <Link to="/dashboard/testimonials">
            View all testimonials
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentTestimonials;
