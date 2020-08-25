import * as React from 'react';

import { Route } from 'react-router-dom';

import MarkdownPage from '../components/MarkdownPage';

import GoLive from '../content/goLive.mdx';
import Tos from '../content/termsOfService.mdx';

export default class RoutedContent extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <Route exact={true} path="/terms-of-service" render={this.tosPage} />
        <Route exact={true} path="/go-live" render={this.goLivePage} />
      </React.Fragment>
    );
  }

  private goLivePage() {
    return MarkdownPage(GoLive);
  }

  private tosPage() {
    return MarkdownPage(Tos);
  }
}
