import { createSelector } from 'reselect';
import { ISetInitialVersioning, ISetRequestedApiVersion } from '../actions';
import { IVersionInfo } from '../containers/documentation/SwaggerDocs';
import { IApiVersioning } from '../types';
import * as constants from '../types/constants';

const currentVersionStatus = 'Current Version';
const getRequestedApiVersion = (state: IApiVersioning) => state.requestedApiVersion;
const getMetadata = (state: IApiVersioning) => state.metadata;
const getInitialDocURL = (state: IApiVersioning) => state.docUrl;

const getVersionInfo = createSelector(
  getRequestedApiVersion, getMetadata,
  (requestedVersion: string, metadata: any) => {
    if (!metadata) {
      return null;
    }

    if (metadata && (!requestedVersion || requestedVersion === constants.CURRENT_VERSION_IDENTIFIER)) {
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
      return constants.CURRENT_VERSION_IDENTIFIER;
    }
    return versionInfo.status === currentVersionStatus ? constants.CURRENT_VERSION_IDENTIFIER : versionInfo.version;
  },
);

export const getVersionNumber = createSelector(
  getVersionInfo,
  (versionInfo: IVersionInfo) => {
    if (!versionInfo) {
      return '';
    }
    return versionInfo.version;
  },
);

export function apiVersioning(
  state = {
    docUrl: '',
    metadata: undefined,
    requestedApiVersion: constants.CURRENT_VERSION_IDENTIFIER,
  },
  action: ISetInitialVersioning | ISetRequestedApiVersion, 
): IApiVersioning {
    switch(action.type) {
      case constants.SET_REQUESTED_API_VERSION:
        return {...state, requestedApiVersion: action.version};
      case constants.SET_INITIAL_VERSIONING:
        return {...state, metadata: action.metadata, docUrl: action.docUrl};
      default:
        return state;
    }
  }