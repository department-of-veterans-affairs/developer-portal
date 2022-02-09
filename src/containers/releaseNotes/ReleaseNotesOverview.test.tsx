/* eslint-disable max-nested-callbacks -- Jest callbacks */
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import 'jest';
import * as React from 'react';
import { MemoryRouter } from 'react-router';
import { fakeAPIs, fakeCategories, fakeCategoryOrder } from '../../__mocks__/fakeCategories';
import * as apiQueries from '../../apiDefs/query';
import { APICategories, APIDescription } from '../../apiDefs/schema';
import { FlagsProvider, getFlags } from '../../flags';
import ReleaseNotesOverview from './ReleaseNotesOverview';

const renderComponent = async (): Promise<void> => {
  await waitFor(() => cleanup()); // clean up beforeEach render if we're testing a different page
  render(
    <FlagsProvider flags={getFlags()}>
      <MemoryRouter>
        <ReleaseNotesOverview />
      </MemoryRouter>
    </FlagsProvider>,
  );
};

describe('ReleaseNotesOverview', () => {
  let apiDefsSpy: jest.SpyInstance<APICategories>;
  let allAPIsSpy: jest.SpyInstance<APIDescription[]>;
  let apisLoadedSpy: jest.SpyInstance<boolean>;

  beforeAll(() => {
    jest.spyOn(apiQueries, 'getApiCategoryOrder').mockReturnValue(fakeCategoryOrder);
    apiDefsSpy = jest.spyOn(apiQueries, 'getApiDefinitions').mockReturnValue(fakeCategories);
    allAPIsSpy = jest.spyOn(apiQueries, 'getAllApis').mockReturnValue(fakeAPIs);
    apisLoadedSpy = jest.spyOn(apiQueries, 'getApisLoaded').mockReturnValue(true);
  });

  beforeEach(renderComponent);

  it('renders the heading', () => {
    const heading1 = screen.getByRole('heading', { name: 'Release Notes' });
    expect(heading1).toBeInTheDocument();
  });

  it('renders the contact us link', () => {
    const contactUsLink = screen.getByRole('link', { name: /contact us/i });
    expect(contactUsLink).toBeInTheDocument();
    expect(contactUsLink.getAttribute('href')).toBe('/support/contact-us');
  });

  describe('card links', () => {
    it('renders a card for each category', () => {
      let cardLink = screen.getByRole('link', { name: 'LOTR API' });
      expect(cardLink).toBeInTheDocument();
      expect(cardLink.getAttribute('href')).toBe('/release-notes/lotr');

      cardLink = screen.getByRole('link', { name: 'Sports API' });
      expect(cardLink).toBeInTheDocument();
      expect(cardLink.getAttribute('href')).toBe('/release-notes/sports');
    });

    it('does not render a card for a disabled category', async () => {
      const sportsAPIs = fakeCategories.sports.apis.map(
        (api: APIDescription): APIDescription => ({
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

      await renderComponent();
      expect(
        screen.queryByRole('link', {
          name: 'Sports API',
        }),
      ).toBeNull();
    });

    it('has a loading indicator before the apis are loaded', async () => {
      apisLoadedSpy.mockReturnValue(false);

      await renderComponent();
      const loadingBar = screen.getByRole('progressbar');
      expect(loadingBar).toBeInTheDocument();
    });

    it('has a card link for deactivated APIs if there is at least one deactivated API', async () => {
      apisLoadedSpy.mockReturnValue(true);

      await renderComponent();
      const cardLink = screen.getByRole('link', { name: 'Deactivated APIs' });
      expect(cardLink).toBeInTheDocument();
      expect(cardLink.getAttribute('href')).toBe('/release-notes/deactivated');
    });

    it('does not have a card link for deactivated APIs if there are none', async () => {
      const apis = fakeAPIs.map(api => ({ ...api, deactivationInfo: undefined }));
      allAPIsSpy.mockReturnValue(apis);
      apisLoadedSpy.mockReturnValue(true);
      await renderComponent();

      expect(screen.queryByRole('link', { name: 'Deactivated APIs' })).toBeNull();
    });
  });
});
