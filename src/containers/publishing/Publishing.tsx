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

const Publishing: FC = () => (
  <ContentWithNav
    nav={
      <>
        <SideNavEntry key="intro" exact to={PUBLISHING_PATH} name="API Publishing" />
        <SideNavEntry
          key="onboarding"
          exact
          to={PUBLISHING_ONBOARDING_PATH}
          name="How onboarding works"
        />
        <SideNavEntry
          key="expectations"
          exact
          to={PUBLISHING_EXPECTATIONS_PATH}
          name="Expectations for APIs"
        />
        <SideNavEntry key="contact" exact to={SUPPORT_CONTACT_PATH} name="Contact Us" />
      </>
    }
    content={
      <Switch>
        <Route exact path={PUBLISHING_PATH} component={PublishingIntroduction} />
      </Switch>
    }
    navAriaLabel="API Publishing Side Nav"
  />
);

export { Publishing };
