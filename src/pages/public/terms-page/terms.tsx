export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-left">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
          Terms and Conditions
        </h2>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Welcome to HavenLease. These Terms and Conditions ("Terms") govern
              your use of our platform, website, and services. By accessing or
              using HavenLease, you agree to be bound by these Terms. If you do
              not agree to any part of these Terms, please do not use our
              platform.
            </p>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              2. User Accounts
            </h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700">
              <li>
                You are responsible for maintaining the confidentiality of your
                account credentials
              </li>
              <li>
                You agree to provide accurate and complete information during
                registration
              </li>
              <li>You must be at least 18 years old to use HavenLease</li>
              <li>
                You are solely responsible for all activities that occur under
                your account
              </li>
              <li>
                You agree to notify us immediately of any unauthorized use of
                your account
              </li>
            </ul>
          </section>

          {/* User Responsibilities */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              3. User Responsibilities
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              As a user of HavenLease, you agree to:
            </p>
            <ul className="list-disc list-inside space-y-3 text-gray-700">
              <li>Use the platform only for lawful purposes</li>
              <li>
                Not engage in any conduct that violates applicable laws or
                regulations
              </li>
              <li>Not post false, misleading, or defamatory content</li>
              <li>Not harass, threaten, or discriminate against other users</li>
              <li>
                Respect intellectual property rights of HavenLease and other
                users
              </li>
              <li>Not attempt to breach or circumvent security measures</li>
            </ul>
          </section>

          {/* Listings and Bookings */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              4. Property Listings and Bookings
            </h2>
            <p className="text-gray-700 leading-relaxed mb-3">For Landlords:</p>
            <ul className="list-disc list-inside space-y-3 text-gray-700 mb-4">
              <li>
                You are responsible for the accuracy of your property listings
              </li>
              <li>
                You agree to keep listings current and remove them if the
                property is no longer available
              </li>
              <li>
                You must comply with all applicable housing laws and regulations
              </li>
              <li>
                You agree not to discriminate against tenants based on protected
                characteristics
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-3">For Tenants:</p>
            <ul className="list-disc list-inside space-y-3 text-gray-700">
              <li>You agree to respect property rules and landlord policies</li>
              <li>
                You are responsible for payment of rent on the agreed dates
              </li>
              <li>You agree to maintain the property in good condition</li>
              <li>
                You agree to vacate the property on the agreed checkout date
              </li>
            </ul>
          </section>

          {/* Payment Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              5. Payment and Billing
            </h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700">
              <li>
                All payments must be made through our secure payment gateway
              </li>
              <li>
                You authorize us to charge your payment method for services
                rendered
              </li>
              <li>Refunds are subject to our Refund Policy</li>
              <li>
                Late payments may incur additional charges as specified in the
                listing
              </li>
              <li>
                We reserve the right to suspend accounts with outstanding
                balances
              </li>
            </ul>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              6. Limitation of Liability
            </h2>
            <p className="text-gray-700 leading-relaxed">
              To the fullest extent permitted by law, HavenLease shall not be
              liable for any indirect, incidental, special, consequential, or
              punitive damages arising from your use of or inability to use the
              platform, even if we have been advised of the possibility of such
              damages.
            </p>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              7. Disclaimer of Warranties
            </h2>
            <p className="text-gray-700 leading-relaxed">
              The platform and all content are provided on an "as-is" and
              "as-available" basis. HavenLease makes no representations or
              warranties of any kind, express or implied, regarding the platform
              or services. We do not guarantee that the platform will be
              uninterrupted, secure, or error-free.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              8. Intellectual Property Rights
            </h2>
            <p className="text-gray-700 leading-relaxed">
              All content on HavenLease, including text, graphics, logos, and
              images, is the property of HavenLease or its content suppliers and
              is protected by international copyright laws. You may not
              reproduce, distribute, or transmit any content without our prior
              written permission.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              9. Termination of Service
            </h2>
            <p className="text-gray-700 leading-relaxed">
              We reserve the right to suspend or terminate your account and
              access to the platform at our sole discretion, without notice, for
              violations of these Terms or any unlawful conduct. Upon
              termination, all rights granted to you are immediately revoked.
            </p>
          </section>

          {/* Amendments */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              10. Amendments to Terms
            </h2>
            <p className="text-gray-700 leading-relaxed">
              HavenLease reserves the right to modify these Terms at any time.
              We will notify users of significant changes via email or a
              prominent notice on our platform. Your continued use of the
              platform constitutes acceptance of the modified Terms.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              11. Contact Us
            </h2>
            <p className="text-gray-700 leading-relaxed">
              If you have questions about these Terms and Conditions, please
              contact us at:
            </p>
            <p className="text-gray-700 mt-3">
              <strong>HavenLease Support</strong>
              <br />
              Email: support@havenLease.com
              <br />
              Phone: +234 (0) XXX XXX XXXX
              <br />
              Address: [Your Address Here]
            </p>
          </section>

          {/* Last Updated */}
          <section className="border-t pt-6">
            <p className="text-gray-600 text-sm">
              Last Updated: January 7, 2026
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
