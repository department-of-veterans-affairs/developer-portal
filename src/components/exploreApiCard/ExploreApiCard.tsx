import React from 'react';
import { Link } from 'react-router-dom';
import './ExploreApiCard.scss';

interface ExploreApiCardProps {
  description: string;
  filterTags: string[];
  name: string;
  urlFragment: string;
}

export const ExploreApiCard = ({
  description,
  filterTags = [],
  name,
  urlFragment,
}: ExploreApiCardProps): JSX.Element => {
  return (
    <div className="explore-api-card-container">
      <Link
        to={`/explore/api/${urlFragment}`}
        className="vads-u-text-decoration--none vads-u-margin-y--2 vads-u-color--link-default vads-u-font-size--lg vads-u-font-weight--bold"
      >
        {name}
      </Link>
      <p className="va-api-description vads-u-color--base">{description}</p>
      <div className="tags-container">
        {filterTags.map((tag, index) => (
          <span className="usa-label" key={index}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
