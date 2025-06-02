import { Page, Locator } from '@playwright/test';

export class ResortDetailPage {
  constructor(private page: Page) {}

  async goto(resortId: string) {
    await this.page.goto(`/resort/${resortId}`);
  }

  getCloseButton(): Locator {
    return this.page.getByRole('button', { name: /close resort details/i });
  }

  getResortName(): Locator {
    return this.page.getByRole('heading', { name: /.+/ });
  }

  getReviewsSection(): Locator {
    return this.page.getByText('Reviews');
  }
} 