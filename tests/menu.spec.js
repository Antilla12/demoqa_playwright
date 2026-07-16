import { test, expect } from '@playwright/test';
import { MenuPage } from '../pages/MenuPage.js';

test.describe('Menu @smoke', () => {
  let menuPage;

  test.beforeEach(async ({ page }) => {
    menuPage = new MenuPage(page);
    await menuPage.goto();
  });

  test('verify menu page loads', async ({ page }) => {
    await expect(page).toHaveURL('https://demoqa.com/menu');
    // check menu items are visible instead of the nav container
    await expect(menuPage.mainItem1).toBeVisible();
    console.log('Menu page loaded!');
  });

  test('main menu has items', async ({ page }) => {
    const count = await menuPage.menuItems.count();
    console.log('Main menu items:', count);
    expect(count).toBeGreaterThan(0);
  });

  test('first menu item is visible', async ({ page }) => {
    await expect(menuPage.mainItem1).toBeVisible();
    const text = await menuPage.mainItem1.textContent();
    console.log('First menu item:', text.trim());
    expect(text.trim()).toBeTruthy();
  });

  test('hover over main item 2 shows submenu', async ({ page }) => {
    await menuPage.hoverMainItem2();
    const subMenu = page.locator('#nav li ul');
    await expect(subMenu.first()).toBeVisible();
    console.log('Submenu appeared on hover!');
  });

  test('all top level menu items are visible', async ({ page }) => {
    const count = await menuPage.menuItems.count();
    for (let i = 0; i < count; i++) {
      await expect(menuPage.menuItems.nth(i)).toBeVisible();
    }
    console.log(`All ${count} top level menu items are visible!`);
  });
});
