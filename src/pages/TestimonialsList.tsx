
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import TestimonialsTable from "@/components/dashboard/TestimonialsTable";
import TestimonialFilters from "@/components/dashboard/TestimonialFilters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTestimonials } from "@/hooks/useTestimonials";
import { useTestimonialRealtime } from "@/hooks/useTestimonialRealtime";
import { useIsMobile } from "@/hooks/use-mobile";

const TestimonialsList = () => {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const isMobile = useIsMobile();

  const {
    testimonials,
    loading,
    fetchTestimonials,
    handleStatusChange,
    handleDelete,
  } = useTestimonials(user);

  // Initial fetch and status filter change handler
  useEffect(() => {
    fetchTestimonials(statusFilter);
  }, [statusFilter]);

  // Set up real-time subscription
  useTestimonialRealtime(user, () => fetchTestimonials(statusFilter));

  // Get current testimonials for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTestimonials = testimonials.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  return (
    <DashboardLayout>
      <div className="space-y-4 sm:space-y-6 w-full box-border px-4 sm:px-0">
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Testimonials</h1>
        </div>

        <Card className="w-full box-border overflow-hidden">
          <CardHeader className="py-4 sm:py-6">
            <CardTitle className="text-lg sm:text-xl">Manage Testimonials</CardTitle>
          </CardHeader>
          <CardContent className="px-2 sm:px-6 py-2 sm:py-4">
            <TestimonialFilters 
              statusFilter={statusFilter} 
              setStatusFilter={setStatusFilter} 
            />
            
            <TestimonialsTable 
              testimonials={currentTestimonials}
              loading={loading}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              handleStatusChange={handleStatusChange}
              handleDelete={handleDelete}
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TestimonialsList;
