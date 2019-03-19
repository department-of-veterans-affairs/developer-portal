import * as React from 'react';

import { Route } from 'react-router-dom';

import { PageHero } from '../components';
import ReleaseNotesPage from '../content/updates/updates.mdx';

import './Updates.scss';

export function UpdatesPageHero() {
    return (
        <PageHero
            title="Updates"
            content="Press Releases, News, Media, and Release Notes"
            button="Request Access" />
    );
}

export class Updates extends React.Component {
    public render() {
        return (
            <div className="Updates">
                <Route exact={true} path="/updates" component={UpdatesPageHero} />
                <section className="usa-section">
                    <div className="Updates-main usa-grid">
                        <div className="vadp-side-nav usa-width-one-third sticky" style={{color: 'white'}}>
                            Space for SideNav
                        </div>
                        <div className="usa-width-two-thirds">
                            <ReleaseNotesPage />
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Updates;

