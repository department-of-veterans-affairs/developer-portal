import { configureStore } from '@reduxjs/toolkit';
import apisReducer from './features/apis/apisSlice';
import apiVersioningReducer from './features/apis/apiVersioningSlice';
import generalStoreReducer from './features/general/generalStoreSlice';
import scrollPositionReducer from './features/general/scrollPositionSlice';
import { listApi } from './services/api';

const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(listApi.middleware),
  reducer: {
    apiList: apisReducer,
    apiVersioning: apiVersioningReducer,
    generalStore: generalStoreReducer,
    [listApi.reducerPath]: listApi.reducer,
    scrollPosition: scrollPositionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
