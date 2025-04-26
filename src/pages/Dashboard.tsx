
import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ShareTestimonialForm from "@/components/dashboard/ShareTestimonialForm";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useTestimonials } from "@/hooks/useTestimonials";
import { useTestimonialRealtime } from "@/hooks/useTestimonialRealtime";
import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentTestimonials from "@/components/dashboard/RecentTestimonials";
import EmbedCodeGenerator from "@/components/dashboard/EmbedCodeGenerator";
import { FormSettings } from "@/components/dashboard/FormSettings";

const Dashboard = () => {
  const { user } = useAuth();
  const { stats, loading: statsLoading } = useDashboardStats(user?.id);
  const [recentTestimonials, setRecentTestimonials] = useState([]);
  const [recentLoading, setRecentLoading] = useState(true);

  const {
    testimonials,
    loading,
    fetchTestimonials,
    setTestimonials,
  } = useTestimonials(user);

  const handleTestimonialsUpdate = useCallback(() => {
    console.log("🔄 Dashboard - handleTestimonialsUpdate called");
    fetchTestimonials("all");
  }, [fetchTestimonials]);

  useTestimonialRealtime(user, handleTestimonialsUpdate);

  useEffect(() => {
    console.log("🏁 Dashboard - Initial testimonials fetch");
    if (user) {
      fetchTestimonials("all");
    }
  }, [user]);

  useEffect(() => {
    console.log("📊 Dashboard - Updating recent testimonials from fetched data");
    if (testimonials.length > 0) {
      setRecentTestimonials(testimonials.slice(0, 3));
      setRecentLoading(false);
    } else if (!loading) {
      setRecentLoading(false);
    }
  }, [testimonials, loading]);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      </div>

      <DashboardStats stats={stats} loading={statsLoading} />

      <div className="grid gap-6 mt-6 md:grid-cols-2">
        <div className="space-y-6">
          <ShareTestimonialForm userId={user?.id} />
          <FormSettings />
        </div>
        <div className="space-y-6">
          <RecentTestimonials 
            testimonials={recentTestimonials} 
            loading={recentLoading} 
          />
        </div>
      </div>

      <div className="mt-6">
        <EmbedCodeGenerator userId={user?.id} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
