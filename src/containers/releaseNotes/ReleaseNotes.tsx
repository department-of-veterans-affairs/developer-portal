import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { PAGE_HEADER_AND_HALO_ID } from '../../types/constants';
import {
  RELEASE_NOTES_CATEGORY_PATH,
  RELEASE_NOTES_DEACTIVATED_PATH,
  RELEASE_NOTES_PATH,
} from '../../types/constants/paths';
import { getDeactivatedCategory, isApiDeactivated } from '../../apiDefs/deprecated';
import { isHostedApiEnabled } from '../../apiDefs/env';
import { getApiCategoryOrder, getApiDefinitions } from '../../apiDefs/query';
import { APIDescription, BaseAPICategory } from '../../apiDefs/schema';
import { ContentWithNav, SideNavEntry } from '../../components';
import { Flag } from '../../flags';
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
          {api.vaInternalOnly && api.trustedPartnerOnly ? <br /> : null}
          {api.trustedPartnerOnly && (
            <span>
              <small>Internal VA use only.{/* Trusted Partner use only. */}</small>
            </span>
          )}
        </React.Fragment>
      }
      subNavLevel={1}
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
    <ContentWithNav
      nav={
        <>
          <SideNavEntry key="all" exact to={RELEASE_NOTES_PATH} name="Overview" />
          {categoryOrder.map((key: string) => (
            <SideNavCategoryEntry categoryKey={key} apiCategory={apiDefs[key]} key={key} />
          ))}
          {deactivatedApis.length > 0 && (
            <SideNavEntry to={RELEASE_NOTES_DEACTIVATED_PATH} name={deactivatedCategory.name}>
              {deactivatedApis.length > 1 &&
                deactivatedApis.map(api => (
                  <SideNavAPIEntry api={api} key={api.urlFragment} categoryKey="deactivated" />
                ))}
            </SideNavEntry>
          )}
        </>
      }
      content={
        <Switch>
          <Route exact path={RELEASE_NOTES_PATH} component={ReleaseNotesOverview} />
          <Route exact path={RELEASE_NOTES_DEACTIVATED_PATH} component={DeactivatedReleaseNotes} />
          <Route path={RELEASE_NOTES_CATEGORY_PATH} component={CategoryReleaseNotes} />
        </Switch>
      }
      navAriaLabel="Release Notes Side Nav"
      contentAriaLabelledBy={PAGE_HEADER_AND_HALO_ID}
    />
  );
};

export default ReleaseNotes;
