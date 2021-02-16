import React, { FC } from 'react';
import { Route, Switch } from 'react-router';
import {
  SUPPORT_CONTACT_PATH,
  PUBLISHING_EXPECTATIONS_PATH,
  PUBLISHING_ONBOARDING_PATH,
  PUBLISHING_PATH,
} from '../../types/constants/paths';
import { ContentWithNav, SideNavEntry } from '../../components';
import { PublishingIntroduction } from './components/publishingIntroduction';
import { PublishingExpectations } from './components/publishingExpecations';
import { PublishingOnboarding } from './components/publishingOnboarding';

const Publishing: FC = () => (
  <ContentWithNav
    nav={
      <>
        <SideNavEntry key="intro" exact to={PUBLISHING_PATH} name="Overview" />
        <SideNavEntry
          key="onboarding"
          exact
          to={PUBLISHING_ONBOARDING_PATH}
          name="How publishing works"
        />
        <SideNavEntry
          key="expectations"
          exact
          to={PUBLISHING_EXPECTATIONS_PATH}
          name="Expectations for APIs"
        />
        <SideNavEntry key="contact" exact to={{ pathname: SUPPORT_CONTACT_PATH, search: '?default=publishing' }} name="Contact Us" />
      </>
    }
    content={
      <Switch>
        <Route exact path={PUBLISHING_PATH} component={PublishingIntroduction} />
        <Route exact path={PUBLISHING_EXPECTATIONS_PATH} component={PublishingExpectations} />
        <Route exact path={PUBLISHING_ONBOARDING_PATH} component={PublishingOnboarding} />
      </Switch>
    }
    navAriaLabel="API Publishing Side Nav"
  />
);

export { Publishing };
