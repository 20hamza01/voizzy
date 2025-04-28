
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import LandingLayout from "@/components/layout/LandingLayout";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useAdmin } from "@/hooks/useAdmin";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();
  const [loginComplete, setLoginComplete] = useState(false);

  useEffect(() => {
    // Only attempt redirects when user is authenticated and admin status check is complete
    if (user && !adminLoading) {
      console.log("Login redirecting with admin status:", { isAdmin });
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } else if (!user && !loginComplete) {
      // Not logged in, stay on login page
      console.log("User not logged in, staying on login page");
    }
  }, [user, isAdmin, adminLoading, navigate, loginComplete]);

  const handleLogin = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      if (error.message.includes("Invalid login credentials")) {
        throw new Error("Invalid email or password");
      }
      throw error;
    }
    
    // Mark login as complete to trigger the redirect logic
    setLoginComplete(true);
  };

  return (
    <LandingLayout>
      <AuthForm type="login" onSubmit={handleLogin} />
    </LandingLayout>
  );
};

export default Login;
