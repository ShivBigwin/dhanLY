"use client";

import Image from "next/image";

export default function PrivacyPolicy() {
  return (
    <div className="mt-10 min-h-screen bg-gray-50 pt-12 font-serif">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="relative mb-12 rounded-xl overflow-hidden shadow-lg">
          <div className="absolute inset-0 z-0">
            <Image
              src="/policy/policy.jpg"
              alt="Privacy Policy Background"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-cyan-700/80 z-0"></div>

          <div className="relative z-10 text-center py-16 px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Privacy Policy
            </h1>

            <p className="text-white text-lg mt-4 max-w-3xl mx-auto">
              Policies That Ensure Transparency, Security & Customer Protection
              at Aadi Finance
            </p>

            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-white rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 space-y-10 mb-10">
          {/* Intro */}
          <div>
            <p className="text-gray-700 leading-8">Updated at 2026-05-18</p>

            <p className="text-gray-700 leading-8 mt-4">
              We take security and privacy with the utmost regard. Following is
              the information about the policies and procedures of Aadi Finance
              and the collection, usage, disclosure, and dissemination of
              information.
            </p>

            <p className="text-gray-700 leading-8 mt-4">
              By visiting this Website you agree to be bound by the terms and
              conditions of this Privacy Policy. If you do not agree please do
              not use or access our Website.
            </p>
          </div>

          {/* Scope */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Scope of Privacy Policy
            </h2>

            <p className="text-gray-700 leading-8">
              This Privacy Policy does not apply to the practices of third
              parties that we do not own or control, including but not limited
              to third-party websites, services, and applications.
            </p>

            <p className="text-gray-700 leading-8 mt-4">
              We encourage users to carefully review the privacy policies of any
              third-party services they access.
            </p>
          </div>

          {/* Information Collection */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Information Collection
            </h2>

            <p className="text-gray-700 leading-8">
              We collect information to provide a safe, personalized, and
              optimized experience to our users. Information may include:
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 leading-8">
              <li>Name, email address, and phone number</li>
              <li>Billing and payment information</li>
              <li>IP address and browser details</li>
              <li>Transaction and purchase information</li>
              <li>Cookies and website usage data</li>
            </ul>

            <p className="text-gray-700 leading-8 mt-4">
              We use cookies to improve website functionality and user
              experience.
            </p>
          </div>

          {/* Account Information */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Account Information
            </h2>

            <p className="text-gray-700 leading-8">
              When you create an account, you may provide personal information
              such as your username, password, email address, and payment
              details.
            </p>

            <p className="text-gray-700 leading-8 mt-4">
              We may use your contact information to send important service
              updates, account recovery notifications, and relevant offers.
            </p>
          </div>

          {/* Use of Information */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Use of Demographic and Profile Data
            </h2>

            <p className="text-gray-700 leading-8">
              We use your personal information to:
            </p>

            <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-700 leading-8">
              <li>Provide and improve our services</li>
              <li>Resolve disputes and troubleshoot problems</li>
              <li>Prevent fraud and unauthorized activity</li>
              <li>Inform users about offers and updates</li>
              <li>Customize user experience</li>
            </ul>
          </div>

          {/* Sharing */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Sharing of Personal Information
            </h2>

            <p className="text-gray-700 leading-8">
              We may share personal information with affiliates, payment
              processors, hosting providers, and law enforcement authorities
              where required by law.
            </p>

            <p className="text-gray-700 leading-8 mt-4">
              All service providers are required to maintain strict
              confidentiality obligations.
            </p>
          </div>

          {/* Security */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Security of Information
            </h2>

            <p className="text-gray-700 leading-8">
              We follow industry-standard security measures to protect your
              personal information from unauthorized access, disclosure, or
              misuse.
            </p>

            <p className="text-gray-700 leading-8 mt-4">
              Sensitive information such as payment details is encrypted using
              secure technologies.
            </p>
          </div>

          {/* Retention */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Information Retention
            </h2>

            <p className="text-gray-700 leading-8">
              We retain your personal information only as long as required for
              providing services, complying with legal obligations, resolving
              disputes, and enforcing agreements.
            </p>
          </div>

          {/* Consent */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Your Consent
            </h2>

            <p className="text-gray-700 leading-8">
              By using the website and providing your information, you consent
              to the collection and use of information in accordance with this
              Privacy Policy.
            </p>
          </div>

          {/* Grievance */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Grievance Officer
            </h2>

            <div className="bg-gray-50 border rounded-lg p-5 text-gray-700 leading-8">
              <p>Aadi Finance</p>
              <p>104, Shalimar, AB Road, Indore</p>
              <p>Phone: 9111249626</p>
              <p>Email: wecare@dhanly.in</p>
              <p>Time: Mon to Fri (9AM to 6PM)</p>
            </div>
          </div>

          {/* Shipping & Payment */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Shipping & Payment Policy
            </h2>

            <p className="text-gray-700 leading-8">Updated at 2023-11-06</p>

            <p className="text-gray-700 leading-8 mt-4">
              We endeavour to dispatch all products ordered within 48 hours
              after the order has been placed and accepted by us.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="border rounded-lg p-5">
                <h3 className="font-semibold text-lg mb-3 text-gray-800">
                  Delivery Charges
                </h3>

                <p className="text-gray-700">
                  All domestic orders are delivered free of charge.
                </p>
              </div>

              <div className="border rounded-lg p-5">
                <h3 className="font-semibold text-lg mb-3 text-gray-800">
                  Additional Charges
                </h3>

                <p className="text-gray-700">
                  There are no additional charges. The total payable amount is
                  indicated on individual items.
                </p>
              </div>

              <div className="border rounded-lg p-5">
                <h3 className="font-semibold text-lg mb-3 text-gray-800">
                  Delivery Time
                </h3>

                <p className="text-gray-700">
                  Orders are generally delivered within 4 to 7 business days.
                </p>
              </div>

              <div className="border rounded-lg p-5">
                <h3 className="font-semibold text-lg mb-3 text-gray-800">
                  Delivery Areas
                </h3>

                <p className="text-gray-700">We deliver PAN India.</p>
              </div>
            </div>

            <div className="border rounded-lg p-5 mt-6">
              <h3 className="font-semibold text-lg mb-3 text-gray-800">
                Payment Mode
              </h3>

              <p className="text-gray-700">
                Cash on Delivery (COD), Internet Banking, Visa, MasterCard,
                American Express, Maestro, Debit Cards, and IMPS.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center pt-6 border-t text-gray-500 text-sm">
            <p>
              © {new Date().getFullYear()} Aadi Finance. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
