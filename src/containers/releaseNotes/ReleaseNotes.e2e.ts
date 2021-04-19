import { getDocument, queries } from 'pptr-testing-library';
import { puppeteerHost } from '../../e2eHelpers';

describe('Release Notes', () => {
  describe('side nav API links', () => {
    beforeAll(async () => {
      await page.goto(`${puppeteerHost}/release-notes/benefits`);
    });

    it.each([
      'Benefits Claims',
      'Benefits Intake',
      'Loan Guaranty',
    ])('should move focus to the %s API section', async (apiName: string) => {
      const doc = await getDocument(page);
      const sideNav = await queries.getByRole(doc, 'navigation', {
        name: 'Release Notes Side Nav',
      });
      const navLink = await queries.getByRole(sideNav, 'link', {
        name: new RegExp(`^${apiName}`),
      });

      await navLink.press('Enter');
      const heading = await queries.getByRole(doc, 'heading', { name: apiName });
      const isFocused = await heading.evaluate(headingEl => headingEl === document.activeElement);
      expect(isFocused).toBe(true);
    });
  });
});
