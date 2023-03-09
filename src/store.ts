import { createBrowserHistory, History } from 'history';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import { oAuthApiSelection } from './reducers/oAuthApiSelection';
import { apiVersioning } from './reducers/apiVersioning';
import { apiList } from './reducers/apiList';
import { generalStore } from './reducers/generalStore';
import { RootState } from './types';

export const history: History = createBrowserHistory({
  basename: process.env.PUBLIC_URL ?? '/',
});

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers: typeof compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? compose;

const store = createStore(
  combineReducers<RootState>({
    apiList,
    apiVersioning,
    generalStore,
    oAuthApiSelection,
  }),
  composeEnhancers(applyMiddleware(thunk as ThunkMiddleware<RootState>)),
);

export default store;
