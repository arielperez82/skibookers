import { Page, Locator } from '@playwright/test';

export class BookingPage {
  constructor(private page: Page) {}

  getNameInput(): Locator {
    return this.page.getByLabel(/name/i);
  }

  getEmailInput(): Locator {
    return this.page.getByLabel(/email/i);
  }

  getCheckinInput(): Locator {
    return this.page.getByLabel(/check[- ]?in/i);
  }

  getCheckoutInput(): Locator {
    return this.page.getByLabel(/check[- ]?out/i);
  }

  getContinueToPaymentButton(): Locator {
    return this.page.getByRole('button', { name: /continue to payment/i });
  }
} 