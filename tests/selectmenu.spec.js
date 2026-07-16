import { test, expect } from '@playwright/test';
import { SelectMenuPage } from '../pages/SelectMenuPage.js';

test.describe('Select Menu @regression', () => {
  let selectMenuPage;

  test.beforeEach(async ({ page }) => {
    selectMenuPage = new SelectMenuPage(page);
    await selectMenuPage.goto();
  });

  test('verify select menu page loads', async ({ page }) => {
    await expect(page).toHaveURL(/select-menu/);
    await expect(selectMenuPage.oldStyleSelect).toBeVisible();
    console.log('Select menu page loaded!');
  });

  test('select old style dropdown option', async ({ page }) => {
    await selectMenuPage.selectOldStyleOption('1');
    await expect(selectMenuPage.oldStyleSelect).toHaveValue('1');
    console.log('Old style option selected!');
  });

  test('select different old style options', async ({ page }) => {
    await selectMenuPage.selectOldStyleOption('2');
    await expect(selectMenuPage.oldStyleSelect).toHaveValue('2');

    await selectMenuPage.selectOldStyleOption('3');
    await expect(selectMenuPage.oldStyleSelect).toHaveValue('3');
    console.log('Multiple old style options selected!');
  });

  test('select multiple options from multiselect', async ({ page }) => {
    await selectMenuPage.selectMultipleOptions(['volvo', 'audi']);
    const selectedOptions = await selectMenuPage.multiSelectDropdown.evaluate(
      select => Array.from(select.selectedOptions).map(o => o.value)
    );
    console.log('Selected options:', selectedOptions);
    expect(selectedOptions).toContain('volvo');
    expect(selectedOptions).toContain('audi');
    console.log('Multiple options selected successfully!');
  });

  test('multiselect has correct options', async ({ page }) => {
    const options = await selectMenuPage.multiSelectDropdown.evaluate(
      select => Array.from(select.options).map(o => o.text)
    );
    console.log('Available options:', options);
    expect(options).toContain('Volvo');
    expect(options).toContain('Saab');
    expect(options).toContain('Opel');
    expect(options).toContain('Audi');
    console.log('All options verified!');
  });
});