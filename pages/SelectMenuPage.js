export class SelectMenuPage {
  constructor(page) {
    this.page = page;
    this.selectValueDropdown = page.locator('#withOptGroup');
    this.selectOneDropdown = page.locator('#selectOne');
    this.oldStyleSelect = page.locator('#oldSelectMenu');
    this.multiSelectDropdown = page.locator('#cars');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/select-menu', {
      waitUntil: 'domcontentloaded',
    });
  }

  async selectOldStyleOption(value) {
    await this.oldStyleSelect.selectOption(value);
  }

  async selectMultipleOptions(values) {
    await this.multiSelectDropdown.selectOption(values);
  }
}