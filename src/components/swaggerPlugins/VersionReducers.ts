export const VersionReducers = {
  reducers: {
    API_METADATA_SET: (state: any, action: any) => {
      return state.set('apiMetadata', action.payload);
    },
    API_VERSION_SET: (state: any, action: any) => {
      return state.set('apiVersion', action.payload);
    },
    API_VERSION_UPDATED: (state: any, action: any) => {
      return state.set('apiVersion', action.payload);
    },
  },
};
