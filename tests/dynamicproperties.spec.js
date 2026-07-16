import { test, expect } from '@playwright/test';
import { DynamicPropertiesPage } from '../pages/DynamicPropertiesPage.js';

test.describe('Dynamic Properties @regression', () => {
  let dynamicPage;

  test.beforeEach(async ({ page }) => {
    dynamicPage = new DynamicPropertiesPage(page);
    await dynamicPage.goto();
  });

  test('verify dynamic properties page loads', async ({ page }) => {
    await expect(page).toHaveURL(/dynamic-properties/);
    console.log('Dynamic properties page loaded!');
  });

  test('button is disabled initially', async ({ page }) => {
    // button should be disabled when page first loads
    await expect(dynamicPage.enableAfterButton).toBeDisabled();
    console.log('Button is disabled initially!');
  });

  test('button becomes enabled after 5 seconds', async ({ page }) => {
    test.setTimeout(15000);

    // wait for button to become enabled
    await expect(dynamicPage.enableAfterButton).toBeEnabled({ timeout: 10000 });
    console.log('Button became enabled after delay!');
  });

  test('button becomes visible after 5 seconds', async ({ page }) => {
    test.setTimeout(15000);

    // button should not be visible initially
    await expect(dynamicPage.visibleAfterButton).toBeHidden();

    // wait for it to appear
    await expect(dynamicPage.visibleAfterButton).toBeVisible({ timeout: 10000 });
    console.log('Button became visible after delay!');
  });

  test('button color changes after 5 seconds', async ({ page }) => {
    test.setTimeout(15000);

    // get initial color
    const initialColor = await dynamicPage.colorChangeButton.evaluate(
      el => window.getComputedStyle(el).color
    );
    console.log('Initial color:', initialColor);

    // wait for color to change
    await page.waitForTimeout(6000);

    const newColor = await dynamicPage.colorChangeButton.evaluate(
      el => window.getComputedStyle(el).color
    );
    console.log('New color:', newColor);

    expect(newColor).not.toBe(initialColor);
    console.log('Button color changed successfully!');
  });
});