import * as React from 'react';
import { Helmet } from 'react-helmet';
import LoadingIndicator from '@department-of-veterans-affairs/component-library/LoadingIndicator';
import { getDeactivatedCategory } from '../../apiDefs/deprecated';
import { getApiCategoryOrder, getApiDefinitions, getApisLoaded } from '../../apiDefs/query';
import { CardLink, PageHeader } from '../../components';
import { Flag } from '../../flags';
import { defaultFlexContainer } from '../../styles/vadsUtils';
import { FLAG_CATEGORIES } from '../../types/constants';
import { defaultLoadingProps } from '../../utils/loadingHelper';

const ReleaseNotesOverview = (): JSX.Element => {
  const apisLoaded = getApisLoaded();
  const apiDefs = getApiDefinitions();
  const deactivatedCategory = getDeactivatedCategory();
  return (
    <div>
      <Helmet>
        <title>Release Notes</title>
      </Helmet>
      <PageHeader header="Release Notes" />
      <div className="vads-u-font-size--lg">
        <p>
          The VA Lighthouse product teams periodically update these APIs in order to deliver new
          features and repair defects. We avoid doing so whenever possible but occasionally we need
          to make breaking changes that require developers to modify their existing applications to
          see the benefits of these features and fixes.
        </p>
        <p>
          We recommend that developers periodically check this list for announcements of breaking
          changes and added features. Changes will also be announced via direct email whenever
          possible to addresses used to obtain developer keys for each API. Please{' '}
          <a href="/support/contact-us">contact us</a> with any questions or to request support.
        </p>
      </div>
      <div className={defaultFlexContainer()}>
        {apisLoaded ? (
          <>
            {getApiCategoryOrder().map((apiCategoryKey: string) => {
              const { name, content } = apiDefs[apiCategoryKey];
              return (
                <Flag name={[FLAG_CATEGORIES, apiCategoryKey]} key={apiCategoryKey}>
                  <CardLink
                    name={name}
                    url={`/release-notes/${apiCategoryKey}`}
                    callToAction={`View release notes for the ${name}`}
                  >
                    {content.shortDescription}
                  </CardLink>
                </Flag>
              );
            })}
            {deactivatedCategory.apis.length > 0 && (
              <CardLink
                name={deactivatedCategory.name}
                url="/release-notes/deactivated"
                callToAction="View release notes for deactivated APIs"
              >
                This is a repository for deactivated APIs and related documentation and release
                notes.
              </CardLink>
            )}
          </>
        ) : (
          <LoadingIndicator {...defaultLoadingProps()} />
        )}
      </div>
    </div>
  );
};

export default ReleaseNotesOverview;
