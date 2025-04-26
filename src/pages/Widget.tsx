
import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useFormCustomization } from "@/hooks/useFormCustomization";
import { TestimonialWidget } from "@/components/widget/TestimonialWidget";
import { WidgetLoader } from "@/components/widget/WidgetLoader";
import { WidgetError } from "@/components/widget/WidgetError";
import { WidgetToggleButton } from "@/components/widget/WidgetToggleButton";

const Widget = () => {
  const { userId } = useParams<{ userId: string }>();
  const [searchParams] = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get widget configuration from URL parameters
  const limit = Number(searchParams.get("limit") || "3");
  const theme = searchParams.get("theme") || "light";
  
  // Get form customization to apply user's branding
  const { primaryColor, showBranding } = useFormCustomization(userId);

  // Toggle widget open/closed state
  const toggleWidget = () => setIsOpen(!isOpen);

  return (
    <div 
      className={`fixed bottom-4 right-4 z-50 flex flex-col items-end`}
      style={{ 
        fontFamily: "Inter, sans-serif",
        maxWidth: "calc(100vw - 2rem)"
      }}
    >
      {/* Widget Content */}
      {isOpen && (
        <div 
          className={`mb-4 overflow-hidden rounded-lg shadow-lg transition-all duration-300 transform ${
            isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
          style={{ 
            maxHeight: "calc(100vh - 100px)",
            width: "350px",
            backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
            border: `1px solid ${theme === "dark" ? "#374151" : "#e5e7eb"}`
          }}
        >
          {loading && <WidgetLoader />}
          
          {error && <WidgetError message={error} />}
          
          {!loading && !error && userId && (
            <TestimonialWidget 
              userId={userId}
              limit={limit}
              theme={theme}
              primaryColor={primaryColor}
              showBranding={showBranding}
              onError={(msg) => setError(msg)}
              onLoad={() => setLoading(false)}
            />
          )}
        </div>
      )}
      
      {/* Toggle Button */}
      <WidgetToggleButton 
        isOpen={isOpen}
        onClick={toggleWidget}
        primaryColor={primaryColor}
        theme={theme}
      />
    </div>
  );
};

export default Widget;
