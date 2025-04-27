
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import AdminDashboardHeader from "@/components/admin/AdminDashboardHeader";
import AdminDashboardTabs from "@/components/admin/AdminDashboardTabs";

const AdminDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <AdminDashboardHeader />
        <Card>
          <CardHeader>
            <CardTitle>Administration Panel</CardTitle>
          </CardHeader>
          <CardContent>
            <AdminDashboardTabs />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
