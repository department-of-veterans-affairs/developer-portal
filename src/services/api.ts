import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LPB_BASE_URL, LPB_PROVIDERS_PATH } from '../types/constants';
import { APICategories } from '../apiDefs/schema';

export interface UseGetApisQuery {
  data: APICategories;
  error: boolean;
  isLoading: boolean;
}

export const listApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: LPB_BASE_URL }),
  endpoints: builder => ({
    getApis: builder.query({
      query: () => ({
        url: LPB_PROVIDERS_PATH,
        validateStatus: (response): boolean => response.status === 200,
      }),
    }),
  }),
  reducerPath: 'apis',
});

export const { useGetApisQuery } = listApi;
