import React from 'react';
import { getApisLoaded, lookupApiCategoryBySlug } from '../../apiDefs/query';
import { TOPIC_FILTER_NAMES } from './TopicFilters';
import { getAuthTypeName } from './AuthFilters';

interface ScreenReaderFiltersProps {
  numOfApis: number;
  topics: string[];
  auth: string[];
  search: string;
}

export const ScreenReaderFilters = ({
  numOfApis,
  topics,
  auth,
  search,
}: ScreenReaderFiltersProps): JSX.Element | null => {
  const apisLoaded = getApisLoaded();

  if (!apisLoaded) {
    return null;
  }

  const generateTopicFilterNames = (): string => {
    let topicFilterNames = '';
    topics.forEach((topic, index) => {
      const category = lookupApiCategoryBySlug(topic);
      if (category) {
        topicFilterNames += TOPIC_FILTER_NAMES[category.name];
      }
      if ((index === 0 && topics.length > 1) || index !== topics.length - 1) {
        topicFilterNames += ', ';
      }
    });
    return topicFilterNames;
  };

  const generateAuthFilterNames = (): string => {
    let authFilterNames = '';
    auth.forEach((authType, index) => {
      authFilterNames += getAuthTypeName(authType);
      if ((index === 0 && auth.length > 1) || index !== auth.length - 1) {
        authFilterNames += ', ';
      }
    });
    return authFilterNames;
  };

  // eslint-disable-next-line complexity
  const generateScreenReaderString = (): string => {
    let filterString = `Showing all ${numOfApis} items`;
    const topicFilterNames = generateTopicFilterNames();
    const authFilterNames = generateAuthFilterNames();

    if (topicFilterNames || authFilterNames || search) {
      filterString += ' for ';
    }

    if (topicFilterNames) {
      filterString += `${topicFilterNames}`;
    }

    if (authFilterNames) {
      if (topicFilterNames) {
        filterString += `, ${authFilterNames}`;
      } else {
        filterString += `${authFilterNames}`;
      }
    }

    if (search) {
      if (topicFilterNames || authFilterNames) {
        filterString += ' and ';
      }
      filterString += `search term ${search}`;
    }

    if (topicFilterNames || authFilterNames || search) {
      filterString += ' APIs';
    }

    return filterString;
  };

  return (
    <span aria-live="polite" className="sr-only">
      {generateScreenReaderString()}
    </span>
  );
};
