# Decoupling Features from Next

The goal of this migration is to ensure the features components are "Pure" with no Next code in them. This will make them much easier to reuse in any framework, including ReactNative.

Note: ALL of these occur under `webapp/src`!

✅ Step 1: Define Service Interfaces and Registry (No runtime impact)
Goal: Clarify what your app expects to inject (e.g., NavigationService, AuthService, ConfigService, etc.)
Action:

In `shared/registry/`

- define TypeScript interfaces and a base `ServiceRegistry` interface:

```typescript
export interface NavigationService {
  navigate(path: string): void;
}

export interface ServiceRegistry {
  navigation: NavigationService;
  // add others like auth, config, etc.
}
```

- Create a `ServiceRegistryContext`:

```typescript
export const ServiceRegistryContext = createContext<ServiceRegistry | null>(null);
export const useServiceRegistry = () => {
  const ctx = useContext(ServiceRegistryContext);
  if (!ctx) throw new Error('ServiceRegistry not provided');
  return ctx;
};
```

✅ Step 2: Set Up AppProvider for Client (No usage yet)
Goal: Prepare for injecting services without changing any consumers.
Action:

- In `shared/adapters/web-ui/AppProvider.tsx`:

```typescript
'use client';
import { ServiceRegistryContext } from 'shared/adapters/web-ui/contexts/service-registry-context';
import { ClientServiceRegistrar } from 'shared/registry/client-service-registrar';

const registry = ClientServiceRegistrar.createRegistry();

export const AppProvider = ({ children }) => (
  <ServiceRegistryContext.Provider value={registry}>
    {children}
  </ServiceRegistryContext.Provider>
);
```

✅ Step 3: Apply AppProvider at Top-Level Layout (Non-breaking)
Goal: Enable DI throughout the app tree.
Action:

- In `app/layout.tsx` or wherever the root layout is:

```typescript
import { AppProvider } from '@/shared/adapters/web-ui/AppProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
```

✅ Step 4: For Each Service, Create a Dedicated Hook
Goal: Give consumers a clean API to access each service.
Action:

- In `shared/hooks/useNavigation.ts`:

```typescript
import { useServiceRegistry } from 'features/shared/registry';

export const useNavigation = () => {
  return useServiceRegistry().navigation;
};
```

- Repeat for other services as needed (useAuth, useConfig, etc.)

✅ Step 5: Incrementally Migrate Features to Use Hooks
Goal: Replace direct Next.js usage with injected services.
Approach: Choose a small leaf component first.
Action:

In all directories under `features/`:
- Replace `useRouter().push(...)` with `useNavigation().navigate(...)`
- Remove `next/navigation` imports
- Ensure logic still works

Example migration:

```typescript
// Before
import { useRouter } from 'next/navigation';
const router = useRouter();
router.push('/foo');

// After
import { useNavigation } from 'shared/hooks/useNavigation';
const { navigate } = useNavigation();
navigate('/foo');
```

Test: Verify the feature still works. Since it’s using a context that’s already injected globally, this is safe.

✅ Step 6: For Server Components, Inject Props Instead
Goal: RSCs cannot use context if the service is client-only.
Action:

- Move any navigate, auth, etc. logic to the client component (via context)
- Pass pure data to RSCs
- Server components continue to call services directly when safe (e.g., DB fetch)
  
✅ Step 7: Add ESLint Rule to Forbid Next.js Imports in features/
Goal: Prevent regressions.
Action:

- Use `eslint-plugin-boundaries` or `no-restricted-imports`:

```js
rules: {
  'no-restricted-imports': [
    'error',
    {
      paths: [{ name: 'next/*', message: 'Do not import Next.js inside features/*' }],
      patterns: ['next/*'],
    },
  ],
},
overrides: [
  {
    files: ['src/features/**/*'],
    rules: { 'no-restricted-imports': ['error', { patterns: ['next/*'] }] },
  },
]
```