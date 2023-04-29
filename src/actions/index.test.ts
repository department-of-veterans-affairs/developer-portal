/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import 'jest';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { ActionCreator, AnyAction, combineReducers } from 'redux';
import * as constants from '../types/constants';
import { RootState } from '../types';
import { apiVersioning } from '../reducers/apiVersioning';
import { apiList } from '../reducers/apiList';
import { generalStore } from '../reducers/generalStore';
import {
  resetVersioning,
  setApis,
  setGeneralStore,
  setVersioning,
  setRequestedApiVersion,
} from '.';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore(
  combineReducers<RootState>({
    apiList,
    apiVersioning,
    generalStore,
  }),
);

const coreTest = (
  method: ActionCreator<AnyAction>,
  type: string,
  payload?: undefined | Record<string, unknown>,
): void => {
  const payloaded = typeof payload === 'undefined' ? {} : payload;
  store.dispatch(method());
  const expectedActions = [
    {
      type,
      ...payloaded,
    },
  ];
  expect(store.getActions()).toEqual(expectedActions);
};

describe('Redux Store test', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('should call resetVersioning', () => {
    coreTest(() => resetVersioning(), constants.RESET_VERSIONING_VALUE);
  });
  it('should call setRequestedApiVersion', () => {
    coreTest(() => setRequestedApiVersion('v1'), constants.SET_REQUESTED_API_VERSION_VALUE, {
      version: 'v1',
    });
  });
  it('should call setVersioning', () => {
    coreTest(() => setVersioning('https://developer.va.gov/'), constants.SET_VERSIONING_VALUE, {
      defaultUrl: 'https://developer.va.gov/',
      version: '',
      versions: undefined,
    });
  });
  it('should call setApis', () => {
    coreTest(() => setApis({}), constants.SET_APIS_VALUE, { apis: {}, error: false, loaded: true });
  });
  it('should call SetGeneralStore', () => {
    coreTest(() => setGeneralStore(), constants.SET_GENERAL_STORE_VALUE);
  });
});
