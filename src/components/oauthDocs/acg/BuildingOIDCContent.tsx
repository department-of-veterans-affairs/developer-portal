import * as React from 'react';
import { HashLink } from 'react-router-hash-link';
import { SectionHeaderWrapper } from '../../index';
import { ApiRequiredProps } from '../../../containers/documentation/DocumentationRoot';
import { AuthCodeFlowContent } from './AuthCodeFlowContent';
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
          <HashLink to={{ ...location, hash: '#authorization-code-flow' }}>
            authorization code flow
          </HashLink>{' '}
          to complete authentication.
        </li>
        <li>
          If you are unable to <strong>safely store a client secret</strong>, such as within a
          native mobile app, you will{' '}
          <HashLink to={{ ...location, hash: '#pkce-authorization' }}>use PKCE</HashLink> to
          complete authentication.
        </li>
      </ul>

      <AuthCodeFlowContent api={api} />
      <PKCEAuthContent api={api} />
    </section>
  );
};

BuildingOIDCContent.propTypes = {};

export { BuildingOIDCContent };
