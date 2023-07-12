import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { APIDescription } from '../../apiDefs/schema';
import { ExploreApiTags } from './ExploreApiTags';
import './ExploreApiCard.scss';

export const ExploreApiCard = ({
  api,
  className,
}: {
  api: APIDescription;
  className?: string;
}): JSX.Element => (
  <Link
    to={`/explore/api/${api.urlSlug}`}
    className={classNames(
      'vads-u-text-decoration--none',
      'vads-u-margin-y--2',
      'vads-u-color--link-default',
      className,
    )}
    role="listitem"
  >
    <div className="explore-api-card-container">
      <span className={classNames('vads-u-font-size--lg', 'vads-u-font-weight--bold')}>
        {api.name}
      </span>
      <p className={classNames('vads-u-color--base')}>{api.description}</p>
      <ExploreApiTags api={api} />
    </div>
  </Link>
);
