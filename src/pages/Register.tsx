
import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import LandingLayout from "@/components/layout/LandingLayout";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (email: string, password: string) => {
    // This will be replaced with actual Supabase authentication
    console.log("Registration attempt with:", email, password);
    
    // Mock successful registration for now
    if (email && password) {
      // Simulate delay for API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Redirect to onboarding after successful registration
      navigate("/onboarding");
    } else {
      throw new Error("Invalid credentials");
    }
  };

  return (
    <LandingLayout>
      <AuthForm type="register" onSubmit={handleRegister} />
    </LandingLayout>
  );
};

export default Register;
