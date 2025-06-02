import { Page, Locator } from '@playwright/test';

export class PersonalizationPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('/quiz');
  }

  getFirstAnswer(): Locator {
    return this.page.locator('[data-testid="quiz-answer"]').first();
  }

  getNthAnswer(n: number): Locator {
    return this.page.locator('[data-testid="quiz-answer"]').nth(n);
  }

  getNextButton(): Locator {
    return this.page.getByRole('button', { name: 'Next', exact: true });
  }

  getCompleteButton(): Locator {
    return this.page.getByRole('button', { name: 'Complete', exact: true });
  }
} 