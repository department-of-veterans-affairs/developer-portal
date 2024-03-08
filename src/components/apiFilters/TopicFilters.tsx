import React, { useRef, useState } from 'react';
import { FieldArray, Form, Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faMinus, faPlus, faTag } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { CheckboxRadioField } from '../formField';
import {
  countActiveApisByCategory,
  getApiCategoryOrder,
  getApisLoaded,
  lookupApiCategory,
} from '../../apiDefs/query';
import { useOutsideGroupClick } from '../../hooks';
import { TopicFilterValues } from './ApiFilters';

export const TOPIC_FILTER_NAMES = {
  'Facilities API': 'Facilities',
  'Facilities APIs': 'Facilities',
  'Forms API': 'Forms',
  'Forms APIs': 'Forms',
  'Health APIs': 'Health',
  'Loan Guaranty APIs': 'Loan Guaranty',
  'VA Benefits': 'VA Benefits',
  'Veteran Verification APIs': 'Verification',
};

interface TopicFiltersProps {
  handleTopicFilterSubmit: (values: TopicFilterValues) => void;
  topicFilter: string[];
}

export const TopicFilters = ({
  handleTopicFilterSubmit,
  topicFilter,
}: TopicFiltersProps): JSX.Element => {
  const [isTopicOpen, setIsTopicOpen] = useState<boolean>(false);
  const topicButtonRef = useRef<HTMLButtonElement | null>(null);
  const topicButtonRef2 = useRef<HTMLButtonElement | null>(null);
  const topicContainerRef = useRef(null);
  const topics = getApiCategoryOrder();

  const initialTopics: TopicFilterValues = { topics: topicFilter };

  const topicClassNames = classNames('filter-container--topic', {
    'vads-u-display--block': isTopicOpen,
    'vads-u-display--none': !isTopicOpen,
  });

  const toggleTopicOpen = (): void => setIsTopicOpen(prevState => !prevState);

  useOutsideGroupClick([topicButtonRef, topicButtonRef2, topicContainerRef], () => {
    if (isTopicOpen) {
      toggleTopicOpen();
    }
  });

  const handleFormSubmit = (values: TopicFilterValues): void => {
    toggleTopicOpen();
    handleTopicFilterSubmit(values);
  };

  const topicFilterAriaLabel =
    topicFilter.length > 0
      ? `Topics, ${topicFilter.length} filter${topicFilter.length > 1 ? 's' : ''} applied`
      : 'Topics';

  return (
    <Formik
      className="explore-formik-container"
      initialValues={initialTopics}
      onSubmit={handleFormSubmit}
    >
      <FieldArray
        name="topics"
        render={(): JSX.Element => (
          <Form
            className="explore-filter-form medium-screen:vads-u-margin-right--2"
            noValidate
            name="explore-topic-filter"
          >
            <button
              id="topic-filter-button-desktop"
              aria-expanded={isTopicOpen}
              aria-label={topicFilterAriaLabel}
              className="explore-filter-button vads-u-display--none medium-screen:vads-u-display--flex"
              type="button"
              onClick={toggleTopicOpen}
              ref={topicButtonRef}
            >
              <FontAwesomeIcon className="vads-u-margin-right--1" icon={faTag as IconProp} />
              Topics{topicFilter.length > 0 && ` (${topicFilter.length})`}
              <FontAwesomeIcon
                className="filter-button-caret"
                icon={(isTopicOpen ? faCaretUp : faCaretDown) as IconProp}
              />
            </button>
            <button
              id="topic-filter-button-mobile"
              aria-expanded={isTopicOpen}
              aria-label={topicFilterAriaLabel}
              className="explore-filter-button vads-u-display--flex medium-screen:vads-u-display--none"
              type="button"
              onClick={toggleTopicOpen}
              ref={topicButtonRef2}
            >
              <FontAwesomeIcon className="vads-u-margin-right--1" icon={faTag as IconProp} />
              Topics{topicFilter.length > 0 && ` (${topicFilter.length})`}
              <FontAwesomeIcon
                className="filter-button-caret"
                icon={(isTopicOpen ? faMinus : faPlus) as IconProp}
              />
            </button>
            <div className={topicClassNames} ref={topicContainerRef}>
              {getApisLoaded() &&
                topics.map((topic: string) => {
                  const category = lookupApiCategory(topic);
                  const numOfActiveApis = countActiveApisByCategory(topic);
                  return (
                    <CheckboxRadioField
                      key={category.urlSlug}
                      label={`${TOPIC_FILTER_NAMES[category.name] as string} (${numOfActiveApis})`}
                      name="topics"
                      type="checkbox"
                      value={category.urlSlug}
                    />
                  );
                })}
              <button
                aria-label="Apply filters to update the API list and close the filter menu"
                className="vads-u-margin-top--2 vads-u-margin-bottom--0"
                type="submit"
              >
                APPLY FILTERS
              </button>
            </div>
          </Form>
        )}
      />
    </Formik>
  );
};
