import * as React from 'react';
import { Route, Switch } from 'react-router';

import { ContentWithNav, SideNavEntry } from '../../components';
import ContactUs from './ContactUs';
import FAQ from './FAQ';
import Overview from './Overview';

export interface SupportSection {
  readonly component: React.ComponentType;
  readonly description: string;
  readonly id: string;
  readonly name: string;
  readonly callToAction: string;
}

export const sections: SupportSection[] = [
  {
    callToAction: 'Read our FAQs',
    component: FAQ,
    description:
      'Answers to frequently asked questions about the VA API progam and the APIs themselves.',
    id: 'faq',
    name: 'FAQ',
  },
  {
    callToAction: 'Send us a message',
    component: ContactUs,
    description: 'Send us a message using the Contact Us form.',
    id: 'contact-us',
    name: 'Contact Us',
  },
];

const Support: React.FunctionComponent = (): JSX.Element => (
  <ContentWithNav
    nav={
      <>
        <SideNavEntry key="all" exact to="/support" name="Overview" />
        {sections.map(section => (
          <SideNavEntry key={section.id} to={`/support/${section.id}`} name={section.name} />
        ))}
      </>
    }
    content={
      <Switch>
        <Route
          exact
          path="/support/"
          render={(): JSX.Element => <Overview sections={sections} />}
        />
        {sections.map(section => (
          <Route
            key={section.id}
            exact
            path={`/support/${section.id}`}
            component={section.component}
          />
        ))}
      </Switch>
    }
    navAriaLabel="Support page side nav"
  />
);

export default Support;
