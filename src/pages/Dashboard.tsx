import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentTestimonials from "@/components/dashboard/RecentTestimonials";
import ShareTestimonialForm from "@/components/dashboard/ShareTestimonialForm";
import EmbedCodeGenerator from "@/components/dashboard/EmbedCodeGenerator";
import { useTestimonials } from "@/hooks/useTestimonials";
import { useTestimonialRealtime } from "@/hooks/useTestimonialRealtime";
import { WidgetCodeGenerator } from "@/components/dashboard/WidgetCodeGenerator";

const Dashboard = () => {
  const { user } = useAuth();
  const { testimonials, loading, fetchTestimonials } = useTestimonials(user);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (user) {
      fetchTestimonials("all");
    }
  }, [user, fetchTestimonials]);

  useTestimonialRealtime(user, () => fetchTestimonials("all"));

  if (!isMounted) {
    return null;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your testimonials.
          </p>
        </div>

        <div className="grid gap-6">
          <DashboardStats />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RecentTestimonials 
              testimonials={testimonials.slice(0, 3)} 
              loading={loading}
            />
            
            <ShareTestimonialForm />
          </div>

          <div className="grid grid-cols-1 gap-6">
            <EmbedCodeGenerator />
            <WidgetCodeGenerator /> {/* Add the new component */}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
