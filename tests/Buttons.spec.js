import { test, expect } from '@playwright/test';
import { ButtonsPage } from '../pages/ButtonsPage.js';

test.describe('Buttons @smoke', () => {
  let buttonsPage;

  test.beforeEach(async ({ page }) => {
    buttonsPage = new ButtonsPage(page);
    await buttonsPage.goto();
  });

  test('verify buttons page loads', async ({ page }) => {
    await expect(page).toHaveURL(/buttons/);
    await expect(buttonsPage.doubleClickButton).toBeVisible();
    console.log('Buttons page loaded!');
  });

  test('double click button', async ({ page }) => {
    await buttonsPage.doubleClick();
    await expect(buttonsPage.doubleClickMessage).toHaveText('You have done a double click');
    console.log('Double click successful!');
  });

  test('right click button', async ({ page }) => {
    await buttonsPage.rightClick();
    await expect(buttonsPage.rightClickMessage).toHaveText('You have done a right click');
    console.log('Right click successful!');
  });

  test('single click button', async ({ page }) => {
    await buttonsPage.singleClick();
    await expect(buttonsPage.dynamicClickMessage).toHaveText('You have done a dynamic click');
    console.log('Single click successful!');
  });
});