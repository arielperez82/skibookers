'use client';
import React, { use, useState, useEffect } from 'react';
import { useLink } from '@shared/adapters/web-ui/hooks/useLink';
import FunnelBreadcrumbs from '@shared/adapters/web-ui/components/FunnelBreadcrumbs';
import { useImage } from '@shared/adapters/web-ui/hooks/useImage';

const mockBundle = {
  id: 'bundle-1',
  resortName: 'Alpine Peak',
  image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  skiPasses: [
    { label: 'Adult', price: 590 },
    { label: 'Child', price: 220 },
  ],
  transfer: { price: 55.9 },
  accommodation: { price: 334.1 },
};

export default function BundlePage({ params }: { params: Promise<{ bundleId: string }> }) {
  const { bundleId } = use(params);
  const [adultCount, setAdultCount] = useState(2);
  const [childCount, setChildCount] = useState(1);
  const [transferSelected, setTransferSelected] = useState(true);
  const Link = useLink()
  const Image = useImage()
  
  useEffect(() => {
    if (bundleId) {
      document.cookie = `ski-bookers-bundleId=${bundleId}; path=/;`;
    }
  }, [bundleId]);

  const adultTotal = adultCount * mockBundle.skiPasses[0].price;
  const childTotal = childCount * mockBundle.skiPasses[1].price;
  const transferTotal = transferSelected ? mockBundle.transfer.price : 0;
  const accommodationTotal = mockBundle.accommodation.price;
  const total = adultTotal + childTotal + transferTotal + accommodationTotal;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="sticky top-0 z-30 bg-background shadow">
        <div className="max-w-2xl mx-auto w-full">
          <FunnelBreadcrumbs currentStep="bundle" bundleId={bundleId} />
        </div>
      </div>
      {/* Hero Image */}
      <div className="w-full aspect-[3/1.1] bg-gray-200 overflow-hidden">
        <Image src={mockBundle.image} alt={mockBundle.resortName} className="w-full h-full object-cover" width={600} height={400} />
      </div>
      {/* Package Overview */}
      <div className="bg-white rounded-t-2xl shadow-lg -mt-8 z-10 relative p-4 md:p-8 max-w-2xl mx-auto w-full">
        <h2 className="text-lg font-bold mb-4">Package Overview</h2>
        <div className="flex flex-col gap-4">
          {/* Ski Passes */}
          <div className="flex flex-col gap-2">
            <div className="font-semibold">Ski Passes</div>
            <ul className="text-sm text-gray-700">
              <li className="flex justify-between items-center py-1">
                <span>Adult</span>
                <div className="flex items-center gap-2">
                  <button
                    aria-label="Decrease adult"
                    className="w-7 h-7 flex items-center justify-center rounded bg-gray-100 text-lg font-bold disabled:opacity-50"
                    onClick={() => setAdultCount((c) => Math.max(0, c - 1))}
                    disabled={adultCount === 0}
                  >
                    –
                  </button>
                  <span className="w-6 text-center">{adultCount}</span>
                  <button
                    aria-label="Increase adult"
                    className="w-7 h-7 flex items-center justify-center rounded bg-gray-100 text-lg font-bold"
                    onClick={() => setAdultCount((c) => c + 1)}
                  >
                    +
                  </button>
                  <span className="ml-4 min-w-[48px] text-right">€{adultTotal}</span>
                </div>
              </li>
              <li className="flex justify-between items-center py-1">
                <span>Child</span>
                <div className="flex items-center gap-2">
                  <button
                    aria-label="Decrease child"
                    className="w-7 h-7 flex items-center justify-center rounded bg-gray-100 text-lg font-bold disabled:opacity-50"
                    onClick={() => setChildCount((c) => Math.max(0, c - 1))}
                    disabled={childCount === 0}
                  >
                    –
                  </button>
                  <span className="w-6 text-center">{childCount}</span>
                  <button
                    aria-label="Increase child"
                    className="w-7 h-7 flex items-center justify-center rounded bg-gray-100 text-lg font-bold"
                    onClick={() => setChildCount((c) => c + 1)}
                  >
                    +
                  </button>
                  <span className="ml-4 min-w-[48px] text-right">€{childTotal}</span>
                </div>
              </li>
            </ul>
          </div>
          {/* Transfer Option */}
          <div className="flex justify-between items-center border-t pt-2 mt-2">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={transferSelected}
                onChange={() => setTransferSelected((v) => !v)}
                className="accent-primary w-4 h-4"
              />
              <span className="font-semibold">Flexible Transfer</span>
            </label>
            <span>€{mockBundle.transfer.price.toFixed(2)}</span>
          </div>
        </div>
        {/* Price Breakdown */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-bold text-base">Total</span>
            <span className="font-bold text-xl text-primary">€{total.toFixed(2)}</span>
          </div>
          <ul className="text-xs text-gray-500 divide-y">
            <li className="flex justify-between py-1">
              <span>Ski Pass (Adult)</span>
              <span>€{adultTotal.toFixed(2)}</span>
            </li>
            <li className="flex justify-between py-1">
              <span>Ski Pass (Child)</span>
              <span>€{childTotal.toFixed(2)}</span>
            </li>
            {transferSelected && (
              <li className="flex justify-between py-1">
                <span>Transfer</span>
                <span>€{mockBundle.transfer.price.toFixed(2)}</span>
              </li>
            )}
            <li className="flex justify-between py-1">
              <span>Accommodation</span>
              <span>€{accommodationTotal.toFixed(2)}</span>
            </li>
          </ul>
        </div>
        {/* CTA */}
        <Link href="/booking">
          <button className="mt-6 w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-base shadow hover:bg-primary/90 transition cursor-pointer">Book This Package</button>
        </Link>
      </div>
    </div>
  );
} 