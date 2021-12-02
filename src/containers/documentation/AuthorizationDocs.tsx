import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useLocation } from 'react-router-dom';
import { Redirect } from 'react-router';
import { CardLink, PageHeader } from '../../components';
import { defaultFlexContainer } from '../../styles/vadsUtils';

const AuthorizationDocs = (): JSX.Element => {
  const { search } = useLocation();
  const api = new URLSearchParams(search).get('api') ?? '';
  const newAuthDocLOcation = `/explore/authorization/docs/authorization-code?api=${api}`;

  return (
    <div className="va-api-authorization-docs">
      {api && <Redirect to={newAuthDocLOcation} />}
      <Helmet>
        <title>Authorization</title>
      </Helmet>
      <PageHeader header="Authorization" description="Explore available OAuth 2.0 grant flows" />
      <div className={defaultFlexContainer()}>
        <div className="vads-l-col--12">
          <p>
            What you use depends on your application type and API.{' '}
            <Link to="/explore">Learn more about our APIs.</Link>
          </p>
          <p>
            <Link to="/onboarding">
              Read the consumer onboarding guide for getting production access.
            </Link>
          </p>
        </div>
        <CardLink
          name="Authorization Code Flow"
          url="/explore/authorization/docs/authorization-code"
          callToAction="View the Authorization Code Flow docs"
        >
          Grants an access token on behalf of a user.
        </CardLink>
        <CardLink
          name="Client Credentials Grant"
          url="/explore/authorization/docs/client-credentials"
          callToAction="View the Client Credentials Grant docs"
        >
          Grants an access token on behalf of a system.
        </CardLink>
      </div>
    </div>
  );
};

export { AuthorizationDocs };

// Grants an access token on behalf of a user.
