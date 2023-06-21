/* eslint-disable no-console */
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { APIDescription } from '../../apiDefs/schema';
import './ExploreApiCard.scss';
import { lookupApiCategory } from '../../apiDefs/query';

interface ExploreApiCardProps {
  api: APIDescription;
  filterTags: string[];
}

export const ExploreApiCard = ({ api, filterTags = [] }: ExploreApiCardProps): JSX.Element => {
  const { description, name, urlSlug } = api;
  console.log(api);
  const category = lookupApiCategory(api.categoryUrlFragment);

  return (
    <div className="explore-api-card-container" role="listitem">
      <Link
        to={`/explore/api/${urlSlug}`}
        className={classNames(
          'vads-u-text-decoration--none',
          'vads-u-margin-y--2',
          'vads-u-color--link-default',
          'vads-u-font-size--lg',
          'vads-u-font-weight--bold',
        )}
      >
        {name}
      </Link>
      <p className={classNames('vads-u-color--base')}>{description}</p>
      <div className="tags-container">
        {[category.name, ...filterTags].map(tag => (
          <span
            className={classNames(
              'explore-filter-tag',
              'vads-u-background-color--gray-lightest',
              'vads-u-color--base',
            )}
            key={`${tag} ${urlSlug}`}
          >
            {['CLIENT CREDENTIALS GRANT', 'RESTRICTED ACCESS'].includes(tag) && (
              <FontAwesomeIcon
                className={classNames('explore-fa-lock', 'vads-u-color--gray-medium')}
                icon={faLock}
              />
            )}
            {tag.replace(/-/g, ' ').toUpperCase()}
          </span>
        ))}
      </div>
    </div>
  );
};
