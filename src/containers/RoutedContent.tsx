import * as React from 'react';

import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Route } from 'react-router-dom';

import Markdown from '../components/Markdown';
import goLive from '../content/goLive.md';
import tos from '../content/termsOfService.md';
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
            <section className="usa-section">
              <div className="usa-grid">
                <Route exact={true} path="/terms-of-service" render={this.tosPage} />
                <Route exact={true} path="/go-live" render={this.goLivePage} />
              </div>
            </section>
        );
    }

    private goLivePage() {
        return (
            <Markdown content={goLive} />
        );
    }

    private tosPage() {
        return (
            <Markdown content={tos} />
        );
    }
}

export default connect(mapStateToProps)(RoutedContent);
