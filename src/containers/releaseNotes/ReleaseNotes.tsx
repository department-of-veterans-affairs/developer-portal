import * as React from 'react';

import classNames from 'classnames';
import { Flag } from 'flag';
import { RouteComponentProps } from 'react-router';
import { Route } from 'react-router-dom';

import { getDeactivatedCategory } from "../../apiDefs/deprecated";
import { getApiCategoryOrder, getApiDefinitions } from '../../apiDefs/query';
import {
  IApiBaseCategory,
  IApiDescription,
} from '../../apiDefs/schema';
import SideNav, { SideNavEntry } from '../../components/SideNav';
import { IApiNameParam } from '../../types';
import CategoryReleaseNotesPage from './CategoryReleaseNotesPage';
import ReleaseNotesOverview from './ReleaseNotesOverview';

function SideNavApiEntry(api: IApiDescription) {
  const dashUrlFragment = api.urlFragment.replace('_', '-');

  return (
    <Flag key={api.urlFragment} name={`hosted_apis.${api.urlFragment}`}>
      <SideNavEntry
        key={api.urlFragment}
        to={`#${dashUrlFragment}`}
        name={
          <React.Fragment>
            {api.name}
            <br />
            {api.vaInternalOnly && (
              <span>
                <small>Internal VA use only.</small>
              </span>
            )}
            {(api.vaInternalOnly && api.trustedPartnerOnly && <br />) || null}
            {api.trustedPartnerOnly && (
              <span>
                <small>Internal VA use only.{/*Trusted Partner use only.*/}</small>
              </span>
            )}
          </React.Fragment>
        }
        subNavLevel={1}
      />
    </Flag>
  );
}

function SideNavCategoryEntry(apiCategoryKey: string, apiCategory: IApiBaseCategory) {
  const subNavLinks = () => {
    return apiCategory.apis.map(api => {
      if (apiCategory.apis.length > 1) {
        return SideNavApiEntry(api);
      } else {
        return null;
      }
    });
  };

  const sideNavEntry = (
    <SideNavEntry to={`/release-notes/${apiCategoryKey}`} name={apiCategory.name}>
      {subNavLinks()}
    </SideNavEntry>
  );

  if (apiCategoryKey === 'deactivated') {
    return sideNavEntry;
  }

  return (
    <Flag name={`categories.${apiCategoryKey}`} key={apiCategoryKey}>
      {sideNavEntry}
    </Flag>
  );
}

export class ReleaseNotes extends React.Component<RouteComponentProps<IApiNameParam>, {}> {
  public render() {
    const categoryOrder = getApiCategoryOrder();
    const apiDefs = getApiDefinitions();
    const { deactivated: deactivatedApis } = getDeactivatedCategory();
    return (
      <div className={classNames('vads-u-padding-y--5')}>
        <section>
          <div className="vads-l-grid-container">
            <div className="vads-l-row">
              <SideNav ariaLabel="Release Notes Side Nav" className="vads-u-margin-bottom--2">
                <SideNavEntry key="all" exact={true} to="/release-notes" name="Overview" />
                {categoryOrder.map((key: string) => SideNavCategoryEntry(key, apiDefs[key]))}
                {SideNavCategoryEntry('deactivated', deactivatedApis)}
              </SideNav>
              <div className={classNames('vads-l-col--12', 'medium-screen:vads-l-col--8')}>
                <Route exact={true} path="/release-notes/" component={ReleaseNotesOverview} />
                <Route
                  exact={true}
                  path="/release-notes/:apiCategoryKey"
                  component={CategoryReleaseNotesPage}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default ReleaseNotes;
