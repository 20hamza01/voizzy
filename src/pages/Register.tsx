
import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import LandingLayout from "@/components/layout/LandingLayout";
import { supabase } from "@/integrations/supabase/client";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    // Redirect to onboarding after successful registration
    navigate("/onboarding");
  };

  return (
    <LandingLayout>
      <AuthForm type="register" onSubmit={handleRegister} />
    </LandingLayout>
  );
};

export default Register;
