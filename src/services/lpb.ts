import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LPB_BASE_URL, LPB_PROVIDERS_PATH, LPB_TEST_USER_ACCESS_PATH } from '../types/constants';
import { APICategories } from '../apiDefs/schema';
import { TestUserResponse, TestUserRequest } from '../utils/testUsersHelper';
import { isPrReviewBuild } from '../utils/prHelper';

export interface UseGetApisQuery {
  data: APICategories;
  error: boolean;
  isLoading: boolean;
}

interface TestUserRequestObject {
  body?: string;
  headers: { 'Content-Type': string };
  method: 'GET' | 'POST';
  url: string;
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
      query: body => {
        const requestObject: TestUserRequestObject = {
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          url: LPB_TEST_USER_ACCESS_PATH,
        };
        if (isPrReviewBuild()) {
          delete requestObject.body;
          requestObject.method = 'GET';
        }
        return requestObject;
      },
    }),
  }),
  reducerPath: 'lpb',
});

export const { useGetApisQuery, useGetTestUsersDataQuery } = lpbService;
