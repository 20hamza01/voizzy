
import React from "react";
import Navbar from "./Navbar";
import Footer from "../landing/Footer";
import "../../../src/styles/landing.css";

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-white">
      <Navbar />
      <main className="flex-grow w-full overflow-x-hidden">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default LandingLayout;
