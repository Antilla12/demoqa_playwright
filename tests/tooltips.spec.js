import { test, expect } from '@playwright/test';
import { ToolTipsPage } from '../pages/ToolTipsPage.js';

test.describe('Tool Tips @smoke', () => {
  let toolTipsPage;

  test.beforeEach(async ({ page }) => {
    toolTipsPage = new ToolTipsPage(page);
    await toolTipsPage.goto();
  });

  test('verify tool tips page loads', async ({ page }) => {
    await expect(page).toHaveURL(/tool-tips/);
    await expect(toolTipsPage.hoverButton).toBeVisible();
    console.log('Tool tips page loaded!');
  });

  test('tooltip appears on button hover', { retries: 3 }, async ({ page }) => {
    await toolTipsPage.hoverOverButton();
    await expect(toolTipsPage.toolTip).toBeVisible();
    const text = await toolTipsPage.toolTip.textContent();
    console.log('Button tooltip text:', text);
    expect(text).toBeTruthy();
  });

  test('button tooltip shows correct text', { retries: 3 }, async ({ page }) => {
    await toolTipsPage.hoverOverButton();
    await expect(toolTipsPage.toolTip).toHaveText('You hovered over the Button');
    console.log('Button tooltip text verified!');
  });

  test('tooltip appears on text field hover', { retries: 3 }, async ({ page }) => {
    await toolTipsPage.hoverOverTextField();
    await expect(toolTipsPage.toolTip).toBeVisible();
    const text = await toolTipsPage.toolTip.textContent();
    console.log('Text field tooltip text:', text);
    expect(text).toBeTruthy();
  });

  test('text field tooltip shows correct text', { retries: 3 }, async ({ page }) => {
    await toolTipsPage.hoverOverTextField();
    await expect(toolTipsPage.toolTip).toHaveText('You hovered over the text field');
    console.log('Text field tooltip text verified!');
  });
});
