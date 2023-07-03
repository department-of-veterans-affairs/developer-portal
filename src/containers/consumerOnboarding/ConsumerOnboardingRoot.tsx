import React from 'react';
import { Route, Switch } from 'react-router';
import { ContentWithNav, SideNavEntry } from '../../components';
import { PAGE_HEADER_ID } from '../../types/constants';
import {
  CONSUMER_APIS_PATH,
  CONSUMER_DEMO_PATH,
  CONSUMER_PATH,
  CONSUMER_PROD_PATH,
} from '../../types/constants/paths';
import DemoPrep from './DemoPrep';
import OnboardingOverview from './OnboardingOverview';
import WorkingWithOurAPIs from './WorkingWithOurAPIs';
import RequestProductionAccess from './RequestProductionAccess';

const ConsumerOnboardingRoot = (): JSX.Element => (
  <ContentWithNav
    nav={
      <>
        <SideNavEntry name="API Consumer onboarding" to={CONSUMER_PATH} exact />
        <SideNavEntry name="Request production access" to={CONSUMER_PROD_PATH} />
        <SideNavEntry name="Prepare for the demo" to={CONSUMER_DEMO_PATH} />
        <SideNavEntry name="Working with our APIs" to={CONSUMER_APIS_PATH} />
      </>
    }
    content={
      <Switch>
        <Route exact path={CONSUMER_PATH} component={OnboardingOverview} />
        <Route exact path={CONSUMER_APIS_PATH} component={WorkingWithOurAPIs} />
        <Route path={CONSUMER_PROD_PATH} component={RequestProductionAccess} />
        <Route path={CONSUMER_DEMO_PATH} component={DemoPrep} />
      </Switch>
    }
    navAriaLabel="Consumer Onboarding Page Nav"
    contentAriaLabelledBy={PAGE_HEADER_ID}
  />
);

export default ConsumerOnboardingRoot;
