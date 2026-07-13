import { test, expect } from '@playwright/test';
import { CheckBoxPage } from '../pages/CheckBoxPage.js';

test.describe('Check Box @regression', () => {
  let checkBoxPage;

  test.beforeEach(async ({ page }) => {
    checkBoxPage = new CheckBoxPage(page);
    await checkBoxPage.goto();
  });

  test('verify checkbox page loads', async ({ page }) => {
    await expect(page).toHaveURL(/checkbox/);
    await expect(checkBoxPage.treeContainer).toBeVisible();
    console.log('Checkbox page loaded!');
  });

  test('check home checkbox and verify result', async ({ page }) => {
    await checkBoxPage.checkHome();
    await expect(checkBoxPage.resultOutput).toBeVisible();
    console.log('Home checkbox checked and result verified!');
  });

  test('verify tree has items', async ({ page }) => {
    const items = page.locator('.rc-tree-treenode');
    const count = await items.count();
    console.log(`Tree items count: ${count}`);
    expect(count).toBeGreaterThan(0);
  });
});
