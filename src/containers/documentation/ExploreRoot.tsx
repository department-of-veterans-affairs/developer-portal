import React, { useState } from 'react';
import classNames from 'classnames';
import { ApiFilters, ExploreApiCard, PageHeader } from '../../components';
import ApisLoader from '../../components/apisLoader/ApisLoader';
import { APIDescription } from '../../apiDefs/schema';
import './ExploreRoot.scss';

export const ExploreRoot = (): JSX.Element => {
  const [apis, setApis] = useState<APIDescription[]>([]);

  return (
    <div className="explore-root-container">
      <PageHeader
        header="Explore our APIs"
        subText="View and sort our APIs to find the best one for your needs."
      />
      <ApiFilters apis={apis} setApis={setApis} />
      <ApisLoader>
        <>
          <div data-cy="api-list" className="explore-main-container" role="list">
            {apis.map((api: APIDescription) => (
              <ExploreApiCard key={api.urlSlug} api={api} />
            ))}
          </div>
          <p className={classNames('explore-end-of-list', 'vads-u-color--gray-warm-dark')}>
            End of list
          </p>
        </>
      </ApisLoader>
    </div>
  );
};
