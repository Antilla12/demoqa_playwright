export class DragDropPage {
  constructor(page) {
    this.page = page;
    this.simpleTab = page.locator('#droppableExample-tabpane-simple');
    this.draggable = page.locator('#draggable');
    this.droppable = this.simpleTab.locator('#droppable');
    this.dropText = this.simpleTab.locator('#droppable p');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/droppable', {
      waitUntil: 'domcontentloaded',
    });
  }

  async dragToTarget() {
    const source = this.draggable;
    const target = this.droppable;

    const sourceBounds = await source.boundingBox();
    const targetBounds = await target.boundingBox();

    const startX = sourceBounds.x + sourceBounds.width / 2;
    const startY = sourceBounds.y + sourceBounds.height / 2;
    const endX = targetBounds.x + targetBounds.width / 2;
    const endY = targetBounds.y + targetBounds.height / 2;

    await this.page.mouse.move(startX, startY);
    await this.page.mouse.down();
    await this.page.waitForTimeout(300);
    await this.page.mouse.move(endX, endY, { steps: 20 });
    await this.page.waitForTimeout(300);
    await this.page.mouse.up();
  }
}
