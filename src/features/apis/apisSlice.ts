import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { APICategories, APICategory, APIDescription } from '../../apiDefs/schema';
import { RootState } from '../../store';
import { listApi } from '../../services/api';

const initialState = {
  apis: {},
  error: false,
  loaded: false,
};

const apisSlice = createSlice({
  extraReducers: builder => {
    builder.addMatcher(
      listApi.endpoints.getApis.matchFulfilled,
      (state, action: PayloadAction<APICategories>) => {
        const apis: APICategories = action.payload;
        // This is necessary because the typing doesn't allow for conditions to check
        // if apis.appeals.apis doesn't exist. Without this, unit tests that use
        // fakeCategories fail because appeals.apis doesn't exist.
        // This can be removed after a migration post IA launch merges the categories
        // within LPB itself.
        try {
          const vaBenefitsCategory: APICategory = {
            ...apis.benefits,
            apis: apis.appeals.apis.concat(apis.benefits.apis),
            name: 'VA Benefits',
            properName: 'VA Benefits',
            urlSlug: 'va-benefits',
          };
          delete apis.appeals;
          delete apis.benefits;
          apis['va-benefits'] = vaBenefitsCategory;
        } catch (e: unknown) {}
        const keys = Object.keys(apis);
        keys.forEach((category: string) => {
          apis[category].apis = apis[category].apis.map((item: APIDescription) => ({
            ...item,
            categoryUrlFragment: category,
            categoryUrlSlug: apis[category].urlSlug,
          }));
        });

        state.apis = apis;
        state.error = false;
        state.loaded = true;
      },
    );
  },
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
      state.loaded = true;
      state.error = false;
      state.apis = action.payload;
    },
  },
});

export const { setApiLoading, setApiLoadingError, setApis } = apisSlice.actions;

export const getApis = (state: RootState): APICategories => state.apiList.apis;

export default apisSlice.reducer;
