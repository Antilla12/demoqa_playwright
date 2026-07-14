export class ProgressBarPage {
  constructor(page) {
    this.page = page;
    this.startStopButton = page.locator('#startStopButton');
    this.resetButton = page.locator('#resetButton');
    this.progressBar = page.locator('.progress-bar');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/progress-bar', {
      waitUntil: 'domcontentloaded',
    });
  }

  async startProgress() {
    await this.startStopButton.click();
  }

  async stopProgress() {
    await this.startStopButton.click();
  }

  async resetProgress() {
    await this.resetButton.click();
  }

  async getProgressValue() {
    const value = await this.progressBar.getAttribute('aria-valuenow');
    return Number(value);
  }
}