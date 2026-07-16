import { test, expect } from '@playwright/test';
import { UploadDownloadPage } from '../pages/UploadDownloadPage.js';
import path from 'path';
import fs from 'fs';

test.describe('Upload and Download @regression', () => {
  let uploadDownloadPage;

  test.beforeEach(async ({ page }) => {
    uploadDownloadPage = new UploadDownloadPage(page);
    await uploadDownloadPage.goto();
  });

  test('verify upload download page loads', async ({ page }) => {
    await expect(page).toHaveURL(/upload-download/);
    await expect(uploadDownloadPage.uploadInput).toBeVisible();
    console.log('Upload download page loaded!');
  });

  test('upload a file and verify filename', async ({ page }) => {
    await uploadDownloadPage.uploadFileFromBuffer(
      'test-file.txt',
      'This is a test file content'
    );
    await expect(uploadDownloadPage.uploadedFilePath).toContainText('test-file.txt');
    console.log('File uploaded successfully!');
  });

  test('upload an image file', async ({ page }) => {
    await uploadDownloadPage.uploadFileFromBuffer(
      'test-image.png',
      'fake image content'
    );
    await expect(uploadDownloadPage.uploadedFilePath).toContainText('test-image.png');
    console.log('Image file uploaded successfully!');
  });

  test('download button is visible', async ({ page }) => {
    await expect(uploadDownloadPage.downloadButton).toBeVisible();
    await expect(uploadDownloadPage.downloadButton).toBeEnabled();
    console.log('Download button is visible and enabled!');
  });

  test('download a file', async ({ page }) => {
    // wait for download to start
    const downloadPromise = page.waitForEvent('download');
    await uploadDownloadPage.downloadButton.click();
    const download = await downloadPromise;

    // verify download started
    console.log('Downloaded file name:', download.suggestedFilename());
    expect(download.suggestedFilename()).toBeTruthy();
    console.log('File downloaded successfully!');
  });
});