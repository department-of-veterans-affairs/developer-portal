import { createSelector } from 'reselect';
import { ResetVersioning, SetVersioning, SetRequestedAPIVersion } from '../actions';
import { APIVersioning, VersionMetadata } from '../types';
import {
  CURRENT_VERSION_DISPLAY_NAME,
  CURRENT_VERSION_IDENTIFIER,
  OPEN_API_SPEC_HOST,
  RESET_VERSIONING_VALUE,
  SET_REQUESTED_API_VERSION_VALUE,
  SET_VERSIONING_VALUE,
} from '../types/constants';

const getRequestedApiVersion = (state: APIVersioning): string => state.requestedApiVersion;
const getAPIVersions = (state: APIVersioning): VersionMetadata[] | null => state.versions;
const getInitialDocURL = (state: APIVersioning): string => state.defaultUrl;

const getVersionInfo = createSelector(
  getRequestedApiVersion,
  getAPIVersions,
  (requestedVersion: string, versionMetadata: VersionMetadata[] | null) => {
    if (!versionMetadata) {
      return null;
    }

    if (!requestedVersion || requestedVersion === CURRENT_VERSION_IDENTIFIER) {
      const selectCurrentVersion = (versionInfo: VersionMetadata): boolean =>
        versionInfo.status === CURRENT_VERSION_DISPLAY_NAME;
      return versionMetadata.find(selectCurrentVersion);
    } else {
      const selectSpecificVersion = (versionInfo: VersionMetadata): boolean =>
        versionInfo.version === requestedVersion;
      return versionMetadata.find(selectSpecificVersion);
    }
  },
);

export const getDocURL = createSelector(
  getVersionInfo,
  getInitialDocURL,
  (versionInfo: VersionMetadata | null, initialDocUrl: string) => {
    if (!versionInfo) {
      return initialDocUrl;
    }
    return `${OPEN_API_SPEC_HOST}${versionInfo.sf_path}`;
  },
);

export const getVersion = createSelector(getVersionInfo, (versionInfo: VersionMetadata | null) => {
  if (!versionInfo) {
    return CURRENT_VERSION_IDENTIFIER;
  }
  return versionInfo.status === CURRENT_VERSION_DISPLAY_NAME
    ? CURRENT_VERSION_IDENTIFIER
    : versionInfo.version;
});

export const getVersionNumber = createSelector(
  getVersionInfo,
  (versionInfo: VersionMetadata | null) => {
    if (!versionInfo) {
      return '';
    }
    return versionInfo.version;
  },
);

const defaultApiVersioningState = {
  defaultUrl: '',
  requestedApiVersion: CURRENT_VERSION_IDENTIFIER,
  versions: null,
};

export const apiVersioning = (
  state = defaultApiVersioningState,
  action: ResetVersioning | SetVersioning | SetRequestedAPIVersion,
): APIVersioning => {
  switch (action.type) {
    case RESET_VERSIONING_VALUE:
      return defaultApiVersioningState;
    case SET_REQUESTED_API_VERSION_VALUE:
      return { ...state, requestedApiVersion: action.version };
    case SET_VERSIONING_VALUE:
      const requestedApiVersion = action.version || state.requestedApiVersion;
      const { defaultUrl, versions } = action;
      return { ...state, defaultUrl, requestedApiVersion, versions };
    default:
      return state;
  }
};
