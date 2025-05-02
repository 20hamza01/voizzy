import React from "react";
import LandingLayout from "@/components/layout/LandingLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const Privacy = () => {
  return <LandingLayout>
      <div className="py-16 bg-white">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Privacy Policy</h1>
            <p className="mt-4 text-lg text-gray-600">Last updated: April 29, 2025</p>
          </div>

          <div className="prose prose-sky max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">1. Introduction</h2>
              <p className="mb-4">
                Voizzy ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our testimonial collection and showcase platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">2. Information We Collect</h2>
              <p className="mb-2">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Account information (name, email address, password)</li>
                <li>Profile information (company name, website URL)</li>
                <li>Payment information</li>
                <li>Testimonials and feedback collected through our platform</li>
                <li>Communications you send to us</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">3. How We Use Your Information</h2>
              <p className="mb-2">We may use the information we collect for various purposes, including to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send administrative messages, updates, and security alerts</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Monitor and analyze usage patterns and trends</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">4. Sharing of Information</h2>
              <p className="mb-2">We may share your information with:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Service providers who perform services on our behalf</li>
                <li>Business partners with your consent</li>
                <li>In response to legal process or when required by law</li>
                <li>In connection with a merger, sale, or acquisition</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">5. Data Security</h2>
              <p className="mb-4">
                We implement appropriate technical and organizational measures to protect the security of your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">6. Your Rights</h2>
              <p className="mb-2">Depending on your location, you may have certain rights regarding your personal information, including:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Access to your personal information</li>
                <li>Correction of inaccurate information</li>
                <li>Deletion of your information</li>
                <li>Restriction of processing</li>
                <li>Data portability</li>
                <li>Object to processing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">7. Changes to This Privacy Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">8. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:contact@voizzy.io" className="text-sky-600 hover:underline">contact@voizzy.io</a>
                .
              </p>
            </section>
          </div>

          <div className="mt-12 text-center">
            <Button asChild className="bg-sky-500 hover:bg-sky-600">
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </LandingLayout>;
};
export default Privacy;