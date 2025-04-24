import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ShareTestimonialForm from "@/components/dashboard/ShareTestimonialForm";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useToast } from "@/hooks/use-toast";
import { useTestimonials } from "@/hooks/useTestimonials";
import { useTestimonialRealtime } from "@/hooks/useTestimonialRealtime";
import { ArrowRight, Inbox, CheckCircle, Users, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import EmbedCodeGenerator from "@/components/dashboard/EmbedCodeGenerator";

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { stats, loading: statsLoading } = useDashboardStats(user?.id);
  const [recentTestimonials, setRecentTestimonials] = useState([]);
  const [recentLoading, setRecentLoading] = useState(true);

  const {
    testimonials,
    loading,
    fetchTestimonials,
    handleStatusChange,
    setTestimonials,
  } = useTestimonials(user);

  const handleTestimonialsUpdate = useCallback(() => {
    console.log("🔄 Dashboard - handleTestimonialsUpdate called");
    fetchTestimonials("all");
  }, [fetchTestimonials]);

  // Set up real-time updates
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Testimonials</CardTitle>
            <Inbox className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsLoading ? "..." : stats.totalTestimonials}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Inbox className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsLoading ? "..." : stats.pendingTestimonials}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsLoading ? "..." : stats.approvedTestimonials}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsLoading ? "..." : stats.totalViews}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 mt-6 md:grid-cols-2">
        <ShareTestimonialForm userId={user?.id} />
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Testimonials</CardTitle>
              <CardDescription>
                Your most recent testimonials and their status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {recentLoading ? (
                <div className="py-8 text-center">Loading recent testimonials...</div>
              ) : recentTestimonials.length > 0 ? (
                <div className="space-y-3">
                  {recentTestimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="font-semibold">{testimonial.client_name}</p>
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {testimonial.content}
                        </p>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          testimonial.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : testimonial.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {testimonial.status}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-gray-500">
                  No testimonials yet
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" className="w-full" size="sm">
                <Link to="/dashboard/testimonials">
                  View all testimonials
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="mt-6">
        <EmbedCodeGenerator userId={user?.id || ''} />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
