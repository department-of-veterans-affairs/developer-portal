/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-loop-func -- we need to break up these Jest tests inside loops */
import { axeCheck, mockRequest, puppeteerHost, testPaths } from './testHelpers';

describe('Accessibility tests', () => {
  it.each(testPaths)('has no axe violations at %s', async (path: string) => {
    // Mock swagger requests on docs pages so those pages aren't blank
    if (/^\/explore\/[^\/]+\/docs/.test(path)) {
      await page.setRequestInterception(true);
      page.removeAllListeners('request');
      page.on('request', mockRequest);
    }

    await page.goto(`${puppeteerHost}${path}`, { waitUntil: 'networkidle0' });
    await page.addScriptTag({ path: require.resolve('axe-core') });

    const result = await page.evaluate(axeCheck);
    expect(result).toHaveNoViolations();
  });
});
