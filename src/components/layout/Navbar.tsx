import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
const Navbar = () => {
  const {
    user,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const handleLogout = async () => {
    try {
      await signOut();
      // Only navigate after successful signout
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
      toast({
        title: "Error signing out",
        description: "Please try again. If the problem persists, try refreshing the page.",
        variant: "destructive"
      });
    }
  };
  const MobileMenu = () => <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[80%] sm:w-[300px]">
        <SheetHeader>
          <SheetTitle className="text-left text-sky-500">Voizzy</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 py-6">
          
          
          
          
          <div className="h-[1px] bg-border my-2"></div>
          
          {user ? <>
              <Link to="/dashboard" className="text-sm font-medium px-4 py-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>
                Dashboard
              </Link>
              <Button onClick={() => {
            handleLogout();
            setIsOpen(false);
          }} className="w-full justify-start mt-2">
                Sign out
              </Button>
            </> : <>
              <Link to="/login" onClick={() => setIsOpen(false)} className="text-sm font-medium py-2 hover:bg-accent rounded-md mx-[10px] px-[90px]">
                Sign in
              </Link>
              <Link to="/register" className="text-sm font-medium px-4 py-2 hover:bg-accent rounded-md" onClick={() => setIsOpen(false)}>
                <Button className="w-full">Sign up</Button>
              </Link>
            </>}
        </div>
      </SheetContent>
    </Sheet>;
  return <header className="bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 sm:p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 text-2xl font-bold text-sky-500">
            Voizzy
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:gap-x-12">
          
          
          
        </div>
        
        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          {user ? <>
              <Button asChild variant="ghost">
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button onClick={handleLogout}>Sign out</Button>
            </> : <>
              <Button asChild variant="ghost">
                <Link to="/login">Sign in</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Sign up</Link>
              </Button>
            </>}
        </div>
        
        {/* Mobile Menu */}
        <MobileMenu />
      </nav>
    </header>;
};
export default Navbar;