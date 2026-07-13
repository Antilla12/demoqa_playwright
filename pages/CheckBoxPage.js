export class CheckBoxPage {
  constructor(page) {
    this.page = page;
    this.homeCheckBox = page.locator('.rc-tree-checkbox').first();
    this.expandAllButton = page.locator('button.rct-option-expand-all');
    this.collapseAllButton = page.locator('button.rct-option-collapse-all');
    this.resultOutput = page.locator('.display-result');
    this.treeContainer = page.locator('.rc-tree');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/checkbox', {
      waitUntil: 'domcontentloaded',
    });
    await this.page.waitForSelector('.rc-tree', { timeout: 15000 });
  }

  async expandAll() {
    await this.expandAllButton.click();
  }

  async collapseAll() {
    await this.collapseAllButton.click();
  }

  async checkHome() {
    await this.homeCheckBox.click();
  }
}
