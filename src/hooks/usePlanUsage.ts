
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface PlanUsage {
  currentCount: number;
  limit: number;
  planType: string;
  isNearLimit: boolean;
  isAtLimit: boolean;
}

export const usePlanUsage = (userId: string | undefined) => {
  return useQuery({
    queryKey: ["plan-usage", userId],
    queryFn: async (): Promise<PlanUsage> => {
      if (!userId) throw new Error("No user ID provided");

      // Get user's plan type
      const { data: profile } = await supabase
        .from("profiles")
        .select("plan_type")
        .eq("id", userId)
        .single();

      // Get testimonial count
      const { count } = await supabase
        .from("testimonials")
        .select("*", { count: 'exact', head: true })
        .eq("user_id", userId);

      const currentCount = count || 0;
      const limit = profile?.plan_type === "free" ? 3 : Infinity;
      const isNearLimit = profile?.plan_type === "free" && currentCount >= 2;
      const isAtLimit = profile?.plan_type === "free" && currentCount >= 3;

      return {
        currentCount,
        limit,
        planType: profile?.plan_type || "free",
        isNearLimit,
        isAtLimit,
      };
    },
    enabled: !!userId,
  });
};
