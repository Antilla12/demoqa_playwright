export class DatePickerPage {
  constructor(page) {
    this.page = page;
    this.dateInput = page.locator('#datePickerMonthYearInput');
    this.dateTimeInput = page.locator('#dateAndTimePickerInput');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/date-picker', {
      waitUntil: 'domcontentloaded',
    });
  }

  async setDate(date) {
    // clear and type date directly into the input
    await this.dateInput.click();
    await this.dateInput.clear();
    await this.dateInput.fill(date);
    await this.page.keyboard.press('Enter');
  }

  async setDateTime(dateTime) {
    await this.dateTimeInput.click();
    await this.dateTimeInput.clear();
    await this.dateTimeInput.fill(dateTime);
    await this.page.keyboard.press('Enter');
  }
}