import React from 'react';

import moment from 'moment';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router';
import { APICategory } from '../../apiDefs/schema';
import { AppFlags, FlagsProvider, getFlags } from '../../flags';
import { fakeCategories, unmetDeactivationInfo } from '../../__mocks__/fakeCategories';
import * as apiDefs from '../../apiDefs/query';
import ApiPage from './ApiPage';

// Convenience variables to try and keep the index values out of the test
const lotrRingsApi = fakeCategories.lotr.apis[0];
const lotrSilmarilsApi = fakeCategories.lotr.apis[1];

// Mocks
jest.mock('./ApiDocumentation', () => {
  const ApiDocumentation = (): JSX.Element => (
    <div data-testid="api-documentation">API Documentation</div>
  );

  return {
    __esModule: true,
    default: ApiDocumentation,
  };
});

// Test Utils
const renderApiPage = async (
  flags: AppFlags,
  initialRoute: string,
  componentPath?: string,
): Promise<void> => {
  await waitFor(() => cleanup());
  render(
    <FlagsProvider flags={flags}>
      <MemoryRouter initialEntries={[initialRoute]}>
        <Route
          path={componentPath ? componentPath : '/explore/:apiCategoryKey/docs/:apiName'}
          component={ApiPage}
        />
      </MemoryRouter>
    </FlagsProvider>,
  );
};

