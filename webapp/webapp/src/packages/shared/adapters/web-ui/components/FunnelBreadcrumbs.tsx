'use client';
import React from 'react';
import { useLink } from '@shared/adapters/web-ui/hooks/useLink'

function getBundleIdFromCookie() {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(/(?:^|; )ski-bookers-bundleId=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : undefined;
}

const steps = [
  { label: 'Results', href: '/results' },
  { label: 'Bundle', href: (bundleId?: string) => bundleId ? `/bundle/${bundleId}` : '/bundle' },
  { label: 'Booking', href: '/booking' },
  { label: 'Payment', href: '/booking/payment' },
];

interface FunnelBreadcrumbsProps {
  currentStep: 'results' | 'bundle' | 'booking' | 'payment';
  bundleId?: string;
}

export default function FunnelBreadcrumbs({ currentStep, bundleId }: FunnelBreadcrumbsProps) {
  const Link = useLink()

  // Use cookie bundleId if not provided and on booking/payment
  let effectiveBundleId = bundleId;
  if ((currentStep === 'booking' || currentStep === 'payment') && !bundleId && typeof window !== 'undefined') {
    effectiveBundleId = getBundleIdFromCookie();
  }

  // Map step to index for highlighting
  const stepIndex = {
    results: 0,
    bundle: 1,
    booking: 2,
    payment: 3,
  }[currentStep];

  return (
    <nav className="flex items-center gap-2 text-sm mb-4" aria-label="Breadcrumb">
      {steps.map((step, i) => {
        const isActive = i === stepIndex;
        const isClickable = i < stepIndex;
        const href = typeof step.href === 'function' ? step.href(effectiveBundleId) : step.href;
        return (
          <React.Fragment key={step.label}>
            {i > 0 && <span className="text-gray-400">/</span>}
            {isActive ? (
              <span className="font-semibold text-primary">{step.label}</span>
            ) : isClickable ? (
              <Link href={href} className="text-gray-600 hover:underline">{step.label}</Link>
            ) : (
              <span className="text-gray-400">{step.label}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
} 