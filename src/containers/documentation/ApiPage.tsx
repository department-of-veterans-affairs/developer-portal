/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable complexity */
import { VaAlert } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import { isApiDeactivated, isApiDeprecated } from '../../apiDefs/deprecated';

import { lookupApiCategory } from '../../apiDefs/query';
import { APIDescription, VeteranRedirectMessage } from '../../apiDefs/schema';
import { PageHeader } from '../../components';
import { useFlag } from '../../flags';

import { FLAG_API_ENABLED_PROPERTY } from '../../types/constants';
import ApisLoader from '../../components/apisLoader/ApisLoader';
import ApiDocumentation from './ApiDocumentation';
import ApiNotFoundPage from './ApiNotFoundPage';
import { getApi } from './DocumentationRoot';

const DeactivationMessage = ({ api }: { api: APIDescription }): JSX.Element | null => {
  /*
   * This code should be unneeded but is required for the linter. Without this
   * code DeactivationMessage will still return null (isApiDeprecated and
   * isApiDeactivated will both return false when api.deactivationInfo is
   * undefined, resulting in a null return on DeactivationMessage).
   * The linter does not catch this and thinks that api.deactivationInfo could
   * be undefined further down, even though the DeactionMessage would return
   * null before hitting that code.
   */
  if (!api.deactivationInfo) {
    return null;
  }

  const isDeprecated = isApiDeprecated(api);
  const isDeactivated = isApiDeactivated(api);

  if (!isDeprecated && !isDeactivated) {
    return null;
  }

  const { deactivationContent, deprecationContent } = api.deactivationInfo;
  const content = isDeactivated ? deactivationContent : deprecationContent;

  return (
    <div className={classNames('usa-alert', 'usa-alert-info', 'va-api-alert-box')}>
      <div className={classNames('usa-alert-body')}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
};

const VeteranRedirectAlertMessage = ({
  api,
  veteranRedirect,
}: {
  api: APIDescription;
  veteranRedirect: VeteranRedirectMessage;
}): JSX.Element => (
  <VaAlert status="info" key={api.urlSlug} visible uswds>
    <p className="vads-u-margin-y--0">
      {veteranRedirect.message}&nbsp;
      <a href={veteranRedirect.linkUrl}>{veteranRedirect.linkText}</a>.
    </p>
  </VaAlert>
);

const ApiPage = (): JSX.Element => {
  const location = useLocation();
  const params = useParams();
  const enabledApisFlags = useFlag([FLAG_API_ENABLED_PROPERTY]);

  const api = getApi(params.urlSlug);
  if (!api) {
    throw new Error('API not found');
  }
  const category = lookupApiCategory(api.categoryUrlFragment ?? '');
  const veteranRedirect = api.veteranRedirect ?? category?.content.veteranRedirect;

  const tabsRegex = /tab=(r4|argonaut|dstu2)/;
  if (location.pathname === '/explore/health/docs/fhir' && tabsRegex.test(location.search)) {
    const tabName = tabsRegex.exec(location.search)?.[1];
    let apiVersion = '';
    switch (tabName) {
      case 'r4':
        apiVersion = 'current';
        break;
      case 'argonaut':
        apiVersion = 'argonaut-0.0.0';
        break;
      case 'dstu2':
        apiVersion = 'dstu2-0.0.0';
        break;
      default:
        break;
    }

    return <Navigate replace to={`/explore/health/docs/fhir?version=${apiVersion}`} />;
  }

  // if (api === null || !category?.apis.includes(api) || !enabledApisFlags[api.urlSlug]) {
  if (!enabledApisFlags[api.urlFragment]) {
    return (
      <ApisLoader>
        <ApiNotFoundPage />
      </ApisLoader>
    );
  }

  return (
    <>
      <Helmet>
        <title>{api.name} Documentation</title>
      </Helmet>
      <PageHeader header="Docs" subText={api.name} />
      {veteranRedirect && (
        <VeteranRedirectAlertMessage api={api} veteranRedirect={veteranRedirect} />
      )}
      <DeactivationMessage api={api} />
      {!isApiDeactivated(api) && (
        <div className="sans-serif-headers">
          <ApiDocumentation apiDefinition={api} />
        </div>
      )}
    </>
  );
};

ApiPage.propTypes = {};
export default ApiPage;
