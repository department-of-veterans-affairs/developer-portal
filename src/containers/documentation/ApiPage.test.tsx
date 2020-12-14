/* eslint-disable max-nested-callbacks */
import React from 'react';

import { render, screen } from '@testing-library/react';
import { MockedRequest, rest, restContext, MockedResponse } from 'msw';
import { setupServer } from 'msw/node';
import { ResponseComposition } from 'msw/lib/types/response';
import { MemoryRouter } from 'react-router';
import { useParams } from 'react-router-dom';
import { AppFlags, FlagsProvider } from '../../flags';
import * as openAPIData from '../../__mocks__/openAPIData/openAPIData.test.json';
import { fakeCategories } from '../../__mocks__/fakeCategories';
import * as apiDefs from '../../apiDefs/query';
import ApiPage from './ApiPage';

// Mocks
jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  ...(jest.requireActual('react-router-dom') as Record<string, unknown>),
  useParams: jest.fn(),
}));

jest.mock('../../content/explorePage.mdx', () => {
  const ExplorePage = (): JSX.Element => <div data-testid="explore-page">Mock Explore Page</div>;

  return {
    __esModule: true,
    default: ExplorePage,
  };
});

jest.mock('./ApiDocumentation', () => {
  const ApiDocumentation = (): JSX.Element => (
    <div data-testid="api-documentation">API Documentation</div>
  );

  return {
    __esModule: true,
    default: ApiDocumentation,
  };
});

const server = setupServer(
  rest.get(
    'https://example.com/my/openapi/spec',
    (req: MockedRequest, res: ResponseComposition, context: typeof restContext): MockedResponse =>
      res(context.status(200), context.json(openAPIData)),
  ),
);

