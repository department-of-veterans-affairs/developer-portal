/* eslint-disable no-console */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CURRENT_VERSION_IDENTIFIER } from '../../types/constants';
import { APIVersioning } from '../../types';

const initialState: APIVersioning = {
  defaultUrl: '',
  requestedApiVersion: CURRENT_VERSION_IDENTIFIER,
  versions: null,
};

const apiVersioningSlice = createSlice({
  initialState,
  name: 'apiVersioning',
  reducers: {
    setRequestedApiVersion: (state, action: PayloadAction<string | null>) => {
      console.log('setRequestedApiVersion', action.payload);
      state.requestedApiVersion = action.payload ?? '';
    },
    setVersioning: (state, action: PayloadAction<APIVersioning>) => {
      const { defaultUrl, requestedApiVersion, versions } = action.payload;
      state.defaultUrl = defaultUrl;
      state.requestedApiVersion = requestedApiVersion;
      state.versions = versions;
    },
  },
});

export const getDocURL = (state: APIVersioning): string => {
  console.log('state', state);
  return 'https://dev-api.va.gov/internal/docs/veteran-confirmation/v1/openapi.json';
};

export const getVersionNumber = (state: APIVersioning): string => {
  console.log('getVersionNumber', state);
  return state.requestedApiVersion;
};

export const { setRequestedApiVersion, setVersioning } = apiVersioningSlice.actions;
export default apiVersioningSlice.reducer;
