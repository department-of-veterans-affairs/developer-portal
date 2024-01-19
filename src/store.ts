import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import apisReducer from './features/apis/apisSlice';
import apiVersioningReducer from './features/apis/apiVersioningSlice';
import generalStoreReducer from './features/general/generalStoreSlice';
import scrollPositionReducer from './features/general/scrollPositionSlice';
import userReducer from './features/user/userSlice';
import { lpbService } from './services/lpb';

const persistConfig = {
  key: 'root',
  storage,
};
const persistedUserReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(lpbService.middleware),
  reducer: {
    apiList: apisReducer,
    apiVersioning: apiVersioningReducer,
    generalStore: generalStoreReducer,
    [lpbService.reducerPath]: lpbService.reducer,
    scrollPosition: scrollPositionReducer,
    userStore: persistedUserReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

export default store;
