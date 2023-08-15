import React from 'react';
import { APIDescription } from '../../apiDefs/schema';
import { generateFilterTags } from '../../utils/generateFilterTags';
import { ApiTag } from '../../components';
import './ExploreApiTags.scss';

export const ExploreApiTags = ({ api }: { api: APIDescription }): JSX.Element => {
  const { categoryUrlFragment, name, oAuthTypes, openData, urlSlug } = api;
  const filterTags = generateFilterTags(categoryUrlFragment, name, oAuthTypes, openData);

  return (
    <div className="explore-filter-tags">
      {filterTags.map(tagData => (
        <ApiTag
          key={`${tagData.tagName} ${urlSlug}`}
          showLock={tagData.showLock}
          tagName={tagData.tagName}
        />
      ))}
    </div>
  );
};
