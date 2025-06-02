import { Page, Locator } from '@playwright/test';

export class SecurePage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/');
  }

  getLogoutButton(): Locator {
    return this.page.getByRole('button', { name: 'Sign out' });
  }

  getAccountLink(): Locator {
    return this.page.getByRole('button').filter({ hasText: 'Account' });
  }

  async openAccountMenu() {
    await this.getAccountLink().click();
  }

  async logout() {
    await this.openAccountMenu();
    await this.getLogoutButton().click();
  }
} 