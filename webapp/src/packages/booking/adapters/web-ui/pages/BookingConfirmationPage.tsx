'use client';
import React, { use } from 'react';

const mockTrip = {
  resort: 'Alpine Peak',
  dates: '2024-12-20 to 2024-12-27',
  guests: 2,
  confirmation: 'test-booking-123',
  total: 1790,
};

async function handleDownloadPDF() {
  const res = await fetch(`/api/confirmation/itinerary?bookingId=${mockTrip.confirmation}`);
  if (!res.ok) return;
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `itinerary-${mockTrip.confirmation}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}

export default function BookingConfirmationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="bg-white rounded-xl shadow p-6 max-w-md w-full flex flex-col items-center gap-4">
        <div className="text-5xl text-green-500 animate-bounce">✓</div>
        <div className="text-lg font-bold">Booking Confirmed!</div>
        <div className="text-sm text-gray-600 mb-2">Confirmation #: <span className="font-mono text-primary">{id || mockTrip.confirmation}</span></div>
        <div className="w-full bg-gray-50 rounded-lg p-4 flex flex-col gap-2 text-sm">
          <div className="flex justify-between"><span>Resort:</span><span>{mockTrip.resort}</span></div>
          <div className="flex justify-between"><span>Dates:</span><span>{mockTrip.dates}</span></div>
          <div className="flex justify-between"><span>Guests:</span><span>{mockTrip.guests}</span></div>
          <div className="flex justify-between font-semibold"><span>Total:</span><span>€{mockTrip.total}</span></div>
        </div>
        <div className="flex gap-2 mt-4 w-full">
          <button
            className="flex-1 py-2 rounded-lg border border-primary text-primary font-semibold hover:bg-primary/10 transition cursor-pointer"
            onClick={handleDownloadPDF}
          >
            Download PDF
          </button>
          <button className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition cursor-pointer">Share Trip</button>
        </div>
      </div>
    </div>
  );
} 