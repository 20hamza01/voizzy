import React from "react";
import LandingLayout from "@/components/layout/LandingLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const Terms = () => {
  return <LandingLayout>
      <div className="py-16 bg-white">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="mb-12 text-center">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Terms of Service</h1>
            <p className="mt-4 text-lg text-gray-600">Last updated: April 29, 2025</p>
          </div>

          <div className="prose prose-sky max-w-none">
            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing or using Voizzy's services, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions, you should not use our service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">2. Description of Service</h2>
              <p className="mb-4">
                Voizzy provides a platform for collecting, managing, and showcasing customer testimonials. The service includes tools for creating testimonial forms, managing submissions, and displaying testimonials on websites through various widgets and embeds.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">3. User Accounts</h2>
              <p className="mb-4">
                To use certain features of our service, you must register for an account. You agree to provide accurate information and keep your account credentials secure. You are responsible for all activities that occur under your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">4. Subscription and Billing</h2>
              <p className="mb-4">
                Voizzy offers subscription plans with different features and limitations. Subscription fees are billed in advance on a monthly or annual basis. Cancellations take effect at the end of the current billing cycle.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">5. Content Ownership and License</h2>
              <p className="mb-4">
                You retain all rights to your content. By using our service, you grant Voizzy a license to host, store, and display your content for the purpose of providing the service to you and your users.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">6. Prohibited Uses</h2>
              <p className="mb-2">You agree not to use the service to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon intellectual property rights</li>
                <li>Collect or store personal data about others without their consent</li>
                <li>Transmit harmful code or conduct malicious activities</li>
                <li>Impersonate another person or entity</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">7. Termination</h2>
              <p className="mb-4">
                We may suspend or terminate your access to the service if you violate these terms. You may terminate your account at any time by following the instructions on the website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">8. Disclaimers and Limitations of Liability</h2>
              <p className="mb-4">
                The service is provided "as is" without warranties of any kind. To the fullest extent permitted by law, Voizzy disclaims all warranties, express or implied.
              </p>
              <p className="mb-4">
                In no event shall Voizzy be liable for any indirect, incidental, special, consequential, or punitive damages.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">9. Changes to Terms</h2>
              <p className="mb-4">
                We may modify these Terms at any time. We will provide notice of material changes by posting the updated Terms on our website and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold mb-4">10. Contact Information</h2>
              <p className="mb-4">
                For questions about these Terms, please contact us at{" "}
                <a href="mailto:hamzaalaouiismaili21@gmail.com" className="text-sky-600 hover:underline">contact@voizzy.io</a>
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
export default Terms;