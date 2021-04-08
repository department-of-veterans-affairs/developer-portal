import { createBrowserHistory, History } from 'history';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import { oAuthApiSelection } from './reducers/oAuthApiSelection';
import { apiVersioning } from './reducers/apiVersioning';
import { RootState } from './types';

export const history: History = createBrowserHistory({
  basename: process.env.PUBLIC_URL ?? '/',
});

const store = createStore(
  combineReducers<RootState>({
    apiVersioning,
    oAuthApiSelection,
  }),
  compose(applyMiddleware(thunk as ThunkMiddleware<RootState>)),
);

export default store;
