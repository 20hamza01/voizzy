
import React from "react";

export const WidgetLoader: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-8 h-[200px]">
      <div className="w-8 h-8 border-4 border-gray-200 border-t-purple-500 rounded-full animate-spin"></div>
    </div>
  );
};
