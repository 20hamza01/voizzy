
import React from "react";

interface WidgetErrorProps {
  message: string;
}

export const WidgetError: React.FC<WidgetErrorProps> = ({ message }) => {
  return (
    <div className="p-6 text-center">
      <svg 
        className="mx-auto h-10 w-10 text-red-500" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
        />
      </svg>
      <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
        {message}
      </p>
    </div>
  );
};
