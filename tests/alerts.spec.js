import { test, expect } from '@playwright/test';
import { AlertsPage } from '../pages/AlertsPage.js';

test.describe('Alerts @smoke', () => {
  let alertsPage;

  test.beforeEach(async ({ page }) => {
    alertsPage = new AlertsPage(page);
    await alertsPage.goto();
  });

  test('verify alerts page loads', async ({ page }) => {
    await expect(page).toHaveURL(/alerts/);
    await expect(alertsPage.alertButton).toBeVisible();
    console.log('Alerts page loaded!');
  });

  test('handle simple alert', async ({ page }) => {
    // listen for alert BEFORE clicking
    page.once('dialog', async dialog => {
      console.log('Alert text:', dialog.message());
      expect(dialog.message()).toBe('You clicked a button');
      await dialog.accept();
    });

    await alertsPage.alertButton.click();
    console.log('Simple alert handled!');
  });

  test('handle confirm alert - accept', async ({ page }) => {
    page.once('dialog', async dialog => {
      console.log('Confirm text:', dialog.message());
      await dialog.accept();
    });

    await alertsPage.confirmButton.click();
    await expect(alertsPage.confirmResult).toHaveText('You selected Ok');
    console.log('Confirm alert accepted!');
  });

  test('handle confirm alert - dismiss', async ({ page }) => {
    page.once('dialog', async dialog => {
      console.log('Confirm text:', dialog.message());
      await dialog.dismiss();
    });

    await alertsPage.confirmButton.click();
    await expect(alertsPage.confirmResult).toHaveText('You selected Cancel');
    console.log('Confirm alert dismissed!');
  });

  test('handle prompt alert', async ({ page }) => {
    page.once('dialog', async dialog => {
      console.log('Prompt text:', dialog.message());
      await dialog.accept('Hello Playwright');
    });

    await alertsPage.promtButton.click();
    await expect(alertsPage.promptResult).toContainText('Hello Playwright');
    console.log('Prompt alert handled!');
  });
});