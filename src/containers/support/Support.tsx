import classNames from 'classnames';
import * as React from 'react';
import { Route } from 'react-router';

import SideNav, { SideNavEntry } from '../../components/SideNav';
import SupportContactUs from './SupportContactUs';
import SupportFAQ from './SupportFAQ';
import SupportOverview from './SupportOverview';

export interface ISection {
  readonly component: React.ComponentType;
  readonly description: string;
  readonly id: string;
  readonly name: string;
}

const sections: ISection[] = [
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

export default function Support() {
  return (
    <div className="vads-u-padding-y--5">
      <div className="vads-l-grid-container">
        <div className="vads-l-row">
          <SideNav ariaLabel="Support page side nav">
            <SideNavEntry key="all" exact={true} to="/support" name="Overview" />
            {sections.map(section => {
              return <SideNavEntry key={section.id} to={`/support/${section.id}`} name={section.name} />;
            })}
          </SideNav>
          <div className={classNames('vads-l-col--12', 'medium-screen:vads-l-col--8')}>
            <Route
              exact={true}
              path="/support/"
              render={() => <SupportOverview sections={sections} />}
            />
            {sections.map(section => {
              return (
                <Route
                  key={section.id}
                  exact={true}
                  path={`/support/${section.id}`}
                  component={section.component}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
