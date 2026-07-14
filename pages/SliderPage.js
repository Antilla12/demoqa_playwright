export class SliderPage {
  constructor(page) {
    this.page = page;
    this.slider = page.locator('.range-slider');
    this.sliderValue = page.locator('#sliderValue');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/slider', {
      waitUntil: 'domcontentloaded',
    });
  }

  async moveSliderTo(value) {
    // get slider bounding box
    const box = await this.slider.boundingBox();
    const sliderWidth = box.width;

    // calculate position (value is 0-100)
    const x = box.x + (sliderWidth * value / 100);
    const y = box.y + box.height / 2;

    // click at the calculated position
    await this.page.mouse.click(x, y);
  }
}