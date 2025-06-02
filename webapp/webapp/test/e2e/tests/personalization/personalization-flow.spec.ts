import { test, expect } from '@playwright/test';
import { PersonalizationPage } from './personalization-page';
import { ResultsPage } from '@test/e2e/tests/resort-discovery/results-page';
import { generateUniqueEmail, registerAndLoginViaApi } from '@test/e2e/tests/auth/auth-helpers';

test.describe('Personalization Flow', () => {
  let email: string;
  test.beforeEach(async ({ page }) => {
    email = generateUniqueEmail();
    await registerAndLoginViaApi(page, email);
  });

  test('user can personalize and see resort/bundle cards', async ({ page }) => {
    const personalizationPage = new PersonalizationPage(page);
    await personalizationPage.goto();

    while (true) {
      await personalizationPage.getFirstAnswer().click();
      
      const itsVisible = await personalizationPage.getNextButton().isVisible();
      if (!itsVisible) {
        break;
      }
      await personalizationPage.getNextButton().click();
    }
    await personalizationPage.getCompleteButton().click();

    const resultsPage = new ResultsPage(page);
    await expect(resultsPage.getResortCards().first()).toBeVisible();
  });
}); 