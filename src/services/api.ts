import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LPB_BASE_URL, LPB_PROVIDERS_PATH } from '../types/constants';

export const listApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: LPB_BASE_URL }),
  endpoints: builder => ({
    getApis: builder.query({
      query: () => LPB_PROVIDERS_PATH,
    }),
  }),
  reducerPath: 'apis',
});

export const { useGetApisQuery } = listApi;
