
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const usePlanUpgrade = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch current plan
  const { data: currentPlan, isLoading } = useQuery({
    queryKey: ["userPlan", user?.id],
    queryFn: async () => {
      if (!user) return "free";
      
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("plan_type")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      return profile?.plan_type || "free";
    },
    enabled: !!user,
  });

  // Upgrade plan mutation
  const { mutate: upgradePlan, error } = useMutation({
    mutationFn: async (newPlan: string) => {
      if (!user) throw new Error("No user logged in");

      // Get current plan
      const { data: profile } = await supabase
        .from("profiles")
        .select("plan_type")
        .eq("id", user.id)
        .single();

      const oldPlan = profile?.plan_type || "free";

      // Update user's plan
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ plan_type: newPlan })
        .eq("id", user.id);

      if (updateError) throw updateError;

      // Record plan change
      const { error: historyError } = await supabase
        .from("plan_changes")
        .insert({
          user_id: user.id,
          old_plan: oldPlan,
          new_plan: newPlan,
        });

      if (historyError) throw historyError;
      
      return newPlan;
    },
    onSuccess: (newPlan) => {
      // Invalidate and refetch plan data
      queryClient.invalidateQueries({ queryKey: ["userPlan", user?.id] });
      
      toast({
        title: "Plan Updated",
        description: `Successfully upgraded to ${newPlan} plan`,
      });
    },
    onError: (err) => {
      console.error("Error upgrading plan:", err);
      toast({
        title: "Error",
        description: "Failed to upgrade plan. Please try again.",
        variant: "destructive",
      });
    },
  });

  return {
    currentPlan: currentPlan || "free",
    isLoading,
    error,
    upgradePlan,
  };
};
