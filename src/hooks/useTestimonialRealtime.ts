
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
    console.log("🔄 useTestimonialRealtime - Effect triggered", { userId: user?.id });
    
    if (!user) {
      console.log("❌ useTestimonialRealtime - No user, returning early");
      return;
    }

    console.log("🔌 useTestimonialRealtime - Setting up channel subscription");
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
          console.log("✨ useTestimonialRealtime - New testimonial received!", payload);
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
          console.log("📝 useTestimonialRealtime - Testimonial updated!", payload);
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
          console.log("🗑️ useTestimonialRealtime - Testimonial deleted!", payload);
          onUpdate();
        }
      )
      .subscribe((status) => {
        console.log(`🎯 useTestimonialRealtime - Subscription status: ${status}`);
      });

    console.log("🔄 useTestimonialRealtime - Channel setup complete");

    return () => {
      console.log("🔌 useTestimonialRealtime - Cleaning up channel subscription");
      supabase.removeChannel(channel);
    };
  }, [user, onUpdate, toast]);
};
