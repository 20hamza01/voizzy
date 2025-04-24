
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User } from "@supabase/supabase-js";

export const useTestimonialRealtime = (
  user: User | null,
  onUpdate: () => void
) => {
  const { toast } = useToast();

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("testimonials-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "testimonials",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log("New testimonial received!", payload);
          onUpdate();
          toast({
            title: "New Testimonial",
            description: "You've received a new testimonial!",
          });
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "testimonials",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log("Testimonial updated!", payload);
          onUpdate();
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "testimonials",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log("Testimonial deleted!", payload);
          onUpdate();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, onUpdate, toast]);
};
