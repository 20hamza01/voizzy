
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { FormSettings } from "@/types/formSettings";

export const useFormSettings = (userId: string | undefined) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery({
    queryKey: ["formSettings", userId],
    queryFn: async () => {
      if (!userId) return null;
      const { data, error } = await supabase
        .from("form_settings")
        .select("*")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) {
        throw error;
      }
      return data as FormSettings | null;
    },
    enabled: !!userId,
  });

  const updateSettings = useMutation({
    mutationFn: async (newSettings: Partial<FormSettings>) => {
      if (!userId) throw new Error("No user ID provided");

      const { data, error } = await supabase
        .from("form_settings")
        .upsert({
          user_id: userId,
          ...newSettings,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["formSettings", userId] });
      toast({
        title: "Success",
        description: "Form settings updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update form settings",
        variant: "destructive",
      });
      console.error("Error updating form settings:", error);
    },
  });

  const uploadLogo = async (file: File) => {
    if (!userId) return null;
    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const filePath = `${userId}/logo.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("form-assets")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("form-assets")
        .getPublicUrl(filePath);

      await updateSettings.mutateAsync({ logo_url: publicUrl });
      return publicUrl;
    } catch (error) {
      console.error("Error uploading logo:", error);
      toast({
        title: "Error",
        description: "Failed to upload logo",
        variant: "destructive",
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  return {
    settings,
    isLoading,
    updateSettings: updateSettings.mutate,
    uploadLogo,
    uploading,
  };
};
