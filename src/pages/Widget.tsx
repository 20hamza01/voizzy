
import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useFormCustomization } from "@/hooks/useFormCustomization";
import { TestimonialWidget } from "@/components/widget/TestimonialWidget";

const Widget = () => {
  const { userId } = useParams<{ userId: string }>();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Get widget configuration from URL parameters
  const limit = Number(searchParams.get("limit") || "3");
  const theme = searchParams.get("theme") || "light";
  
  // Get form customization to apply user's branding
  const { primaryColor, showBranding } = useFormCustomization(userId);

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
