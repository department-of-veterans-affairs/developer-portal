import * as React from 'react';

import * as Stickyfill from 'stickyfilljs';

import { getApiDefinitions } from '../../apiDefs/query';
import PageHeader from '../../components/PageHeader';
import Oauth from '../../content/apiDocs/oauthTechnical.mdx';

import './OAuth.scss';

export interface IOAuthProps {
  apiCategoryKey: string;
}

export class OAuth extends React.Component<IOAuthProps, {}> {
  private navRef = React.createRef<HTMLDivElement>();

  public componentDidMount() {
    if (this.navRef.current) {
      Stickyfill.addOne(this.navRef.current);
    }
  }

  public render() {
    const { apiCategoryKey } = this.props;
    const category = getApiDefinitions()[apiCategoryKey] || {};

    return (
      <div id="oauth">
        <PageHeader halo={category.name} header="Authorization" />
        <Oauth />
      </div>
    );
  }
}

export default OAuth;
