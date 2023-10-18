import React from 'react';
import moment from 'moment';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { APICategory } from '../../apiDefs/schema';
import { AppFlags, FlagsProvider, getFlags } from '../../flags';
import { fakeCategories, unmetDeactivationInfo } from '../../__mocks__/fakeCategories';
import * as apiDefs from '../../apiDefs/query';
import store from '../../store';
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
    <Provider store={store}>
      <FlagsProvider flags={flags}>
        <MemoryRouter initialEntries={[initialRoute]}>
          <Routes>
            <Route
              path={componentPath ? componentPath : '/explore/api/:urlSlug/docs'}
              element={<ApiPage />}
            />
          </Routes>
        </MemoryRouter>
      </FlagsProvider>
    </Provider>,
  );
};

// Test
describe('ApiPage', () => {
  const defaultFlags: AppFlags = {
    ...getFlags(),
    enabled: { rings: true, silmarils: true },
  };

  const lookupApiBySlugMock = jest.spyOn(apiDefs, 'lookupApiBySlug');
  const lookupApiCategoryMock = jest.spyOn(apiDefs, 'lookupApiCategory');

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('given valid url params', () => {
    beforeEach(async () => {
      lookupApiBySlugMock.mockReturnValue(lotrRingsApi);
      lookupApiCategoryMock.mockReturnValue(fakeCategories.lotr);
      await renderApiPage(defaultFlags, '/explore/api/rings/docs');
    });

    it('calls lookupApi methods with correct parameters', () => {
      expect(lookupApiBySlugMock).toHaveBeenCalledWith('rings');
      expect(lookupApiCategoryMock).toHaveBeenCalledWith('lotr');
    });

    it('renders api page heading', () => {
      expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Docs Rings API');
    });

    it('renders api documentation', () => {
      expect(screen.getByTestId('api-documentation')).not.toBeNull();
    });
  });

  describe('given deactivated api and valid url params', () => {
    beforeEach(async () => {
      lookupApiBySlugMock.mockReturnValue(lotrSilmarilsApi);
      lookupApiCategoryMock.mockReturnValue(fakeCategories.lotr);
      await renderApiPage(
        {
          ...defaultFlags,
          deactivated_apis: { silmarils: true },
        },
        '/explore/api/silmarils/docs',
      );
    });

    it('calls lookupApi methods with correct parameters', () => {
      expect(lookupApiBySlugMock).toHaveBeenCalledWith('silmarils');
      expect(lookupApiCategoryMock).toHaveBeenCalledWith('lotr');
    });

    it('renders deactivated message given deactivated api', () => {
      expect(screen.getByText('Silmarils lost forever')).not.toBeNull();
    });
  });

  describe('given unenabled api', () => {
    beforeEach(async () => {
      lookupApiBySlugMock.mockReturnValue(lotrRingsApi);
      lookupApiCategoryMock.mockReturnValue(fakeCategories.lotr);
      await renderApiPage(
        {
          ...defaultFlags,
          enabled: {
            rings: false,
          },
        },
        '/explore/api/rings/docs',
      );
    });

    it('calls lookupApi methods with correct parameters', () => {
      expect(lookupApiBySlugMock).toHaveBeenCalledWith('rings');
      expect(lookupApiCategoryMock).toHaveBeenCalledWith('lotr');
    });
  });

  describe('given url with api that does not exist', () => {
    it("ApiPage throws an error that'll get caught by the ErrorBoundary", () => {
      lookupApiBySlugMock.mockReturnValue(null);
      lookupApiCategoryMock.mockReturnValue(fakeCategories.lotr);
      spyOn(console, 'error');
      expect(() => {
        render(
          <Provider store={store}>
            <FlagsProvider flags={defaultFlags}>
              <MemoryRouter initialEntries={['/explore/api/nonexistantapi/docs']}>
                <Routes>
                  <Route path="/explore/api/:urlSlug/docs" element={<ApiPage />} />
                </Routes>
              </MemoryRouter>
            </FlagsProvider>
          </Provider>,
        );
      }).toThrow(Error);
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
      lookupApiBySlugMock.mockReturnValue(modifiedLotrApi.apis[0]);
      await renderApiPage(defaultFlags, '/explore/api/rings/docs');
    });

    it('calls lookupApi methods with correct parameters', () => {
      expect(lookupApiBySlugMock).toHaveBeenCalledWith('rings');
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
      lookupApiBySlugMock.mockReturnValue(modifiedLotrApi.apis[0]);
      await renderApiPage(defaultFlags, '/explore/api/rings/docs');
    });

    it('calls lookupApi methods with correct parameters', () => {
      expect(lookupApiBySlugMock).toHaveBeenCalledWith('rings');
      expect(lookupApiCategoryMock).toHaveBeenCalledWith('lotr');
    });

    it('renders deprecation info', () => {
      expect(screen.queryByText('test-data::: This API is deprecated')).not.toBeNull();
      expect(screen.queryByText('test-data::: This API is deactivated')).toBeNull();
    });
  });

  describe('given api with veteran redirect', () => {
    const apiCategory: APICategory = {
      ...fakeCategories.lotr,
      apis: [
        {
          ...lotrRingsApi,
          veteranRedirect: {
            linkText: 'Find a faster train',
            linkUrl: 'https://www.va.gov/find-locations/',
            message: 'Are you tired of waiting?',
          },
        },
        {
          ...lotrRingsApi,
        },
      ],
      content: {
        ...fakeCategories.lotr.content,
        veteranRedirect: {
          linkText: "Find the facility that's right for you.",
          linkUrl: 'https://www.va.gov/find-locations/',
          message: 'Are you a Veteran?',
        },
      },
    };

    it('renders API specific veteran redirect message', async () => {
      lookupApiCategoryMock.mockReturnValue(apiCategory);
      lookupApiBySlugMock.mockReturnValue(apiCategory.apis[0]);
      await renderApiPage(defaultFlags, '/explore/api/rings/docs');
      expect(screen.getByText('Find a faster train')).not.toBeNull();
    });
  });
});
