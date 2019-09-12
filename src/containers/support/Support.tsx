import * as classNames from 'classnames';
import * as React from 'react';
import { Route } from "react-router";
import { NavLink } from 'react-router-dom';
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
    description: 'Answers to frequently asked questions about the VA API progam and the APIs themselves.',
    id: 'faq',
    name: 'FAQ',
  },
  {
    component: SupportContactUs,
    description: 'Submit a support request via Github or send us a message using the Contact Us form.',
    id: 'contact-us',
    name: 'Contact Us',
  },
];

export function SideNav() {
  const navSections = sections.map((section) => {
    return (
      <li key={section.id}>
        <NavLink to={`/support/${section.id}`} activeClassName="usa-current">{section.name}</NavLink>
      </li>
    );
  });

  return (
    <ul className="usa-sidenav-list">
      <li key="all">
        <NavLink exact={true} to="/support" className="side-nav-category-link" activeClassName="usa-current">
          Overview
        </NavLink>
      </li>
      {navSections}
    </ul>
  );
}

export default class Support extends React.Component {
  public render() {
    return (
      <div className="explore">
        <section className="usa-section">
          <div className="usa-grid">
            <div className={classNames("vadp-side-nav", "usa-width-one-third", "sticky")} role="navigation" aria-label="Support Side Nav">
              <SideNav />
            </div>
            <div className="usa-width-two-thirds">
              <Route exact={true} path="/support/" render={() => <SupportOverview sections={sections}/>} />
              {this.createSubRoutes()}
            </div>
          </div>
        </section>
      </div>
    );
  }

  private createSubRoutes() {
    return sections.map((section) => {
      return (
        <Route key={section.id} exact={true} path={`/support/${section.id}`} component={section.component} />
      );
    });
  }
}
