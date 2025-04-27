
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import LandingLayout from "@/components/layout/LandingLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleRegister = async (email: string, password: string, fullName?: string, companyName?: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          company_name: companyName,
        },
      },
    });

    if (error) {
      if (error.message.includes("already registered")) {
        throw new Error("This email is already registered");
      }
      throw error;
    }

    toast({
      title: "Registration successful!",
      description: "Please check your email to verify your account.",
    });
  };

  return (
    <LandingLayout>
      <AuthForm type="register" onSubmit={handleRegister} />
    </LandingLayout>
  );
};

export default Register;
