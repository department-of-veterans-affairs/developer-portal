import classNames from 'classnames';
import * as React from 'react';
import { Route } from 'react-router';

import { SideNav, SideNavEntry } from '../../components';
import SupportContactUs from './SupportContactUs';
import SupportFAQ from './SupportFAQ';
import SupportOverview from './SupportOverview';

export interface SupportSection {
  readonly component: React.ComponentType;
  readonly description: string;
  readonly id: string;
  readonly name: string;
}

const sections: SupportSection[] = [
  {
    component: SupportFAQ,
    description:
      'Answers to frequently asked questions about the VA API progam and the APIs themselves.',
    id: 'faq',
    name: 'FAQ',
  },
  {
    component: SupportContactUs,
    description:
      'Submit a support request via GitHub or send us a message using the Contact Us form.',
    id: 'contact-us',
    name: 'Contact Us',
  },
];

const Support: React.FunctionComponent = (): JSX.Element => (
  <div className="vads-u-padding-y--5">
    <div className="vads-l-grid-container">
      <div className="vads-l-row">
        <SideNav ariaLabel="Support page side nav">
          <SideNavEntry key="all" exact to="/support" name="Overview" />
          {sections.map(section => (
            <SideNavEntry key={section.id} to={`/support/${section.id}`} name={section.name} />
          ))}
        </SideNav>
        <div className={classNames('vads-l-col--12', 'medium-screen:vads-l-col--8')}>
          <Route exact path="/support/" render={() => <SupportOverview sections={sections} />} />
          {sections.map(section => (
            <Route
              key={section.id}
              exact
              path={`/support/${section.id}`}
              component={section.component}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Support;
