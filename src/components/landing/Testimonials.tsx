
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StarIcon } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "GrowthLab",
    avatar: "/placeholder.svg",
    content: "Voizzy completely transformed how we collect and showcase testimonials. Our conversion rates increased by 37% after adding these authentic reviews to our site.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Founder & CEO",
    company: "ElevateCoach",
    avatar: "/placeholder.svg",
    content: "As a coach, credibility is everything. Voizzy made collecting video testimonials so easy that my clients actually enjoy leaving them. Game changer!",
    rating: 5
  },
  {
    name: "Alicia Romano",
    role: "Freelance Designer",
    company: "Studio Spark",
    avatar: "/placeholder.svg",
    content: "I was skeptical at first, but Voizzy has become essential to my business. The customizable forms match my branding perfectly, and clients love how easy it is.",
    rating: 5
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <StarIcon
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-primary">Trusted by businesses</h2>
          <h3 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Don't take our word for it
          </h3>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            See how Voizzy has helped businesses like yours collect powerful testimonials that convert.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="testimonial-card border-0 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 border-2 border-primary/10">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <p className="font-medium text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">
                    Customer
                  </Badge>
                </div>
                
                <StarRating rating={testimonial.rating} />
                
                <blockquote className="mt-4 text-gray-700 flex-grow">
                  "{testimonial.content}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
