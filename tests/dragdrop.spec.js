import { test, expect } from '@playwright/test';
import { DragDropPage } from '../pages/DragDropPage.js';

test.describe('Drag and Drop @regression', () => {
  let dragDropPage;

  test.beforeEach(async ({ page }) => {
    dragDropPage = new DragDropPage(page);
    await dragDropPage.goto();
  });

  test('verify drag and drop page loads', async ({ page }) => {
    await expect(page).toHaveURL(/droppable/);
    await expect(dragDropPage.draggable).toBeVisible();
    console.log('Drag and drop page loaded!');
  });

  test('drop text shows default text initially', async ({ page }) => {
    const text = await dragDropPage.dropText.textContent();
    console.log('Initial drop text:', text);
    expect(text.toLowerCase()).toContain('drop here');
  });

  // give drag tests extra retries since they are timing sensitive
  test('drag element to drop target', { retries: 3 }, async ({ page }) => {
    await dragDropPage.dragToTarget();
    await expect(dragDropPage.dropText).toHaveText('Dropped!');
    console.log('Element dragged and dropped successfully!');
  });

  test('droppable changes color after drop', { retries: 3 }, async ({ page }) => {
    const initialColor = await dragDropPage.droppable.evaluate(
      el => window.getComputedStyle(el).backgroundColor
    );
    console.log('Initial color:', initialColor);

    await dragDropPage.dragToTarget();

    const newColor = await dragDropPage.droppable.evaluate(
      el => window.getComputedStyle(el).backgroundColor
    );
    console.log('Color after drop:', newColor);
    expect(newColor).not.toBe(initialColor);
  });
});
