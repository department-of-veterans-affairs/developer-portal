import * as React from 'react';

import 'jest';
import { render, screen } from '@testing-library/react';
import { VeteranResourcesContent } from './VeteranResourcesContent';

const CONTENT_LINK_DATA = [
  {
    content: 'Directory of Veteran Services Organizations',
    href: 'https://www.va.gov/vso/',
  },
  {
    content: 'VA Contact Us page',
    href: 'https://www.va.gov/contact-us/',
  },
  {
    content: 'Ask VA page',
    href: 'https://ask.va.gov/',
  },
  {
    content: 'appeals status',
    href: 'https://www.va.gov/claim-or-appeal-status/',
  },
  {
    content: 'VSO Directory',
    href: 'https://www.va.gov/vso/',
  },
  {
    content: 'MyHealtheVet account',
    href: 'https://www.myhealth.va.gov/mhv-portal-web/user-login?redirect=/mhv-portal-web/home',
  },
  {
    content: 'Contact MyHealtheVet',
    href: 'https://www.myhealth.va.gov/mhv-portal-web/web/myhealthevet/contact-mhv',
  },
  {
    content: 'VA Family Member Benefits',
    href: 'https://www.va.gov/family-member-benefits/',
  },
  {
    content: 'VSO Directory',
    href: 'https://www.va.gov/vso/',
  },
  {
    content: 'Find a VA Form',
    href: 'https://www.va.gov/find-forms/',
  },
  {
    content: 'Find VA Locations',
    href: 'https://www.va.gov/find-locations',
  },
];

describe('VeteranResourcesContent', () => {
  it('checks that the title and description render correctly.', () => {
    render(<VeteranResourcesContent />);

    const description = screen.queryByText(
      'Are you looking for Veteran benefits and services information?',
    );
    expect(description).toBeInTheDocument();
  });

  it('checks that all links render correctly.', () => {
    render(<VeteranResourcesContent />);

    const links = screen.queryAllByRole('link');
    expect(links.length).toBe(11);
    links.forEach((link, index) => {
      expect(link).toHaveAttribute('href', CONTENT_LINK_DATA[index].href);
      expect(link).toHaveTextContent(CONTENT_LINK_DATA[index].content);
    });
  });
});
