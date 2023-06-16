import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import './ExploreApiCard.scss';

interface ExploreApiCardProps {
  description: string;
  filterTags: string[];
  name: string;
  urlSlug: string;
}

export const ExploreApiCard = ({
  description,
  filterTags = [],
  name,
  urlSlug,
}: ExploreApiCardProps): JSX.Element => (
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
    <p className={classNames('va-api-description', 'vads-u-color--base')}>{description}</p>
    <div className="tags-container">
      {filterTags.map(tag => (
        <span
          className={classNames(
            'usa-label',
            'vads-u-background-color--gray-lightest',
            'vads-u-color--base',
            'vads-u-padding-y--0p5',
            'vads-u-padding-x--1',
          )}
          key={`${tag} ${urlSlug}`}
        >
          {['CLIENT CREDENTIALS GRANT', 'RESTRICTED ACCESS'].includes(tag) && (
            <FontAwesomeIcon className="vads-u-margin-right--1" icon={faLock} />
          )}
          {tag.replace(/-/g, ' ').toUpperCase()}
        </span>
      ))}
    </div>
  </div>
);
