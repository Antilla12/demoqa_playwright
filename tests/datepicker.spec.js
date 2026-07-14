import { test, expect } from '@playwright/test';
import { DatePickerPage } from '../pages/DatePickerPage.js';

test.describe('Date Picker @regression', () => {
  let datePickerPage;

  test.beforeEach(async ({ page }) => {
    datePickerPage = new DatePickerPage(page);
    await datePickerPage.goto();
  });

  test('verify date picker page loads', async ({ page }) => {
    await expect(page).toHaveURL(/date-picker/);
    await expect(datePickerPage.dateInput).toBeVisible();
    console.log('Date picker page loaded!');
  });

  test('set a specific date', async ({ page }) => {
    await datePickerPage.setDate('01/15/2025');
    const value = await datePickerPage.dateInput.inputValue();
    console.log('Date value set to:', value);
    expect(value).toContain('01/15/2025');
  });

  test('set a different date', async ({ page }) => {
    await datePickerPage.setDate('06/20/2024');
    const value = await datePickerPage.dateInput.inputValue();
    console.log('Date value set to:', value);
    expect(value).toContain('06/20/2024');
  });

  test('date input is visible and enabled', async ({ page }) => {
    await expect(datePickerPage.dateInput).toBeVisible();
    await expect(datePickerPage.dateInput).toBeEnabled();
    console.log('Date input is visible and enabled!');
  });

  test('date time input is visible', async ({ page }) => {
    await expect(datePickerPage.dateTimeInput).toBeVisible();
    await expect(datePickerPage.dateTimeInput).toBeEnabled();
    console.log('Date time input is visible and enabled!');
  });
});