import * as React from 'react'
import { Route } from "react-router";
import { NavLink } from 'react-router-dom';
import SupportFAQ from './SupportFAQ';
import SupportOverview from './SupportOverview';

const sections = [
  {
    component: (props: any) => <SupportFAQ {...props} />,
    description: 'Answers to frequently asked questions about the VA API progam and the APIs themselves.',
    id: 'faq',
    name: 'FAQ',
  },
  // {
  //   component: (props: any) => <SupportFAQ {...props} />,
  //   description: 'Submit a support request via Github or send us a message using the Contact Us form.',
  //   id: 'contact-us',
  //   name: 'Contact Us',
  // },
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
  private navRef = React.createRef<HTMLDivElement>();
  private subRoutes: any;

  constructor(props: any) {
    super(props);
    this.subRoutes = this.createSubRoutes();
  }

  public render() {
    return (
      <div className="Explore">
        <section className="usa-section">
          <div className="Explore-main usa-grid">
            <div className="vadp-side-nav usa-width-one-third sticky" ref={this.navRef} role="navigation" aria-label="What's New Side Nav">
              <SideNav />
            </div>
            <div className="usa-width-two-thirds">
              <Route exact={true} path="/support/" render={(props) => <SupportOverview {...props} sections={sections} />} />
              {this.subRoutes}
            </div>
          </div>
        </section>
      </div>
    )
  }

  private createSubRoutes() {
    return sections.map((section, i) => {
      return (
        <Route key={i} exact={true} path={`/support/${section.id}`} render={(props) => section.component(props)} />
      )
    })
  }
}