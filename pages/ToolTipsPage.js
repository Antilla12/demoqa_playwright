export class ToolTipsPage {
  constructor(page) {
    this.page = page;
    this.hoverButton = page.locator('#toolTipButton');
    this.hoverTextField = page.locator('#toolTipTextField');
    this.toolTip = page.locator('.tooltip-inner');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/tool-tips', {
      waitUntil: 'domcontentloaded',
    });
    await this.page.waitForTimeout(1000);
  }

  async hoverOverButton() {
    await this.hoverButton.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500);
    await this.hoverButton.hover();
    await this.page.waitForSelector('.tooltip-inner', { timeout: 10000 });
    await this.page.waitForTimeout(500);
  }

  async hoverOverTextField() {
    await this.hoverTextField.scrollIntoViewIfNeeded();
    await this.page.waitForTimeout(500);
    await this.hoverTextField.hover();
    await this.page.waitForSelector('.tooltip-inner', { timeout: 10000 });
    await this.page.waitForTimeout(500);
  }
}
