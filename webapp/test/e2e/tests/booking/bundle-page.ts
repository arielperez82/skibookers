import { Page, Locator } from '@playwright/test';

export class BundlePage {
  constructor(private page: Page) {}

  async goto(bundleId: string) {
    await this.page.goto(`/bundle/${bundleId}`);
  }

  getFlexibleTransportCheckbox(): Locator {
    return this.page.getByRole('checkbox', { name: /flexible transfer/i });
  }

  getBookThisPackageButton(): Locator {
    return this.page.getByRole('button', { name: /book this package/i });
  }
} 