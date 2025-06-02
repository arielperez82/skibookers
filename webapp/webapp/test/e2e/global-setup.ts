import { type FullConfig } from '@playwright/test';
import { execSync } from 'child_process';

async function globalSetup(config: FullConfig) {
  if (process.env.E2E_SKIP_BACKEND !== 'true') {
    execSync('pnpm supabase:start', { stdio: 'inherit' });
  }
  process.env.TEST_SETUP_COMPLETE = 'true';
}

export default globalSetup; 