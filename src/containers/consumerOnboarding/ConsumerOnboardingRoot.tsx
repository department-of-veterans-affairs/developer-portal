import React from 'react';
import { ContentWithNav, SideNavEntry } from '../../components';
import { PAGE_HEADER_ID } from '../../types/constants';

const ConsumerOnboardingRoot = (): JSX.Element => (
  <ContentWithNav
    nav={
      <>
        <SideNavEntry end name="API consumer onboarding" to="." />
        <SideNavEntry name="Request production access" to="request-prod-access" />
        <SideNavEntry name="Prepare for the demo" to="prepare-for-and-complete-a-demo" />
        <SideNavEntry name="Working with our APIs" to="working-with-lighthouse-apis" />
      </>
    }
    navAriaLabel="Consumer Onboarding Page"
    contentAriaLabelledBy={PAGE_HEADER_ID}
  />
);

export default ConsumerOnboardingRoot;
