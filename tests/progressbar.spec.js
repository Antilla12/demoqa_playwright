import { test, expect } from '@playwright/test';
import { ProgressBarPage } from '../pages/ProgressBarPage.js';

test.describe('Progress Bar @regression', () => {
  let progressBarPage;

  test.beforeEach(async ({ page }) => {
    progressBarPage = new ProgressBarPage(page);
    await progressBarPage.goto();
  });

  test('verify progress bar page loads', async ({ page }) => {
    await expect(page).toHaveURL(/progress-bar/);
    await expect(progressBarPage.startStopButton).toBeVisible();
    console.log('Progress bar page loaded!');
  });

  test('progress bar starts at 0', async ({ page }) => {
    const value = await progressBarPage.getProgressValue();
    console.log('Initial progress value:', value);
    expect(value).toBe(0);
  });

  test('progress bar increases after start', async ({ page }) => {
    await progressBarPage.startProgress();
    await page.waitForTimeout(2000);
    await progressBarPage.stopProgress();
    const value = await progressBarPage.getProgressValue();
    console.log('Progress value after 2 seconds:', value);
    expect(value).toBeGreaterThan(0);
  });

  test('progress bar resets to 0', async ({ page }) => {
    test.setTimeout(60000);

    // start progress and wait for it to reach 100%
    await progressBarPage.startProgress();

    // wait for reset button to appear (it appears when progress hits 100%)
    await progressBarPage.resetButton.waitFor({ state: 'visible', timeout: 30000 });

    // reset and verify
    await progressBarPage.resetProgress();
    const valueAfterReset = await progressBarPage.getProgressValue();
    console.log('Progress after reset:', valueAfterReset);
    expect(valueAfterReset).toBe(0);
  });

  test('start button text changes when running', async ({ page }) => {
    await expect(progressBarPage.startStopButton).toHaveText('Start');
    await progressBarPage.startProgress();
    await expect(progressBarPage.startStopButton).toHaveText('Stop');
    await progressBarPage.stopProgress();
    console.log('Button text changes correctly!');
  });
});
