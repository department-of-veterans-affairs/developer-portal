import { getDocument, queries } from 'pptr-testing-library';
import { ElementHandle } from 'puppeteer';
import { puppeteerHost } from '../../e2eHelpers';

describe('AuthorizationDocs', () => {
  beforeAll(async () => {
    await page.goto(`${puppeteerHost}/explore/authorization`, { waitUntil: 'networkidle0' });
  });

  /**
   * have to skip because the new auth docs are off by default, including in the Jest Puppeteer
   * server. to run this test, remove the .skip and add the correct environment variable in
   * jest-puppeteer.config.js.
   */
  describe.skip('table of contents links', () => {
    let doc: ElementHandle;
    let contentsList: ElementHandle;
    beforeAll(async () => {
      doc = await getDocument(page);
      const contentsHeading = await queries.getByRole(doc, 'heading', {
        name: 'On this Page:',
      });

      contentsList = await contentsHeading.evaluateHandle(headingEl => headingEl.nextElementSibling) as ElementHandle;
    });

    it.each([
      'Getting Started',
      'Building OpenID Connect Applications',
      'Initiating the Authorization Code Flow',
      'PKCE (Proof Key for Code Exchange) Authorization',
      'Scopes',
      'ID Token',
      'Test Users',
    ])('moves focus to the %s section', async (sectionName: string) => {
      const link = await queries.getByRole(contentsList, 'link', {
        name: sectionName,
      });

      await link.press('Enter');
      const heading = await queries.getByRole(doc, 'heading', {
        name: sectionName,
      });
      const isFocused = await heading.evaluate(headingEl => headingEl === document.activeElement);
      expect(isFocused).toBe(true);
    });
  });
});
