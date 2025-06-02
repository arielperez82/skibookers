import { Page, Locator } from '@playwright/test';

export class BookingConfirmationPage {
  constructor(private page: Page) {}

  getDownloadPdfButton(): Locator {
    return this.page.getByRole('button', { name: /download pdf/i });
  }
} 