// Test
describe('ApiPage', () => {
  // Convenience object for accessing mocked components as their correct type without casting each time
  const mockedComponents = {
    useParams: (useParams as unknown) as jest.Mock,
  };

  const defaultFlags: AppFlags = {
    auth_docs_v2: false,
    categories: { category: true },
    deactivated_apis: {},
    enabled: { rings: true, silmarils: true },
    hosted_apis: {},
    show_testing_notice: false,
    signups_enabled: true,
  };

  const lookupApiByFragmentMock = jest.spyOn(apiDefs, 'lookupApiByFragment');
  const lookupApiCategoryMock = jest.spyOn(apiDefs, 'lookupApiCategory');

  beforeAll(() => server.listen());
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    mockedComponents.useParams.mockReturnValue({
      apiCategoryKey: 'lotr',
      apiName: 'rings',
    });

    lookupApiByFragmentMock.mockReturnValue(fakeCategories.lotr.apis[0]);
    lookupApiCategoryMock.mockReturnValue(fakeCategories.lotr);
  });
  afterEach(() => {
    jest.resetAllMocks();
    server.resetHandlers();
  });
  afterAll(() => server.close());

  describe('given valid url params', () => {
    beforeEach(() => {
      render(
        <FlagsProvider flags={defaultFlags}>
          <MemoryRouter>
            <ApiPage />
          </MemoryRouter>
        </FlagsProvider>,
      );
    });

    it('calls lookupApi methods with correct parameters', () => {
      expect(lookupApiByFragmentMock).toHaveBeenCalledWith('rings');
      expect(lookupApiCategoryMock).toHaveBeenCalledWith('lotr');
    });

    it('renders region', () => {
      expect(screen.getByRole('region')).toBeDefined();
    });

    it('renders api page heading', () => {
      expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Rings API');
      expect(screen.getByText('LOTR API')).toBeDefined();
    });

    it('renders api documentation', () => {
      expect(screen.getByTestId('api-documentation')).toBeDefined();
    });
  });

  describe('given deactivated api and valid url params', () => {
    beforeEach(() => {
      mockedComponents.useParams.mockReturnValue({
        apiCategoryKey: 'lotr',
        apiName: 'silmarils',
      });

      lookupApiByFragmentMock.mockReturnValue(fakeCategories.lotr.apis[1]);

      render(
        <FlagsProvider
          flags={{
            ...defaultFlags,
            deactivated_apis: { silmarils: true },
          }}
        >
          <MemoryRouter>
            <ApiPage />
          </MemoryRouter>
        </FlagsProvider>,
      );
    });

    it('calls lookupApi methods with correct parameters', () => {
      expect(lookupApiByFragmentMock).toHaveBeenCalledWith('silmarils');
      expect(lookupApiCategoryMock).toHaveBeenCalledWith('lotr');
    });

    it('renders deactivated message given deactivated api', () => {
      expect(screen.getByText('Silmarils lost forever')).toBeDefined();
    });
  });

  describe('given unenabled api', () => {
    beforeEach(() => {
      render(
        <FlagsProvider
          flags={{
            ...defaultFlags,
            enabled: {
              rings: false,
            },
          }}
        >
          <MemoryRouter>
            <ApiPage />
          </MemoryRouter>
        </FlagsProvider>,
      );
    });

    it('calls lookupApi methods with correct parameters', () => {
      expect(lookupApiByFragmentMock).toHaveBeenCalledWith('rings');
      expect(lookupApiCategoryMock).toHaveBeenCalledWith('lotr');
    });

    it('renders the explore page', () => {
      expect(screen.getByTestId('explore-page')).toBeDefined();
    });
  });

  describe('given invalid url params', () => {
    describe('when there is no api given', () => {
      beforeEach(() => {
        ((useParams as unknown) as jest.Mock<unknown, unknown[]>).mockReturnValue({
          apiCategoryKey: 'lotr',
          // we leave apiName undefined here on purpose since it is not present in the 'url'
        });
        lookupApiByFragmentMock.mockReturnValue(null);

        render(
          <FlagsProvider flags={defaultFlags}>
            <MemoryRouter>
              <ApiPage />
            </MemoryRouter>
          </FlagsProvider>,
        );
      });

      it('calls lookupApi methods with correct parameters', () => {
        expect(lookupApiByFragmentMock).toHaveBeenCalledTimes(0);
        expect(lookupApiCategoryMock).toHaveBeenCalledWith('lotr');
      });

      it('renders the not API Not Found Page', () => {
        expect(screen.getByText('Page not found.')).toBeDefined();
        expect(screen.getByText('Try using the links below or the search bar to find your way forward.')).toBeDefined();
      });
    });

    describe('when the api does not exist', () => {
      beforeEach(() => {
        ((useParams as unknown) as jest.Mock<unknown, unknown[]>).mockReturnValue({
          apiCategoryKey: 'lotr',
          apiName: 'api that does not exist',
        });
        lookupApiByFragmentMock.mockReturnValue(null);

        render(
          <FlagsProvider flags={defaultFlags}>
            <MemoryRouter>
              <ApiPage />
            </MemoryRouter>
          </FlagsProvider>,
        );
      });

      it('calls lookupApi methods with correct parameters', () => {
        expect(lookupApiByFragmentMock).toHaveBeenCalledWith('api that does not exist');
        expect(lookupApiCategoryMock).toHaveBeenCalledWith('lotr');
      });

      it('renders the not API Not Found Page', () => {
        expect(screen.getByText('Page not found.')).toBeDefined();
        expect(screen.getByText('Try using the links below or the search bar to find your way forward.')).toBeDefined();
      });
    });

    describe('when the api is not found within the given api category', () => {
      beforeEach(() => {
        ((useParams as unknown) as jest.Mock<unknown, unknown[]>).mockReturnValue({
          apiCategoryKey: 'sports',
          apiName: 'silmarils',
        });
        lookupApiCategoryMock.mockReturnValue(fakeCategories.sports);

        render(
          <FlagsProvider flags={defaultFlags}>
            <MemoryRouter>
              <ApiPage />
            </MemoryRouter>
          </FlagsProvider>,
        );
      });

      it('calls lookupApi methods with correct parameters', () => {
        expect(lookupApiByFragmentMock).toHaveBeenCalledWith('silmarils');
        expect(lookupApiCategoryMock).toHaveBeenCalledWith('sports');
      });

      it('renders the not API Not Found Page', () => {
        expect(screen.getByText('Page not found.')).toBeDefined();
        expect(screen.getByText('Try using the links below or the search bar to find your way forward.')).toBeDefined();
      });
    });
  });
});
