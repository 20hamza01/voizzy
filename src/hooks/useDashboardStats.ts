
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface DashboardStats {
  totalTestimonials: number;
  pendingTestimonials: number;
  approvedTestimonials: number;
}

export const useDashboardStats = (userId: string | undefined) => {
  const [stats, setStats] = useState<DashboardStats>({
    totalTestimonials: 0,
    pendingTestimonials: 0,
    approvedTestimonials: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();

  const fetchStats = async () => {
    if (!userId) return;

    try {
      const { data: testimonials, error: fetchError } = await supabase
        .from("testimonials")
        .select("status")
        .eq("user_id", userId);

      if (fetchError) throw fetchError;

      const newStats = testimonials.reduce(
        (acc, testimonial) => ({
          totalTestimonials: acc.totalTestimonials + 1,
          pendingTestimonials:
            acc.pendingTestimonials + (testimonial.status === "pending" ? 1 : 0),
          approvedTestimonials:
            acc.approvedTestimonials + (testimonial.status === "approved" ? 1 : 0),
        }),
        {
          totalTestimonials: 0,
          pendingTestimonials: 0,
          approvedTestimonials: 0,
        }
      );

      setStats(newStats);
      setError(null);
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
      setError(err as Error);
      toast({
        title: "Error",
        description: "Failed to load dashboard statistics",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();

    // Set up real-time subscription
    const channel = supabase
      .channel("dashboard-stats")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "testimonials",
          filter: `user_id=eq.${userId}`,
        },
        () => {
          fetchStats();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return { stats, loading, error, refetch: fetchStats };
};
