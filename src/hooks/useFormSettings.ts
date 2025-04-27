
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
        console.error("Error fetching form settings:", error);
        toast({
          title: "Error",
          description: "Failed to load form settings",
          variant: "destructive",
        });
        throw error;
      }
      return data as FormSettings | null;
    },
    enabled: !!userId,
  });

  const updateSettings = useMutation({
    mutationFn: async (newSettings: Partial<FormSettings>) => {
      if (!userId) throw new Error("No user ID provided");

      try {
        // Check if the user is on premium plan for color or logo changes
        if (newSettings.primary_color || newSettings.logo_url) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("plan_type")
            .eq("id", userId)
            .single();
          
          if (profile?.plan_type !== 'premium') {
            toast({
              title: "Premium Required",
              description: "This feature requires a Premium plan. Please upgrade to continue.",
              variant: "destructive",
            });
            throw new Error('Premium plan required');
          }
        }

        // Check if record exists
        const { data: existingSettings } = await supabase
          .from("form_settings")
          .select("id")
          .eq("user_id", userId)
          .maybeSingle();

        let result;
        if (existingSettings) {
          // Update existing record
          const { data, error } = await supabase
            .from("form_settings")
            .update(newSettings)
            .eq("user_id", userId)
            .select()
            .single();
          
          if (error) throw error;
          result = data;
        } else {
          // Create new record
          const { data, error } = await supabase
            .from("form_settings")
            .insert({
              user_id: userId,
              ...newSettings,
            })
            .select()
            .single();
          
          if (error) throw error;
          result = data;
        }
        
        return result;
      } catch (error: any) {
        console.error("Error updating form settings:", error);
        
        // Don't show error toast for premium requirement (already handled)
        if (!error.message?.includes('Premium plan required')) {
          toast({
            title: "Error",
            description: "Failed to update form settings",
            variant: "destructive",
          });
        }
        
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["formSettings", userId] });
      toast({
        title: "Success",
        description: "Form settings updated successfully",
      });
    },
  });

  const uploadLogo = async (file: File) => {
    if (!userId) return null;
    setUploading(true);
    
    try {
      console.log("Starting logo upload process...");
      
      // Verify premium plan
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("plan_type")
        .eq("id", userId)
        .single();
      
      if (profileError) {
        console.error("Error checking user profile:", profileError);
        throw new Error("Failed to verify premium status");
      }
      
      if (profile?.plan_type !== 'premium') {
        console.log("User doesn't have premium plan, aborting upload");
        toast({
          title: "Premium Required",
          description: "Logo upload requires a Premium plan. Please upgrade to continue.",
          variant: "destructive",
        });
        return null;
      }

      // Verify the bucket exists
      const { data: buckets, error: bucketError } = await supabase
        .storage
        .listBuckets();
        
      console.log("Available buckets:", buckets);
      
      if (bucketError) {
        console.error("Error listing buckets:", bucketError);
        throw new Error("Storage system unavailable");
      }
      
      const bucketExists = buckets?.some(b => b.name === 'form-assets');
      if (!bucketExists) {
        console.error("form-assets bucket does not exist");
        throw new Error("Storage configuration issue");
      }

      const fileExt = file.name.split(".").pop();
      const filePath = `${userId}/logo.${fileExt}`;
      console.log(`Uploading to path: ${filePath}`);

      const { error: uploadError, data: uploadData } = await supabase.storage
        .from("form-assets")
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        console.error("Error uploading file:", uploadError);
        throw uploadError;
      }
      
      console.log("Upload successful:", uploadData);

      // Get public URL after successful upload
      const { data: { publicUrl } } = supabase.storage
        .from("form-assets")
        .getPublicUrl(filePath);
        
      console.log("Generated public URL:", publicUrl);

      // Update settings with new logo URL
      await updateSettings.mutateAsync({ logo_url: publicUrl });
      
      toast({
        title: "Success",
        description: "Logo uploaded successfully",
      });
      
      return publicUrl;
    } catch (error) {
      console.error("Error uploading logo:", error);
      toast({
        title: "Error",
        description: "Failed to upload logo. Please try again later.",
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
