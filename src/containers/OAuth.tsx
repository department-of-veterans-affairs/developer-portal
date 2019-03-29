import * as React from 'react';

import * as Stickyfill from 'stickyfilljs';

import PageHeader from '../components/PageHeader';
import Oauth from '../content/apiDocs/oauthTechnical.mdx';

import './OAuth.scss';

export interface IOAuthProps {
  categoryName?: string;
};


export class OAuth extends React.Component<IOAuthProps, {}> {
  private navRef = React.createRef<HTMLDivElement>();

  public componentDidMount() {
    if (this.navRef.current) {
      Stickyfill.addOne(this.navRef.current);
    }
  }

  public render() {
    return (
      <div id="oauth" className="usa-grid">
        <PageHeader halo={this.props.categoryName} header="Authorization" />
        <Oauth />
      </div>
    );
  }
}

export default OAuth;
