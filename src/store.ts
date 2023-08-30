import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import { apiVersioning } from './reducers/apiVersioning';
import { apiList } from './reducers/apiList';
import { generalStore } from './reducers/generalStore';
import { scrollPosition } from './reducers/scrollPosition';
import { RootState } from './types';

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers: typeof compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?? compose;

const store = createStore(
  combineReducers<RootState>({
    apiList,
    apiVersioning,
    generalStore,
    scrollPosition,
  }),
  composeEnhancers(applyMiddleware(thunk as ThunkMiddleware<RootState>)),
);

export default store;
