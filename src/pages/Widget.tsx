
import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { TestimonialWidget } from "@/components/widget/TestimonialWidget";

const Widget = () => {
  const { userId } = useParams<{ userId: string }>();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Get widget configuration from URL parameters, with hardcoded defaults
  const limit = Number(searchParams.get("limit") || "10");
  const theme = searchParams.get("theme") || "light";
  
  // Default primary color 
  const primaryColor = "#9b87f5"; // Voizzy default purple
  const showBranding = true; // Default to showing branding

  if (!userId) return null;

  return (
    <div className="p-4 max-w-[350px] mx-auto">
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
