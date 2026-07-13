export class WebTablesPage {
  constructor(page) {
    this.page = page;
    this.addButton = page.locator('#addNewRecordButton');
    this.searchBox = page.locator('#searchBox');
    this.firstNameInput = page.locator('#firstName');
    this.lastNameInput = page.locator('#lastName');
    this.emailInput = page.locator('#userEmail');
    this.ageInput = page.locator('#age');
    this.salaryInput = page.locator('#salary');
    this.departmentInput = page.locator('#department');
    this.submitButton = page.locator('#submit');
    this.tableRows = page.locator('table tbody tr');
    this.deleteButton = page.locator('[title="Delete"]').first();
    this.editButton = page.locator('[title="Edit"]').first();
  }

  async goto() {
    await this.page.goto('https://demoqa.com/webtables', {
      waitUntil: 'domcontentloaded',
    });
    await this.page.waitForSelector('table', { timeout: 15000 });
  }

  async addRecord(firstName, lastName, email, age, salary, department) {
    await this.addButton.click();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.ageInput.fill(age);
    await this.salaryInput.fill(salary);
    await this.departmentInput.fill(department);
    await this.submitButton.click();
  }

  async searchFor(term) {
    await this.searchBox.fill(term);
    await this.page.waitForTimeout(500);
  }
}
