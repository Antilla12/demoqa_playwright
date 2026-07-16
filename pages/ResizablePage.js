export class ResizablePage {
  constructor(page) {
    this.page = page;
    this.resizableBox = page.locator('#resizableBoxWithRestriction');
    this.resizableBoxHandle = page.locator('#resizableBoxWithRestriction .react-resizable-handle');
    this.resizable = page.locator('#resizable');
    this.resizableHandle = page.locator('#resizable .react-resizable-handle');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/resizable', {
      waitUntil: 'domcontentloaded',
    });
    await this.page.waitForTimeout(1000);
  }

  async getBoxSize() {
    const bounds = await this.resizableBox.boundingBox();
    return { width: bounds.width, height: bounds.height };
  }

  async resizeBox(deltaX, deltaY) {
    const handle = this.resizableBoxHandle;
    const bounds = await handle.boundingBox();

    const startX = bounds.x + bounds.width / 2;
    const startY = bounds.y + bounds.height / 2;

    await this.page.mouse.move(startX, startY);
    await this.page.waitForTimeout(300);
    await this.page.mouse.down();
    await this.page.waitForTimeout(300);
    await this.page.mouse.move(startX + deltaX, startY + deltaY, { steps: 20 });
    await this.page.waitForTimeout(300);
    await this.page.mouse.up();
    await this.page.waitForTimeout(300);
  }
}