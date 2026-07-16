import { test, expect } from '@playwright/test';
import { SelectablePage } from '../pages/SelectablePage.js';

test.describe('Selectable @regression', () => {
  let selectablePage;

  test.beforeEach(async ({ page }) => {
    selectablePage = new SelectablePage(page);
    await selectablePage.goto();
  });

  test('verify selectable page loads', async ({ page }) => {
    await expect(page).toHaveURL(/selectable/);
    await expect(selectablePage.listTab).toBeVisible();
    console.log('Selectable page loaded!');
  });

  test('list tab is active by default', async ({ page }) => {
    await expect(selectablePage.listTab).toHaveClass(/active/);
    console.log('List tab is active by default!');
  });

  test('select a list item', async ({ page }) => {
    await selectablePage.selectListItem(0);
    await expect(selectablePage.activeListItems).toHaveCount(1);
    console.log('First list item selected!');
  });

  test('select multiple list items', async ({ page }) => {
    await selectablePage.selectListItem(0);
    await selectablePage.selectListItem(1);
    await selectablePage.selectListItem(2);
    await expect(selectablePage.activeListItems).toHaveCount(3);
    console.log('3 list items selected!');
  });

  test('deselect a list item', async ({ page }) => {
    // select first
    await selectablePage.selectListItem(0);
    await expect(selectablePage.activeListItems).toHaveCount(1);

    // click again to deselect
    await selectablePage.selectListItem(0);
    await expect(selectablePage.activeListItems).toHaveCount(0);
    console.log('List item deselected!');
  });

  test('select grid items', async ({ page }) => {
    await selectablePage.gridTab.click();
    await expect(selectablePage.gridTab).toHaveClass(/active/);

    await selectablePage.selectGridItem(0);
    await expect(selectablePage.activeGridItems).toHaveCount(1);
    console.log('Grid item selected!');
  });
});