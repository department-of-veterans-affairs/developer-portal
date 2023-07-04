import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { APIDescription } from '../../apiDefs/schema';
import { generateFilterTags, TagDataProps } from '../../utils/generateFilterTags';
import './ExploreApiTags.scss';

const ExploreApiTag = ({ showLock, tagName }: TagDataProps): JSX.Element => (
  <span
    className={classNames(
      'explore-filter-tag',
      'vads-u-background-color--gray-lightest',
      'vads-u-color--base',
    )}
  >
    {showLock && (
      <FontAwesomeIcon
        className={classNames('explore-fa-lock', 'vads-u-color--gray-medium')}
        icon={faLock}
      />
    )}
    {tagName.replace(/-/g, ' ').toUpperCase()}
  </span>
);

export const ExploreApiTags = ({ api }: { api: APIDescription }): JSX.Element => {
  const { categoryUrlFragment, name, oAuthTypes, openData, urlSlug } = api;
  const filterTags = generateFilterTags(categoryUrlFragment, name, oAuthTypes, openData);

  return (
    <div className="explore-filter-tags">
      {filterTags.map(tagData => (
        <ExploreApiTag
          key={`${tagData.tagName} ${urlSlug}`}
          showLock={tagData.showLock}
          tagName={tagData.tagName}
        />
      ))}
    </div>
  );
};
