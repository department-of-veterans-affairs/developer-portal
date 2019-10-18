import * as React from 'react';

import classNames from 'classnames';
import { Flag } from 'flag';
import { RouteComponentProps } from 'react-router';
import { Route } from 'react-router-dom';

import { getApiCategoryOrder, getApiDefinitions } from '../../apiDefs/query';
import { IApiCategory, IApiDescription } from '../../apiDefs/schema';
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
            {api.vaInternalOnly && <span><small>Internal VA use only.</small></span>}
          </React.Fragment>
        }
        subNavLevel={1}
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
    <Flag name={`categories.${apiCategoryKey}`} key={apiCategoryKey}>
      <SideNavEntry
        to={`/release-notes/${apiCategoryKey}`}
        name={apiCategory.name}
      >
        {subNavLinks()}
      </SideNavEntry>
    </Flag>
  );
}

function renderOverview(routeProps: any, props: any) {
  return <ReleaseNotesOverview {...routeProps} {...props} description={props.description} halo={props.halo} header={props.header} parent={props.parent} />;
}

export class ReleaseNotes extends React.Component<RouteComponentProps<IApiNameParam>, {}> {
  private overviewProps = {
    description:
      <div>
        <p>
          The VA Lighthouse product teams periodically update these APIs in order to deliver new features and repair defects. We avoid doing so whenever possible but occasionally we need to make breaking changes that require developers to modify their existing applications to see the benefits of these features and fixes.
        </p>
        <p>
          We recommend that developers periodically check this list for announcements of breaking changes and added features. Changes will also be announced via direct email whenever possible to addresses used to obtain developer keys for each API. Please <a href="https://developer.va.gov/support/contact-us">contact us</a> with any questions or to request support.
        </p>
        <p>
          To view user-requested features and known issues or report a bug, please visit our <a href="https://github.com/department-of-veterans-affairs/vets-api-clients">GitHub repo</a>.
        </p>
      </div>
    ,
    halo: 'Release Notes',
    header: 'Overview',
    parent: 'release-notes',
  };

  public render() {
    const categoryOrder = getApiCategoryOrder();
    const apiDefs = getApiDefinitions();
    return (
      <div className={classNames('vads-u-padding-y--5')}>
        <section>
          <div className="vads-l-grid-container">
            <div className="vads-l-row">
              <SideNav ariaLabel="Release Notes Side Nav" className="vads-u-margin-bottom--2">
                <SideNavEntry
                  key="all"
                  exact={true}
                  to="/release-notes"
                  name="Overview"
                />
                {categoryOrder.map((key: string) => apiDefs[key].content.releaseNotes && SideNavCategoryEntry(key, apiDefs[key]))}
              </SideNav>
              <div className={classNames('vads-l-col--12', 'medium-screen:vads-l-col--8')}>
                <Route exact={true} path="/release-notes/" render={(routeProps) => renderOverview(routeProps, this.overviewProps)} />
                <Route exact={true} path="/release-notes/:apiCategoryKey" component={CategoryReleaseNotesPage} />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default ReleaseNotes;

