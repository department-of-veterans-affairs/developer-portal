import * as React from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import SwaggerUI from 'swagger-ui-react';
import { setRequestedApiVersion } from '../../features/apis/apiVersioningSlice';
import { APIDescription, ApiDescriptionPropType } from '../../apiDefs/schema';
import { useAppDispatch } from '../../hooks';
import 'swagger-ui-react/swagger-ui.css';

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
  const { docSources, urlSlug } = apiDefinition;
  console.log(docSources, urlSlug);
  const location = useLocation();

  /*
   * API Version
   */
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const apiVersion = searchParams.get('version');

  React.useEffect((): void => {
    dispatch(setRequestedApiVersion(apiVersion));
  }, [dispatch, apiVersion, location.pathname]);

  /*
   * RENDER
   */
  return <SwaggerUI url="https://petstore.swagger.io/v2/swagger.json" />;
};

ApiDocumentation.propTypes = ApiDocumentationPropTypes;

export default ApiDocumentation;
