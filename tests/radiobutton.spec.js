import { test, expect } from '@playwright/test';
import { RadioButtonPage } from '../pages/RadioButtonPage.js';

test.describe('Radio Button @smoke', () => {
  let radioPage;

  test.beforeEach(async ({ page }) => {
    radioPage = new RadioButtonPage(page);
    await radioPage.goto();
  });

  test('verify radio button page loads', async ({ page }) => {
    await expect(page).toHaveURL(/radio-button/);
    await expect(radioPage.yesRadio).toBeVisible();
    console.log('Radio button page loaded!');
  });

  test('select yes radio button', async ({ page }) => {
    await radioPage.selectYes();
    await expect(radioPage.resultText).toHaveText('Yes');
    console.log('Yes radio button selected!');
  });

  test('select impressive radio button', async ({ page }) => {
    await radioPage.selectImpressive();
    await expect(radioPage.resultText).toHaveText('Impressive');
    console.log('Impressive radio button selected!');
  });

  test('no radio button is disabled', async ({ page }) => {
    await expect(radioPage.noRadio).toHaveClass(/disabled/);
    console.log('No radio button is disabled as expected!');
  });
});
