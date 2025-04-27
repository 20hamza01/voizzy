
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { TestimonialActions } from "./TestimonialActions";
import { TestimonialStatusBadge } from "./TestimonialStatusBadge";
import { StarRating } from "@/components/ui/star-rating";
import type { Testimonial } from "@/types/testimonial";

interface TestimonialDialogProps {
  testimonial: Testimonial;
  isOpen: boolean;
  onClose: () => void;
  handleStatusChange: (id: string, status: "pending" | "approved" | "rejected") => void;
  handleDelete: (id: string) => void;
}

export const TestimonialDialog: React.FC<TestimonialDialogProps> = ({
  testimonial,
  isOpen,
  onClose,
  handleStatusChange,
  handleDelete,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Testimonial Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{testimonial.client_name}</h3>
                {testimonial.client_role && (
                  <p className="text-sm text-gray-500">{testimonial.client_role}</p>
                )}
              </div>
              <TestimonialStatusBadge status={testimonial.status} />
            </div>
            <div className="flex items-center space-x-4">
              <StarRating value={testimonial.rating || 0} readonly />
              <span className="text-sm text-gray-500">
                {formatDate(testimonial.created_at)}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Content</h4>
            <p className="text-gray-700 whitespace-pre-wrap">{testimonial.content}</p>
          </div>

          <div className="pt-4 border-t">
            <TestimonialActions
              testimonial={testimonial}
              handleStatusChange={handleStatusChange}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
