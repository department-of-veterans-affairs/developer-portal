/**
 * This file contains just the core retrieval of the API Definitions from the redux store to facilitate mocking this method within unit testing.
 */

import store from '../store';
import { APICategories } from './schema';

const getApiDefinitions = (): APICategories => {
  const state = store.getState();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  return state.apiList.apis;
};
export { getApiDefinitions };
