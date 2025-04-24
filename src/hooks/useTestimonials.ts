
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Testimonial } from "@/types/testimonial";
import { User } from "@supabase/supabase-js";

export const useTestimonials = (user: User | null) => {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = useCallback(async (statusFilter: string) => {
    console.log("📥 useTestimonials - fetchTestimonials called", { statusFilter, userId: user?.id });
    
    if (!user) {
      console.log("❌ useTestimonials - No user, returning early");
      return;
    }

    setLoading(true);
    try {
      console.log("🔍 useTestimonials - Building query");
      let query = supabase
        .from("testimonials")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        console.log(`🏷️ useTestimonials - Filtering by status: ${statusFilter}`);
        query = query.eq("status", statusFilter as "pending" | "approved" | "rejected");
      }

      console.log("📡 useTestimonials - Executing query");
      const { data, error } = await query;

      if (error) {
        console.error("❌ useTestimonials - Error fetching testimonials:", error);
        toast({
          title: "Error",
          description: "Failed to load testimonials",
          variant: "destructive",
        });
      } else {
        console.log(`✅ useTestimonials - Fetched ${data?.length || 0} testimonials`);
        setTestimonials(data as Testimonial[]);
      }
    } catch (error) {
      console.error("💥 useTestimonials - Unexpected error:", error);
    } finally {
      setLoading(false);
      console.log("🏁 useTestimonials - Query completed");
    }
  }, [user, toast]);

  const handleStatusChange = async (id: string, newStatus: "pending" | "approved" | "rejected") => {
    console.log("🔄 useTestimonials - handleStatusChange", { id, newStatus });
    
    try {
      const { error } = await supabase
        .from("testimonials")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) {
        console.error("❌ useTestimonials - Error updating status:", error);
        toast({
          title: "Error",
          description: "Failed to update testimonial status",
          variant: "destructive",
        });
      } else {
        console.log("✅ useTestimonials - Status updated successfully");
        toast({
          title: "Success",
          description: `Testimonial ${newStatus}`,
        });
        
        setTestimonials((prevTestimonials) =>
          prevTestimonials.map((testimonial) =>
            testimonial.id === id ? { ...testimonial, status: newStatus } : testimonial
          )
        );
      }
    } catch (error) {
      console.error("💥 useTestimonials - Unexpected error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    console.log("🗑️ useTestimonials - handleDelete", { id });
    
    try {
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("❌ useTestimonials - Error deleting testimonial:", error);
        toast({
          title: "Error",
          description: "Failed to delete testimonial",
          variant: "destructive",
        });
      } else {
        console.log("✅ useTestimonials - Testimonial deleted successfully");
        toast({
          title: "Success",
          description: "Testimonial deleted",
        });
        
        setTestimonials((prevTestimonials) =>
          prevTestimonials.filter((testimonial) => testimonial.id !== id)
        );
      }
    } catch (error) {
      console.error("💥 useTestimonials - Unexpected error:", error);
    }
  };

  return {
    testimonials,
    loading,
    fetchTestimonials,
    handleStatusChange,
    handleDelete,
    setTestimonials,
  };
};
