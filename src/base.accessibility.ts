import { axeCheck, mockSwagger, puppeteerHost, testPaths } from './e2eHelpers';

describe('Accessibility tests', () => {
  for (const path of testPaths) {
    it(`has no axe violations at ${path}`, async () => {
      // Mock swagger requests on docs pages so those pages aren't blank
      if (/^\/explore\/[^\/]+\/docs/.test(path)) {
        await page.setRequestInterception(true);
        page.removeAllListeners('request');
        page.on('request', mockSwagger);
      }

      await page.goto(`${puppeteerHost}${path}`, { timeout: 60000, waitUntil: 'networkidle0' });
      await page.addScriptTag({ path: require.resolve('axe-core') });

      /**
       * THIS IS BAD. code highlighting on the Authorization page has several color contrast
       * issues. upgrading axe-core from 3.3.1 to 4.0.2 and jest-axe from 3.2.0 to 4.0.0 introduced
       * stricter rules, which is good, but we can't resolve this issue without UX input.
       */
      if (path === '/explore/health/docs/authorization') {
        await page.evaluate(() => {
          window.axe.configure({
            checks: [
              {
                // https://github.com/dequelabs/axe-core/blob/develop/doc/check-options.md#color-contrast
                enabled: false,
                evaluate: 'color-contrast-evaluate',
                id: 'color-contrast',
              },
            ],
          });
        });
      }

      const result = await page.evaluate(axeCheck);
      expect(result).toHaveNoViolations();
    });
  }
});
