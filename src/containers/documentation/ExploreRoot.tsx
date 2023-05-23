import React, { useEffect, useState } from 'react';
import { getAllApis } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';
import { ExploreApiCard, PageHeader } from '../../components';
import './ExploreRoot.scss';

export const ExploreRoot = (): JSX.Element => {
  const [apis, setApis] = useState<APIDescription[]>([]);

  useEffect(() => {
    if (!apis.length) {
      const allApis = getAllApis();
      setApis(allApis);
    }
  }, [apis]);

  return (
    <div className="explore-root-container">
      <PageHeader header="Explore our APIs" />
      <p className="vads-u-margin-y--0">
        View and sort our APIs to find the best one for your needs.
      </p>
      <div className="filters-container" data-cy="explore-filters">
        <div className="filter-controls">
          <select className="filter-size" name="topic" id="topic">
            <option value="topic-1">Topic 1</option>
            <option value="topic-2">Topic 2</option>
            <option value="topic-3">Topic 3</option>
          </select>
          <select className="filter-size" name="auth" id="auth">
            <option value="auth-1">Auth 1</option>
            <option value="auth-2">Auth 2</option>
            <option value="auth-3">Auth 3</option>
          </select>
          <input className="filter-size" placeholder="Search APIs by keyword" type="search" />
        </div>
        <div className="caption-container">
          <p className="vads-u-margin-y--0 vads-u-font-family--serif">
            Showing all{' '}
            <span data-testid="api-count" className="vads-u-font-weight--bold">
              {apis.length}
            </span>{' '}
            items
          </p>
        </div>
      </div>
      <div data-cy="api-list" className="explore-main-container" role="list">
        {apis.map(api => (
          <ExploreApiCard
            description={api.description}
            filterTags={['PLACEHOLDER TAG']}
            key={api.urlFragment}
            name={api.name}
            urlFragment={api.urlFragment}
          />
        ))}
      </div>
    </div>
  );
};
