import { Flag } from 'flag';
import * as React from 'react';

import { BaseAPICategory, IApiDescription } from '../../apiDefs/schema';
import { defaultFlexContainer } from '../../styles/vadsUtils';

import CardLink from '../../components/CardLink';
import OnlyTags from '../../components/OnlyTags';

// tslint:disable-next-line:interface-name
interface CategoryReleaseNotesCardSectionProps {
  apiFlagName: string;
  apiCategory: BaseAPICategory;
}

const CategoryReleaseNotesCardSection = (props: CategoryReleaseNotesCardSectionProps) => {
  const { apiCategory, apiFlagName } = props;

  if (apiCategory && apiCategory.apis.length > 1) {
    return (
      <div role="navigation" aria-labelledby={`${apiCategory.name}-release-notes`}>
        <div className={defaultFlexContainer()}>
          {apiCategory.apis.map((apiDesc: IApiDescription) => {
            const { description, name, urlFragment, vaInternalOnly, trustedPartnerOnly } = apiDesc;
            const dashUrlFragment = urlFragment.replace('_', '-');

            return (
              <Flag key={name} name={`${apiFlagName}.${urlFragment}`}>
                <CardLink
                  name={name}
                  subhead={
                    vaInternalOnly || trustedPartnerOnly ? (
                      <OnlyTags {...{ vaInternalOnly, trustedPartnerOnly }} />
                    ) : (
                      undefined
                    )
                  }
                  url={`/release-notes/${name}#${dashUrlFragment}`}
                >
                  {description}
                </CardLink>
              </Flag>
            );
          })}
        </div>
      </div>
    );
  }
  return null;
};

export default CategoryReleaseNotesCardSection;