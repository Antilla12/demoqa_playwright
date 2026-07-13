import { test, expect } from '@playwright/test';
import { TextBoxPage } from '../pages/TextBoxPage.js';

test.describe('Text Box @smoke', () => {
  let textBoxPage;

  test.beforeEach(async ({ page }) => {
    textBoxPage = new TextBoxPage(page);
    await textBoxPage.goto();
  });

  test('fill and submit text box form', async ({ page }) => {
    await textBoxPage.fillForm(
      'John Doe',
      'john@example.com',
      '123 Current Street',
      '456 Permanent Avenue'
    );
    await textBoxPage.submit();

    // verify output section appears
    await expect(textBoxPage.outputName).toBeVisible();
    await expect(textBoxPage.outputEmail).toBeVisible();
    console.log('Text box form submitted successfully!');
  });

  test('verify output contains correct name', async ({ page }) => {
    await textBoxPage.fillForm(
      'Jane Smith',
      'jane@example.com',
      '789 Main St',
      '101 Second St'
    );
    await textBoxPage.submit();

    await expect(textBoxPage.outputName).toContainText('Jane Smith');
    await expect(textBoxPage.outputEmail).toContainText('jane@example.com');
    console.log('Output verified successfully!');
  });

  test('verify page title', async ({ page }) => {
    await expect(page).toHaveTitle(/demosite/);
    console.log('Page title verified!');
  });
});