import * as React from 'react';

import { Flag } from 'flag';
import { RouteComponentProps } from 'react-router';
import { Route } from 'react-router-dom';

import { getApiCategoryOrder, getApiDefinitions } from '../../apiDefs/query';
import { IApiCategory, IApiDescription } from '../../apiDefs/schema';
import SideNav, { SideNavEntry } from '../../components/SideNav';
import { IApiNameParam } from '../../types';
import CategoryReleaseNotesPage from './CategoryReleaseNotesPage';
import ReleaseNotesOverview from './ReleaseNotesOverview';

import '../Documentation.scss';

function VaInternalTag() {
  return (
    <span><small>Internal VA use only.</small></span>
  );
}

function SideNavApiEntry(api: IApiDescription) {
  const internalTag = (api.vaInternalOnly === true) ? VaInternalTag() : null;
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
            {internalTag}
          </React.Fragment>
        }
      />
    </Flag>
  );
}

function SideNavCategoryEntry(apiCategoryKey: string, apiCategory: IApiCategory) {
  const subNavLinks = () => {
    return apiCategory.apis.map(api => {
      if (apiCategory.apis.length > 1) {
        return SideNavApiEntry(api);
      } else {
        return null;
      }
    });
  };

  return (
    <SideNavEntry
      key={`hash-link-${apiCategoryKey}`}
      to={`/release-notes/${apiCategoryKey}`}
      name={apiCategory.name}
    >
      {subNavLinks()}
    </SideNavEntry>
  );
}

export function ReleaseNotesSideNav() {
  const categoryOrder = getApiCategoryOrder();
  const apiDefs = getApiDefinitions();
  return (
    <SideNav ariaLabel="Release Notes Side Nav">
      <SideNavEntry
        key="all"
        exact={true}
        to="/release-notes"
        name="Overview"
      />
      {categoryOrder.map((key: string) => apiDefs[key].releaseNotes && SideNavCategoryEntry(key, apiDefs[key]))}
    </SideNav>
  );
}

function renderOverview(routeProps: any, props: any) {
  return <ReleaseNotesOverview {...routeProps} {...props} description={props.description} halo={props.halo} header={props.header} parent={props.parent} />;
}

export class ReleaseNotes extends React.Component<RouteComponentProps<IApiNameParam>, {}> {
  private overviewProps = {
    description: 'The goal of the Release Notes section is to inform developers of updates and changes to the VA APIs. This section of the developer portal is new and will expand as release notes for new APIs become available.', 
    halo: 'Release Notes',
    header: 'Overview', 
    parent: 'release-notes',
  };

  public render() {
    return (
      <div className="va-api-sidenav-page">
        <section className="usa-section">
          <div className="usa-grid">
            <ReleaseNotesSideNav />
            <div className="usa-width-two-thirds">
              <Route exact={true} path="/release-notes/" render={(routeProps) => renderOverview(routeProps, this.overviewProps)} />
              <Route exact={true} path="/release-notes/:apiCategoryKey" component={CategoryReleaseNotesPage} />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default ReleaseNotes;

