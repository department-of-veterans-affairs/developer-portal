import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { APICategories } from '../../apiDefs/schema';
import { RootState } from '../../store';

const initialState = {
  apis: {},
  error: false,
  loaded: false,
};

const apisSlice = createSlice({
  initialState,
  name: 'apis',
  reducers: {
    setApiLoading: state => {
      state.apis = {};
      state.error = false;
      state.loaded = true;
    },
    setApiLoadingError: state => {
      state.apis = {};
      state.error = true;
      state.loaded = false;
    },
    setApis: (state, action: PayloadAction<APICategories>) => {
      state.apis = action.payload.apis;
      state.error = false;
      state.loaded = true;
    },
  },
  selectors: {
    selectApis: state => state,
  },
});

export const { setApiLoading, setApiLoadingError, setApis } = apisSlice.actions;
export const { selectApis } = apisSlice.selectors;

export const getApis = (state: RootState): APICategories => state.apiList.apis;

export default apisSlice.reducer;
