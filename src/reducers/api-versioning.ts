import { createSelector } from 'reselect';
import { SetInitialVersioning, SetRequestedAPIVersion } from '../actions';
import { IVersionInfo } from '../containers/documentation/SwaggerDocs';
import { APIMetadata, APIVersioning } from '../types';
import * as constants from '../types/constants';

const currentVersionStatus = 'Current Version';
const getRequestedApiVersion = (state: APIVersioning) => state.requestedApiVersion;
const getMetadata = (state: APIVersioning) => state.metadata;
const getInitialDocURL = (state: APIVersioning) => state.docUrl;

const getVersionInfo = createSelector(
  getRequestedApiVersion,
  getMetadata,
  (requestedVersion: string, metadata: APIMetadata) => {
    if (!metadata) {
      return null;
    }

    if (
      metadata &&
      (!requestedVersion || requestedVersion === constants.CURRENT_VERSION_IDENTIFIER)
    ) {
      const selectCurrentVersion = (versionInfo: IVersionInfo) =>
        versionInfo.status === currentVersionStatus;
      return metadata.meta.versions.find(selectCurrentVersion);
    } else {
      const selectSpecificVersion = (versionInfo: IVersionInfo) =>
        versionInfo.version === requestedVersion;
      return metadata.meta.versions.find(selectSpecificVersion);
    }
  },
);

export const getDocURL = createSelector(
  getVersionInfo,
  getInitialDocURL,
  (versionInfo: IVersionInfo, initialDocUrl: string) => {
    if (!versionInfo) {
      return initialDocUrl;
    }
    return `${process.env.REACT_APP_VETSGOV_SWAGGER_API || ''}${versionInfo.path}`;
  },
);

export const getVersion = createSelector(
  getVersionInfo,
  (versionInfo: IVersionInfo) => {
    if (!versionInfo) {
      return constants.CURRENT_VERSION_IDENTIFIER;
    }
    return versionInfo.status === currentVersionStatus
      ? constants.CURRENT_VERSION_IDENTIFIER
      : versionInfo.version;
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

export const apiVersioning = (
  state = {
    docUrl: '',
    metadata: null,
    requestedApiVersion: constants.CURRENT_VERSION_IDENTIFIER,
  },
  action: SetInitialVersioning | SetRequestedAPIVersion,
): APIVersioning => {
  switch (action.type) {
    case constants.SET_REQUESTED_API_VERSION:
      return { ...state, requestedApiVersion: action.version };
    case constants.SET_INITIAL_VERSIONING:
      return { ...state, metadata: action.metadata, docUrl: action.docUrl };
    default:
      return state;
  }
};
