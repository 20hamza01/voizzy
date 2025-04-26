
import React from "react";
import { cn } from "@/lib/utils";
import { useFormCustomization } from "@/hooks/useFormCustomization";
import { useParams } from "react-router-dom";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  value,
  onChange,
  className,
}) => {
  const { userId } = useParams<{ userId: string }>();
  const { primaryColor } = useFormCustomization(userId);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          onClick={() => onChange(rating)}
          className={cn(
            "text-2xl focus:outline-none transition-colors",
            rating <= value ? "text-current" : "text-gray-300"
          )}
          style={{ color: rating <= value ? primaryColor : undefined }}
        >
          ★
        </button>
      ))}
    </div>
  );
};
