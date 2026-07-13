import { test, expect } from '@playwright/test';

test('debug - web tables structure', async ({ page }) => {
  test.setTimeout(60000);
  
  await page.goto('https://demoqa.com/webtables', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);
  
  // find all table-related classes
  const tableClasses = await page.evaluate(() => {
    const elements = document.querySelectorAll('*[class]');
    return Array.from(elements)
      .map(el => el.className)
      .filter(c => typeof c === 'string' && (
        c.includes('table') || c.includes('row') || c.includes('cell') || c.includes('grid')
      ))
      .slice(0, 20);
  });
  console.log('Table-related classes:', tableClasses);
  
  // also find add button
  const addBtn = await page.locator('#addNewRecordButton').count();
  console.log('Add button found:', addBtn);
});
