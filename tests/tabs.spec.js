import { test, expect } from '@playwright/test';
import { TabsPage } from '../pages/TabsPage.js';

test.describe('Tabs @smoke', () => {
  let tabsPage;

  test.beforeEach(async ({ page }) => {
    tabsPage = new TabsPage(page);
    await tabsPage.goto();
  });

  test('verify tabs page loads', async ({ page }) => {
    await expect(page).toHaveURL(/tabs/);
    await expect(tabsPage.whatTab).toBeVisible();
    console.log('Tabs page loaded!');
  });

  test('what tab is active by default', async ({ page }) => {
    await expect(tabsPage.whatTab).toHaveClass(/active/);
    await expect(tabsPage.whatContent).toBeVisible();
    console.log('What tab is active by default!');
  });

  test('click origin tab shows origin content', async ({ page }) => {
    await tabsPage.clickOrigin();
    await expect(tabsPage.originContent).toBeVisible();
    const text = await tabsPage.originContent.textContent();
    console.log('Origin content length:', text.length);
    expect(text.length).toBeGreaterThan(0);
  });

  test('click use tab shows use content', async ({ page }) => {
    await tabsPage.clickUse();
    await expect(tabsPage.useContent).toBeVisible();
    const text = await tabsPage.useContent.textContent();
    console.log('Use content length:', text.length);
    expect(text.length).toBeGreaterThan(0);
  });

  test('switch between tabs', async ({ page }) => {
    // start on what tab
    await expect(tabsPage.whatContent).toBeVisible();

    // switch to origin
    await tabsPage.clickOrigin();
    await expect(tabsPage.originContent).toBeVisible();

    // switch to use
    await tabsPage.clickUse();
    await expect(tabsPage.useContent).toBeVisible();

    // switch back to what
    await tabsPage.clickWhat();
    await expect(tabsPage.whatContent).toBeVisible();

    console.log('Switched between all tabs successfully!');
  });
});