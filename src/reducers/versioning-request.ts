import { createSelector } from 'reselect';
import { ISetInitialVersioning, ISetRequestedApiVersion } from '../actions';
import { IVersionInfo } from '../containers/documentation/SwaggerDocs';
import { IApiVersioningRequest } from '../types';
import * as constants from '../types/constants';

export const currentVersion = 'current';

const currentVersionStatus = 'Current Version';
const getRequestedApiVersion = (state: IApiVersioningRequest) => state.requestedApiVersion;
const getMetadata = (state: IApiVersioningRequest) => state.metadata;
const getInitialDocURL = (state: IApiVersioningRequest) => state.docUrl;

const getVersionInfo = createSelector(
  getRequestedApiVersion, getMetadata,
  (requestedVersion: string, metadata: any) => {
    if (!metadata) {
      return null;
    }

    if (metadata && (!requestedVersion || requestedVersion === currentVersion)) {
      const selectCurrentVersion = (versionInfo: IVersionInfo) => versionInfo.status === currentVersionStatus;
      return metadata.meta.versions.find(selectCurrentVersion);
    } else {
      const selectSpecificVersion = (versionInfo: IVersionInfo) => versionInfo.version === requestedVersion;
      return metadata.meta.versions.find(selectSpecificVersion);
    }
  },
);

export const getDocURL = createSelector(
  getVersionInfo, getInitialDocURL,
  (versionInfo: IVersionInfo, initialDocUrl: string) => {
    if (!versionInfo) {
      return initialDocUrl;
    }
    return `${process.env.REACT_APP_VETSGOV_SWAGGER_API}${versionInfo.path}`;
  },
);

export const getVersion = createSelector(
  getVersionInfo,
  (versionInfo: IVersionInfo) => {
    if (!versionInfo) {
      return currentVersion;
    }
    return versionInfo.status === currentVersionStatus ? currentVersion : versionInfo.version;
  },
);

export function versioningRequest(
  state = {
    docUrl: '',
    metadata: undefined,
    requestedApiVersion: currentVersion,
  },
  action: ISetInitialVersioning | ISetRequestedApiVersion, 
): IApiVersioningRequest {
    switch(action.type) {
      case constants.SET_REQUESTED_API_VERSION:
        return {...state, requestedApiVersion: action.version};
      case constants.SET_INITIAL_VERSIONING:
        return {...state, metadata: action.metadata, docUrl: action.docUrl};
      default:
        return state;
    }
  }