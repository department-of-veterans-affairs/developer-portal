import 'jest';
import { puppeteerHost } from '../../e2eHelpers';

describe('API Publishing Page', () => {
  it('should show the 404 page on /api-publishing/invalid', async () => {
    await page.goto(`${puppeteerHost}/api-publishing/invalid`, { waitUntil: 'networkidle0' });
    const pageNotFound = await page.evaluate(() => document.querySelector('h1')?.innerHTML);
    // Check page contents
    expect(pageNotFound).toBe('Page not found.');
    // Ensure there was no redirect
    expect(page.url()).toEqual(`${puppeteerHost}/api-publishing/invalid`);
  });
});
