
import React from "react";
import { cn } from "@/lib/utils";
import { useFormCustomization } from "@/hooks/useFormCustomization";
import { useParams } from "react-router-dom";

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  className?: string;
  readonly?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  value,
  onChange,
  className,
  readonly = false,
}) => {
  const { userId } = useParams<{ userId: string }>();
  const { primaryColor } = useFormCustomization(userId);

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
