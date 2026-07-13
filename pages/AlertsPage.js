export class AlertsPage {
  constructor(page) {
    this.page = page;
    this.alertButton = page.locator('#alertButton');
    this.timerAlertButton = page.locator('#timerAlertButton');
    this.confirmButton = page.locator('#confirmButton');
    this.promtButton = page.locator('#promtButton');
    this.confirmResult = page.locator('#confirmResult');
    this.promptResult = page.locator('#promptResult');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/alerts', {
      waitUntil: 'domcontentloaded',
    });
  }
}