export class TextBoxPage {
  constructor(page) {
    this.page = page;
    this.fullNameInput = page.locator('#userName');
    this.emailInput = page.locator('#userEmail');
    this.currentAddressInput = page.locator('#currentAddress');
    this.permanentAddressInput = page.locator('#permanentAddress');
    this.submitButton = page.locator('#submit');
    this.outputName = page.locator('#name');
    this.outputEmail = page.locator('#email');
    this.outputCurrentAddress = page.locator('#currentAddress.mb-1');
    this.outputPermanentAddress = page.locator('#permanentAddress.mb-1');
  }

  async goto() {
    await this.page.goto('/text-box');
  }

  async fillForm(name, email, currentAddress, permanentAddress) {
    await this.fullNameInput.fill(name);
    await this.emailInput.fill(email);
    await this.currentAddressInput.fill(currentAddress);
    await this.permanentAddressInput.fill(permanentAddress);
  }

  async submit() {
    await this.submitButton.click();
  }
}