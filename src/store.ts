import { routerMiddleware, routerReducer as routing } from 'react-router-redux'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk, { ThunkMiddleware } from 'redux-thunk';

import { IApplication, IRootState } from './types';

import createBrowserHistory from 'history/createBrowserHistory'

import { application, initialApplicationState } from './reducers';

export const history = createBrowserHistory({
  basename: process.env.REACT_APP_URL_BASENAME || '/',
});
const middleware = routerMiddleware(history);

function loadApplicationState(): { application: IApplication } {
  try {
    const serializedState = sessionStorage.getItem('state');
    if (serializedState == null) {
      return { application: initialApplicationState }
    } else {
      const state = JSON.parse(serializedState);
      return { application: state.application }
    }
  } catch (err) {
    return { application: initialApplicationState }
  }
}

function saveApplicationState(state: IRootState) {
  try {
    const serializedState = JSON.stringify({application: state.application})
    sessionStorage.setItem('state', serializedState);
  } catch (err) {
    // swallow the error.
  }
}

const store = createStore(
    combineReducers<IRootState>({
        application,
        routing,
    }),
    {
      application: loadApplicationState().application,
      routing: undefined,
    },
    compose(
        applyMiddleware(middleware),
        applyMiddleware(thunk as ThunkMiddleware<IRootState>),
    ),
)

store.subscribe(() => {
  saveApplicationState(store.getState());
});

export default store;

