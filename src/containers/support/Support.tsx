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

function SupportSideNav() {
  const navSections = sections.map(section => {
    return <SideNavEntry key={section.id} to={`/support/${section.id}`} name={section.name} />;
  });

  return (
    <SideNav ariaLabel="Support page side nav">
      <SideNavEntry key="all" exact={true} to="/support" name="Overview" />
      {navSections}
    </SideNav>
  );
}

export default class Support extends React.Component {
  public render() {
    return (
      <div className="support va-api-sidenav-page" >
        <section className="usa-section">
          <div className="usa-grid">
            <SupportSideNav />
            <div className="usa-width-two-thirds">
              <Route
                exact={true}
                path="/support/"
                render={() => <SupportOverview sections={sections} />}
              />
              {this.createSubRoutes()}
            </div>
          </div>
        </section>
      </div>
    );
  }

  private createSubRoutes() {
    return sections.map(section => {
      return (
        <Route
          key={section.id}
          exact={true}
          path={`/support/${section.id}`}
          component={section.component}
        />
      );
    });
  }
}
