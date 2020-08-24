import AlertBox from '@department-of-veterans-affairs/formation-react/AlertBox';
import classNames from 'classnames';
import { Flag } from 'flag';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { getDeactivatedCategory, isApiDeactivated } from '../../apiDefs/deprecated';
import { getApiDefinitions } from '../../apiDefs/query';
import { BaseAPICategory, IApiDescription } from '../../apiDefs/schema';
import CardLink from '../../components/CardLink';
import OnlyTags from '../../components/OnlyTags';
import PageHeader from '../../components/PageHeader';
import { defaultFlexContainer } from '../../styles/vadsUtils';
import { IApiNameParam } from '../../types';

// tslint:disable-next-line:interface-name
interface ReleaseNotesCardLinksProps {
  apiFlagName: string;
  apiCategory: BaseAPICategory;
}

const ReleaseNotesCardLinks = (props: ReleaseNotesCardLinksProps) => {
  const { apiCategory, apiFlagName } = props;
  if (apiCategory.apis.length < 1) {
    return null;
  }

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
};

const APIReleaseNote = ({ api, flagName }: { api: IApiDescription; flagName: string }) => {
  const dashUrlFragment = api.urlFragment.replace('_', '-');

  return (
    <Flag name={`${flagName}.${api.urlFragment}`}>
      <div id={dashUrlFragment}>
        <h2>{api.name}</h2>
        {api.deactivationInfo && isApiDeactivated(api) && (
          <AlertBox headline="Deactivated API" status="info">
            {api.deactivationInfo.deactivationContent({})}
          </AlertBox>
        )}
        {api.releaseNotes({})}
        <hr />
      </div>
    </Flag>
  );
};

const CategoryReleaseNotesPageContent = ({
  apiCategory,
  apiFlagName,
}: {
  apiCategory: BaseAPICategory;
  apiFlagName: string;
}) => {
  if (apiCategory && apiFlagName !== '') {
    return (
      <section role="region" aria-labelledby={`${apiCategory.name}-release-notes`}>
        <PageHeader
          halo={apiCategory.name}
          header="Release Notes"
          id={`${apiCategory.name}-release-notes`}
        />
        <ReleaseNotesCardLinks apiCategory={apiCategory} apiFlagName={apiFlagName} />
        <div className={classNames('vads-u-width--full', 'vads-u-margin-top--4')}>
          {apiCategory.apis.map((api: IApiDescription) => (
            <APIReleaseNote flagName={apiFlagName} key={api.urlFragment} api={api} />
          ))}
        </div>
      </section>
    );
  }
  return null;
};

export const ActiveCategoryReleaseNotesPage = (props: RouteComponentProps<IApiNameParam>) => {
  const { apiCategoryKey } = props.match.params;
  const categoryDefinition = getApiDefinitions()[apiCategoryKey];
  return (
    <CategoryReleaseNotesPageContent apiCategory={categoryDefinition} apiFlagName="hosted_apis" />
  );
};

export const DeactivatedReleaseNotesPage = () => {
  return (
    <CategoryReleaseNotesPageContent
      apiCategory={getDeactivatedCategory()}
      apiFlagName="deactivated_apis"
    />
  );
};
