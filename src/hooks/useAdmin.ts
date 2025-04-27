
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useAdmin = () => {
  const { user, session } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const checkAdminStatus = async () => {
    if (!user || !session) {
      console.log("No user or session available, clearing admin status");
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    try {
      console.log(`Checking admin status for user: ${user.id}`);
      const { data, error } = await supabase.rpc('is_admin', {
        user_id: user.id
      });

      if (error) {
        console.error('Error checking admin status:', error);
        toast({
          title: "Error checking admin status",
          description: "Please try refreshing the page",
          variant: "destructive",
        });
        throw error;
      }
      
      console.log(`Admin check result for ${user.id}:`, data);
      setIsAdmin(data || false);
    } catch (error) {
      console.error('Error in admin check:', error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("useAdmin effect triggered", { 
      hasUser: !!user, 
      hasSession: !!session,
      loading 
    });
    
    if (user && session) {
      checkAdminStatus();
    } else {
      setLoading(false);
    }

    return () => {
      // Cleanup function
      console.log("Cleaning up useAdmin effect");
    };
  }, [user, session]);

  return { isAdmin, loading };
};
