import React, { FC } from 'react';
import { Route, Switch } from 'react-router';
import { useDispatch } from 'react-redux';
import {
  SUPPORT_CONTACT_PATH,
  PUBLISHING_REQUIREMENTS_URL,
  PUBLISHING_ONBOARDING_PATH,
  PUBLISHING_PATH,
} from '../../types/constants/paths';
import { ContentWithNav, SideNavEntry } from '../../components';
import { setGeneralStore, SetGeneralStore } from '../../actions';
import { PublishingIntroduction } from './components/publishingIntroduction';
import { PublishingExpectations } from './components/publishingExpecations';
import { PublishingOnboarding } from './components/publishingOnboarding';

const Publishing: FC = () => {
  const dispatch: React.Dispatch<SetGeneralStore> = useDispatch();
  const openModal = (): void => {
    dispatch(setGeneralStore(true, true));
  };
  return (
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
          <li className="va-api-sidenav-entry vads-u-border-top--2px vads-u-border-color--gray-lighter vads-u-margin-y--0">
            <button
              type="button"
              className="vads-u-padding--1p5 vads-u-color--base"
              onClick={(event: React.MouseEvent): boolean => {
                event.stopPropagation();
                event.nativeEvent.stopPropagation();
                openModal();
                return false;
              }}
            >
              Requirements for APIs
            </button>
          </li>
          <SideNavEntry
            key="contact"
            exact
            to={{ pathname: SUPPORT_CONTACT_PATH, search: '?type=publishing' }}
            name="Contact Us"
          />
        </>
      }
      content={
        <Switch>
          <Route exact path={PUBLISHING_PATH} component={PublishingIntroduction} />
          <Route exact path={PUBLISHING_REQUIREMENTS_URL} component={PublishingExpectations} />
          <Route exact path={PUBLISHING_ONBOARDING_PATH} component={PublishingOnboarding} />
        </Switch>
      }
      navAriaLabel="API Publishing Side Nav"
    />
  );
};

export { Publishing };
