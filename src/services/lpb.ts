import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LPB_BASE_URL, LPB_PROVIDERS_PATH, LPB_TEST_USER_ACCESS_PATH } from '../types/constants';
import { APICategories } from '../apiDefs/schema';
import { TestUserResponse, TestUserRequest } from '../utils/testUsersHelper';

export interface UseGetApisQuery {
  data: APICategories;
  error: boolean;
  isLoading: boolean;
}

export const lpbService = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: LPB_BASE_URL }),
  endpoints: builder => ({
    getApis: builder.query({
      query: () => ({
        url: LPB_PROVIDERS_PATH,
        validateStatus: (response): boolean => response.status === 200,
      }),
    }),
    getTestUsersData: builder.query<
      unknown,
      Partial<TestUserRequest | TestUserResponse> & Pick<TestUserRequest | TestUserResponse, 'ok'>
    >({
      query: body => ({
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        url: LPB_TEST_USER_ACCESS_PATH,
      }),
    }),
  }),
  reducerPath: 'lpb',
});

export const { useGetApisQuery, useGetTestUsersDataQuery } = lpbService;
