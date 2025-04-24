
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Testimonial } from "@/types/testimonial";
import { User } from "@supabase/supabase-js";

export const useTestimonials = (user: User | null) => {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = async (statusFilter: string) => {
    if (!user) return;

    setLoading(true);
    try {
      let query = supabase
        .from("testimonials")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (statusFilter !== "all") {
        query = query.eq("status", statusFilter as "pending" | "approved" | "rejected");
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching testimonials:", error);
        toast({
          title: "Error",
          description: "Failed to load testimonials",
          variant: "destructive",
        });
      } else {
        setTestimonials(data as Testimonial[]);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: "pending" | "approved" | "rejected") => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) {
        console.error("Error updating status:", error);
        toast({
          title: "Error",
          description: "Failed to update testimonial status",
          variant: "destructive",
        });
      } else {
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
      console.error("Unexpected error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting testimonial:", error);
        toast({
          title: "Error",
          description: "Failed to delete testimonial",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Testimonial deleted",
        });
        
        setTestimonials((prevTestimonials) =>
          prevTestimonials.filter((testimonial) => testimonial.id !== id)
        );
      }
    } catch (error) {
      console.error("Unexpected error:", error);
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
