
import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { TestimonialWidget } from "@/components/widget/TestimonialWidget";
import { useIsMobile } from "@/hooks/use-mobile";

const Widget = () => {
  const { userId } = useParams<{ userId: string }>();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();
  
  // Get widget configuration from URL parameters, with hardcoded defaults
  const limit = Number(searchParams.get("limit") || "10");
  const theme = searchParams.get("theme") || "light";
  
  // Primary color set to sky blue
  const primaryColor = "#0EA5E9";
  const showBranding = true; // Default to showing branding

  if (!userId) return null;

  return (
    <div className="p-2 sm:p-4 mx-auto w-full box-border overflow-hidden" style={{ maxWidth: isMobile ? '100%' : '350px' }}>
      <TestimonialWidget 
        userId={userId}
        limit={limit}
        theme={theme}
        primaryColor={primaryColor}
        showBranding={showBranding}
        onError={(msg) => setError(msg)}
        onLoad={() => setLoading(false)}
      />
    </div>
  );
};

export default Widget;
