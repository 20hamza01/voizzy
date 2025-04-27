
import React from "react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  className?: string;
  readonly?: boolean;
  primaryColor?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  value,
  onChange,
  className,
  readonly = false,
  primaryColor = "#9b87f5", // Default Voizzy purple
}) => {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          onClick={() => !readonly && onChange && onChange(rating)}
          className={cn(
            "text-2xl focus:outline-none transition-colors",
            rating <= value ? "text-current" : "text-gray-300",
            readonly ? "cursor-default" : "cursor-pointer"
          )}
          style={{ color: rating <= value ? primaryColor : undefined }}
          disabled={readonly}
        >
          ★
        </button>
      ))}
    </div>
  );
};
