/* eslint-disable no-console */
import * as Sentry from '@sentry/browser';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import SwaggerUI from 'swagger-ui';
import { useAppDispatch, usePrevious } from '../../hooks';
import {
  resetVersioning,
  ResetVersioning,
  setRequestedApiVersion,
  SetRequestedAPIVersion,
} from '../../actions';
import { APIDocSource } from '../../apiDefs/schema';
import { getVersionNumber, setVersioning } from '../../features/apis/apiVersioningSlice';
import { getDocURL, getVersion } from '../../reducers/apiVersioning';
import { APIMetadata, APIVersioning, RootState, VersionMetadata } from '../../types';
import { CURRENT_VERSION_IDENTIFIER, OPEN_API_SPEC_HOST } from '../../types/constants';
import { SwaggerPlugins, System } from './swaggerPlugins';

import 'swagger-ui-themes/themes/3.x/theme-muted.css';
import VersionSelect from './swaggerPlugins/VersionSelect';

interface SwaggerDocsProps {
  apiName: string;
  docSource: APIDocSource;
}

const getVersionsFromMetadata = async (metadataUrl?: string): Promise<VersionMetadata[] | null> => {
  if (!metadataUrl) {
    return null;
  }
  try {
    const request = new Request(`${metadataUrl}`, { method: 'GET' });
    const response = await fetch(request);
    const metadata = await (response.json() as Promise<APIMetadata>);
    return metadata.meta.versions;
  } catch (error: unknown) {
    Sentry.captureException(error);
    return null;
  }
};

const getVersionFromParams = (searchQuery: string): string => {
  const params = new URLSearchParams(searchQuery || undefined);
  const versionQuery = params.get('version');
  return versionQuery ? versionQuery.toLowerCase() : CURRENT_VERSION_IDENTIFIER;
};

const handleVersionChange =
  (dispatch: React.Dispatch<SetRequestedAPIVersion>): ((requestedVersion: string) => void) =>
  (requestedVersion: string): void => {
    dispatch(setRequestedApiVersion(requestedVersion));
  };

const renderSwaggerUI = (
  defaultUrl: string,
  dispatch: React.Dispatch<SetRequestedAPIVersion>,
  versionNumber: string,
  versions: VersionMetadata[] | null,
): void => {
  const plugins = SwaggerPlugins(handleVersionChange(dispatch));
  const ui: System = SwaggerUI({
    defaultModelExpandDepth: 99,
    dom_id: '#swagger-ui',
    layout: 'ExtendedLayout',
    plugins: [plugins],
    url: defaultUrl,
  }) as System;
  ui.versionActions.setApiVersion(versionNumber);
  ui.versionActions.setVersionMetadata(versions);
};

const SwaggerDocs = (props: SwaggerDocsProps): JSX.Element => {
  const appDispatch = useAppDispatch();
  const dispatch: React.Dispatch<ResetVersioning | SetRequestedAPIVersion> = useDispatch();

  const defaultUrlSelector = (state: RootState): string => getDocURL(state.apiVersioning);
  const defaultUrl = useSelector(defaultUrlSelector);
  const location = useLocation();
  const navigate = useNavigate();
  const versionNumberSelector = (state: RootState): string => getVersionNumber(state.apiVersioning);
  const versionNumber = useSelector(versionNumberSelector);
  console.log('versionNumber', versionNumber);
  const versionsSelector = (state: RootState): VersionMetadata[] | null =>
    state.apiVersioning.versions;
  const versions = useSelector(versionsSelector);
  console.log('versions', versions);

  // Retrieve an initial version from the params so we can compare it under our effects down below
  const initializing = React.useRef(true);
  const versionSelector = (state: RootState): string => getVersion(state.apiVersioning);
  let version = useSelector(versionSelector);
  if (initializing.current) {
    initializing.current = false;
    // Use the version from the search param only if it's the first render
    version = getVersionFromParams(location.search);
  }

  /*
   * UPDATE DOCS WHEN API NAME CHANGES
   */
  const { apiName } = props;
  const { metadataUrl } = props.docSource;
  const prevApiName = usePrevious(apiName);

  const setMetadataAndDocUrl = React.useCallback(() => {
    console.log('run setMetadataAndDocUrl');
    const doSet = async (): Promise<void> => {
      const metadataVersions = await getVersionsFromMetadata(metadataUrl);
      console.log('metadataVersions', metadataVersions);
      const paramsVersion = getVersionFromParams(location.search);
      console.log('paramsVersion', paramsVersion);
      const docsUrl = metadataVersions?.find((search: VersionMetadata): boolean => {
        if (paramsVersion === search.version) {
          return true;
        } else if (
          paramsVersion === CURRENT_VERSION_IDENTIFIER &&
          search.status === 'Current Version'
        ) {
          return true;
        }
        return false;
      });
      if (docsUrl) {
        const payload: APIVersioning = {
          defaultUrl: `${OPEN_API_SPEC_HOST}${docsUrl.sf_path}`,
          requestedApiVersion: paramsVersion,
          versions: null,
        };
        appDispatch(setVersioning(payload));
      }
    };
    void doSet();
  }, [appDispatch, location.search, metadataUrl]);

  React.useEffect(() => {
    if (prevApiName !== apiName) {
      void setMetadataAndDocUrl();
    }
  }, [apiName, setMetadataAndDocUrl, prevApiName]);

  /**
   * CLEAR REDUX STATE ON UNMOUNT
   */
  React.useEffect(
    () => (): void => {
      dispatch(resetVersioning());
    },
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  /**
   * UPDATES URL WITH CORRECT VERSION PARAM
   */
  const prevVersion = usePrevious(version);

  React.useEffect(() => {
    const setSearchParam = (queryString: string, apiVersion: string): void => {
      const params = new URLSearchParams(queryString);
      if (params.get('version') !== apiVersion) {
        params.set('version', apiVersion);
        navigate(`${location.pathname}?${params.toString()}`);
      }
    };

    if (prevVersion !== version) {
      setSearchParam(location.search, version);
    }
  }, [location.pathname, location.search, navigate, prevVersion, version]);

  /**
   * TRIGGERS RENDER OF SWAGGER UI
   */
  React.useEffect(() => {
    if (document.getElementById('swagger-ui') && defaultUrl) {
      renderSwaggerUI(defaultUrl, dispatch, versionNumber, versions);
    }
  }, [defaultUrl, dispatch, versions, versionNumber]);

  /**
   * RENDER
   */
  const { apiIntro } = props.docSource;

  return (
    <React.Fragment>
      {apiIntro !== undefined && <ReactMarkdown>{apiIntro}</ReactMarkdown>}
      {versions && versions.length > 1 && (
        <VersionSelect
          dispatch={dispatch}
          version={version}
          versions={versions}
          handleVersionChange={handleVersionChange}
        />
      )}
      <div id="swagger-ui" />
    </React.Fragment>
  );
};

export { SwaggerDocs };
