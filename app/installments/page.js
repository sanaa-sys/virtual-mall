'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import NavBar from "@/components/ui/navbar";

export default function InstallmentsPage() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const router = useRouter();

  const installmentPlans = [
    { months: 3, interest: 5 },
    { months: 6, interest: 8 },
    { months: 12, interest: 12 },
  ];

  const handlePlanSelection = (months) => {
    setSelectedPlan(months);
  };

  const handleProceedToPayment = () =>{
    router.push("/payment"); // Proceed without installments
  };

  const handleProceedToCheckout = () => {
    if (selectedPlan) {
      router.push(`/payment?installment=${selectedPlan}`);
    } else {
      alert('Please select an installment plan');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <NavBar />
      <h1 className="text-2xl font-bold mb-4">Installment Options</h1>
      <p className="mb-4">Your budget is insufficient for a one-time payment. Please choose an installment plan:</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {installmentPlans.map((plan) => (
          <div 
            key={plan.months} 
            className={`border p-4 rounded-lg cursor-pointer ${selectedPlan === plan.months ? 'border-blue-500 bg-blue-50' : ''}`}
            onClick={() => handlePlanSelection(plan.months)}
          >
            <h2 className="text-lg font-semibold">{plan.months} Months</h2>
            <p>Interest: {plan.interest}%</p>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Button 
          onClick={handleProceedToCheckout} 
          className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Proceed with Installments
        </Button>
        <Button 
          onClick={handleProceedToPayment} 
          className="flex-1 py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Proceed without Installments
        </Button>
      </div>
    </div>
  );
}
