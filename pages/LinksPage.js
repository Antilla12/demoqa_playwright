export class LinksPage {
  constructor(page) {
    this.page = page;
    this.homeLink = page.locator('#simpleLink');
    this.dynamicLink = page.locator('#dynamicLink');
    this.createdLink = page.locator('#created');
    this.noContentLink = page.locator('#no-content');
    this.movedLink = page.locator('#moved');
    this.linkResponse = page.locator('#linkResponse');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/links', {
      waitUntil: 'domcontentloaded',
    });
  }
}