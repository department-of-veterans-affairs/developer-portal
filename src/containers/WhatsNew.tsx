import * as React from 'react';

import WhatsNewPage from '../content/whats-new.mdx';

export class WhatsNew extends React.Component {
  public render() {
    return (
      <div className="Explore">
        <section className="usa-section">
          <div className="Explore-main usa-grid">
            <div className="vadp-side-nav usa-width-one-third sticky">
              SideNav
            </div>
            <div className="usa-width-two-thirds">
              <WhatsNewPage />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default WhatsNew;

