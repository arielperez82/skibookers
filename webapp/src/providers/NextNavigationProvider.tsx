'use client';
import { NavigationProvider } from '@shared/adapters/web-ui/providers/NavigationProvider';
import { NavigationService } from '@shared/application/ports/navigation-service';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

const NextNavigationProviderRaw: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const navigator = { navigate: (path: string) => router.push(path), back: () => router.back(), getNavigationParams: () => searchParams } as NavigationService;
  return <NavigationProvider navigator={navigator}>{children}</NavigationProvider>;
};

export const NextNavigationProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NextNavigationProviderRaw>{children}</NextNavigationProviderRaw>
    </Suspense>
  );
};
