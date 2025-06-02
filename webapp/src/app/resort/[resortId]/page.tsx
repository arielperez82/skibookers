'use client'
import { use } from 'react';
import { ResortDetailPage } from '@resort-discovery/adapters/web-ui/pages/ResortDetailPage';

export default function Page({ params }: { params: Promise<{ resortId: string }> }) {
  const { resortId } = use(params);
  return <ResortDetailPage resortId={resortId} />;
}
