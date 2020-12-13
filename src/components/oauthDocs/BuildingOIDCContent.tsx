/* eslint-disable react/no-unused-prop-types */
/* eslint-disable no-console */
import PropTypes from 'prop-types';
import * as React from 'react';
import { HashLink } from 'react-router-hash-link';
import { SectionHeaderWrapper } from '../index';
import { APIDescription } from '../../apiDefs/schema';
import { onHashAnchorClick } from '../../utils/clickHandlers';
import { AuthCodeFlowContent } from './AuthCodeFlowContent';
import { PKCEAuthContent } from './PKCEAuthContent';

interface BuildingOIDContentProps {
  apiDef: APIDescription | null;
  options: APIDescription[];
  selectedOption: string;
  onSelectionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const BuildingOIDCContent = (props: BuildingOIDContentProps): JSX.Element => (
  <section aria-labelledby="Building OpenID Connect Applications">
    <SectionHeaderWrapper heading="Building OpenID Connect Applications" id="building-openid" />
    <p>After being approved to use OpenID Connect, you&#39;ll receive a client id.</p>
    <ul>
      <li>
        If you are building a <strong>server-based application</strong>, you’ll also receive a
        client secret and will use the{' '}
        <HashLink to="#authorization-code-flow" onClick={onHashAnchorClick}>
          authorization code flow
        </HashLink>{' '}
        to complete authentication.
      </li>
      <li>
        If you are unable to <strong>safely store a client secret</strong> such as a native mobile
        app, you will{' '}
        <HashLink
          to="#pkce-(proof-key-for-code-exchange)-authorization"
          onClick={onHashAnchorClick}
        >
          use PKCE
        </HashLink>
        to complete authentication.
      </li>
    </ul>

    <AuthCodeFlowContent {...props} />

    <PKCEAuthContent />
  </section>
);

BuildingOIDCContent.propTypes = {
  onSelectionChange: PropTypes.func,
  options: PropTypes.array,
  selectedOption: PropTypes.string,
};

export { BuildingOIDCContent };
