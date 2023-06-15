import React from 'react';
import { Link } from 'react-router-dom';
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
      className="vads-u-text-decoration--none vads-u-margin-y--2 vads-u-color--link-default vads-u-font-size--lg vads-u-font-weight--bold"
    >
      {name}
    </Link>
    <p className="va-api-description vads-u-color--base">{description}</p>
    <div className="tags-container">
      {filterTags.map(tag => (
        <span className="usa-label" key={`${tag} ${urlSlug}`}>
          {tag.replace(/-/g, ' ').toUpperCase()}
        </span>
      ))}
    </div>
  </div>
);
