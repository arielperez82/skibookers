import { test, expect } from '@playwright/test';
import { BundlePage } from './bundle-page';
import { ResultsPage } from '@test/e2e/tests/resort-discovery/results-page';
import { generateUniqueEmail, registerAndLoginViaApi } from '@test/e2e/tests/auth/auth-helpers';
import { BookingPage } from './booking-page';
import { BookingPaymentPage } from './booking-payment-page';
import { BookingConfirmationPage } from './booking-confirmation-page';

// Helper to get a date string in YYYY-MM-DD format, offset by days
function getDateString(offsetDays: number): string {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().split('T')[0];
}

test.describe('Booking Flow', () => {
  let email: string;
  test.beforeEach(async ({ page }) => {
    email = generateUniqueEmail();
    await registerAndLoginViaApi(page, email);
  });

  test('user can book a bundle and download PDF', async ({ page }) => {
    // 1. Go to results and select a bundle
    const resultsPage = new ResultsPage(page);
    await resultsPage.goto();
    await expect(resultsPage.getResortCards().first()).toBeVisible();
    const firstCard = resultsPage.getResortCards().first();
    const bundleLink = firstCard.getByRole('link', { name: /view bundle options/i });
    await bundleLink.click();
    //await expect(page).toHaveURL(/\/bundle\//);

    // 2. On bundle page, uncheck flexible transport, book package
    const bundlePage = new BundlePage(page);
    const transportCheckbox = bundlePage.getFlexibleTransportCheckbox();
    await transportCheckbox.uncheck();
    await bundlePage.getBookThisPackageButton().click();

    // 3. Fill booking details
    const bookingPage = new BookingPage(page);
    await bookingPage.getNameInput().fill('Test User');
    await bookingPage.getEmailInput().fill(email);
    await bookingPage.getCheckinInput().fill(getDateString(1));
    await bookingPage.getCheckoutInput().fill(getDateString(3));
    await bookingPage.getContinueToPaymentButton().click();

    // 4. Fill payment details
    const bookingPaymentPage = new BookingPaymentPage(page);
    await bookingPaymentPage.getCardNumberInput().fill('4242424242424242');
    await bookingPaymentPage.getExpiryInput().fill('12/30');
    await bookingPaymentPage.getCvcInput().fill('123');
    await bookingPaymentPage.getPayNowButton().click();

    // 5. Download PDF
    const bookingConfirmationPage = new BookingConfirmationPage(page);
    await expect(bookingConfirmationPage.getDownloadPdfButton()).toBeVisible();
    await bookingConfirmationPage.getDownloadPdfButton().click();
  });
}); 