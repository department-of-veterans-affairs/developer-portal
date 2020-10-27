import { initialApplicationState } from './reducers';
import { SerializedState } from './types';

// sessionStorage.getItem('state') is called when the store is imported at application start up.
// To be able to pass in artibray values for testing purposes, the store is reset between tests 
// and then initialized after setting sessionStorage.

beforeEach(() => {
  sessionStorage.clear();
  jest.resetModules();
});

describe('loadApplicationState', () => {
  it('returns a blank application when sessionStorage is empty', async () => {
    const store = (await import('./store')).default;
    const state = store.getState();
    expect(state.application).toEqual(initialApplicationState);
  });

  it('returns the cached application when available', async () => {
    const savedState = '{"application":{"inputs":{"apis":{"appeals":false,"benefits":false,"claims":false,"communityCare":false,"confirmation":false,"facilities":false,"health":false,"vaForms":false,"verification":false},"description":{"dirty":false,"value":""},"email":{"dirty":false,"value":""},"firstName":{"dirty":false,"value":"Test"},"lastName":{"dirty":false,"value":"User"},"oAuthApplicationType":{"dirty":false,"value":""},"oAuthRedirectURI":{"dirty":false,"value":""},"organization":{"dirty":false,"value":""},"termsOfService":false}}}';
    sessionStorage.setItem('state', savedState);
    const store = (await import('./store')).default;
    const state = store.getState();
    const expectedState = JSON.parse(savedState) as SerializedState;
    expect(state.application).toEqual({ ...expectedState.application, sending: false });
  });

  it('returns a blank application when the form schema has changed', async () => {
    const saveState = '{"application":{"inputs":{"apis":{"appeals":false,"benefits":false,"claims":false,"communityCare":false,"confirmation":false,"facilities":false,"health":false,"vaForms":false,"verification":false},"description":{"dirty":false,"value":""},"email":{"dirty":false,"value":""},"firstName":{"dirty":false,"value":"Test"},"middleName":{"dirty":false,"value":"This"},"lastName":{"dirty":false,"value":"User"},"oAuthApplicationType":{"dirty":false,"value":""},"oAuthRedirectURI":{"dirty":false,"value":""},"organization":{"dirty":false,"value":""},"termsOfService":false}}}';
    sessionStorage.setItem('state', saveState);
    const store = (await import('./store')).default;
    const state = store.getState();
    expect(state.application).toEqual(initialApplicationState);
  });
});
