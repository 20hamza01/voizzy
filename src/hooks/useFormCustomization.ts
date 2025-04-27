
import { useFormSettings } from "@/hooks/useFormSettings";
import { useState, useEffect } from "react";

export const useFormCustomization = (userId: string | undefined) => {
  const { settings, isLoading } = useFormSettings(userId);
  const [formStyles, setFormStyles] = useState({
    primaryColor: "#9b87f5",
    showBranding: true,
    logoUrl: null as string | null,
  });

  useEffect(() => {
    if (settings) {
      console.log("Form settings updated:", settings);
      setFormStyles({
        primaryColor: settings.primary_color || "#9b87f5",
        showBranding: settings.show_branding ?? true,
        logoUrl: settings.logo_url,
      });
    }
  }, [settings]);

  return {
    ...formStyles,
    isLoading,
  };
};
