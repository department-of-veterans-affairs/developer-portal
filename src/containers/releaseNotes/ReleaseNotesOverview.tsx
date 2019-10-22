import { Flag } from 'flag';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { getApiCategoryOrder, getApiDefinitions } from '../../apiDefs/query';
import CardLink from '../../components/CardLink';
import PageHeader from '../../components/PageHeader';
import { defaultFlexContainer } from '../../styles/vadsUtils';

export default class Overview extends React.Component<RouteComponentProps> {
  public render() {
    const apiDefs = getApiDefinitions();
    const hasReleaseNotes = (categoryKey: string) => !!apiDefs[categoryKey].content.releaseNotes;
    const categoriesWithNotes = getApiCategoryOrder().filter(hasReleaseNotes);

    return (
      <div>
        <PageHeader halo="Release Notes" header="Overview" />
        <div className="vads-u-font-size--lg">
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
        <div className={defaultFlexContainer()}>
          {categoriesWithNotes.filter(hasReleaseNotes).map((apiCategoryKey: string) => {
            const { name, content } = apiDefs[apiCategoryKey];
            return (
              <Flag name={`categories.${apiCategoryKey}`} key={apiCategoryKey}>
                <CardLink name={name} url={`/release-notes/${apiCategoryKey}`}>
                  {content.shortDescription}
                </CardLink>
              </Flag>
            );
          })}
        </div>
      </div>
    );
  }
}
