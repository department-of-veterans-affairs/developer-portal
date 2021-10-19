import { History } from 'history';
import * as React from 'react';
import Helmet from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import {
  PageHeader,
  APISelector,
} from '../../../components';
import {
  resetOAuthApiSelection,
  ResetOAuthAPISelection,
  setOAuthApiSelection,
  SetOAuthAPISelection,
} from '../../../actions';
import { GettingStarted } from '../../../components/oauthDocs/ccg/GettingStarted';
import { AuthCodeFlowContent } from '../../../components/oauthDocs/ccg/AuthCodeFlowContent';
import { TestUsers } from '../../../components/oauthDocs/ccg/TestUsers';
import { getAllOauthApis } from '../../../apiDefs/query';
import { isApiDeactivated } from '../../../apiDefs/deprecated';
import { APIDescription } from '../../../apiDefs/schema';
import { RootState } from '../../../types';
import { usePrevious } from '../../../hooks';
import { DEFAULT_OAUTH_CCG_API_SELECTION } from '../../../types/constants';

interface ClientCredentialsFlowContentProps {
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
  const availableApis = getAllOauthApis().filter((item: APIDescription) => !isApiDeactivated(item));
  const isAnApi = availableApis.some((item: APIDescription) => item.urlFragment === apiQuery);
  const api = apiQuery && isAnApi ? apiQuery.toLowerCase() : DEFAULT_OAUTH_CCG_API_SELECTION;
  dispatch(setOAuthApiSelection(api));
  setSearchParam(history, searchQuery, api, true);
};

const ClientCredentialsGrantDocs = (): JSX.Element => {
  const history = useHistory();
  const location = useLocation();
  const dispatch: React.Dispatch<ResetOAuthAPISelection | SetOAuthAPISelection> = useDispatch();
  const initializing = React.useRef(true);
  const api = useSelector((state: RootState) => state.oAuthApiSelection.selectedOAuthApi);
  const prevApi = usePrevious(api);
  const selectedOAuthApi = useSelector(
    (state: RootState) => state.oAuthApiSelection.selectedOAuthApi,
  );

  const options = getAllOauthApis().filter((item: APIDescription) => !isApiDeactivated(item) &&
                                                                     item.oAuthTypes &&
                                                                     item.oAuthTypes.includes('ClientCredentialsGrant'));

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
        <title>Client Credentials Grant</title>
      </Helmet>
      <PageHeader halo="Authorization" header="Client Credentials Grant" />
      <p>
        The Lighthouse OAuth 2.0 Client Credentials Grant (CCG) works by using your RSA generated key pair in JSON Web Key (JWK) format, as described in the OpenID spec.
      </p>
      <APISelector options={options} selectedOption={selectedOAuthApi} withButton={true} />
      <GettingStarted />
      <AuthCodeFlowContent options={options} selectedOption={selectedOAuthApi} />
      <TestUsers />
    </div>
  );
};

export { ClientCredentialsGrantDocs, ClientCredentialsFlowContentProps };
