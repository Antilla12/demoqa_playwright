export class SelectablePage {
  constructor(page) {
    this.page = page;
    this.listTab = page.locator('#demo-tab-list');
    this.gridTab = page.locator('#demo-tab-grid');
    this.listItems = page.locator('#demo-tabpane-list .list-group-item');
    this.gridItems = page.locator('#demo-tabpane-grid .list-group-item');
    this.activeListItems = page.locator('#demo-tabpane-list .active');
    this.activeGridItems = page.locator('#demo-tabpane-grid .active');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/selectable', {
      waitUntil: 'domcontentloaded',
    });
  }

  async selectListItem(index) {
    await this.listItems.nth(index).click();
  }

  async selectGridItem(index) {
    await this.gridItems.nth(index).click();
  }
}