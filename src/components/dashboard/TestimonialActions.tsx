
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import type { Testimonial } from "@/types/testimonial";

interface TestimonialActionsProps {
  testimonial: Testimonial;
  handleStatusChange: (id: string, status: "pending" | "approved" | "rejected") => void;
  handleDelete: (id: string) => void;
}

export const TestimonialActions: React.FC<TestimonialActionsProps> = ({
  testimonial,
  handleStatusChange,
  handleDelete,
}) => {
  return (
    <div className="flex space-x-2">
      {testimonial.status === "pending" && (
        <>
          <Button
            size="sm"
            variant="outline"
            className="text-green-600 border-green-600 hover:bg-green-50"
            onClick={() => handleStatusChange(testimonial.id, "approved")}
          >
            <Check className="h-4 w-4 mr-1" /> Approve
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-red-600 border-red-600 hover:bg-red-50"
            onClick={() => handleStatusChange(testimonial.id, "rejected")}
          >
            <X className="h-4 w-4 mr-1" /> Reject
          </Button>
        </>
      )}
      
      {testimonial.status === "approved" && (
        <Button
          size="sm"
          variant="outline"
          className="text-red-600 border-red-600 hover:bg-red-50"
          onClick={() => handleStatusChange(testimonial.id, "rejected")}
        >
          <X className="h-4 w-4 mr-1" /> Reject
        </Button>
      )}

      {testimonial.status === "rejected" && (
        <Button
          size="sm"
          variant="outline"
          className="text-green-600 border-green-600 hover:bg-green-50"
          onClick={() => handleStatusChange(testimonial.id, "approved")}
        >
          <Check className="h-4 w-4 mr-1" /> Approve
        </Button>
      )}

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            className="text-gray-600 border-gray-600 hover:bg-gray-50"
          >
            Delete
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              testimonial from your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDelete(testimonial.id)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
