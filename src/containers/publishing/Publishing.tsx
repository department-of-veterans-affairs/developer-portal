import React, { FC } from 'react';
import { Route, Switch } from 'react-router';
import TwoColumnLayout from '../../components/twoColumnLayout';
import { PUBLISHING_PATH } from '../../paths';
import { SideNav, SideNavEntry } from '../../components';
import PublishingIntroduction from './components/publishingIntroduction';

const Publishing: FC = () => (
  <TwoColumnLayout
    left={
      <SideNav ariaLabel="API Publishing Side Nav" className="vads-u-margin-bottom--2">
        <SideNavEntry key="intro" exact to={PUBLISHING_PATH} name="API Publishing" />
      </SideNav>
    }
    right={
      <Switch>
        <Route exact path={PUBLISHING_PATH} component={PublishingIntroduction} />
      </Switch>
    }
  />
);

export default Publishing;
