export const VersionSelector = {
  selectors: {
    apiMetadata: (state: any) => state.get('apiMetadata'),
    apiName: (state: any) => state.get('apiName'),
    apiVersion: (state: any) => state.get('apiVersion'),
  },
};
