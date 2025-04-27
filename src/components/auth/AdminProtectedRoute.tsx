
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

const AdminProtectedRoute = ({ children }: AdminProtectedRouteProps) => {
  const { isAdmin, loading: adminLoading } = useAdmin();
  const { user, session, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    console.log("AdminProtectedRoute effect", { 
      isAdmin, 
      adminLoading, 
      authLoading, 
      hasUser: !!user, 
      hasSession: !!session 
    });

    // Only proceed with checks when both auth and admin status are loaded
    if (!authLoading && !adminLoading) {
      if (!user || !session) {
        console.log("No user or session, redirecting to login");
        toast({
          title: "Authentication required",
          description: "Please sign in to access this page",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

      if (isAdmin === false) { // Only redirect if we're sure user is not admin
        console.log("User is not admin, redirecting to dashboard");
        toast({
          title: "Access Denied",
          description: "You need admin privileges to access this page",
          variant: "destructive",
        });
        navigate("/dashboard");
      }
    }
  }, [isAdmin, adminLoading, authLoading, user, session, navigate, toast]);

  // Show loading state when checking auth/admin status
  if (authLoading || adminLoading || isAdmin === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          <p className="text-sm text-gray-500">Checking admin privileges...</p>
        </div>
      </div>
    );
  }

  // Only render children if user is admin
  return isAdmin ? <>{children}</> : null;
};

export default AdminProtectedRoute;
