export class SortablePage {
  constructor(page) {
    this.page = page;
    this.listItems = page.locator('#demo-tabpane-list .list-group-item');
    this.gridItems = page.locator('#demo-tabpane-grid .list-group-item');
    this.listTab = page.locator('#demo-tab-list');
    this.gridTab = page.locator('#demo-tab-grid');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/sortable', {
      waitUntil: 'domcontentloaded',
    });
    await this.page.waitForTimeout(2000);
  }

  async getListItemTexts() {
    const items = this.listItems;
    const count = await items.count();
    const texts = [];
    for (let i = 0; i < count; i++) {
      texts.push(await items.nth(i).textContent());
    }
    return texts;
  }

  async dragListItem(fromIndex, toIndex) {
    const source = this.listItems.nth(fromIndex);
    const target = this.listItems.nth(toIndex);

    const sourceBounds = await source.boundingBox();
    const targetBounds = await target.boundingBox();

    const startX = sourceBounds.x + sourceBounds.width / 2;
    const startY = sourceBounds.y + sourceBounds.height / 2;
    const endX = targetBounds.x + targetBounds.width / 2;
    const endY = targetBounds.y + targetBounds.height / 2;

    await this.page.mouse.move(startX, startY);
    await this.page.waitForTimeout(1000);
    await this.page.mouse.down();
    await this.page.waitForTimeout(1000);
    await this.page.mouse.move(startX, startY - 5, { steps: 5 });
    await this.page.waitForTimeout(500);
    await this.page.mouse.move(endX, endY, { steps: 40 });
    await this.page.waitForTimeout(1000);
    await this.page.mouse.up();
    await this.page.waitForTimeout(1000);
  }
}
