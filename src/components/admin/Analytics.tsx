
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Analytics = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTestimonials: 0,
    pendingTestimonials: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Use the new function to get total users count
      const { data: totalUsers, error: usersError } = await supabase
        .rpc('get_total_users_count');

      if (usersError) {
        console.error('Error fetching users:', usersError);
        throw usersError;
      }

      const { count: totalTestimonials, error: testimonialsError } = await supabase
        .from('testimonials')
        .select('*', { count: 'exact', head: true });

      if (testimonialsError) {
        console.error('Error fetching testimonials:', testimonialsError);
        throw testimonialsError;
      }

      const { count: pendingTestimonials, error: pendingError } = await supabase
        .from('testimonials')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      if (pendingError) {
        console.error('Error fetching pending testimonials:', pendingError);
        throw pendingError;
      }

      setStats({
        totalUsers: totalUsers || 0,
        totalTestimonials: totalTestimonials || 0,
        pendingTestimonials: pendingTestimonials || 0,
      });
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading analytics...</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.totalUsers}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Total Testimonials</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.totalTestimonials}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Pending Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{stats.pendingTestimonials}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
