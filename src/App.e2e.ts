/**
 * This test is used in CI as part of end to end testing for the developer-portal.
 * It is also periodicaly ran against the live site by our monitoring system to
 * ensure we are properly rendering the site at a high level. There is probably a
 * better way to ensure the site is rendering correctly, so we may add a monitoring
 * specific test in the future.
 */
import 'jest';

import { puppeteerHost } from './e2eHelpers';

describe('terms of service', () => {
  /**
   * This is tested in App to test coverage broadly. We care that the user has
   * access to this link whereever they are.
   */
  it('is displayed in the footer', async () => {
    for (const path of ['/', '/apply', '/explore']) {
      await page.goto(`${puppeteerHost}${path}`, { timeout: 60000, waitUntil: 'networkidle0' });
      const tosLinkCount = await page.evaluate(() => {
        const pathExpr = "//footer//a[contains(., 'Terms of Service')]";
        const results = document.evaluate(
          pathExpr,
          document,
          null,
          XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
          null,
        );
        return results.snapshotLength;
      });
      expect(tosLinkCount).toEqual(1);
    }
  });
});
