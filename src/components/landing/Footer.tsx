
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ContactForm } from "@/components/feedback/ContactForm";

const footerNavigation = {
  company: [
    { name: "Features", href: "/#features" },
  ],
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
  ],
};

const Footer = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <footer className="bg-white border-t border-gray-200" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-20 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link to="/" className="text-2xl font-bold text-sky-500">
              Voizzy
            </Link>
            <p className="text-sm leading-6 text-gray-600">
              The testimonial collection and showcase platform that helps businesses build trust and boost conversions.
            </p>
            <div className="flex space-x-6">
              {/* Social links */}
              {["Twitter", "LinkedIn", "Facebook"].map((social) => (
                <a key={social} href="#" className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">{social}</span>
                  <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div>
              <h3 className="text-sm font-semibold leading-6 text-gray-900">Company</h3>
              <ul role="list" className="mt-6 space-y-4">
                {footerNavigation.company.map((item) => (
                  <li key={item.name}>
                    {item.href.startsWith("mailto:") ? (
                      <a href={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                        {item.name}
                      </a>
                    ) : (
                      <Link to={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
                <li>
                  <Dialog open={contactOpen} onOpenChange={setContactOpen}>
                    <DialogTrigger asChild>
                      <Button variant="link" className="text-sm leading-6 text-gray-600 hover:text-gray-900 p-0">
                        Contact
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Contact Us</DialogTitle>
                      </DialogHeader>
                      <ContactForm />
                    </DialogContent>
                  </Dialog>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-6 text-gray-900">Legal</h3>
              <ul role="list" className="mt-6 space-y-4">
                {footerNavigation.legal.map((item) => (
                  <li key={item.name}>
                    <Link to={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-500">
            &copy; {new Date().getFullYear()} Voizzy, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
