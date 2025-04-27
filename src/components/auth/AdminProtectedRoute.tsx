
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

    // Wait until both auth and admin checks are complete
    if (authLoading || adminLoading) {
      console.log("Still loading auth or admin status, waiting...");
      return;
    }

    if (!user || !session) {
      console.log("User not authenticated, redirecting to login");
      toast({
        title: "Authentication required",
        description: "Please sign in to access this page",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    if (!isAdmin) {
      console.log("User is not admin, redirecting to dashboard", { userId: user.id });
      toast({
        title: "Access Denied",
        description: "You need admin privileges to access this page",
        variant: "destructive",
      });
      navigate("/dashboard");
    } else {
      console.log("User confirmed as admin, allowing access", { userId: user.id });
    }
  }, [isAdmin, adminLoading, authLoading, user, session, navigate, toast]);

  // Show loading state while checking auth/admin status
  if (authLoading || adminLoading) {
    console.log("Rendering loading state");
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          <p className="text-sm text-gray-500">Checking admin privileges...</p>
        </div>
      </div>
    );
  }

  // Only render children if user is admin (and we're not loading)
  return isAdmin ? <>{children}</> : null;
};

export default AdminProtectedRoute;
