export class UploadDownloadPage {
  constructor(page) {
    this.page = page;
    this.uploadInput = page.locator('#uploadFile');
    this.uploadedFilePath = page.locator('#uploadedFilePath');
    this.downloadButton = page.locator('#downloadButton');
  }

  async goto() {
    await this.page.goto('https://demoqa.com/upload-download', {
      waitUntil: 'domcontentloaded',
    });
  }

  async uploadFile(filePath) {
    await this.uploadInput.setInputFiles(filePath);
  }

  async uploadFileFromBuffer(fileName, content) {
    await this.uploadInput.setInputFiles({
      name: fileName,
      mimeType: 'text/plain',
      buffer: Buffer.from(content),
    });
  }
}