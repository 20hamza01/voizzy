
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

interface NavItem {
  name: string;
  href: string;
}

const navigation: NavItem[] = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Testimonials", href: "/dashboard/testimonials" },
  { name: "Plans", href: "/dashboard/plans" },
  { name: "Settings", href: "/dashboard/settings" },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };
  
  // Sidebar navigation component - used on both desktop and mobile
  const NavigationLinks = ({ onItemClick }: { onItemClick?: () => void }) => (
    <nav className="flex-1 space-y-1">
      {navigation.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.name}
            to={item.href}
            className={`${
              isActive
                ? "bg-voizzy-light-purple text-voizzy-dark-purple"
                : "text-gray-600 hover:bg-gray-50"
            } group flex items-center px-4 py-2 text-sm font-medium rounded-md`}
            onClick={onItemClick}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
      <div className="flex min-h-screen w-full max-w-full">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto border-r">
            <div className="flex items-center flex-shrink-0 px-4">
              <Link to="/dashboard" className="text-xl font-bold text-voizzy-purple">
                Voizzy
              </Link>
            </div>
            <div className="mt-8 flex-grow flex flex-col">
              <NavigationLinks />
            </div>
            <div className="flex-shrink-0 flex border-t p-4">
              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile view with top navbar and drawer */}
        <div className="md:hidden fixed top-0 left-0 right-0 z-10 bg-white border-b p-4 flex justify-between items-center">
          <Link to="/dashboard" className="text-xl font-bold text-voizzy-purple">
            Voizzy
          </Link>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w[240px]">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col h-full">
                <div className="my-6 flex-grow">
                  <NavigationLinks onItemClick={() => setIsOpen(false)} />
                </div>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full mt-auto"
                >
                  Sign Out
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 w-full overflow-hidden">
          <main className="flex-1 relative overflow-y-auto overflow-x-hidden focus:outline-none bg-gray-50">
            <div className="py-6 md:py-6">
              {/* Add padding to top for mobile view to account for the fixed navbar */}
              <div className="md:hidden h-16"></div>
              <div className="mx-auto w-full box-border overflow-hidden">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
