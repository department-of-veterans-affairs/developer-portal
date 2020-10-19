import * as React from 'react';

import AlertBox from '@department-of-veterans-affairs/formation-react/AlertBox';
import { useParams } from 'react-router';

import { lookupApiCategory } from '../../apiDefs/query';
import PageHeader from '../../components/PageHeader';
import { APINameParam } from '../../types';
import { PAGE_HEADER_ID } from '../../types/constants';
import { Link } from 'react-router-dom';
import { APIDescription } from 'src/apiDefs/schema';
import { now } from 'lodash';

const EndpointNotFoundPage = (): JSX.Element => {
  const { apiCategoryKey } = useParams<APINameParam>();
  const category = lookupApiCategory(apiCategoryKey);

  return (
    <div role="region" aria-labelledby={PAGE_HEADER_ID}>
      <AlertBox
        className="vads-u-margin-top--0 va-api-alert-box"
        headline="Page not found."
        content="Try using the links below or the search bar to find your way forward."
        status="warning"
      />
      {category?.name && (
        <PageHeader header={category.name} />
      )}
      <ul>
        {category?.apis
          .filter((item: APIDescription) => {
            return !item.deactivationInfo || item.deactivationInfo.deactivationDate.isAfter(now());
          })
          .map((item: APIDescription) => (
            <li key={item.urlFragment}>
              <Link to={`/explore/${apiCategoryKey}/docs/${item.urlFragment}`}>
                {item.name}
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
};

EndpointNotFoundPage.propTypes = {};

export default EndpointNotFoundPage;
