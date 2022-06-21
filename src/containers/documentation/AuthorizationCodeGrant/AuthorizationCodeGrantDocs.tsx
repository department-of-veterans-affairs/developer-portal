import { History } from 'history';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import {
  resetOAuthApiSelection,
  ResetOAuthAPISelection,
  setOAuthApiSelection,
  SetOAuthAPISelection,
} from '../../../actions';
import { getActiveAuthCodeApis, getActiveOauthApis } from '../../../apiDefs/query';
import { APIDescription } from '../../../apiDefs/schema';
import { PageHeader } from '../../../components';
import { Https } from '../../../components/oauthDocs/acg/Https';
import { TestUsers } from '../../../components/oauthDocs/acg/TestUsers';
import { IdToken } from '../../../components/oauthDocs/acg/IdToken';
import { PageLinks } from '../../../components/oauthDocs/acg/PageLinks';
import { ScopesContent } from '../../../components/oauthDocs/acg/ScopesContent';
import { BuildingOIDCContent } from '../../../components/oauthDocs/acg/BuildingOIDCContent';
import { GettingStarted } from '../../../components/oauthDocs/acg/GettingStarted';
import { usePrevious } from '../../../hooks';
import { RootState } from '../../../types';
import { DEFAULT_OAUTH_API_SELECTION } from '../../../types/constants';

import './AuthorizationCodeGrantDocs.scss';

interface AuthCodeFlowContentProps {
  options: APIDescription[];
  selectedOption: string;
  apiDef?: APIDescription | null;
}

const setSearchParam = (
  history: History,
  queryString: string,
  api: string,
  initialLoad: boolean,
): void => {
  const params = new URLSearchParams(queryString);
  if (params.get('api') !== api) {
    params.set('api', api);
    if (initialLoad) {
      history.replace(`${history.location.pathname}?${params.toString()}${history.location.hash}`);
    } else {
      history.push(`${history.location.pathname}?${params.toString()}`);
    }
  }
};

const setInitialApi = (
  history: History,
  searchQuery: string,
  dispatch: React.Dispatch<ResetOAuthAPISelection | SetOAuthAPISelection>,
): void => {
  const params = new URLSearchParams(searchQuery || undefined);
  const apiQuery = params.get('api');
  const availableApis = getActiveOauthApis();
  const isAnApi = availableApis.some((item: APIDescription) => item.urlFragment === apiQuery);
  const api = apiQuery && isAnApi ? apiQuery.toLowerCase() : DEFAULT_OAUTH_API_SELECTION;
  dispatch(setOAuthApiSelection(api));
  setSearchParam(history, searchQuery, api, true);
};

const AuthorizationCodeGrantDocs = (): JSX.Element => {
  const history = useHistory();
  const location = useLocation();
  const dispatch: React.Dispatch<ResetOAuthAPISelection | SetOAuthAPISelection> = useDispatch();
  const initializing = React.useRef(true);
  const selector = (state: RootState): string => state.oAuthApiSelection.selectedOAuthApi;
  const api = useSelector(selector);
  const prevApi = usePrevious(api);
  const selectedOAuthApi = useSelector(selector);

  const options = getActiveAuthCodeApis();

  React.useEffect(() => {
    if (initializing.current) {
      // Do this on first load
      initializing.current = false;
      setInitialApi(history, location.search, dispatch);
    } else {
      // Do this on all subsequent re-renders
      setSearchParam(history, location.search, api, false);
    }
  }, [dispatch, location, history, prevApi, api]);

  /**
   * CLEAR REDUX STATE ON UNMOUNT
   */
  React.useEffect(
    () => (): void => {
      dispatch(resetOAuthApiSelection());
    },
    [], // eslint-disable-line react-hooks/exhaustive-deps
  );

  return (
    <div className="va-api-authorization-docs">
      <Helmet>
        <title>Authorization Code Flow</title>
      </Helmet>
      <PageHeader halo="Authorization" header="Authorization Code Flow" />
      <PageLinks options={options} selectedOption={selectedOAuthApi} />
      <GettingStarted />
      <BuildingOIDCContent />
      <ScopesContent />
      <IdToken />
      <TestUsers />
      <Https />
    </div>
  );
};

export { AuthorizationCodeGrantDocs, AuthCodeFlowContentProps };