// Test
describe('ApiPage', () => {
  const defaultFlags: AppFlags = {
    ...getFlags(),
    enabled: { rings: true, silmarils: true },
  };

  const lookupApiByFragmentMock = jest.spyOn(apiDefs, 'lookupApiByFragment');
  const lookupApiCategoryMock = jest.spyOn(apiDefs, 'lookupApiCategory');
  const apisLoadedSpy = jest.spyOn(apiDefs, 'getApisLoaded').mockReturnValue(true);

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('given valid url params', () => {
    beforeEach(async () => {
      lookupApiByFragmentMock.mockReturnValue(lotrRingsApi);
      lookupApiCategoryMock.mockReturnValue(fakeCategories.lotr);
      await renderApiPage(defaultFlags, '/explore/lotr/docs/rings');
    });

    it('calls lookupApi methods with correct parameters', () => {
      expect(lookupApiByFragmentMock).toHaveBeenCalledWith('rings');
      expect(lookupApiCategoryMock).toHaveBeenCalledWith('lotr');
    });

    it('renders api page heading', () => {
      expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Rings API');
      expect(screen.getByText('LOTR API')).not.toBeNull();
    });

    it('renders api documentation', () => {
      expect(screen.getByTestId('api-documentation')).not.toBeNull();
    });
  });

  describe('given deactivated api and valid url params', () => {
    beforeEach(async () => {
      lookupApiByFragmentMock.mockReturnValue(lotrSilmarilsApi);
      lookupApiCategoryMock.mockReturnValue(fakeCategories.lotr);
      await renderApiPage(
        {
          ...defaultFlags,
          deactivated_apis: { silmarils: true },
        },
        '/explore/lotr/docs/silmarils',
      );
    });

    it('calls lookupApi methods with correct parameters', () => {
      expect(lookupApiByFragmentMock).toHaveBeenCalledWith('silmarils');
      expect(lookupApiCategoryMock).toHaveBeenCalledWith('lotr');
    });

    it('renders deactivated message given deactivated api', () => {
      expect(screen.getByText('Silmarils lost forever')).not.toBeNull();
    });
  });

  describe('given unenabled api', () => {
    beforeEach(async () => {
      lookupApiByFragmentMock.mockReturnValue(lotrRingsApi);
      lookupApiCategoryMock.mockReturnValue(fakeCategories.lotr);
      await renderApiPage(
        {
          ...defaultFlags,
          enabled: {
            rings: false,
          },
        },
        '/explore/lotr/docs/rings',
      );
    });

    it('calls lookupApi methods with correct parameters', () => {
      expect(lookupApiByFragmentMock).toHaveBeenCalledWith('rings');
      expect(lookupApiCategoryMock).toHaveBeenCalledWith('lotr');
    });
  });

  describe('given url params with no api', () => {
    beforeEach(async () => {
      lookupApiByFragmentMock.mockReturnValue(null);
      await renderApiPage(defaultFlags, '/explore/lotr/docs', '/explore/:apiCategoryKey/docs');
    });

    it('calls lookupApi methods with correct parameters', () => {
      expect(lookupApiByFragmentMock).toHaveBeenCalledTimes(0);
      expect(lookupApiCategoryMock).toHaveBeenCalledWith('lotr');
    });

    it('renders the api not found page', async () => {
      apisLoadedSpy.mockReturnValue(true);
      await renderApiPage(defaultFlags, '/explore/lotr/docs', '/explore/:apiCategoryKey/docs');
      expect(screen.getByText('Page not found.')).not.toBeNull();
      expect(
        screen.getByText('Try using the links below or the search bar to find your way forward.'),
      ).not.toBeNull();
    });
  });

  describe('given url with api that does not exist', () => {
    beforeEach(async () => {
      lookupApiByFragmentMock.mockReturnValue(null);
      lookupApiCategoryMock.mockReturnValue(fakeCategories.lotr);
      await renderApiPage(defaultFlags, '/explore/lotr/docs/nonexistentapi');
    });

    it('calls lookupApi methods with correct parameters', () => {
      expect(lookupApiByFragmentMock).toHaveBeenCalledWith('nonexistentapi');
      expect(lookupApiCategoryMock).toHaveBeenCalledWith('lotr');
    });

    it('renders the api not found page', async () => {
      apisLoadedSpy.mockReturnValue(true);
      await renderApiPage(defaultFlags, '/explore/lotr/docs', '/explore/:apiCategoryKey/docs');
      expect(screen.getByText('Page not found.')).not.toBeNull();
      expect(
        screen.getByText('Try using the links below or the search bar to find your way forward.'),
      ).not.toBeNull();
    });
  });

  describe('given url with api that does not exist within the given api category', () => {
    beforeEach(async () => {
      lookupApiByFragmentMock.mockReturnValue(lotrRingsApi);
      lookupApiCategoryMock.mockReturnValue(fakeCategories.sports);
      await renderApiPage(defaultFlags, '/explore/sports/docs/silmarils');
    });

    it('calls lookupApi methods with correct parameters', () => {
      expect(lookupApiByFragmentMock).toHaveBeenCalledWith('silmarils');
      expect(lookupApiCategoryMock).toHaveBeenCalledWith('sports');
    });

    it('renders the api not found page', async () => {
      apisLoadedSpy.mockReturnValue(true);
      await renderApiPage(defaultFlags, '/explore/lotr/docs', '/explore/:apiCategoryKey/docs');
      expect(screen.getByText('Page not found.')).not.toBeNull();
      expect(
        screen.getByText('Try using the links below or the search bar to find your way forward.'),
      ).not.toBeNull();
    });
  });

  describe('given api with deactivation info that is not yet deactivated', () => {
    beforeEach(async () => {
      const modifiedLotrApi: APICategory = {
        ...fakeCategories.lotr,
        apis: [
          {
            ...lotrRingsApi,
            deactivationInfo: unmetDeactivationInfo,
          },
        ],
      };

      lookupApiCategoryMock.mockReturnValue(modifiedLotrApi);
      lookupApiByFragmentMock.mockReturnValue(modifiedLotrApi.apis[0]);
      await renderApiPage(defaultFlags, '/explore/lotr/docs/rings');
    });

    it('calls lookupApi methods with correct parameters', () => {
      expect(lookupApiByFragmentMock).toHaveBeenCalledWith('rings');
      expect(lookupApiCategoryMock).toHaveBeenCalledWith('lotr');
    });

    it('does not render deactivation message', () => {
      expect(screen.queryByTestId('deprecation-info')).toBeNull();
      expect(screen.queryByTestId('deactivation-info')).toBeNull();
    });
  });

  describe('given api with deactivation info that is deprecated but not deactivated', () => {
    beforeEach(async () => {
      const modifiedLotrApi: APICategory = {
        ...fakeCategories.lotr,
        apis: [
          {
            ...lotrRingsApi,
            deactivationInfo: {
              ...unmetDeactivationInfo,
              deprecationDate: moment().subtract(1, 'year').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
            },
          },
        ],
      };

      lookupApiCategoryMock.mockReturnValue(modifiedLotrApi);
      lookupApiByFragmentMock.mockReturnValue(modifiedLotrApi.apis[0]);
      await renderApiPage(defaultFlags, '/explore/lotr/docs/rings');
    });

    it('calls lookupApi methods with correct parameters', () => {
      expect(lookupApiByFragmentMock).toHaveBeenCalledWith('rings');
      expect(lookupApiCategoryMock).toHaveBeenCalledWith('lotr');
    });

    it('renders deprecation info', () => {
      expect(screen.queryByText('test-data::: This API is deprecated')).not.toBeNull();
      expect(screen.queryByText('test-data::: This API is deactivated')).toBeNull();
    });
  });
});
