import * as Sentry from '@sentry/browser';
import { History } from 'history';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import SwaggerUI from 'swagger-ui';
import { usePrevious } from '../../hooks';
import {
  resetVersioning,
  ResetVersioning,
  setVersioning,
  SetVersioning,
  setRequestedApiVersion,
  SetRequestedAPIVersion,
} from '../../actions';
import { APIDocSource } from '../../apiDefs/schema';
import { getDocURL, getVersion, getVersionNumber } from '../../reducers/api-versioning';
import { APIMetadata, RootState, VersionMetadata } from '../../types';
import { CURRENT_VERSION_IDENTIFIER } from '../../types/constants';
import { SwaggerPlugins, System } from './swaggerPlugins';

import 'swagger-ui-themes/themes/3.x/theme-muted.css';

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
  } catch (error) {
    Sentry.captureException(error);
    return null;
  }
};

const getInitialVersion = (searchQuery: string): string => {
  const params = new URLSearchParams(searchQuery ?? undefined);
  const versionQuery = params.get('version');
  return versionQuery ? versionQuery.toLowerCase() : CURRENT_VERSION_IDENTIFIER;
};

const handleVersionChange =
  (dispatch: React.Dispatch<SetRequestedAPIVersion>): (requestedVersion: string) => void => (
    (requestedVersion: string) => {
      dispatch(setRequestedApiVersion(requestedVersion));
    }
  );

const setSearchParam = (history: History, queryString: string, version: string): void => {
  const params = new URLSearchParams(queryString);
  if (params.get('version') !== version) {
    params.set('version', version);
    history.push(`${history.location.pathname}?${params.toString()}`);
  }
};

const renderSwaggerUI = (
  defaultUrl: string,
  dispatch: React.Dispatch<SetRequestedAPIVersion>,
  versionNumber: string,
  versions: VersionMetadata[] | null,
): void => {
  const plugins = SwaggerPlugins(handleVersionChange(dispatch));
  const ui: System = SwaggerUI({
    dom_id: '#swagger-ui',
    layout: 'ExtendedLayout',
    plugins: [plugins],
    url: defaultUrl,
  }) as System;
  ui.versionActions.setApiVersion(versionNumber);
  ui.versionActions.setVersionMetadata(versions);
};

const SwaggerDocs = (props: SwaggerDocsProps): JSX.Element => {
  const dispatch: React.Dispatch<ResetVersioning | SetRequestedAPIVersion | SetVersioning> =
    useDispatch();

  const defaultUrl = useSelector((state: RootState) => getDocURL(state.apiVersioning));
  const history = useHistory();
  const location = useLocation();
  const versionNumber = useSelector((state: RootState) => getVersionNumber(state.apiVersioning));
  const versions = useSelector((state: RootState) => state.apiVersioning.versions);

  const initializing = React.useRef(true);

  let version = useSelector((state: RootState) => getVersion(state.apiVersioning));

  if (initializing.current) {
    initializing.current = false;
    // Use the version from the search param only if it's the first render
    version = getInitialVersion(location.search);
  }

  /**
   * RETRIEVE API INFORMATION
   */
  const { apiName } = props;
  const { openApiUrl, metadataUrl } = props.docSource;

  const prevApiName = usePrevious(apiName);
  const prevVersion = usePrevious(version);

  const setMetadataAndDocUrl = async () => {
    const metadataVersions = await getVersionsFromMetadata(metadataUrl);
    const initialVersion = getInitialVersion(location.search);

    dispatch(setVersioning(openApiUrl, metadataVersions, initialVersion));
  };

  if (prevApiName !== apiName) {
    void setMetadataAndDocUrl();
  }

  /**
   * CLEAR REDUX STATE ON UNMOUNT
   */
  React.useEffect(
    () => () => {
      dispatch(resetVersioning());
    },
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  /**
   * UPDATES URL WITH CORRECT VERSION PARAM
   */
  React.useEffect(() => {
    if (prevVersion !== version) {
      setSearchParam(history, location.search, version);
    }
  }, [history, location.search, prevVersion, version]);

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
      {apiIntro && apiIntro({})}
      <div id="swagger-ui" />
    </React.Fragment>
  );
};

export { SwaggerDocs };
