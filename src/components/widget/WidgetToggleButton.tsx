
import React from "react";
import { MessageSquare, X } from "lucide-react";

interface WidgetToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
  primaryColor: string;
  theme: string;
}

export const WidgetToggleButton: React.FC<WidgetToggleButtonProps> = ({
  isOpen,
  onClick,
  primaryColor,
  theme,
}) => {
  const buttonColor = primaryColor || "#0EA5E9"; // Changed to blue
  const textColor = theme === "dark" ? "#ffffff" : "#ffffff";
  
  return (
    <button
      onClick={onClick}
      className="rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{ 
        backgroundColor: buttonColor,
        width: "56px",
        height: "56px",
        color: textColor,
        transform: isOpen ? "rotate(0deg)" : "rotate(0deg)",
        transition: "transform 0.3s ease-in-out"
      }}
      aria-label={isOpen ? "Close testimonials" : "View testimonials"}
    >
      {isOpen ? (
        <X className="w-6 h-6" />
      ) : (
        <MessageSquare className="w-6 h-6" />
      )}
    </button>
  );
};
