import { getDocument, queries } from 'pptr-testing-library';
import { puppeteerHost } from '../../e2eHelpers';

describe('CategoryReleaseNotes', () => {
  describe('API card links', () => {
    it.each([
      'Benefits Claims API',
      'Benefits Intake API',
    ])(
      'should move focus to the target %s API section',
      async (apiName: string) => {
        await page.goto(`${puppeteerHost}/release-notes/benefits`, { waitUntil: 'networkidle0' });
        const doc = await getDocument(page);

        const mainContentRegion = await queries.getByRole(doc, 'region', {
          name: 'Benefits APIs Release Notes',
        });
        const cardLink = await queries.getByRole(mainContentRegion, 'link', {
          name: apiName,
        });

        await cardLink.press('Enter');
        const heading = await queries.getByRole(doc, 'heading', {
          name: apiName,
        });
        const isFocused = await heading.evaluate(element => element === document.activeElement);
        expect(isFocused).toBe(true);
      },
    );
  });
});
