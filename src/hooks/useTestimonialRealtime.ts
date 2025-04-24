
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
          event: "*",
          schema: "public",
          table: "testimonials",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log("Change received!", payload);
          onUpdate();
          
          if (payload.eventType === "INSERT") {
            toast({
              title: "New Testimonial",
              description: "You've received a new testimonial!",
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, onUpdate, toast]);
};
