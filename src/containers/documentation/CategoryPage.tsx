import * as React from 'react';
import Helmet from 'react-helmet';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import AlertBox from '@department-of-veterans-affairs/component-library/AlertBox';
import classNames from 'classnames';
import { Flag } from '../../flags';
import { getApiDefinitions } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';
import { CardLink, OnlyTags, PageHeader } from '../../components';
import { defaultFlexContainer } from '../../styles/vadsUtils';
import { APINameParam } from '../../types';
import { FLAG_HOSTED_APIS, PAGE_HEADER_ID, FLAG_CONSUMER_DOCS } from '../../types/constants';
import { CONSUMER_PATH } from '../../types/constants/paths';

const CategoryPage = (): JSX.Element => {
  const { apiCategoryKey } = useParams<APINameParam>();

  const {
    apis,
    name: categoryName,
    content: { overview, veteranRedirect, consumerDocsLinkText },
  } = getApiDefinitions()[apiCategoryKey];

  let cardSection;
  if (apis.length > 0) {
    const apiCards = apis.map((apiDesc: APIDescription) => {
      const { description, name, urlFragment, vaInternalOnly, trustedPartnerOnly } = apiDesc;
      return (
        <Flag key={name} name={[FLAG_HOSTED_APIS, urlFragment]}>
          <CardLink
            name={name}
            subhead={
              vaInternalOnly || trustedPartnerOnly ? (
                <OnlyTags {...{ trustedPartnerOnly, vaInternalOnly }} />
              ) : undefined
            }
            url={`/explore/${apiCategoryKey}/docs/${urlFragment}`}
          >
            {description}
          </CardLink>
        </Flag>
      );
    });

    cardSection = (
      <div role="navigation" aria-labelledby={PAGE_HEADER_ID}>
        <div className={defaultFlexContainer()}>{apiCards}</div>
      </div>
    );
  }

  return (
    <div className="va-api-api-overview">
      <Helmet>
        <title>{categoryName}</title>
      </Helmet>
      <PageHeader header={categoryName} />
      {veteranRedirect && (
        <AlertBox
          status="info"
          key={apiCategoryKey}
          className={classNames('vads-u-margin-bottom--2', 'vads-u-padding-y--1')}
        >
          {veteranRedirect.message}&nbsp;
          <a href={veteranRedirect.linkUrl}>{veteranRedirect.linkText}</a>.
        </AlertBox>
      )}
      <div className="vads-u-width--full">
        {overview({})}
        <Flag name={[FLAG_CONSUMER_DOCS]}>
          <p>
            <Link to={CONSUMER_PATH}>{consumerDocsLinkText}</Link>.
          </p>
        </Flag>
      </div>
      {cardSection}
    </div>
  );
};

export default CategoryPage;
