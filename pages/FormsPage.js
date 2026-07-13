export class FormsPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.emailInput = page.locator('#userEmail');
    this.genderMale = page.locator('label[for="gender-radio-1"]');
    this.mobileInput = page.locator('#userNumber');
    this.subjectsInput = page.locator('#subjectsInput');
    this.uploadPicture = page.locator('#uploadPicture');
    this.currentAddressInput = page.locator('#currentAddress');
    this.submitButton = page.locator('#submit');
    this.successModal = page.locator('.modal-content');
    this.modalTitle = page.locator('#example-modal-sizes-title-lg');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/automation-practice-form', {
      waitUntil: 'domcontentloaded',
    });
  }

  async fillBasicDetails(firstName, lastName, email, mobile) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.genderMale.click();
    await this.mobileInput.fill(mobile);
  }

  async fillAddress(address) {
    await this.currentAddressInput.fill(address);
  }

  async submit() {
    await this.submitButton.click();
  }
}