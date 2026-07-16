import { test, expect } from '@playwright/test';
import { SortablePage } from '../pages/SortablePage.js';

test.describe('Sortable @regression', () => {
  let sortablePage;

  test.beforeEach(async ({ page }) => {
    sortablePage = new SortablePage(page);
    await sortablePage.goto();
  });

  test('verify sortable page loads', async ({ page }) => {
    await expect(page).toHaveURL(/sortable/);
    await expect(sortablePage.listTab).toBeVisible();
    console.log('Sortable page loaded!');
  });

  test('list tab is active by default', async ({ page }) => {
    await expect(sortablePage.listTab).toHaveClass(/active/);
    console.log('List tab is active!');
  });

  test('list has items', async ({ page }) => {
    const count = await sortablePage.listItems.count();
    console.log('List items count:', count);
    expect(count).toBeGreaterThan(0);
  });

  test('get initial list order', async ({ page }) => {
    const texts = await sortablePage.getListItemTexts();
    console.log('Initial list order:', texts);
    expect(texts.length).toBeGreaterThan(0);
  });

  test('switch to grid tab', async ({ page }) => {
    await sortablePage.gridTab.click();
    await expect(sortablePage.gridTab).toHaveClass(/active/);
    const count = await sortablePage.gridItems.count();
    console.log('Grid items count:', count);
    expect(count).toBeGreaterThan(0);
    console.log('Grid tab works!');
  });

  test('drag list item to reorder', { retries: 5 }, async ({ page }) => {
    const initialTexts = await sortablePage.getListItemTexts();
    console.log('Before drag:', initialTexts);

    await sortablePage.dragListItem(0, 3);

    const newTexts = await sortablePage.getListItemTexts();
    console.log('After drag:', newTexts);

    expect(newTexts).not.toEqual(initialTexts);
    console.log('List reordered successfully!');
  });
});
