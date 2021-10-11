import * as React from 'react';
import Helmet from 'react-helmet';
import { CardLink, PageHeader } from '../../components';
import { defaultFlexContainer } from '../../styles/vadsUtils';
import { Link } from 'react-router-dom';

// import CategoryPage from './CategoryPage'

const AuthorizationDocs = (): JSX.Element => (
  <div className="va-api-authorization-docs">
    <Helmet>
      <title>Authorization</title>
    </Helmet>
    <PageHeader
      header="Authorization"
      description="Explore available OAuth 2.0 grant flows"
    />
    <div className={defaultFlexContainer()}>
      <div>
        <p>
          What you use depends on your application type and API. <Link to="/explore">Learn more about our APIs.</Link>
        </p>
        <p>
          <Link to="/onboarding">Read the consumer onboarding guide for getting production access.</Link>
        </p>
      </div>
      <CardLink name="Authorization Code Flow" url="/explore/authorization/docs/acg" callToAction="View the Authorization Code Flow Docs">
        Grants an access token on behalf of a user.
      </CardLink>
      <CardLink name="Client Credentials Grant" url="/explore/authorization/docs/ccg" callToAction="View the Client Credentials Grant Docs">
        Grants an access token on behalf of a user.
      </CardLink>
    </div>
  </div>
  );

export { AuthorizationDocs };


// Grants an access token on behalf of a user.
