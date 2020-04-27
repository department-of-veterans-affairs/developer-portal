import { initialApplicationState } from './reducers';

// sessionStorage.getItem('state') is called when the store is imported at application start up
// to be able to pass in artibray values for testing purposes, 
// the store is reset between tests and the initialized after setting sessionStorage 
let store: any;

beforeEach(() => {
  sessionStorage.clear();
  jest.resetModules();
});

describe('loadApplicationState', () => {
  it('returns a blank application when sessionStorage is empty', () => {
    store = require('./store').default;
    const state = store.getState();
    expect(state.application).toEqual(initialApplicationState);
  });

  it('returns the cached application when available', () => {
    sessionStorage.setItem('state', '{"application":{"inputs":{"apis":{"appeals":false,"benefits":false,"claims":false,"communityCare":false,"confirmation":false,"facilities":false,"health":false,"vaForms":false,"verification":false},"description":{"dirty":false,"value":""},"email":{"dirty":false,"value":""},"firstName":{"dirty":false,"value":"Test"},"lastName":{"dirty":false,"value":"User"},"oAuthApplicationType":{"dirty":false,"value":""},"oAuthRedirectURI":{"dirty":false,"value":""},"organization":{"dirty":false,"value":""},"termsOfService":false}}}');
    store = require('./store').default;
    const state = store.getState();
    expect(state.application).not.toEqual(initialApplicationState);
  });

  it('returns a blank application when the form schema has changed', () => {
    sessionStorage.setItem('state', '{"application":{"inputs":{"apis":{"appeals":false,"benefits":false,"claims":false,"communityCare":false,"confirmation":false,"facilities":false,"health":false,"vaForms":false,"verification":false},"description":{"dirty":false,"value":""},"email":{"dirty":false,"value":""},"firstName":{"dirty":false,"value":"Test"},"middleName":{"dirty":false,"value":"This"},"lastName":{"dirty":false,"value":"User"},"oAuthApplicationType":{"dirty":false,"value":""},"oAuthRedirectURI":{"dirty":false,"value":""},"organization":{"dirty":false,"value":""},"termsOfService":false}}}');
    store = require('./store').default;
    const state = store.getState();
    expect(state.application).toEqual(initialApplicationState);
  });
});
