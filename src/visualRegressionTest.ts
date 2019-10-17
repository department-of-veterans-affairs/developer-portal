import { Page } from 'puppeteer';

import { mockSwagger, puppeteerHost, testPaths } from './e2eHelpers';

jest.setTimeout(100000);

const viewports = [
  { width: 1200, height: 800 },
  { width: 768, height: 800 },
  { width: 375, height: 800 },
];

const checkScreenshots = async (page: Page, selector: string) => {
  for (const viewport of viewports) {
    await page.setViewport(viewport);
    await new Promise((resolve, reject) => setTimeout(resolve, 500));
    const content = await page.$(selector);
    if(content) {
      const screenshot = await content.screenshot({});
      expect(screenshot).toMatchImageSnapshot();
    } else {
      fail(`Selector ${selector} not found on the page.`);
    }
  }
};

const paths = testPaths.filter(path => path !== '/');

describe('Visual regression test', async () => {
  it('renders the homepage properly', async() => {
    // Set unlimited timeout on first request, since it may timeout while webpack is compiling.
    await page.goto(`${puppeteerHost}`, { waitUntil: 'networkidle0', timeout: 0 });
    await checkScreenshots(page, '.main');
  });

  it('renders the header properly', async() => {
    await page.goto(`${puppeteerHost}`, { waitUntil: 'networkidle0' });
    await checkScreenshots(page, 'header');
  });

  it('renders the footer properly', async() => {
    await page.goto(`${puppeteerHost}`, { waitUntil: 'networkidle0' });
    await checkScreenshots(page, 'footer');
  });

  for (const path of paths) {
    it(`renders ${path} properly`, async () => {
      // Mock swagger requests on docs pages so those pages aren't blank
      if (/^\/explore\/[^\/]+\/docs/.test(path)) {
        await page.setRequestInterception(true);
        page.removeAllListeners('request');
        page.on('request', mockSwagger);
      }

      await page.goto(`${puppeteerHost}${path}`, { waitUntil: 'networkidle0' });
      // Hide any videos that may be on the page
      await page.evaluate('document.querySelectorAll("iframe").forEach((e) => { e.style="visibility: hidden;" });');
      await checkScreenshots(page, '.main');
    });
  }
});
