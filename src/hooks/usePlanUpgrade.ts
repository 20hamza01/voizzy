
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const usePlanUpgrade = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentPlan, setCurrentPlan] = useState<string>("free");

  const upgradePlan = async (newPlan: string) => {
    if (!user) return;
    
    setIsLoading(true);
    setError(null);

    try {
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
          new_plan: newPlan
        });

      if (historyError) throw historyError;

      setCurrentPlan(newPlan);
      toast({
        title: "Plan Updated",
        description: `Successfully upgraded to ${newPlan} plan`,
      });
    } catch (err) {
      console.error("Error upgrading plan:", err);
      setError(err as Error);
      toast({
        title: "Error",
        description: "Failed to upgrade plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    currentPlan,
    isLoading,
    error,
    upgradePlan
  };
};
