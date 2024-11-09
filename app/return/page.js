import { Truck, RotateCcw, Clock, CreditCard } from "lucide-react";

export default function ShippingAndReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Shipping & Returns
        </h1>

        <section className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4 flex items-center">
              <Truck className="mr-2 h-5 w-5 text-indigo-500" />
              Shipping Information
            </h2>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p className="mb-2">We offer the following shipping options:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Standard Shipping (5-7 business days): $5.99</li>
                <li>Express Shipping (2-3 business days): $12.99</li>
                <li>Next Day Shipping (1 business day): $24.99</li>
              </ul>
              <p className="mt-2">Free shipping on orders over $50!</p>
            </div>
          </div>
        </section>

        <section className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4 flex items-center">
              <RotateCcw className="mr-2 h-5 w-5 text-indigo-500" />
              Return Policy
            </h2>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p className="mb-2">
                We want you to be completely satisfied with your purchase. If
                you&apos;re not happy with your order, you can return it within
                30 days of receipt for a full refund or exchange.
              </p>
              <p>
                To be eligible for a return, your item must be unused and in the
                same condition that you received it. It must also be in the
                original packaging.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4 flex items-center">
              <Clock className="mr-2 h-5 w-5 text-indigo-500" />
              Processing Time
            </h2>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>
                All orders are processed within 1-2 business days. Orders are
                not shipped or delivered on weekends or holidays.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900 mb-4 flex items-center">
              <CreditCard className="mr-2 h-5 w-5 text-indigo-500" />
              Refunds
            </h2>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p className="mb-2">
                Once we receive your item, we will inspect it and notify you
                that we have received your returned item. We will immediately
                notify you on the status of your refund after inspecting the
                item.
              </p>
              <p>
                If your return is approved, we will initiate a refund to your
                credit card (or original method of payment). You will receive
                the credit within a certain amount of days, depending on your
                card issuer&apos;s policies.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
