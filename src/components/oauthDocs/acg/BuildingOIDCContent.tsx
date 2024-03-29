import * as React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeaderWrapper } from '../../index';
import { ApiRequiredProps } from '../../../containers/documentation/DocumentationRoot';
import { AuthCodeGrantContent } from './AuthCodeGrantContent';
import { PKCEAuthContent } from './PKCEAuthContent';

const BuildingOIDCContent = (props: ApiRequiredProps): JSX.Element => {
  const { api } = props;

  return (
    <section aria-labelledby="building-oidc-apps" className="building-oidc-apps">
      <SectionHeaderWrapper
        heading="Building OpenID Connect Applications"
        id="building-oidc-apps"
      />
      <p>After being approved to use OpenID Connect, you&#39;ll receive a client ID.</p>
      <ul>
        <li>
          If you are building a <strong>server-based application</strong>, you’ll also receive a
          client secret and will use the{' '}
          <Link to="#authorization-code-grant">authorization code grant</Link> to complete
          authentication.
        </li>
        <li>
          If you are unable to <strong>safely store a client secret</strong>, such as within a
          native mobile app, you will <Link to="#pkce-authorization">use PKCE</Link> to complete
          authentication.
        </li>
      </ul>

      <AuthCodeGrantContent api={api} />
      <PKCEAuthContent api={api} />
    </section>
  );
};

BuildingOIDCContent.propTypes = {};

export { BuildingOIDCContent };
