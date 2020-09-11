import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, History } from 'history';
import { debounce, isEqual } from 'lodash';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import { application, initialApplicationState } from './reducers';
import { apiVersioning } from './reducers/api-versioning';
import { IApplication, IRootState } from './types';

export const history: History = createBrowserHistory({
  basename: process.env.PUBLIC_URL || '/',
});

function loadApplicationState(): { application: IApplication } {
  try {
    const serializedState = sessionStorage.getItem('state');
    if (serializedState == null) {
      return { application: initialApplicationState };
    } else {
      const state = JSON.parse(serializedState);
      if (
        isEqual(Object.keys(state.application.inputs), Object.keys(initialApplicationState.inputs))
      ) {
        return { application: state.application };
      } else {
        return { application: initialApplicationState };
      }
    }
  } catch (err) {
    return { application: initialApplicationState };
  }
}

function saveApplicationState(state: IRootState) {
  try {
    const stateToSerialize = {
      application: {
        inputs: state.application.inputs,
      },
    };
    const serializedState = JSON.stringify(stateToSerialize);
    sessionStorage.setItem('state', serializedState);
  } catch (err) {
    // swallow the error.
  }
}

const store = createStore(
  combineReducers<IRootState>({
    apiVersioning,
    application,
    router: connectRouter(history),
  }),
  {
    application: loadApplicationState().application,
  },
  compose(applyMiddleware(routerMiddleware(history), thunk as ThunkMiddleware<IRootState>)),
);

store.subscribe(
  debounce(() => {
    saveApplicationState(store.getState());
  }),
);

export default store;
