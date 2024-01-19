import * as React from 'react';
import { findByRole, fireEvent, getByText, render, screen } from '@testing-library/react';
import { MockedRequest, MockedResponse, ResponseComposition, rest, RestContext } from 'msw';
import { setupServer } from 'msw/node';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import * as openAPIData from '../../__mocks__/openAPIData/openAPIData.test.json';
import * as metadata from '../../__mocks__/openAPIData/metadata.test.json';
import { APIDescription, ProdAccessFormSteps } from '../../apiDefs/schema';
import { AppFlags, FlagsProvider, getFlags } from '../../flags';
import store from '../../store';
import ApiDocumentation from './ApiDocumentation';

const ReleaseNotes: string = 'My API&apos;s release notes';
const api: APIDescription = {
  altID: null,
  blockSandboxForm: false,
  categoryUrlFragment: 'nothing-of-importance',
  categoryUrlSlug: 'nothing-of-importance',
  description: "it's a great API!",
  docSources: [
    {
      metadataUrl: 'http://localhost/my/openapi/metadata',
    },
  ],
  enabledByDefault: true,
  isStealthLaunched: false,
  lastProdAccessStep: ProdAccessFormSteps.Three,
  name: 'My API',
  oAuth: false,
  oAuthInfo: null,
  oAuthTypes: null,
  openData: false,
  overviewPageContent: '## Default overview page content',
  releaseNotes: ReleaseNotes,
  restrictedAccessDetails: null,
  restrictedAccessToggle: false,
  urlFragment: 'my_api',
  urlSlug: 'my-api',
  veteranRedirect: null,
};

const server = setupServer(
  rest.get(
    'http://localhost/my/openapi/metadata',
    (
      req: MockedRequest,
      res: ResponseComposition,
      context: RestContext,
    ): MockedResponse | Promise<MockedResponse> => res(context.status(200), context.json(metadata)),
  ),
  rest.get(
    'http://localhost:4444/my/openapi/spec',
    (
      req: MockedRequest,
      res: ResponseComposition,
      context: RestContext,
    ): MockedResponse | Promise<MockedResponse> =>
      res(context.status(200), context.json(openAPIData)),
  ),
);

describe('ApiDocumentation', () => {
  const defaultFlags: AppFlags = {
    ...getFlags(),
    hosted_apis: { my_api: true },
  };

  beforeAll(() => server.listen());
  beforeEach(() => {
    render(
      <Provider store={store}>
        <FlagsProvider flags={defaultFlags}>
          <MemoryRouter>
            <ApiDocumentation apiDefinition={api} />
          </MemoryRouter>
        </FlagsProvider>
      </Provider>,
    );
  });

  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('renders the OpenAPI URI', async () => {
    expect(true).toBeTruthy();
    expect(await screen.findByText('http://localhost:4444/my/openapi/spec')).toBeInTheDocument();
  });

  it('has a section for each tag', async () => {
    expect(await screen.findByRole('heading', { name: 'Places' })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: 'People' })).toBeInTheDocument();
  });

  describe('operations', () => {
    const getOperationContainer = async (tag: string): Promise<HTMLElement> => {
      const tagEl: HTMLElement = await screen.findByRole('heading', { name: tag });
      expect(tagEl.tagName.toLowerCase()).toBe('h3');
      expect(tagEl.nextElementSibling).not.toBeNull();
      return tagEl.nextElementSibling as HTMLElement;
    };

    it('has a section for each operation', async () => {
      const assertOperationPresent = async (tag: string, path: RegExp): Promise<void> => {
        const containerEl: HTMLElement = await getOperationContainer(tag);
        const methodEl: HTMLElement = getByText(containerEl, 'GET');
        expect(methodEl).toBeInTheDocument();
        expect(methodEl.nextElementSibling).not.toBeNull();
        expect(methodEl.nextElementSibling).toHaveTextContent(path);
      };

      await assertOperationPresent('Places', /\/places.*\/\{id\}$/);
      await assertOperationPresent('People', /\/people.*\/\{id\}$/);
    });

    it('has parameters for each operation', async () => {
      const assertParametersPresent = async (tag: string, path: RegExp): Promise<void> => {
        const containerEl: HTMLElement = await getOperationContainer(tag);
        fireEvent.click(getByText(containerEl, path));
        expect(
          await findByRole(containerEl, 'heading', { name: 'Parameters' }),
        ).toBeInTheDocument();
      };

      await assertParametersPresent('Places', /\/places.*\/\{id\}$/);
      await assertParametersPresent('People', /\/people.*\/\{id\}$/);
    });

    it('has parameters for each operation', async () => {
      const assertResponsesPresent = async (tag: string, path: RegExp): Promise<void> => {
        const containerEl: HTMLElement = await getOperationContainer(tag);
        fireEvent.click(getByText(containerEl, path));
        expect(await findByRole(containerEl, 'heading', { name: 'Responses' })).toBeInTheDocument();
      };

      await assertResponsesPresent('Places', /\/places.*\/\{id\}$/);
      await assertResponsesPresent('People', /\/people.*\/\{id\}$/);
    });
  });
});
