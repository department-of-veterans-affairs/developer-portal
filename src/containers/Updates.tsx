import * as React from 'react';

import { Route } from 'react-router-dom';

import { PageHero } from '../components';
import ReleaseNotesPage from '../content/release-notes/release-notes.mdx';

export function UpdatesPageHero() {
    return (
        <PageHero
            title="Updates"
            content="What’s New, News, Articles, and API Release Notes"
            button="Request Access" />
    );
}

export class Updates extends React.Component {
    public render() {
        return (
            <div className="Explore">
                <Route exact={true} path="/updates" component={UpdatesPageHero} />
                <ReleaseNotesPage />
            </div>
        );
    }
}

export default Updates;

