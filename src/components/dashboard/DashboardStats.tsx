
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Inbox, CheckCircle } from "lucide-react";
import { DashboardStats as Stats } from "@/types/dashboard";
import { useAuth } from "@/contexts/AuthContext";
import { usePlanUsage } from "@/hooks/usePlanUsage";
import { PlanUsageIndicator } from "./PlanUsageIndicator";

interface DashboardStatsProps {
  stats: Stats;
  loading: boolean;
}

const DashboardStats = ({ stats, loading }: DashboardStatsProps) => {
  const { user } = useAuth();
  const { data: planUsage, isLoading: isPlanUsageLoading } = usePlanUsage(user?.id);

  return (
    <div className="grid gap-4 w-full box-border">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Testimonials</CardTitle>
            <Inbox className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats.totalTestimonials}</div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Inbox className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats.pendingTestimonials}</div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? "..." : stats.approvedTestimonials}</div>
          </CardContent>
        </Card>
      </div>

      <div className="p-4 sm:p-6 bg-white rounded-lg shadow-sm w-full box-border">
        {isPlanUsageLoading ? (
          <div className="h-[100px] flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Loading usage data...</p>
          </div>
        ) : planUsage && (
          <PlanUsageIndicator {...planUsage} />
        )}
      </div>
    </div>
  );
};

export default DashboardStats;
