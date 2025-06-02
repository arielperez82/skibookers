import { Page, Locator } from '@playwright/test';

export class BookingPaymentPage {
  constructor(private page: Page) {} 

  getCardNumberInput(): Locator {
    return this.page.getByLabel(/card number/i);
  }

  getExpiryInput(): Locator {
    return this.page.getByLabel(/expiry/i);
  }

  getCvcInput(): Locator {
    return this.page.getByLabel(/cvc/i);
  }

  getPayNowButton(): Locator {
    return this.page.getByRole('button', { name: /pay now/i });
  }
} 