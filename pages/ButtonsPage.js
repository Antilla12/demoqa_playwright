export class ButtonsPage {
  constructor(page) {
    this.page = page;
    this.doubleClickButton = page.locator('#doubleClickBtn');
    this.rightClickButton = page.locator('#rightClickBtn');
    this.clickButton = page.locator('button').filter({ hasText: 'Click Me' }).last();
    this.doubleClickMessage = page.locator('#doubleClickMessage');
    this.rightClickMessage = page.locator('#rightClickMessage');
    this.dynamicClickMessage = page.locator('#dynamicClickMessage');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/buttons', {
      waitUntil: 'domcontentloaded',
    });
  }

  async doubleClick() {
    await this.doubleClickButton.dblclick();
  }

  async rightClick() {
    await this.rightClickButton.click({ button: 'right' });
  }

  async singleClick() {
    await this.clickButton.click();
  }
}