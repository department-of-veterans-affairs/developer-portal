import * as React from 'react';

import ReleaseNotesPage from '../content/release-notes/release-notes.mdx';

export class ReleaseNotes extends React.Component {
  public render() {
    return (
      <div className="Explore">
        <section className="usa-section">
          <div className="Explore-main usa-grid">
            <div className="vadp-side-nav usa-width-one-third sticky">
              SideNav
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

export default ReleaseNotes;

