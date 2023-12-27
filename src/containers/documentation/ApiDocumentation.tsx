/* eslint-disable no-console */
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import { setRequestedApiVersion } from '../../features/apis/apiVersioningSlice';
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
  const { docSources, urlSlug } = apiDefinition;
  const location = useLocation();

  /*
   * API Version
   */
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const apiVersion = searchParams.get('version');

  React.useEffect((): void => {
    dispatch(setRequestedApiVersion(apiVersion));
  }, [dispatch, apiVersion, location.pathname]);

  /*
   * RENDER
   */
  console.log('render SwaggerDocs', docSources[0], urlSlug);
  return <SwaggerDocs docSource={docSources[0]} apiName={urlSlug} />;
};

ApiDocumentation.propTypes = ApiDocumentationPropTypes;

export default ApiDocumentation;
