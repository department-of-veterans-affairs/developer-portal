import * as React from 'react';

import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Route } from 'react-router-dom';

import GoLive from '../content/goLive.mdx';
import ReleaseNotes from '../content/release-notes/03-12-2019-release-notes.mdx';
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
            <section className="usa-section">
              <div className="usa-grid">
                <Route exact={true} path="/terms-of-service" render={this.tosPage} />
                <Route exact={true} path="/go-live" render={this.goLivePage} />
                <Route exact={true} path="/updates" render={this.updatesPage} />
              </div>
            </section>
        );
    }

    private goLivePage() {
        return (
            <GoLive />
        );
    }

    private tosPage() {
        return (
            <Tos />
        );
    }

    private updatesPage() {
        return (
            <ReleaseNotes />
        );
    }
}

export default connect(mapStateToProps)(RoutedContent);
