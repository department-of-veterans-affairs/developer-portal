import * as React from 'react';

import { Flag } from 'flag';
import { RouteComponentProps } from 'react-router';

import { getApiDefinitions } from '../../apiDefs/query';
import { IApiDescription } from '../../apiDefs/schema';
import AuthorizationCard from '../../components/AuthorizationCard';
import CardLink from '../../components/CardLink';
import PageHeader from '../../components/PageHeader';
import TrustedPartnerOnlyTag from '../../components/TrustedPartnerOnlyTag';
import VAInternalOnlyTag from '../../components/VAInternalOnlyTag';
import { defaultFlexContainer } from '../../styles/vadsUtils';
import { IApiNameParam } from '../../types';

const onlyTags = ({vaInternalOnly, trustedPartnerOnly}:{vaInternalOnly: boolean, trustedPartnerOnly: boolean}) => {
  if (!vaInternalOnly && !trustedPartnerOnly) { return undefined; }
  return <>
    {vaInternalOnly ? <VAInternalOnlyTag /> : null}
    {trustedPartnerOnly ? <TrustedPartnerOnlyTag /> : null}
  </>;
};

export default class CategoryPage extends React.Component<RouteComponentProps<IApiNameParam>, {}> {
  public render() {
    const { apiCategoryKey } = this.props.match.params;
    const {
      apis,
      name: categoryName,
      content: { intro, overview },
    } = getApiDefinitions()[apiCategoryKey];

    let cardSection;
    const headerId = `${apiCategoryKey}-overview`;
    if (apis.length > 0) {
      const apiCards = apis.map((apiDesc: IApiDescription) => {
        const { description, name, urlFragment, vaInternalOnly, trustedPartnerOnly } = apiDesc;
        return (
          <Flag key={name} name={`hosted_apis.${urlFragment}`}>
            <CardLink
              name={name}
              subhead={onlyTags({vaInternalOnly, trustedPartnerOnly})}
              url={`/explore/${apiCategoryKey}/docs/${urlFragment}`}
            >
              {description}
            </CardLink>
          </Flag>
        );
      });

      const authCard = apis.some(api => !!api.oAuth) && categoryName !== 'Benefits API'  ? <AuthorizationCard categoryKey={apiCategoryKey} /> : null;

      cardSection = (
        <div role="navigation" aria-labelledby={headerId}>
          <div className={defaultFlexContainer()}>
            {authCard}
            {apiCards}
          </div>
        </div>
      );
    }

    return (
      <section role="region" aria-labelledby={headerId} className="va-api-api-overview">
        <PageHeader id={headerId} header={categoryName} />
        {intro({})}
        {cardSection}
        <div className="vads-u-width--full">{overview({})}</div>
        <hr />
      </section>
    );
  }
}
