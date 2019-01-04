import { routerMiddleware, routerReducer as routing } from 'react-router-redux'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk, { ThunkMiddleware } from 'redux-thunk';

import { IRootState } from './types';

import createBrowserHistory from 'history/createBrowserHistory'

import { application } from './reducers';

export const history = createBrowserHistory();
const middleware = routerMiddleware(history);

const store = createStore(
    combineReducers<IRootState>({
        application,
        routing,
    }),
    compose(
        applyMiddleware(middleware),
        applyMiddleware(thunk as ThunkMiddleware<IRootState>),
    ),
)

export default store;

