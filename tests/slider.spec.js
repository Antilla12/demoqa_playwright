import { test, expect } from '@playwright/test';
import { SliderPage } from '../pages/SliderPage.js';

test.describe('Slider @regression', () => {
  let sliderPage;

  test.beforeEach(async ({ page }) => {
    sliderPage = new SliderPage(page);
    await sliderPage.goto();
  });

  test('verify slider page loads', async ({ page }) => {
    await expect(page).toHaveURL(/slider/);
    await expect(sliderPage.slider).toBeVisible();
    console.log('Slider page loaded!');
  });

  test('slider has initial value', async ({ page }) => {
    const value = await sliderPage.sliderValue.inputValue();
    console.log('Initial slider value:', value);
    expect(Number(value)).toBeGreaterThanOrEqual(0);
    expect(Number(value)).toBeLessThanOrEqual(100);
  });

  test('move slider using keyboard', async ({ page }) => {
    // click slider to focus it
    await sliderPage.slider.click();

    // get initial value
    const initialValue = await sliderPage.sliderValue.inputValue();
    console.log('Initial value:', initialValue);

    // press right arrow to increase value
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');
    await page.keyboard.press('ArrowRight');

    // get new value
    const newValue = await sliderPage.sliderValue.inputValue();
    console.log('New value after pressing right:', newValue);

    expect(Number(newValue)).toBeGreaterThan(Number(initialValue));
  });

  test('move slider left using keyboard', async ({ page }) => {
    await sliderPage.slider.click();

    const initialValue = await sliderPage.sliderValue.inputValue();
    console.log('Initial value:', initialValue);

    // press left arrow to decrease value
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');
    await page.keyboard.press('ArrowLeft');

    const newValue = await sliderPage.sliderValue.inputValue();
    console.log('New value after pressing left:', newValue);

    expect(Number(newValue)).toBeLessThan(Number(initialValue));
  });
});