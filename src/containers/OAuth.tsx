import * as React from 'react';

import * as Stickyfill from 'stickyfilljs';

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
    let headerHalo = null;
    if (this.props.categoryName) {
      headerHalo = (
        <div className="header-halo">
          {this.props.categoryName}
        </div>
      );
    }

    return (
      <div id="oauth" className="usa-grid">
        {headerHalo}
        <h1>Authorization</h1>
        <Oauth />
      </div>
    );
  }
}

export default OAuth;
