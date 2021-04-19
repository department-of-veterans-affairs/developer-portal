import { getDocument, queries } from 'pptr-testing-library';
import { ElementHandle } from 'puppeteer';
import { puppeteerHost } from '../../e2eHelpers';

describe('AuthorizationDocs', () => {
  beforeAll(async () => {
    await page.goto(`${puppeteerHost}/explore/authorization`, { waitUntil: 'networkidle0' });
  });

  /**
   * does not include h4s because there are links of the same name under the authorization code
   * flow and PKCE sections
   */
  const headings = [
    'Getting Started',
    'Building OpenID Connect Applications',
    'Initiating the Authorization Code Flow',
    'PKCE (Proof Key for Code Exchange) Authorization',
    'Scopes',
    'ID Token',
    'Test Users',
    'HTTPS',
  ];

  describe('table of contents links', () => {
    let doc: ElementHandle;
    let contentsList: ElementHandle;
    beforeAll(async () => {
      doc = await getDocument(page);
      const contentsHeading = await queries.getByRole(doc, 'heading', {
        name: 'On this Page:',
      });

      contentsList = (await contentsHeading.evaluateHandle(
        headingEl => headingEl.nextElementSibling,
      )) as ElementHandle;
    });

    it.each(headings)('moves focus to the %s section', async (sectionName: string) => {
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

  describe('Leaving focus after changing APIs', () => {
    let doc: ElementHandle;
    let contentsList: ElementHandle;
    beforeAll(async () => {
      doc = await getDocument(page);
      const contentsHeading = await queries.getByRole(doc, 'heading', {
        name: 'On this Page:',
      });

      contentsList = (await contentsHeading.evaluateHandle(
        headingEl => headingEl.nextElementSibling,
      )) as ElementHandle;
    });

    it.each(headings)(
      'remove the focus from the %s section on API change',
      async (sectionName: string) => {
        const link = await queries.getByRole(contentsList, 'link', {
          name: sectionName,
        });
        await link.press('Enter');

        const select = await page.$('#main select');
        await select?.type('Veterans Health API (FHIR)');
        const isFocused = await select?.evaluate(
          selectEl => selectEl === document.activeElement,
        );
        expect(isFocused).toBe(true);
      },
    );
  });
});
