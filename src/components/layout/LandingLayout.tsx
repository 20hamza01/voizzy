
import React from "react";
import Navbar from "./Navbar";
import Footer from "../landing/Footer";

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <main className="flex-grow w-full max-w-full overflow-hidden">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
