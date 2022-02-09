import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import AlertBox from '@department-of-veterans-affairs/component-library/AlertBox';
import classNames from 'classnames';
import ReactMarkdown from 'react-markdown';
import LoadingIndicator from '@department-of-veterans-affairs/component-library/LoadingIndicator';
import { Flag } from '../../flags';
import { getApiDefinitions, getApisLoaded } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';
import { CardLink, ApiTags, PageHeader } from '../../components';
import { defaultFlexContainer } from '../../styles/vadsUtils';
import { APINameParam } from '../../types';
import { FLAG_HOSTED_APIS, PAGE_HEADER_ID } from '../../types/constants';
import { CONSUMER_PATH } from '../../types/constants/paths';
import { defaultLoadingProps } from '../../utils/loadingHelper';

const CategoryPage = (): JSX.Element => {
  const { apiCategoryKey } = useParams<APINameParam>();

  if (!getApisLoaded()) {
    return <LoadingIndicator {...defaultLoadingProps()} />;
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
