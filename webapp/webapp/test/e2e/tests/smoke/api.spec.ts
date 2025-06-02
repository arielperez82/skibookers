import { test, expect } from '@playwright/test';

test('app is loading', async ({ request }) => {
  // Test health endpoint
  const healthResponse = await request.get('/');
  expect(healthResponse.ok()).toBeTruthy();
}); 