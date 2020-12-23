import { createBrowserHistory, History } from 'history';
import debounce from 'lodash.debounce';
import isEqual from 'lodash.isequal';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import { application, initialApplicationState } from './reducers';
import { apiSelection } from './reducers/apiSelection';
import { apiVersioning } from './reducers/apiVersioning';
import { DevApplication, RootState, SerializedState } from './types';

export const history: History = createBrowserHistory({
  basename: process.env.PUBLIC_URL ?? '/',
});

const loadApplicationState = (): { application: DevApplication } => {
  try {
    const serializedState = sessionStorage.getItem('state');
    if (serializedState == null) {
      return { application: initialApplicationState };
    } else {
      const state = JSON.parse(serializedState) as SerializedState;
      if (
        isEqual(Object.keys(state.application.inputs), Object.keys(initialApplicationState.inputs))
      ) {
        return { application: { ...state.application, sending: false } };
      } else {
        return { application: initialApplicationState };
      }
    }
  } catch (err: unknown) {
    return { application: initialApplicationState };
  }
};

const saveApplicationState = (state: RootState): void => {
  try {
    const stateToSerialize: SerializedState = {
      application: {
        inputs: state.application.inputs,
      },
    };
    const serializedState = JSON.stringify(stateToSerialize);
    sessionStorage.setItem('state', serializedState);
  } catch (err: unknown) {
    // swallow the error.
  }
};

const store = createStore(
  combineReducers<RootState>({
    apiSelection,
    apiVersioning,
    application,
  }),
  {
    application: loadApplicationState().application,
  },
  compose(applyMiddleware(thunk as ThunkMiddleware<RootState>)),
);

store.subscribe(
  debounce(() => {
    saveApplicationState(store.getState());
  }),
);

export default store;
