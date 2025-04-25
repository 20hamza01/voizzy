
import React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({ 
  value, 
  onChange, 
  readonly = false,
  className 
}) => {
  return (
    <div className={cn("flex gap-1", className)}>
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type={readonly ? "button" : "button"}
          onClick={() => !readonly && onChange?.(rating)}
          className={`${readonly ? "cursor-default" : "cursor-pointer"}`}
          disabled={readonly}
        >
          <Star
            className={cn(
              "w-5 h-5",
              rating <= value 
                ? "fill-yellow-400 text-yellow-400" 
                : "fill-none text-gray-300"
            )}
          />
        </button>
      ))}
    </div>
  );
};
