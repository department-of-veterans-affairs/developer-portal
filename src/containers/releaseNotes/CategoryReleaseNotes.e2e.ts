import { getDocument, queries } from 'pptr-testing-library';
import { puppeteerHost } from '../../e2eHelpers';

describe('CategoryReleaseNotes', () => {
  describe('API card links', () => {
    it.each([
      ['Benefits Claims', 'Submit and track claims'],
      ['Benefits Intake', 'Submit PDF claims'],
      ['Loan Guaranty', 'Internal VA use only Manage VA Home Loans'],
    ])(
      'should move focus to the target %s API section',
      async (apiName: string, description: string) => {
        await page.goto(`${puppeteerHost}/release-notes/benefits`, { waitUntil: 'networkidle0' });
        const doc = await getDocument(page);
        const cardLink = await queries.getByRole(doc, 'link', {
          name: `${apiName} ${description}`,
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

  it('should show the 404 page on /release-notes/invalid', async () => {
    await page.goto(`${puppeteerHost}/release-notes/invalid`, { waitUntil: 'networkidle0' });
    const pageNotFound = await page.evaluate(() => document.querySelector('h1')?.innerHTML);
    // Check page contents
    expect(pageNotFound).toBe('Page not found.');
    // Ensure there was no redirect
    expect(page.url()).toEqual(`${puppeteerHost}/release-notes/invalid`);
  });
});
