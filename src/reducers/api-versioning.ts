import { createSelector } from 'reselect';
import { SetVersioning, SetRequestedAPIVersion } from '../actions';
import { APIVersioning, VersionMetadata } from '../types';
import * as constants from '../types/constants';

const currentVersionStatus = 'Current Version';
const getRequestedApiVersion = (state: APIVersioning) => state.requestedApiVersion;
const getAPIVersions = (state: APIVersioning) => state.versions;
const getInitialDocURL = (state: APIVersioning) => state.docUrl;

const getVersionInfo = createSelector(
  getRequestedApiVersion,
  getAPIVersions,
  (requestedVersion: string, versionMetadata: VersionMetadata[]) => {
    if (!versionMetadata) {
      return null;
    }

    if (
      versionMetadata &&
      (!requestedVersion || requestedVersion === constants.CURRENT_VERSION_IDENTIFIER)
    ) {
      const selectCurrentVersion = (versionInfo: VersionMetadata) =>
        versionInfo.status === currentVersionStatus;
      return versionMetadata.find(selectCurrentVersion);
    } else {
      const selectSpecificVersion = (versionInfo: VersionMetadata) =>
        versionInfo.version === requestedVersion;
      return versionMetadata.find(selectSpecificVersion);
    }
  },
);

export const getDocURL = createSelector(
  getVersionInfo,
  getInitialDocURL,
  (versionInfo: VersionMetadata, initialDocUrl: string) => {
    if (!versionInfo) {
      return initialDocUrl;
    }
    return `${constants.OPEN_API_SPEC_HOST}${versionInfo.path}`;
  },
);

export const getVersion = createSelector(
  getVersionInfo,
  (versionInfo: VersionMetadata) => {
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
  (versionInfo: VersionMetadata) => {
    if (!versionInfo) {
      return '';
    }
    return versionInfo.version;
  },
);

export const apiVersioning = (
  state = {
    docUrl: '',
    requestedApiVersion: constants.CURRENT_VERSION_IDENTIFIER,
    versions: null,
  },
  action: SetVersioning | SetRequestedAPIVersion,
): APIVersioning => {
  switch (action.type) {
    case constants.SET_REQUESTED_API_VERSION:
      return { ...state, requestedApiVersion: action.version };
    case constants.SET_VERSIONING:
      return { ...state, versions: action.versions, docUrl: action.docUrl };
    default:
      return state;
  }
};
