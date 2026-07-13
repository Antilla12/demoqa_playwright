import { test, expect } from '@playwright/test';
import { WebTablesPage } from '../pages/WebTablesPage.js';

test.describe('Web Tables @regression', () => {
  let webTablesPage;

  test.beforeEach(async ({ page }) => {
    webTablesPage = new WebTablesPage(page);
    await webTablesPage.goto();
  });

  test('verify web tables page loads', async ({ page }) => {
    await expect(page).toHaveURL(/webtables/);
    await expect(webTablesPage.addButton).toBeVisible();
    console.log('Web tables page loaded!');
  });

  test('add a new record', async ({ page }) => {
    await webTablesPage.addRecord(
      'John', 'Doe', 'john@example.com', '30', '50000', 'Engineering'
    );
    await expect(page.locator('table tbody tr td').filter({ hasText: 'John' }).first()).toBeVisible();
    console.log('New record added successfully!');
  });

  test('search for a record', async ({ page }) => {
    await webTablesPage.searchFor('Cierra');
    await expect(page.locator('table tbody tr td').filter({ hasText: 'Cierra' }).first()).toBeVisible();
    console.log('Search worked correctly!');
  });

  test('delete a record', async ({ page }) => {
    const initialCount = await page.locator('table tbody tr').count();
    await webTablesPage.deleteButton.click();
    await page.waitForTimeout(500);
    const newCount = await page.locator('table tbody tr').count();
    expect(newCount).toBeLessThan(initialCount);
    console.log(`Record deleted! Rows went from ${initialCount} to ${newCount}`);
  });

  test('edit an existing record', async ({ page }) => {
    await webTablesPage.editButton.click();
    await expect(webTablesPage.firstNameInput).toBeVisible();
    await webTablesPage.firstNameInput.clear();
    await webTablesPage.firstNameInput.fill('UpdatedName');
    await webTablesPage.submitButton.click();
    await expect(page.locator('table tbody tr td').filter({ hasText: 'UpdatedName' }).first()).toBeVisible();
    console.log('Record edited successfully!');
  });
});
