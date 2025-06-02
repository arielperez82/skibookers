import { test, expect } from '@playwright/test';
import { ResultsPage } from './results-page';
import { generateUniqueEmail, registerAndLoginViaApi } from '../auth/auth-helpers';
import { BundlePage } from '../booking/bundle-page';
import { ResortDetailPage } from './resort-detail-page';

test.describe('Results Page', () => {
  let email: string;
  test.beforeEach(async ({ page }) => {
    email = generateUniqueEmail();
    await registerAndLoginViaApi(page, email);
    await page.goto('/results');
  });

  test('shows resorts', async ({ page }) => {
    const resultsPage = new ResultsPage(page);
    // Loading state
    await expect(resultsPage.getLoading()).toBeVisible();
    
    // Shows resorts
    await expect(resultsPage.getResortCards().first()).toBeVisible();
  });

  test('opens to resort details modal when resort name is clicked', async ({ page }) => {
    const resultsPage = new ResultsPage(page);

    // Click the first bundle link
    const firstCard = resultsPage.getResortCards().first();
    const resortLink = firstCard.getByTestId('resort-details');
    await resortLink.click();
    
    // Expect to be on the bundle page
    const resortDetailPage = new ResortDetailPage(page);
    await expect(resortDetailPage.getCloseButton()).toBeVisible()

    await resortDetailPage.getReviewsSection().scrollIntoViewIfNeeded();
    
    await resortDetailPage.getCloseButton().click();

    await expect(resultsPage.getResortCards().first()).toBeVisible();
  });

  test('navigates to bundle when resort card is clicked', async ({ page }) => {
    const resultsPage = new ResultsPage(page);

    // Click the first bundle link
    const firstCard = resultsPage.getResortCards().first();
    const bundleLink = firstCard.getByRole('link', { name: /view bundle options/i });
    await bundleLink.click();
    
    // Expect to be on the bundle page
    const bundlePage = new BundlePage(page);
    await expect(bundlePage.getBookThisPackageButton()).toBeVisible()
  });
}); 