import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Flag } from '../../flags';
import { getApiDefinitions } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';
import { CardLink, ApiTags, PageHeader, VeteranResources } from '../../components';
import { defaultFlexContainer } from '../../styles/vadsUtils';
import { APINameParam } from '../../types';
import { FLAG_HOSTED_APIS, PAGE_HEADER_ID } from '../../types/constants';
import { CONSUMER_PATH } from '../../types/constants/paths';

const VETERAN_BANNER_APPROVED_ROUTES = [
  '/explore/benefits',
  '/explore/facilities',
  '/explore/vaForms',
];

const CategoryPage = (): JSX.Element => {
  const { apiCategoryKey } = useParams<APINameParam>();
  const location = useLocation();
  const {
    apis,
    name: categoryName,
    content: { overview, consumerDocsLinkText },
  } = getApiDefinitions()[apiCategoryKey];

  let cardSection;
  if (apis.length > 0) {
    const apiCards = apis.map((apiDesc: APIDescription) => {
      const { description, name, urlFragment, vaInternalOnly, openData } = apiDesc;
      return (
        <Flag key={name} name={[FLAG_HOSTED_APIS, urlFragment]}>
          <CardLink
            name={name}
            subhead={<ApiTags {...{ openData, vaInternalOnly }} />}
            url={`/explore/${apiCategoryKey}/docs/${urlFragment}`}
            callToAction={`View the ${name}`}
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
      {!!VETERAN_BANNER_APPROVED_ROUTES.find(route => location.pathname.includes(route)) && (
        <VeteranResources />
      )}
      <div className="vads-u-width--full">
        {overview({})}
        <p>
          <Link to={CONSUMER_PATH}>{consumerDocsLinkText}</Link>.
        </p>
      </div>
      {cardSection}
    </div>
  );
};

export default CategoryPage;
