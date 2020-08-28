import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { FlagsProvider } from 'flag';
import 'jest';
import * as React from 'react';
import { MemoryRouter } from 'react-router';
import { fakeAPIs, fakeCategories, fakeCategoryOrder } from '../../__mocks__/fakeCategories';
import * as apiQueries from '../../apiDefs/query';
import { IApiCategories, IApiCategory, IApiDescription } from '../../apiDefs/schema';
import { getFlags } from '../../App';
import ReleaseNotesOverview from './ReleaseNotesOverview';

function renderComponent() {
  cleanup();
  render(
    <FlagsProvider flags={getFlags()}>
      <MemoryRouter>
        <ReleaseNotesOverview />
      </MemoryRouter>
    </FlagsProvider>,
  );
}

describe('ReleaseNotesOverview', () => {
  let apiDefsSpy: jest.SpyInstance<IApiCategories>;

  beforeAll(() => {
    jest.spyOn(apiQueries, 'getApiCategoryOrder').mockReturnValue(fakeCategoryOrder);
    apiDefsSpy = jest.spyOn(apiQueries, 'getApiDefinitions').mockReturnValue(fakeCategories);
    jest.spyOn(apiQueries, 'getAllApis').mockReturnValue(fakeAPIs);
  });

  beforeEach(renderComponent);

  it('renders the heading', () => {
    const heading1 = screen.getByRole('heading', { name: 'Release Notes' });
    expect(heading1).toBeInTheDocument();
    expect(heading1.previousElementSibling).not.toBeNull();
    expect(heading1.previousElementSibling!).toHaveTextContent('Overview');
  });

  it('renders the contact us link', () => {
    const contactUsLink = screen.getByRole('link', { name: /contact us/i });
    expect(contactUsLink).toBeInTheDocument();
    expect(contactUsLink.getAttribute('href')).toBe('/support/contact-us');
  });

  describe('card links', () => {
    it('renders a card for each category', () => {
      fakeCategoryOrder.forEach((categoryKey: string) => {
        const category: IApiCategory = fakeCategories[categoryKey];
        const cardLink = screen.getByRole('link', {
          name: `${category.name} ${category.content.shortDescription}`,
        });

        expect(cardLink).toBeInTheDocument();
        expect(cardLink.getAttribute('href')).toBe(`/release-notes/${categoryKey}`);
      });
    });

    it('does not render a card for a disabled category', () => {
      const sportsAPIs = fakeCategories.sports.apis.map(
        (api: IApiDescription): IApiDescription => ({
          ...api,
          enabledByDefault: false,
        }),
      );

      apiDefsSpy.mockReturnValue({
        ...fakeCategories,
        sports: {
          ...fakeCategories.sports,
          apis: sportsAPIs,
        },
      });

      renderComponent();
      expect(
        screen.queryByRole('link', {
          name: `Sports API ${fakeCategories.sports.content.shortDescription}`,
        }),
      ).toBeNull();
    });
  });
});
