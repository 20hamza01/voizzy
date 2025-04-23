
import React from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";
import LandingLayout from "@/components/layout/LandingLayout";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    // This will be replaced with actual Supabase authentication
    console.log("Login attempt with:", email, password);
    
    // Mock successful login for now
    if (email && password) {
      // Simulate delay for API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Redirect to dashboard after successful login
      navigate("/dashboard");
    } else {
      throw new Error("Invalid credentials");
    }
  };

  return (
    <LandingLayout>
      <AuthForm type="login" onSubmit={handleLogin} />
    </LandingLayout>
  );
};

export default Login;
