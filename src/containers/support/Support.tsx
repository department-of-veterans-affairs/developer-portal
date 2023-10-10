import * as React from 'react';
import { ContentWithNav, SideNavEntry } from '../../components';
import ContactUs from './ContactUs';
import FAQ from './FAQ';

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
    description: 'Answers to frequently asked questions.',
    id: 'faq',
    name: 'FAQs',
  },
  {
    callToAction: 'Go to the form',
    component: ContactUs,
    description: 'Open a ticket using our support form.',
    id: 'contact-us',
    name: 'Developer portal support form',
  },
];

const Support: React.FunctionComponent = (): JSX.Element => (
  <ContentWithNav
    nav={
      <>
        <SideNavEntry end key="all" to="." name="Overview" />
        {sections.map(section => (
          <SideNavEntry end key={section.id} to={section.id} name={section.name} />
        ))}
      </>
    }
    navAriaLabel="Support page side"
  />
);

export default Support;
