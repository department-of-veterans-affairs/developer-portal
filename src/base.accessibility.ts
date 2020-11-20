/* eslint-disable no-loop-func -- we need to break up these Jest tests inside loops */
import { axeCheck, mockSwagger, puppeteerHost, testPaths } from './e2eHelpers';

describe('Accessibility tests', () => {
  it.each(testPaths)('has no axe violations at %s', async (path: string) => {
    // Mock swagger requests on docs pages so those pages aren't blank
    if (/^\/explore\/[^\/]+\/docs/.test(path)) {
      await page.setRequestInterception(true);
      page.removeAllListeners('request');
      page.on('request', mockSwagger);
    }

    await page.goto(`${puppeteerHost}${path}`, { waitUntil: 'networkidle0' });
    await page.addScriptTag({ path: require.resolve('axe-core') });

    /**
     * Code highlighting on the Authorization page has a false-positive color
     * contrast error, so we have it disabled for the moment.
     *
     * This appears to be due to the axe plugin not scrolling content before
     * validating color contrast in the code blocks, causing it to compare the
     * wrong background color.
     *
     * The releate notes for axe-core 4.1.0 show that this is resolved, but
     * jest-axe has its own version declared for axe-core, so we need to wait
     * for a version of jest-axe that has axe-core 4.1.0 as a downstream
     * dependency, before re-enabling the contrast checks on the authorization
     * page.
     *
     * TLDR: We can enable color contrast checks on the authorization page once
     * a new version of jest-axe has axe-core 4.1.0 as a downstream dependency,
     * and we upgrade to it.
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
});
