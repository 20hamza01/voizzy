
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import UserManagement from "@/components/admin/UserManagement";
import ActivityLogs from "@/components/admin/ActivityLogs";
import Analytics from "@/components/admin/Analytics";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage users, view activity logs, and monitor system analytics
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Administration Panel</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="activity">Activity Logs</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              <TabsContent value="users">
                <UserManagement />
              </TabsContent>
              <TabsContent value="activity">
                <ActivityLogs />
              </TabsContent>
              <TabsContent value="analytics">
                <Analytics />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
