/**
 * This test is used in CI as part of end to end testing for the developer-portal.
 * It is also periodicaly ran against the live site by our monitoring system to
 * ensure we are properly rendering the site at a high level. There is probably a
 * better way to ensure the site is rendering correctly, so we may add a monitoring
 * specific test in the future.
 */

import { getDocument, queries } from 'pptr-testing-library';
import { puppeteerHost } from './e2eHelpers';

describe('App', () => {
  describe('skip navigation link', () => {
    beforeEach(async () => {
      await page.goto(puppeteerHost);
    });

    it('should receive focus on the first Tab press after the site loads', async () => {
      const doc = await getDocument(page);
      const skipNavLink = await queries.getByRole(doc, 'link', {
        name: 'Skip to main content',
      });

      await page.keyboard.press('Tab');
      const isFocused = await skipNavLink.evaluate(linkEl => linkEl === document.activeElement);
      expect(isFocused).toBe(true);
    });

    it('should move focus to main', async () => {
      const doc = await getDocument(page);
      const skipNavLink = await queries.getByRole(doc, 'link', {
        name: 'Skip to main content',
      });

      await skipNavLink.press('Enter');
      const main = await queries.getByRole(doc, 'main');
      const isFocused = await main.evaluate(mainEl => mainEl === document.activeElement);
      expect(isFocused).toBe(true);
    });
  });

  describe('terms of service', () => {
    /**
     * This is tested in App to test coverage broadly. We care that the user has
     * access to this link whereever they are.
     */
    it('is displayed in the footer', async () => {
      for (const path of ['/', '/apply', '/explore']) {
        await page.goto(`${puppeteerHost}${path}`, { waitUntil: 'networkidle0' });
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
});
