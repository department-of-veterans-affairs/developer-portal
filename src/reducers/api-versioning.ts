import { createSelector } from 'reselect';
import { ResetVersioning, SetVersioning, SetRequestedAPIVersion } from '../actions';
import { APIVersioning, VersionMetadata } from '../types';
import * as constants from '../types/constants';

const currentVersionStatus = 'Current Version';
const getRequestedApiVersion = (state: APIVersioning) => state.requestedApiVersion;
const getAPIVersions = (state: APIVersioning) => state.versions;
const getInitialDocURL = (state: APIVersioning) => state.defaultUrl;

const getVersionInfo = createSelector(
  getRequestedApiVersion,
  getAPIVersions,
  (requestedVersion: string, versionMetadata: VersionMetadata[] | null) => {
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

const defaultApiVersioningState = {
  defaultUrl: '',
  requestedApiVersion: constants.CURRENT_VERSION_IDENTIFIER,
  versions: null,
};

export const apiVersioning = (
  state = defaultApiVersioningState,
  action: ResetVersioning | SetVersioning | SetRequestedAPIVersion,
): APIVersioning => {
  switch (action.type) {
    case constants.RESET_VERSIONING:
      return defaultApiVersioningState;
    case constants.SET_REQUESTED_API_VERSION:
      return { ...state, requestedApiVersion: action.version };
    case constants.SET_VERSIONING:
      const requestedApiVersion = action.version || state.requestedApiVersion;
      const { defaultUrl, versions } = action;
      return { ...state, defaultUrl, requestedApiVersion, versions };
    default:
      return state;
  }
};
