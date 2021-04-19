import { getDocument, queries } from 'pptr-testing-library';
import { puppeteerHost } from '../e2eHelpers';

describe('News', () => {
  beforeAll(async () => {
    await page.goto(`${puppeteerHost}/news`, { waitUntil: 'networkidle0' });
  });

  describe('side nav links', () => {
    it.each(['News releases', 'Articles', 'Digital media'])(
      'should move focus to the %s section',
      async (sectionName: string) => {
        const doc = await getDocument(page);
        const sideNav = await queries.getByRole(doc, 'navigation', {
          name: 'News Side Nav',
        });
        const navLink = await queries.getByRole(sideNav, 'link', {
          name: sectionName,
        });

        await navLink.press('Enter');
        const heading = await queries.getByRole(doc, 'heading', {
          name: sectionName,
        });
        const isFocused = await heading.evaluate(element => element === document.activeElement);
        expect(isFocused).toBe(true);
      },
    );
  });

  describe('card links', () => {
    it.each(['News releases', 'Articles', 'Digital media'])(
      'should move focus to the %s section',
      async (sectionName: string) => {
        const doc = await getDocument(page);
        const contentSection = await queries.getByRole(doc, 'region', { name: 'News' });
        const cardLink = await queries.getByRole(contentSection, 'link', {
          name: new RegExp(`^${sectionName}`),
        });

        await cardLink.press('Enter');
        const heading = await queries.getByRole(doc, 'heading', {
          name: sectionName,
        });
        const isFocused = await heading.evaluate(element => element === document.activeElement);
        expect(isFocused).toBe(true);
      },
    );
  });
});
