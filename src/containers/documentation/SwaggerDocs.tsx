import * as Sentry from '@sentry/browser';
import { History } from 'history';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import SwaggerUI from 'swagger-ui';
import { usePrevious } from '../../hooks';
import {
  setInitialVersioning,
  SetInitialVersioning,
  setRequstedApiVersion,
  SetRequestedAPIVersion,
} from '../../actions';
import { APIDocSource } from '../../apiDefs/schema';
import { getDocURL, getVersion, getVersionNumber } from '../../reducers/api-versioning';
import { RootState, APIMetadata } from '../../types';
import { CURRENT_VERSION_IDENTIFIER } from '../../types/constants';
import { SwaggerPlugins, System } from './swaggerPlugins';

import 'swagger-ui-themes/themes/3.x/theme-muted.css';

export interface SwaggerDocsProps {
  apiName: string;
  docSource: APIDocSource;
}

export interface VersionInfo {
  version: string;
  status: string;
  path: string;
  healthcheck: string;
  internal_only: boolean;
}

const getMetadata = async (metadataUrl?: string): Promise<APIMetadata | null> => {
  if (!metadataUrl) {
    return null;
  }
  try {
    const request = new Request(`${metadataUrl}`, {
      method: 'GET',
    });
    const response = await fetch(request);
    return response.json() as Promise<APIMetadata>;
  } catch (error) {
    Sentry.captureException(error);
    return null;
  }
};

const getInitialVersion = (searchQuery: string) => {
  const params = new URLSearchParams(searchQuery ?? undefined);
  const versionQuery = params.get('version');
  const version = versionQuery ? versionQuery.toLowerCase() : CURRENT_VERSION_IDENTIFIER;

  return version;
};

const handleVersionChange = (dispatch: React.Dispatch<SetRequestedAPIVersion>) => (
  (requestedVersion: string) => {
    dispatch(setRequstedApiVersion(requestedVersion));
  }
);

const setSearchParam = (history: History, queryString: string, version: string) => {
  const params = new URLSearchParams(queryString);
  if (params.get('version') !== version) {
    params.set('version', version);
    history.push(`${history.location.pathname}?${params.toString()}`);
  }
};

const renderSwaggerUI = (
  dispatch: React.Dispatch<SetRequestedAPIVersion>,
  docUrl: string,
  versionNumber: string,
  metadata: APIMetadata | null,
) => {
  if (document.getElementById('swagger-ui') && docUrl.length !== 0) {
    const plugins = SwaggerPlugins(handleVersionChange(dispatch));
    const ui: System = SwaggerUI({
      dom_id: '#swagger-ui',
      layout: 'ExtendedLayout',
      plugins: [plugins],
      url: docUrl,
    }) as System;
    ui.versionActions.setApiVersion(versionNumber);
    ui.versionActions.setApiMetadata(metadata as APIMetadata);
  }
};

const SwaggerDocs = (props: SwaggerDocsProps): JSX.Element => {
  const dispatch: React.Dispatch<SetRequestedAPIVersion | SetInitialVersioning> = useDispatch();

  const docUrl = useSelector((state: RootState) => getDocURL(state.apiVersioning));
  const history = useHistory();
  const location = useLocation();
  const metadata = useSelector((state: RootState) => state.apiVersioning.metadata);
  const versionNumber = useSelector((state: RootState) => getVersionNumber(state.apiVersioning));  
  
  const initializing = React.useRef(true);
  
  let version = useSelector((state: RootState) => getVersion(state.apiVersioning));
  
  if (initializing.current) {
    initializing.current = false;
    // Use the version from the search param only if it's the first render
    version = getInitialVersion(location.search) ;
  }

  /**
   * RETRIEVE API INFORMATION
   */
  const { apiName } = props;
  const { openApiUrl, metadataUrl } = props.docSource;

  const prevApiName = usePrevious(apiName);
  const prevVersion = usePrevious(version);

  const setMetadataAndDocUrl = async () => {
    const currentMetadata = await getMetadata(metadataUrl);
    const initialVersion = getInitialVersion(location.search);

    dispatch(setInitialVersioning(openApiUrl, currentMetadata, initialVersion));
  };

  if (prevApiName !== apiName) {
    void setMetadataAndDocUrl();
  }

  /**
   * CLEAR REDUX STATE ON UNMOUNT
   */
  React.useEffect(
    () => () => {
      dispatch(setInitialVersioning('', null));
    },
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  React.useEffect(() => {
    if (prevVersion !== version) {
      setSearchParam(history, location.search, version);
    }
  }, [history, location.search, prevVersion, version]);

  /**
   * TRIGGERS RENDER OF SWAGGER UI
   */
  React.useEffect(() => {
    if (docUrl) {
      renderSwaggerUI(dispatch, docUrl, versionNumber, metadata);
    }
  }, [dispatch, docUrl, metadata, versionNumber]);

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
