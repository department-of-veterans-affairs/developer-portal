import { createSelector } from 'reselect';

export const VersionSelector = {
  selectors: {
    apiMetadata: (state: any) => state.get('apiMetadata'),
    apiName: (state: any) => state.get('apiName'),
    apiVersion: (state: any) => state.get('apiVersion'),
    majorVersion: createSelector((state: any) => state.get('apiVersion'), (apiVersion: string) => {
      return apiVersion ? apiVersion.substring(0, 1) : '0';
    }),
  },
};
