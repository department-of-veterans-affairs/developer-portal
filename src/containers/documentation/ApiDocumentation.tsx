import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import * as actions from '../../actions';
import { APIDescription, ApiDescriptionPropType } from '../../apiDefs/schema';
import { SwaggerDocs } from './SwaggerDocs';

import '../../../node_modules/react-tabs/style/react-tabs.scss';

import './ApiDocumentation.scss';

interface ApiDocumentationProps {
  apiDefinition: APIDescription;
}

const ApiDocumentationPropTypes = {
  apiDefinition: ApiDescriptionPropType.isRequired,
};

const ApiDocumentation = (props: ApiDocumentationProps): JSX.Element => {
  const { apiDefinition } = props;
  const { docSources, urlFragment } = apiDefinition;
  const location = useLocation();

  /*
   * API Version
   */
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const apiVersion = searchParams.get('version');

  React.useEffect((): void => {
    dispatch(actions.setRequestedApiVersion(apiVersion));
  }, [dispatch, apiVersion, location.pathname]);

  /*
   * RENDER
   */
  return <SwaggerDocs docSource={docSources[0]} apiName={urlFragment} />;
};

ApiDocumentation.propTypes = ApiDocumentationPropTypes;

export default ApiDocumentation;
