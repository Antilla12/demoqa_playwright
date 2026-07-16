export class DynamicPropertiesPage {
  constructor(page) {
    this.page = page;
    this.enableAfterButton = page.locator('#enableAfter');
    this.colorChangeButton = page.locator('#colorChange');
    this.visibleAfterButton = page.locator('#visibleAfter');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/dynamic-properties', {
      waitUntil: 'domcontentloaded',
    });
  }
}