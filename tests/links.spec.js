import { test, expect } from '@playwright/test';
import { LinksPage } from '../pages/LinksPage.js';

test.describe('Links @smoke', () => {
  let linksPage;

  test.beforeEach(async ({ page }) => {
    linksPage = new LinksPage(page);
    await linksPage.goto();
  });

  test('verify links page loads', async ({ page }) => {
    await expect(page).toHaveURL(/links/);
    await expect(linksPage.homeLink).toBeVisible();
    console.log('Links page loaded!');
  });

  test('home link opens new tab', async ({ page, context }) => {
    // listen for new tab
    const newTabPromise = context.waitForEvent('page');
    await linksPage.homeLink.click();
    const newTab = await newTabPromise;
    await newTab.waitForLoadState();

    // verify new tab opened demoqa home
    await expect(newTab).toHaveURL(/demoqa.com/);
    console.log('Home link opened new tab:', newTab.url());
    await newTab.close();
  });

  test('created link returns 201 status', async ({ page }) => {
    await linksPage.createdLink.click();
    await expect(linksPage.linkResponse).toContainText('201');
    console.log('Created link returned 201!');
  });

  test('no content link returns 204 status', async ({ page }) => {
    await linksPage.noContentLink.click();
    await expect(linksPage.linkResponse).toContainText('204');
    console.log('No content link returned 204!');
  });

  test('moved link returns 301 status', async ({ page }) => {
    await linksPage.movedLink.click();
    await expect(linksPage.linkResponse).toContainText('301');
    console.log('Moved link returned 301!');
  });
});