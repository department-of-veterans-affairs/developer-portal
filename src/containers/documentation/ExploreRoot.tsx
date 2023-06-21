import React from 'react';
import classNames from 'classnames';
import { getAllApis } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';
import { ExploreApiCard, PageHeader } from '../../components';
import ApisLoader from '../../components/apisLoader/ApisLoader';
import './ExploreRoot.scss';

const OAUTHTYPES = {
  AuthorizationCodeGrant: 'AUTHORIZATION CODE GRANT',
  ClientCredentialsGrant: 'CLIENT CREDENTIALS GRANT',
};

const RESTRICTED_ACCESS_APIS = [
  'Address Validation API',
  'Benefits Documents',
  'Clinical Health API (FHIR)',
  'Community Care Eligibility API',
  'Contact Information',
  'Decision Reviews API',
  'Direct Deposit',
  'Guaranty Remittance API',
  'Loan Guaranty API',
  'Loan Review',
  'VA Letter Generator API',
];

export const ExploreRoot = (): JSX.Element => {
  const apis = getAllApis();

  const generateFilterTags = (api: APIDescription): string[] => {
    const { name, oAuthTypes, openData } = api;
    let tags: string[] = [];

    if (oAuthTypes !== null) {
      oAuthTypes.forEach(type => {
        tags = [OAUTHTYPES[type] as string, ...tags];
      });
    }

    if (openData) {
      tags = ['OPEN DATA', ...tags];
    }

    if (RESTRICTED_ACCESS_APIS.includes(name)) {
      tags = ['RESTRICTED ACCESS', ...tags];
    }

    return tags;
  };

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
      <ApisLoader>
        <>
          <div data-cy="api-list" className="explore-main-container" role="list">
            {apis.map(api => (
              <ExploreApiCard key={api.urlSlug} api={api} filterTags={generateFilterTags(api)} />
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
