
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          <div className="pb-6">
            <Link to="/about" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
              About
            </Link>
          </div>
          <div className="pb-6">
            <Link to="/pricing" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
          </div>
          <div className="pb-6">
            <Link to="/blog" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
              Blog
            </Link>
          </div>
          <div className="pb-6">
            <Link to="/privacy" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
              Privacy
            </Link>
          </div>
          <div className="pb-6">
            <Link to="/terms" className="text-sm leading-6 text-gray-600 hover:text-gray-900">
              Terms
            </Link>
          </div>
        </nav>
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; {new Date().getFullYear()} Voizzy, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
