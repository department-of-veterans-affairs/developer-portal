import { VaAlert } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { isApiDeactivated } from '../../apiDefs/deprecated';
import { lookupApiCategory } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';
import { PageHeader } from '../../components';
import { FLAG_API_ENABLED_PROPERTY, PAGE_HEADER_ID } from '../../types/constants';
import { useFlag } from '../../flags';

const ApiNotFoundPage = (): JSX.Element => {
  const { apiCategoryKey } = useParams();
  const category = lookupApiCategory(apiCategoryKey as string);
  const flags = useFlag([FLAG_API_ENABLED_PROPERTY]);

  return (
    <div role="region" aria-labelledby={PAGE_HEADER_ID}>
      <VaAlert status="warning" visible uswds>
        <p className="vads-u-margin-y--0">Page not found.</p>
        <p className="vads-u-margin-top--1">
          Try using the links below or the search bar to find your way forward.
        </p>
      </VaAlert>
      {category.name && <PageHeader header={category.name} />}
      <ul>
        {category.apis
          .filter((item: APIDescription) => !isApiDeactivated(item) && flags[item.urlSlug])
          .map((item: APIDescription) => (
            <li key={item.urlSlug}>
              <Link to={`/explore/api/${item.urlSlug}`}>{item.name}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ApiNotFoundPage;
