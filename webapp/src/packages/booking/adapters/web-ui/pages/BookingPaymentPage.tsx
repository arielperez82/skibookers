'use client';
import React, { useState } from 'react';
import FunnelBreadcrumbs from '@shared/adapters/web-ui/components/FunnelBreadcrumbs';
import { useNavigation } from '@shared/adapters/web-ui/hooks/useNavigation';

export default function BookingPaymentPage() {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setError(null);
    setTimeout(() => {
      // Simulate success (set error to simulate failure)
      const isSuccess = true;
      if (isSuccess) {
        navigation.navigate('/booking/confirmation/test-booking-123');
      } else {
        setProcessing(false);
        setError('Payment failed. Please try again.');
      }
    }, 1800);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="sticky top-0 z-30 bg-background shadow w-full max-w-md">
        <FunnelBreadcrumbs currentStep="payment" />
      </div>
      <form
        onSubmit={handlePay}
        className="bg-white rounded-xl shadow p-6 max-w-md w-full flex flex-col gap-4"
      >
        <h1 className="text-xl font-bold mb-2">Payment</h1>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="cardNumber">Card Number</label>
          <input
            id="cardNumber"
            type="text"
            inputMode="numeric"
            pattern="[0-9 ]*"
            placeholder="4242 4242 4242 4242"
            className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary bg-background"
            disabled={processing}
            required
          />
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1" htmlFor="expiry">Expiry</label>
            <input
              id="expiry"
              type="text"
              inputMode="numeric"
              pattern="(0[1-9]|1[0-2])\/(2[5-9]|3[0-9])"
              placeholder="MM/YY"
              className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              disabled={processing}
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1" htmlFor="cvc">CVC</label>
            <input
              id="cvc"
              type="text"
              inputMode="numeric"
              pattern="[0-9]{3,4}"
              placeholder="CVC"
              className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary bg-background"
              disabled={processing}
              required
            />
          </div>
        </div>
        {error && <div className="text-destructive text-sm text-center">{error}</div>}
        <button
          type="submit"
          disabled={processing}
          className="mt-4 w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-base shadow hover:bg-primary/90 transition disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {processing ? (
            <>
              <svg className="animate-spin h-5 w-5 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Pay Now'
          )}
        </button>
      </form>
    </div>
  );
} 