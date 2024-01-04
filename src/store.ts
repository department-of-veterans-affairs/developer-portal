import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import apisReducer from './features/apis/apisSlice';
import apiVersioningReducer from './features/apis/apiVersioningSlice';
import generalStoreReducer from './features/general/generalStoreSlice';
import scrollPositionReducer from './features/general/scrollPositionSlice';
import userReducer from './features/user/userSlice';
import { listApi } from './services/api';

const persistConfig = {
  key: 'root',
  storage,
};
const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat([thunk, listApi.middleware]),
  reducer: {
    apiList: apisReducer,
    apiVersioning: apiVersioningReducer,
    generalStore: generalStoreReducer,
    [listApi.reducerPath]: listApi.reducer,
    scrollPosition: scrollPositionReducer,
    userStore: persistedUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
