import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Flag } from '../../flags';
import { getApiDefinitions, getApisLoadedState } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';
import { CardLink, ApiTags, PageHeader } from '../../components';
import { defaultFlexContainer } from '../../styles/vadsUtils';
import { APINameParam } from '../../types';
import { apiLoadingState, FLAG_HOSTED_APIS, PAGE_HEADER_ID } from '../../types/constants';
import { CONSUMER_PATH } from '../../types/constants/paths';
import ApisLoader from '../../components/apisLoader/ApisLoader';

const CategoryPage = (): JSX.Element => {
  const { apiCategoryKey } = useParams<APINameParam>();

  if (
    getApisLoadedState() === apiLoadingState.IN_PROGRESS ||
    getApisLoadedState() === apiLoadingState.ERROR
  ) {
    return <ApisLoader />;
  }

  const {
    apis,
    name: categoryName,
    content: { overview, veteranRedirect, consumerDocsLinkText },
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
      {veteranRedirect && (
        <va-alert background-only show-icon status="info" key={apiCategoryKey} visible>
          <p className="vads-u-margin-y--0">
            {veteranRedirect.message}&nbsp;
            <a href={veteranRedirect.linkUrl}>{veteranRedirect.linkText}</a>.
          </p>
        </va-alert>
      )}
      <div className="vads-u-width--full">
        <ReactMarkdown>{overview}</ReactMarkdown>
        <p>
          <Link to={CONSUMER_PATH}>{consumerDocsLinkText}</Link>.
        </p>
      </div>
      {cardSection}
    </div>
  );
};

export default CategoryPage;
