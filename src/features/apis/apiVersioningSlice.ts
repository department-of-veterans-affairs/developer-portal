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
    setVersioning: (state, action: PayloadAction<APIVersioning>) => {
      const { defaultUrl, requestedApiVersion, versions } = action.payload;
      state.defaultUrl = defaultUrl;
      state.requestedApiVersion = requestedApiVersion;
      state.versions = versions;
    },
  },
});

export const { setVersioning } = apiVersioningSlice.actions;
export default apiVersioningSlice.reducer;
