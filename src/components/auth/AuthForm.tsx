
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

interface AuthFormProps {
  type: "login" | "register";
  onSubmit: (email: string, password: string, fullName?: string, companyName?: string) => Promise<void>;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (type === "register") {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }
        await onSubmit(email, password, fullName, companyName);
      } else {
        await onSubmit(email, password);
      }

      toast({
        title: type === "login" ? "Welcome back!" : "Account created successfully!",
        description: type === "login" ? "You are now signed in." : "You can now sign in with your new account.",
      });
    } catch (error) {
      console.error("Auth error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm space-y-6 mt-20">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">
          {type === "login" ? "Sign In" : "Create an Account"}
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          {type === "login"
            ? "Enter your email to sign in to your account"
            : "Enter your details below to create your account"}
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {type === "register" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                placeholder="John Doe"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                type="text"
                placeholder="Acme Inc"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
          </>
        )}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {type === "register" && (
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        )}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Loading..." : type === "login" ? "Sign In" : "Sign Up"}
        </Button>
      </form>
      <div className="text-center text-sm">
        {type === "login" ? (
          <>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="underline text-voizzy-purple font-semibold"
            >
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link
              to="/login"
              className="underline text-voizzy-purple font-semibold"
            >
              Sign in
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
