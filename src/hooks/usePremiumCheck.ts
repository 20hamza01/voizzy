
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const usePremiumCheck = () => {
  const { user } = useAuth();

  const { data: isPremium, isLoading } = useQuery({
    queryKey: ["premium-status", user?.id],
    queryFn: async () => {
      if (!user) return false;
      
      const { data } = await supabase
        .from("profiles")
        .select("plan_type")
        .eq("id", user.id)
        .single();
      
      return data?.plan_type === "premium";
    },
    enabled: !!user,
  });

  return { isPremium: !!isPremium, isLoading };
};
