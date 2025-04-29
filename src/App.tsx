
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TestimonialsList from "./pages/TestimonialsList";
import TestimonialForm from "./pages/TestimonialForm";
import TestimonialSuccess from "./pages/TestimonialSuccess";
import Onboarding from "./pages/Onboarding";
import EmbedWall from "./pages/EmbedWall";
import Widget from "./pages/Widget";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProtectedRoute from "./components/auth/AdminProtectedRoute";
import Plans from "./pages/Plans";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Settings from "./pages/Settings";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/collect/:userId" element={<TestimonialForm />} />
          <Route path="/collect/:userId/success" element={<TestimonialSuccess />} />
          <Route path="/embed/:userId" element={<EmbedWall />} />
          <Route path="/widget/:userId" element={<Widget />} />
          <Route path="/example-wall" element={<EmbedWall />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/plans"
            element={
              <ProtectedRoute>
                <Plans />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/testimonials"
            element={
              <ProtectedRoute>
                <TestimonialsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/onboarding"
            element={
              <ProtectedRoute>
                <Onboarding />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/dashboard/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
