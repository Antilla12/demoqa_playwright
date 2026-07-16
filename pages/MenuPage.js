export class MenuPage {
  constructor(page) {
    this.page = page;
    this.mainMenu = page.locator('#nav').first();
    this.menuItems = page.locator('#nav > li');
    this.mainItem1 = page.locator('#nav > li').first();
    this.mainItem2 = page.locator('#nav > li').nth(1);
    this.mainItem3 = page.locator('#nav > li').last();
  }

  async goto() {
    await this.page.goto('https://demoqa.com/menu', {
      waitUntil: 'domcontentloaded',
    });
    await this.page.waitForTimeout(1000);
  }

  async hoverMainItem2() {
    await this.mainItem2.hover();
    await this.page.waitForTimeout(500);
  }
}
