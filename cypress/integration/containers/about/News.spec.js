/// <reference types="cypress" />

describe('News page', () => {
  beforeEach(() => {
    cy.visit('/about/news');
  });

  describe('side nav links', () => {
    it('Check all news sections receive focus from sidebar links', () => {
      ['News releases', 'Articles', 'Digital media'].forEach(item => {
        let hash = item.replace(' ', '-');
        cy.get('nav a[href="/about/news#' + hash).click();
        cy.focused().should('have.id', hash);
      });
    });
  });

  describe('card links', () => {
    it('Check all news sections receive focus from card links', () => {
      ['News releases', 'Articles', 'Digital media'].forEach(item => {
        let hash = item.replace(' ', '-');
        cy.get('.card-content a[href="/about/news#' + hash).click();
        cy.focused().should('have.id', hash);
      });
    });
  });

  // describe('card links', () => {
  //   it.each(['News releases', 'Articles', 'Digital media'])(
  //     'should move focus to the %s section',
  //     async (sectionName: string) => {
  //       const doc = await getDocument(page);
  //       const contentSection = await queries.getByRole(doc, 'region', { name: 'News' });
  //       const cardLink = await queries.getByRole(contentSection, 'link', {
  //         name: new RegExp(`^${sectionName}`),
  //       });

  //       await cardLink.press('Enter');
  //       const heading = await queries.getByRole(doc, 'heading', {
  //         name: sectionName,
  //       });
  //       const isFocused = await heading.evaluate(element => element === document.activeElement);
  //       expect(isFocused).toBe(true);
  //     },
  //   );
  // });
});
