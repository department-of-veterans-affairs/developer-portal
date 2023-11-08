import React from 'react';
import { APIDescription } from '../../apiDefs/schema';
import { generateFilterTags } from '../../utils/generateFilterTags';
import { ApiTag } from '../../components';
import './ExploreApiTags.scss';

export const ExploreApiTags = ({ api }: { api: APIDescription }): JSX.Element => {
  const { urlSlug } = api;
  const filterTags = generateFilterTags(api);

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
