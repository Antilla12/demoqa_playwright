export class RadioButtonPage {
  constructor(page) {
    this.page = page;
    this.yesRadio = page.locator('label[for="yesRadio"]');
    this.impressiveRadio = page.locator('label[for="impressiveRadio"]');
    this.noRadio = page.locator('label[for="noRadio"]');
    this.resultText = page.locator('.mt-3 span.text-success');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/radio-button', {
      waitUntil: 'domcontentloaded',
    });
  }

  async selectYes() {
    await this.yesRadio.click();
  }

  async selectImpressive() {
    await this.impressiveRadio.click();
  }
}