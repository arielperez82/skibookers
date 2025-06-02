import { Page, Locator } from '@playwright/test';

export class ResultsPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/results');
  }

  getLoading(): Locator {
    return this.page.getByText(/loading \w+/i);
  }

  getNoRecommendations(): Locator {
    return this.page.getByText(/no \w+ found/i);
  }

  getResortCards(): Locator {
    return this.page.locator('[data-testid="resort-card"]');
  }

  getResortByName(name: string): Locator {
    return this.page.getByRole('heading', { name });
  }

  getBundleLinkForResort(resortId: string): Locator {
    return this.page.getByRole('link', { name: /view bundle options/i, exact: false }).filter({ has: this.page.locator(`[href="/bundle/${resortId}"]`) });
  }
} 