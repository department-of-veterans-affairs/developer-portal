import { axeCheck, mockSwagger, puppeteerHost, testPaths } from './e2eHelpers';

describe('Accessibility tests', async () => {
  for (const path of testPaths) {
    // Disabled until we can actually fix these failures. Some are caused by swagger-ui,
    // so unlikely to be fixable before then
    if (path === "/apply") {
      continue;
    }

    it(`has no axe violations at ${path}`, async () => {
      // Mock swagger requests on docs pages so those pages aren't blank
      if (/^\/explore\/[^\/]+\/docs/.test(path)) {
        await page.setRequestInterception(true);
        page.removeAllListeners('request');
        page.on('request', mockSwagger);
      }

      await page.goto(`${puppeteerHost}${path}`, { waitUntil: 'networkidle0' });
      await page.addScriptTag({ path: require.resolve('axe-core') })
      const result = await page.evaluate(axeCheck);
      expect(result).toHaveNoViolations();
    });
  }
});
