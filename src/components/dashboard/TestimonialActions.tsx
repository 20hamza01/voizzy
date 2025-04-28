
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, X, Trash2 } from "lucide-react";
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
  // Function to stop click event propagation
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="flex space-x-2" onClick={stopPropagation}>
      {testimonial.status === "pending" && (
        <>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8 text-green-600 border-green-600 hover:bg-green-50"
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange(testimonial.id, "approved");
            }}
            title="Approve"
          >
            <Check className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8 text-red-600 border-red-600 hover:bg-red-50"
            onClick={(e) => {
              e.stopPropagation();
              handleStatusChange(testimonial.id, "rejected");
            }}
            title="Reject"
          >
            <X className="h-4 w-4" />
          </Button>
        </>
      )}
      
      {testimonial.status === "approved" && (
        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8 text-red-600 border-red-600 hover:bg-red-50"
          onClick={(e) => {
            e.stopPropagation();
            handleStatusChange(testimonial.id, "rejected");
          }}
          title="Reject"
        >
          <X className="h-4 w-4" />
        </Button>
      )}

      {testimonial.status === "rejected" && (
        <Button
          size="icon"
          variant="outline"
          className="h-8 w-8 text-green-600 border-green-600 hover:bg-green-50"
          onClick={(e) => {
            e.stopPropagation();
            handleStatusChange(testimonial.id, "approved");
          }}
          title="Approve"
        >
          <Check className="h-4 w-4" />
        </Button>
      )}

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8 text-gray-600 border-gray-600 hover:bg-gray-50"
            onClick={(e) => e.stopPropagation()}
            title="Delete"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent onClick={(e) => e.stopPropagation()}>
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
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(testimonial.id);
              }}
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
