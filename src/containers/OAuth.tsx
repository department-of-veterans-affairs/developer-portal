import * as React from 'react';
import { HashLink as Link } from 'react-router-hash-link';

import { Markdown } from '../components';

import oauth from '../content/apiDocs/oauthTechnical.md';

import './OAuth.scss';

class OAuth extends React.Component {
    public render() {
        return (
          <div id="oauth" className="usa-grid">
            <div className="usa-width-one-third sticky">
              <ul className="usa-sidenav-list">
                <li><Link to="#about-openid-connect">About OpenID Connect</Link></li>
                <li><Link to="#getting-started">Getting Started</Link></li>
                <li><Link to="#scopes">Scopes</Link></li>
                <li><Link to="#id-token">id token</Link></li>
                <li><Link to="#test-users">Test Users</Link></li>
                <li><Link to="#security-considerations">Security Considerations</Link></li>
                <li><Link to="#support">Support</Link></li>
              </ul>
            </div>
            <div className="usa-width-two-thirds">
              <Markdown content={oauth} />
            </div>
          </div>
        );
    }
}

export default OAuth
