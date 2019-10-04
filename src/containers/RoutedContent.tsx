import * as React from 'react';

import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Route } from 'react-router-dom';

import MarkdownPage from '../components/MarkdownPage';

import GoLive from '../content/goLive.mdx';
import Tos from '../content/termsOfService.mdx';
import { IRootState } from '../types';

interface IRoutedContentProps extends RouteComponentProps<void> {
}

const mapStateToProps = (state: IRootState) => {
  return {
    ...state.routing,
  };
};

class RoutedContent extends React.Component<IRoutedContentProps, { }> {
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

export default connect(mapStateToProps)(RoutedContent);
