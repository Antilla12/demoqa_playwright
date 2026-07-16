import { test, expect } from '@playwright/test';
import { ResizablePage } from '../pages/ResizablePage.js';

test.describe('Resizable @regression', () => {
  let resizablePage;

  test.beforeEach(async ({ page }) => {
    resizablePage = new ResizablePage(page);
    await resizablePage.goto();
  });

  test('verify resizable page loads', async ({ page }) => {
    await expect(page).toHaveURL(/resizable/);
    await expect(resizablePage.resizableBox).toBeVisible();
    console.log('Resizable page loaded!');
  });

  test('resizable box has initial size', async ({ page }) => {
    const size = await resizablePage.getBoxSize();
    console.log('Initial size:', size);
    expect(size.width).toBeGreaterThan(0);
    expect(size.height).toBeGreaterThan(0);
  });

  test('resizable box can be resized', { retries: 3 }, async ({ page }) => {
    const initialSize = await resizablePage.getBoxSize();
    console.log('Initial size:', initialSize);

    await resizablePage.resizeBox(50, 50);

    const newSize = await resizablePage.getBoxSize();
    console.log('New size:', newSize);

    expect(newSize.width).toBeGreaterThan(initialSize.width);
    console.log('Box resized successfully!');
  });

  test('resizable handle is visible', async ({ page }) => {
    await expect(resizablePage.resizableBoxHandle).toBeVisible();
    console.log('Resize handle is visible!');
  });

  test('resizable element exists on page', async ({ page }) => {
    await expect(resizablePage.resizable).toBeVisible();
    console.log('Resizable element exists!');
  });
});