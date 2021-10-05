import * as React from 'react';
import Helmet from 'react-helmet';
import { CardLink, PageHeader } from '../../components';
import { defaultFlexContainer } from '../../styles/vadsUtils';


// import CategoryPage from './CategoryPage'

const AuthorizationDocs = (): JSX.Element => {
  return (
    <div className="va-api-authorization-docs">
      <Helmet>
        <title>Authorization</title>
      </Helmet>
      <PageHeader
        header="Authorization"
        description="Explore available OAuth 2.0 grant flows"
      />
      <div className={defaultFlexContainer()}>
        <CardLink name="Authorization Code Grant" url="/explore/authorization/docs/acg" callToAction="View the Authorization Code Grant Docs"/>
        <CardLink name="Client Credentials Grant" url="/explore/authorization/docs/ccg" callToAction="View the Client Credentials Grant Docs"/>
      </div>
    </div>
  );
};

export { AuthorizationDocs };
