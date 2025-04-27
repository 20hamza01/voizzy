
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useAdmin = () => {
  const { user, session } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const { toast } = useToast();

  const MAX_RETRIES = 3;
  const RETRY_DELAY = 1000; // ms

  const checkAdminStatus = async () => {
    console.log("Checking admin status...", { userId: user?.id, hasSession: !!session });
    
    if (!user || !session) {
      console.log("No user or session available, cannot check admin status");
      setIsAdmin(false);
      setLoading(false);
      return;
    }

    try {
      console.log(`Attempting admin check for user: ${user.id}`);
      const { data, error } = await supabase.rpc('is_admin', {
        user_id: user.id
      });

      if (error) {
        console.error('Error checking admin status:', error);
        throw error;
      }
      
      console.log(`Admin check result: ${data}`, { userId: user.id });
      setIsAdmin(data || false);
      
      // Reset retry count on success
      setRetryCount(0);
    } catch (error) {
      console.error('Error checking admin status:', error);
      
      // Implement retry logic
      if (retryCount < MAX_RETRIES) {
        console.log(`Retrying admin check (${retryCount + 1}/${MAX_RETRIES}) in ${RETRY_DELAY}ms`);
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
        }, RETRY_DELAY);
      } else {
        toast({
          title: "Error checking admin status",
          description: "Please try refreshing the page",
          variant: "destructive",
        });
        setIsAdmin(false);
      }
    } finally {
      if (retryCount >= MAX_RETRIES) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    console.log("useAdmin effect triggered", { 
      hasUser: !!user, 
      hasSession: !!session, 
      retryCount, 
      loading 
    });
    
    // Only check admin status when we have both user and session
    // or when we're retrying
    if ((user && session) || retryCount > 0) {
      checkAdminStatus();
    } else if (!user && !loading) {
      // If we have no user but we're not loading auth state,
      // we know the user isn't admin
      setIsAdmin(false);
      setLoading(false);
    }
  }, [user, session, retryCount]);

  // Set up a delayed check to ensure we catch any session initialization issues
  useEffect(() => {
    if (loading && user && session) {
      const timer = setTimeout(() => {
        console.log("Performing delayed admin check");
        checkAdminStatus();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [loading, user, session]);

  return { isAdmin, loading };
};
