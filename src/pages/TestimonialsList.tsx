
import React, { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import TestimonialsTable from "@/components/dashboard/TestimonialsTable";
import TestimonialFilters from "@/components/dashboard/TestimonialFilters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define testimonial type
export type Testimonial = {
  id: string;
  client_name: string;
  client_role: string | null;
  content: string;
  created_at: string;
  status: "pending" | "approved" | "rejected";
};

const TestimonialsList = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch testimonials
  const fetchTestimonials = async () => {
    if (!user) return;

    setLoading(true);
    try {
      let query = supabase
        .from("testimonials")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      // Only apply the status filter if it's not "all"
      if (statusFilter !== "all") {
        // Fix: Type assertion for the status filter
        query = query.eq("status", statusFilter as "pending" | "approved" | "rejected");
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching testimonials:", error);
        toast({
          title: "Error",
          description: "Failed to load testimonials",
          variant: "destructive",
        });
      } else {
        setTestimonials(data as Testimonial[]);
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Subscribe to real-time updates
  useEffect(() => {
    if (!user) return;

    // Initial fetch
    fetchTestimonials();

    // Set up real-time subscription
    const channel = supabase
      .channel("testimonials-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "testimonials",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log("Change received!", payload);
          // Refresh data when changes occur
          fetchTestimonials();
          
          // Show notification for new testimonial
          if (payload.eventType === "INSERT") {
            toast({
              title: "New Testimonial",
              description: "You've received a new testimonial!",
            });
          }
        }
      )
      .subscribe();

    // Cleanup subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, statusFilter, toast]);

  // Handle status change
  const handleStatusChange = async (id: string, newStatus: "pending" | "approved" | "rejected") => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) {
        console.error("Error updating status:", error);
        toast({
          title: "Error",
          description: "Failed to update testimonial status",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: `Testimonial ${newStatus}`,
        });
        
        // Update local state
        setTestimonials((prevTestimonials) =>
          prevTestimonials.map((testimonial) =>
            testimonial.id === id ? { ...testimonial, status: newStatus } : testimonial
          )
        );
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting testimonial:", error);
        toast({
          title: "Error",
          description: "Failed to delete testimonial",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Testimonial deleted",
        });
        
        // Update local state
        setTestimonials((prevTestimonials) =>
          prevTestimonials.filter((testimonial) => testimonial.id !== id)
        );
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

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
