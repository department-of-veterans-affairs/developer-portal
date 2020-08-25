import * as React from 'react';

import classNames from 'classnames';
import { Flag } from 'flag';
import { Route, Switch } from 'react-router-dom';

import { getDeactivatedCategory, isApiDeactivated } from '../../apiDefs/deprecated';
import { getApiCategoryOrder, getApiDefinitions } from '../../apiDefs/query';
import { BaseAPICategory, IApiDescription } from '../../apiDefs/schema';
import SideNav, { SideNavEntry } from '../../components/SideNav';
import { CategoryReleaseNotes, DeactivatedReleaseNotes } from './CategoryReleaseNotesPage';
import ReleaseNotesOverview from './ReleaseNotesOverview';

// tslint:disable:interface-name
interface SideNavAPIEntryProps {
  api: IApiDescription;
  flagName: string;
}

function SideNavAPIEntry(props: SideNavAPIEntryProps) {
  const { api, flagName } = props;
  const dashUrlFragment = props.api.urlFragment.replace('_', '-');
  return (
    <Flag key={api.urlFragment} name={`${flagName}.${api.urlFragment}`}>
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

interface SideNavCategoryEntryProps {
  categoryKey: string;
  apiCategory: BaseAPICategory;
}

function SideNavCategoryEntry(props: SideNavCategoryEntryProps) {
  const { apiCategory, categoryKey } = props;
  const apis: IApiDescription[] = apiCategory.apis.filter(api => !isApiDeactivated(api));
  return (
    <Flag name={`categories.${categoryKey}`} key={categoryKey}>
      <SideNavEntry to={`/release-notes/${categoryKey}`} name={apiCategory.name}>
        {apis.length > 1 &&
          apis.map(api => (
            <SideNavAPIEntry api={api} key={api.urlFragment} flagName="hosted_apis" />
          ))}
      </SideNavEntry>
    </Flag>
  );
}

export function ReleaseNotes() {
  const categoryOrder = getApiCategoryOrder();
  const apiDefs = getApiDefinitions();
  const deactivatedApis = getDeactivatedCategory();
  return (
    <div className={classNames('vads-u-padding-y--5')}>
      <section>
        <div className="vads-l-grid-container">
          <div className="vads-l-row">
            <SideNav ariaLabel="Release Notes Side Nav" className="vads-u-margin-bottom--2">
              <SideNavEntry key="all" exact={true} to="/release-notes" name="Overview" />
              {categoryOrder.map((key: string) => (
                <SideNavCategoryEntry categoryKey={key} apiCategory={apiDefs[key]} key={key} />
              ))}
              <SideNavEntry to="/release-notes/deactivated" name={deactivatedApis.name}>
                {deactivatedApis.apis.length > 1 &&
                  deactivatedApis.apis.map(api => (
                    <SideNavAPIEntry api={api} key={api.urlFragment} flagName="enabled" />
                  ))}
              </SideNavEntry>
            </SideNav>
            <div className={classNames('vads-l-col--12', 'medium-screen:vads-l-col--8')}>
              <Switch>
                <Route exact={true} path="/release-notes/" component={ReleaseNotesOverview} />
                <Route
                  exact={true}
                  path="/release-notes/deactivated"
                  render={DeactivatedReleaseNotes}
                />
                <Route path="/release-notes/:apiCategoryKey" component={CategoryReleaseNotes} />
              </Switch>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ReleaseNotes;
