import '@testing-library/jest-dom/extend-expect';
import { findByRole, fireEvent, getByText, render, screen } from '@testing-library/react';
import { FlagsProvider } from 'flag';
import { MockedRequest, rest, restContext } from 'msw';
import { MockedResponse, ResponseComposition } from 'msw/lib/types/response';
import { setupServer } from 'msw/node';
import * as React from 'react';
import { Provider } from 'react-redux';
import * as openAPIData from '../../__mocks__/openAPIData.test.json';
import { IApiDescription as APIDescription } from '../../apiDefs/schema';
import store, { history } from '../../store';
import ApiDocumentation from './ApiDocumentation';

const api: APIDescription = {
  description: "it's a great API!",
  docSources: [
    {
      openApiUrl: 'https://example.com/my/openapi/spec',
    },
  ],
  enabledByDefault: true,
  name: 'My API',
  releaseNotes: () => <div>My API's release notes</div>,
  trustedPartnerOnly: false,
  urlFragment: 'my_api',
  vaInternalOnly: false,
};

const server = setupServer(
  rest.get(
    'https://example.com/my/openapi/spec',
    (req: MockedRequest, res: ResponseComposition, context: typeof restContext): MockedResponse => {
      return res(context.status(200), context.json(openAPIData));
    },
  ),
);

describe('ApiDocumentation', () => {
  beforeAll(() => server.listen());
  beforeEach(() => {
    render(
      <Provider store={store}>
        <FlagsProvider
          flags={{
            hosted_apis: { my_api: true },
          }}
        >
          <ApiDocumentation apiDefinition={api} categoryKey="fake" location={history.location} />
        </FlagsProvider>
      </Provider>,
    );
  });

  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('renders successfully', () => {
    expect(() => {
      render(
        <Provider store={store}>
          <FlagsProvider
            flags={{
              hosted_apis: { my_api: true },
            }}
          >
            <ApiDocumentation apiDefinition={api} categoryKey="fake" location={history.location} />
          </FlagsProvider>
        </Provider>,
      );
    }).not.toThrow();
  });

  it('renders the OpenAPI URI', async () => {
    expect(await screen.findByText('https://example.com/my/openapi/spec')).toBeInTheDocument();
  });

  it('has a section for each tag', async () => {
    const tags: string[] = ['Places', 'People'];
    for (const tag of tags) {
      expect(await screen.findByRole('heading', { name: tag })).toBeInTheDocument();
    }
  });

  describe('operations', () => {
    const getOperationContainer = async (tag: string): Promise<HTMLElement> => {
      const tagEl: HTMLElement = await screen.findByRole('heading', { name: tag });
      expect(tagEl.tagName.toLowerCase()).toBe('h3');
      expect(tagEl.nextElementSibling).not.toBeNull();
      return tagEl.nextElementSibling! as HTMLElement;
    };

    it('has a section for each operation', async () => {
      const assertOperationPresent = async (tag: string, path: RegExp) => {
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
      const assertParametersPresent = async (tag: string, path: RegExp) => {
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
      const assertResponsesPresent = async (tag: string, path: RegExp) => {
        const containerEl: HTMLElement = await getOperationContainer(tag);
        fireEvent.click(getByText(containerEl, path));
        expect(await findByRole(containerEl, 'heading', { name: 'Responses' })).toBeInTheDocument();
      };

      await assertResponsesPresent('Places', /\/places.*\/\{id\}$/);
      await assertResponsesPresent('People', /\/people.*\/\{id\}$/);
    });
  });
});
