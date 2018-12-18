import { mockSwagger } from './e2eHelpers';

const paths = [
  '/',
  '/apply',
  '/terms-of-service',
  '/go-live',
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

describe('Visual regression test', async () => {
  for (const path of paths) {
    it(`renders ${path} properly`, async () => {
      // Mock swagger requests on docs pages so those pages aren't blank
      if (/$\/explore\/[^\/]+\/docs/.test(path)) {
        await page.setRequestInterception(true);
        page.removeAllListeners('request');
        page.on('request', mockSwagger);
      }

      await page.goto(`${puppeteerHost}${path}`, { waitUntil: 'networkidle0' });

      // Hack to make sure iframe content (such as youtube video on the homepage) is loaded before the screenshot
      if (await page.$('iframe') !== null) {
        await page.hover('iframe');
        await page.waitFor(1000);
      }
      
      for (const viewport of viewports) {
        await page.setViewport(viewport)
        const screenshot = await page.screenshot({
          fullPage: true
        });
        expect(screenshot).toMatchImageSnapshot();
      }
    });
  }
});
