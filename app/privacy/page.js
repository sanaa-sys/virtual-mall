import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Introduction
            </h2>
            <p className="text-gray-700 mb-4">
              Welcome to our Privacy Policy. Your privacy is critically
              important to us. This Privacy Policy document contains types of
              information that is collected and recorded by our website and how
              we use it.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Information We Collect
            </h2>
            <p className="text-gray-700 mb-4">
              We only collect information about you if we have a reason to do so
              - for example, to provide our services, to communicate with you,
              or to make our services better.
            </p>
            <p className="text-gray-700 mb-4">
              We collect this information from three sources:
            </p>
            <ul className="list-disc pl-5 text-gray-700 mb-4">
              <li>Information you provide to us directly</li>
              <li>Information we get from your use of our services</li>
              <li>Information we receive from third parties</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. How We Use Information
            </h2>
            <p className="text-gray-700 mb-4">
              We use the information we collect in various ways, including to:
            </p>
            <ul className="list-disc pl-5 text-gray-700 mb-4">
              <li>Provide, operate, and maintain our website</li>
              <li>Improve, personalize, and expand our website</li>
              <li>Understand and analyze how you use our website</li>
              <li>
                Develop new products, services, features, and functionality
              </li>
              <li>
                Communicate with you, either directly or through one of our
                partners, including for customer service, to provide you with
                updates and other information relating to the website, and for
                marketing and promotional purposes
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Cookies
            </h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar tracking technologies to track the
              activity on our website and hold certain information. Cookies are
              files with small amount of data which may include an anonymous
              unique identifier.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Third-Party Privacy Policies
            </h2>
            <p className="text-gray-700 mb-4">
              Our Privacy Policy does not apply to other advertisers or
              websites. Thus, we are advising you to consult the respective
              Privacy Policies of these third-party ad servers for more detailed
              information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 mb-4">
              We may update our Privacy Policy from time to time. Thus, we
              advise you to review this page periodically for any changes. We
              will notify you of any changes by posting the new Privacy Policy
              on this page. These changes are effective immediately, after they
              are posted on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Contact Us
            </h2>
            <p className="text-gray-700 mb-4">
              If you have any questions or suggestions about our Privacy Policy,
              do not hesitate to contact us.
            </p>
            <a
              href="/contact"
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              Contact Us
            </a>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
