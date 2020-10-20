import classNames from 'classnames';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { getDeactivatedCategory, isApiDeactivated } from '../../apiDefs/deprecated';
import { isHostedApiEnabled } from '../../apiDefs/env';
import { getApiCategoryOrder, getApiDefinitions } from '../../apiDefs/query';
import { APIDescription, BaseAPICategory } from '../../apiDefs/schema';
import { SideNav, SideNavEntry } from '../../components';
import { Flag } from '../../flags';
import { onHashAnchorClick } from '../../utils/clickHandlers';
import { CategoryReleaseNotes, DeactivatedReleaseNotes } from './CategoryReleaseNotes';
import ReleaseNotesOverview from './ReleaseNotesOverview';

interface SideNavAPIEntryProps {
  api: APIDescription;
  categoryKey: string;
}

const SideNavAPIEntry = (props: SideNavAPIEntryProps): JSX.Element => {
  const { api, categoryKey } = props;
  const dashUrlFragment = props.api.urlFragment.replace('_', '-');
  return (
    <SideNavEntry
      key={api.urlFragment}
      to={`/release-notes/${categoryKey}#${dashUrlFragment}`}
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
              <small>Internal VA use only.{/* Trusted Partner use only. */}</small>
            </span>
          )}
        </React.Fragment>
      }
      subNavLevel={1}
      onClick={onHashAnchorClick}
    />
  );
};

interface SideNavCategoryEntryProps {
  categoryKey: string;
  apiCategory: BaseAPICategory;
}

const SideNavCategoryEntry = (props: SideNavCategoryEntryProps): JSX.Element => {
  const { apiCategory, categoryKey } = props;
  const apis: APIDescription[] = apiCategory.apis.filter(
    api => !isApiDeactivated(api) && isHostedApiEnabled(api.urlFragment, api.enabledByDefault),
  );

  return (
    <Flag name={['categories', categoryKey]} key={categoryKey}>
      <SideNavEntry to={`/release-notes/${categoryKey}`} name={apiCategory.name}>
        {apis.length > 1 &&
          apis.map(api => (
            <SideNavAPIEntry api={api} key={api.urlFragment} categoryKey={categoryKey} />
          ))}
      </SideNavEntry>
    </Flag>
  );
};

const ReleaseNotes = (): JSX.Element => {
  const categoryOrder = getApiCategoryOrder();
  const apiDefs = getApiDefinitions();
  const deactivatedCategory = getDeactivatedCategory();
  const deactivatedApis = deactivatedCategory.apis.filter(api =>
    isHostedApiEnabled(api.urlFragment, api.enabledByDefault),
  );

  return (
    <div className={classNames('vads-u-padding-y--5')}>
      <section>
        <div className="vads-l-grid-container">
          <div className="vads-l-row">
            <SideNav ariaLabel="Release Notes Side Nav" className="vads-u-margin-bottom--2">
              <SideNavEntry key="all" exact to="/release-notes" name="Overview" />
              {categoryOrder.map((key: string) => (
                <SideNavCategoryEntry categoryKey={key} apiCategory={apiDefs[key]} key={key} />
              ))}
              {deactivatedApis.length > 0 && (
                <SideNavEntry to="/release-notes/deactivated" name={deactivatedCategory.name}>
                  {deactivatedApis.length > 1 &&
                    deactivatedApis.map(api => (
                      <SideNavAPIEntry api={api} key={api.urlFragment} categoryKey="deactivated" />
                    ))}
                </SideNavEntry>
              )}
            </SideNav>
            <div className={classNames('vads-l-col--12', 'medium-screen:vads-l-col--8')}>
              <Switch>
                <Route exact path="/release-notes/" component={ReleaseNotesOverview} />
                <Route
                  exact
                  path="/release-notes/deactivated"
                  component={DeactivatedReleaseNotes}
                />
                <Route path="/release-notes/:apiCategoryKey" component={CategoryReleaseNotes} />
              </Switch>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReleaseNotes;
