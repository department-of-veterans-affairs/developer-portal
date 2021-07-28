import 'jest';
import { puppeteerHost } from '../e2eHelpers';

describe('Routes Wildcard handling', () => {
  it.each([
    '/api-publishing/invalid',
    '/explore/invalid',
    '/explore/invalid/docs',
    '/explore/invalid/docs/quickstart',
    '/onboarding/invalid',
    '/release-notes/invalid',
    '/support/invalid',
  ])('should show the 404 page on %s', async (path: string) => {
    await page.goto(`${puppeteerHost}${path}`, { waitUntil: 'networkidle0' });
    const pageNotFound = await page.evaluate(() => document.querySelector('h1')?.innerHTML);
    // Check page contents
    expect(pageNotFound).toBe('Page not found.');
    // Ensure there was no redirect
    expect(page.url()).toEqual(`${puppeteerHost}${path}`);
  });
});
