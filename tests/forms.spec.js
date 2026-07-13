import { test, expect } from '@playwright/test';
import { FormsPage } from '../pages/FormsPage.js';

test.describe('Forms @regression', () => {
  let formsPage;

  test.beforeEach(async ({ page }) => {
    formsPage = new FormsPage(page);
    await formsPage.goto();
  });

  test('verify forms page loads', async ({ page }) => {
    await expect(page).toHaveURL(/automation-practice-form/);
    await expect(formsPage.firstNameInput).toBeVisible();
    console.log('Forms page loaded!');
  });

  test('fill and submit complete form', async ({ page }) => {
    await formsPage.fillBasicDetails(
      'John',
      'Doe',
      'john@example.com',
      '1234567890'
    );
    await formsPage.fillAddress('123 Main Street');
    await formsPage.submit();

    // verify success modal appears
    await expect(formsPage.modalTitle).toBeVisible();
    await expect(formsPage.modalTitle).toHaveText('Thanks for submitting the form');
    console.log('Form submitted successfully!');
  });

  test('verify first name field accepts input', async ({ page }) => {
    await formsPage.firstNameInput.fill('TestName');
    await expect(formsPage.firstNameInput).toHaveValue('TestName');
    console.log('First name field works!');
  });

  test('verify gender radio button works', async ({ page }) => {
    await formsPage.genderMale.click();
    const radio = page.locator('#gender-radio-1');
    await expect(radio).toBeChecked();
    console.log('Gender radio button works!');
  });

  test('verify mobile number field accepts input', async ({ page }) => {
    await formsPage.mobileInput.fill('9876543210');
    await expect(formsPage.mobileInput).toHaveValue('9876543210');
    console.log('Mobile number field works!');
  });
});