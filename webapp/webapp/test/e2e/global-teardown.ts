import { type FullConfig } from '@playwright/test';
import { execSync } from 'child_process';

async function globalTeardown(config: FullConfig) {
  if (process.env.E2E_SKIP_BACKEND !== 'true') {
    execSync('pnpm supabase:stop', { stdio: 'inherit' });
  }
}

export default globalTeardown; 