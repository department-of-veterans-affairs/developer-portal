const { toMatchImageSnapshot } = require('jest-image-snapshot');
expect.extend({ toMatchImageSnapshot });

const paths = [
  '/',
  '/explore',
];

const viewports = [
  { width: 1280, height: 800 },
  { width: 1000, height: 800 },
  { width: 768, height: 800 },
  { width: 500, height: 800 },
  { width: 319, height: 800 },
];

jest.setTimeout(60000); // Required because webpack build takes a while
// Increase this value if you see "UnhandledPromiseRejectionWarning: TypeError: Cannot read property 'addExpectationResult' of undefined"

describe('Visual regression test', async () => {
  beforeAll(async () => {
    const page = await browser.newPage();
  });

  for (const path of paths) {
    test(`renders ${path} properly`, async () => {
      await page.goto(`http://localhost:4444${path}`, { waitUntil: 'networkidle0' });
      for (const viewport of viewports) {
        await page.setViewport(viewport)
        const screenshot = await page.screenshot({
          fullPage: true
        });
        expect(screenshot).toMatchImageSnapshot({
          customDiffConfig: {
            threshold: 0.5 // Helps prevent false positives, increase if that's an issue
          }
        });
      }
    });
  }
});
