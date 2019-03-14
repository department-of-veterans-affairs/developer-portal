import * as React from 'react';

import { Route } from 'react-router-dom';

import { PageHero } from '../components';
import ReleaseNotesPage from '../content/release-notes/release-notes.mdx';

export function UpdatesPageHero() {
    return (
        <PageHero
            title="Updates"
            content="Announcements, News, and API Release Notes"
            button="Request Access" />
    );
}

export class Updates extends React.Component {
    public render() {
        return (
            <div className="Explore">
                <Route exact={true} path="/updates" component={UpdatesPageHero} />
                <section className="usa-section">
                    <div className="usa-grid">
                        <div className="usa-width-one-third sticky" style={{color: 'white'}}>
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

