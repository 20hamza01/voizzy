
import React from "react";
import LandingLayout from "@/components/layout/LandingLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <LandingLayout>
      <div className="py-16 bg-white">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Privacy Policy</h1>
            <p className="mt-4 text-lg text-gray-600">Last updated: April 29, 2025</p>
          </div>

          <div className="prose prose-sky max-w-none">
            <h2>Introduction</h2>
            <p>
              Voizzy ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our testimonial collection and showcase platform.
            </p>

            <h2>Information We Collect</h2>
            <p>We collect information that you provide directly to us, including:</p>
            <ul>
              <li>Account information (name, email address, password)</li>
              <li>Profile information (company name, website URL)</li>
              <li>Payment information</li>
              <li>Testimonials and feedback collected through our platform</li>
              <li>Communications you send to us</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We may use the information we collect for various purposes, including to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send administrative messages, updates, and security alerts</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Monitor and analyze usage patterns and trends</li>
            </ul>

            <h2>Sharing of Information</h2>
            <p>We may share your information with:</p>
            <ul>
              <li>Service providers who perform services on our behalf</li>
              <li>Business partners with your consent</li>
              <li>In response to legal process or when required by law</li>
              <li>In connection with a merger, sale, or acquisition</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect the security of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
            </p>

            <h2>Your Rights</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
            <ul>
              <li>Access to your personal information</li>
              <li>Correction of inaccurate information</li>
              <li>Deletion of your information</li>
              <li>Restriction of processing</li>
              <li>Data portability</li>
              <li>Object to processing</li>
            </ul>

            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:hamzaalaouiismaili21@gmail.com" className="text-sky-600 hover:underline">
                hamzaalaouiismaili21@gmail.com
              </a>
              .
            </p>
          </div>

          <div className="mt-12 text-center">
            <Button asChild className="bg-sky-500 hover:bg-sky-600">
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default Privacy;
