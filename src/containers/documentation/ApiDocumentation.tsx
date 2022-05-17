import { Location } from 'history';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';
import { APIDescription, ApiDescriptionPropType } from '../../apiDefs/schema';
import { Flag } from '../../flags';
import { FLAG_HOSTED_APIS } from '../../types/constants';
import { SwaggerDocs } from './SwaggerDocs';

import '../../../node_modules/react-tabs/style/react-tabs.scss';

import './ApiDocumentation.scss';

interface ApiDocumentationProps {
  apiDefinition: APIDescription;
  location: Location;
}

const ApiDocumentationPropTypes = {
  apiDefinition: ApiDescriptionPropType.isRequired,
  // Leave as any for now until we can use the location react hooks
  location: PropTypes.any.isRequired,
};

const ApiDocumentation = (props: ApiDocumentationProps): JSX.Element => {
  const { apiDefinition, location } = props;

  /*
   * API Version
   */
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search || undefined);
  const apiVersion = queryParams.get('version');

  React.useEffect((): void => {
    dispatch(actions.setRequestedApiVersion(apiVersion));
  }, [dispatch, apiVersion, location.pathname]);

  /*
   * RENDER
   */
  return (
    <Flag name={[FLAG_HOSTED_APIS, apiDefinition.urlFragment]}>
      {(apiDefinition.urlFragment === 'veteran_verification' ||
        apiDefinition.urlFragment === 'fhir') && (
        <div role="region" aria-labelledby="oauth-info-heading" className="api-docs-oauth-link">
          <h2 id="oauth-info-heading" className="usa-alert-heading">
            Authentication and Authorization
          </h2>
          <Link to={`/explore/authorization?api=${apiDefinition.urlFragment}`}>
            View our OAuth documentation
          </Link>
        </div>
      )}
      <SwaggerDocs docSource={apiDefinition.docSources[0]} apiName={apiDefinition.urlFragment} />
    </Flag>
  );
};

ApiDocumentation.propTypes = ApiDocumentationPropTypes;

export default ApiDocumentation;
