
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import TestimonialsTable from "@/components/dashboard/TestimonialsTable";
import TestimonialFilters from "@/components/dashboard/TestimonialFilters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTestimonials } from "@/hooks/useTestimonials";
import { useTestimonialRealtime } from "@/hooks/useTestimonialRealtime";

const TestimonialsList = () => {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Testimonials</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Manage Testimonials</CardTitle>
          </CardHeader>
          <CardContent>
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
