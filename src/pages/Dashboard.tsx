import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard = () => {
  // Mock data - will be replaced with actual data from Supabase
  const stats = [
    { name: "Total Testimonials", value: "12" },
    { name: "Pending Approval", value: "3" },
    { name: "Published", value: "9" },
    { name: "Views", value: "248" },
  ];

  const recentTestimonials = [
    { 
      id: "1", 
      name: "Emily Johnson", 
      company: "Design Studios Inc.", 
      type: "video",
      content: "Working with this team has been a game-changer for our business...",
      date: "2 days ago",
      status: "approved",
      ai_summary: "Positive review highlighting transformative business impact",
      sentiment_score: 0.9,
      key_points: ["Game-changing impact", "Business transformation", "Positive collaboration"]
    },
    { 
      id: "2", 
      name: "Michael Chen", 
      company: "Tech Innovations", 
      type: "text",
      content: "The level of professionalism and expertise demonstrated was exceptional...",
      date: "4 days ago",
      status: "approved"
    },
    { 
      id: "3", 
      name: "Sarah Williams", 
      company: "Marketing Solutions", 
      type: "audio",
      content: "I've worked with many agencies before, but none compare to the quality...",
      date: "1 week ago",
      status: "pending"
    },
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
          {stats.map((stat) => (
            <Card key={stat.name}>
              <CardContent className="p-6">
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent testimonials with AI insights */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Testimonials</CardTitle>
            <CardDescription>
              Your most recent client testimonials with AI-powered insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTestimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="flex flex-col gap-4 border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{testimonial.name}</p>
                        <span className="text-xs text-gray-500">{testimonial.company}</span>
                        <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded">
                          {testimonial.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{testimonial.content}</p>
                      <p className="text-xs text-gray-500">{testimonial.date}</p>
                    </div>
                    <div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          testimonial.status === "approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {testimonial.status === "approved" ? "Approved" : "Pending"}
                      </span>
                    </div>
                  </div>

                  {/* AI Insights Section */}
                  {testimonial.ai_summary && (
                    <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                      <h4 className="text-sm font-semibold text-slate-900">AI Insights</h4>
                      <p className="text-sm text-slate-600">{testimonial.ai_summary}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-slate-700">Sentiment:</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          testimonial.sentiment_score > 0.5 
                            ? "bg-green-100 text-green-800" 
                            : testimonial.sentiment_score < -0.5 
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {testimonial.sentiment_score > 0.5 
                            ? "Very Positive" 
                            : testimonial.sentiment_score < -0.5 
                            ? "Negative" 
                            : "Neutral"}
                        </span>
                      </div>
                      {testimonial.key_points && (
                        <div className="flex flex-wrap gap-2">
                          {testimonial.key_points.map((point, index) => (
                            <span
                              key={index}
                              className="text-xs bg-white px-2 py-1 rounded border border-slate-200"
                            >
                              {point}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline" asChild>
                <Link to="/dashboard/testimonials">View All Testimonials</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Form info */}
        <Card>
          <CardHeader>
            <CardTitle>Your Testimonial Form</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="mb-4 md:mb-0">
                <h4 className="font-medium">Share your form with clients</h4>
                <p className="text-sm text-gray-600">Your unique form URL:</p>
                <div className="flex items-center mt-1">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">https://voizzy.app/t/your-business-name</code>
                  <Button variant="ghost" size="sm" className="ml-2" onClick={() => {
                    navigator.clipboard.writeText("https://voizzy.app/t/your-business-name");
                  }}>
                    Copy
                  </Button>
                </div>
              </div>
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/dashboard/form">Customize Form</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/dashboard/form">Preview</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
