
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ShareTestimonialForm from "@/components/dashboard/ShareTestimonialForm";
import { useTestimonials } from "@/hooks/useTestimonials";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { TestimonialStatusBadge } from "@/components/dashboard/TestimonialStatusBadge";
import { useTestimonialRealtime } from "@/hooks/useTestimonialRealtime";

const Dashboard = () => {
  const { user } = useAuth();
  const { testimonials, loading: testimonialsLoading, fetchTestimonials } = useTestimonials(user);
  const { stats, loading: statsLoading, error: statsError } = useDashboardStats(user?.id);

  // Set up real-time updates
  useTestimonialRealtime(user, () => {
    fetchTestimonials("all");
  });

  // Get the 3 most recent testimonials
  const recentTestimonials = testimonials.slice(0, 3);

  const statsData = [
    { name: "Total Testimonials", value: stats.totalTestimonials.toString() },
    { name: "Pending Approval", value: stats.pendingTestimonials.toString() },
    { name: "Published", value: stats.approvedTestimonials.toString() },
    { name: "Views", value: stats.totalViews.toString() },
  ];

  return (
    <DashboardLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <Button asChild>
            <Link to="/dashboard/form">Share Form</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat) => (
            <Card key={stat.name}>
              <CardContent className="p-6">
                {statsLoading ? (
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ) : (
                  <>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <p className="text-xs text-muted-foreground">{stat.name}</p>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Form sharing section */}
        <Card>
          <CardHeader>
            <CardTitle>Your Testimonial Form</CardTitle>
            <CardDescription>
              Share this form with your clients to collect testimonials
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ShareTestimonialForm />
          </CardContent>
        </Card>

        {/* Recent testimonials */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Testimonials</CardTitle>
            <CardDescription>
              Your most recent client testimonials with AI-powered insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            {testimonialsLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="space-y-3">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                ))}
              </div>
            ) : recentTestimonials.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                <p>No testimonials yet. Share your form to start collecting feedback!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {recentTestimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className="flex flex-col gap-4 border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{testimonial.client_name}</p>
                          <span className="text-xs text-gray-500">
                            {testimonial.client_role || ""}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {testimonial.content}
                        </p>
                      </div>
                      <TestimonialStatusBadge 
                        status={testimonial.status} 
                        views={testimonial.views}
                      />
                    </div>

                    {testimonial.ai_summary && (
                      <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                        <h4 className="text-sm font-semibold text-slate-900">AI Insights</h4>
                        <p className="text-sm text-slate-600">{testimonial.ai_summary}</p>
                      </div>
                    )}
                  </div>
                ))}
                <div className="mt-6 text-center">
                  <Button variant="outline" asChild>
                    <Link to="/dashboard/testimonials">View All Testimonials</Link>
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
