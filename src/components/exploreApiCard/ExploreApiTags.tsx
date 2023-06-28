import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { APIDescription } from '../../apiDefs/schema';
import { generateFilterTags } from '../../utils/generateFilterTags';
import './ExploreApiTags.scss';

const ExploreApiTag = ({ tag }: { tag: string }): JSX.Element => (
  <span
    className={classNames(
      'explore-filter-tag',
      'vads-u-background-color--gray-lightest',
      'vads-u-color--base',
    )}
  >
    {['CLIENT CREDENTIALS GRANT', 'RESTRICTED ACCESS'].includes(tag) && (
      <FontAwesomeIcon
        className={classNames('explore-fa-lock', 'vads-u-color--gray-medium')}
        icon={faLock}
      />
    )}
    {tag.replace(/-/g, ' ').toUpperCase()}
  </span>
);

export const ExploreApiTags = ({ api }: { api: APIDescription }): JSX.Element => {
  const { categoryUrlFragment, name, oAuthTypes, openData, urlSlug } = api;
  const filterTags = generateFilterTags(categoryUrlFragment, name, oAuthTypes, openData);

  return (
    <div className="explore-filter-tags">
      {filterTags.map((tag: string) => (
        <ExploreApiTag key={`${tag} ${urlSlug}`} tag={tag} />
      ))}
    </div>
  );
};
