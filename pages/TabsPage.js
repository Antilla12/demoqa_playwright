export class TabsPage {
  constructor(page) {
    this.page = page;
    this.whatTab = page.locator('#demo-tab-what');
    this.originTab = page.locator('#demo-tab-origin');
    this.useTab = page.locator('#demo-tab-use');
    this.whatContent = page.locator('#demo-tabpane-what');
    this.originContent = page.locator('#demo-tabpane-origin');
    this.useContent = page.locator('#demo-tabpane-use');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/tabs', {
      waitUntil: 'domcontentloaded',
    });
  }

  async clickWhat() {
    await this.whatTab.click();
  }

  async clickOrigin() {
    await this.originTab.click();
  }

  async clickUse() {
    await this.useTab.click();
  }
}