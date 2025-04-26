
import { useFormSettings } from "@/hooks/useFormSettings";

export const useFormCustomization = (userId: string | undefined) => {
  const { settings } = useFormSettings(userId);

  const formStyles = {
    primaryColor: settings?.primary_color || "#9b87f5",
    showBranding: settings?.show_branding ?? true,
    logoUrl: settings?.logo_url || null,
  };

  return formStyles;
};
