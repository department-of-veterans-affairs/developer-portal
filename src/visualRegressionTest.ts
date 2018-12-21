import { Page } from 'puppeteer';

import { mockSwagger } from './e2eHelpers';

jest.setTimeout(100000);

const paths = [
  '/apply',
  '/terms-of-service',
  '/go-live',
  '/oauth',
  '/explore',
  '/explore/benefits/docs/benefits', // Only include a few swagger pages since they're all pretty similar
  '/explore/benefits/docs/appeals',
];

const puppeteerHost = 'http://localhost:4444'

const viewports = [
  { width: 1200, height: 800 },
  { width: 768, height: 800 },
  { width: 375, height: 800 },
];

const checkScreenshots = async (page: Page) => {
  for (const viewport of viewports) {
    await page.setViewport(viewport);
    const screenshot = await page.screenshot({
      fullPage: true
    });
    expect(screenshot).toMatchImageSnapshot();
  }
}

describe('Visual regression test', async () => {
  for (const path of paths) {
    it(`renders ${path} properly`, async () => {
      // Mock swagger requests on docs pages so those pages aren't blank
      if (/^\/explore\/[^\/]+\/docs/.test(path)) {
        await page.setRequestInterception(true);
        page.removeAllListeners('request');
        page.on('request', mockSwagger);
      }

      await page.goto(`${puppeteerHost}${path}`, { waitUntil: 'networkidle0' });
      await checkScreenshots(page)
    });
  }

  it('renders the homepage properly', async() => {
    await page.goto(`${puppeteerHost}`, { waitUntil: 'networkidle0' });

    // Hide problematic video on homepage
    await page.evaluate('document.querySelector("iframe").style="visibility: hidden;"');

    await checkScreenshots(page);
  });
});
