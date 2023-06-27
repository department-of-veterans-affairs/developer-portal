import React, { useRef, useState } from 'react';
import { FieldArray, Form, Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faMinus, faPlus, faTag } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { CheckboxRadioField } from '../formField';
import { getApiCategoryOrder, lookupApiCategory } from '../../apiDefs/query';
import { useOutsideGroupClick } from '../../hooks';
import { TopicFilterValues } from './ApiFilters';

interface TopicFiltersProps {
  handleTopicFilterSubmit: (values: TopicFilterValues) => void;
  topicFilter: string[];
}

export const TopicFilters = ({
  handleTopicFilterSubmit,
  topicFilter,
}: TopicFiltersProps): JSX.Element => {
  const [isTopicOpen, setIsTopicOpen] = useState<boolean>(false);
  const topicButtonRef = useRef(null);
  const topicButtonRef2 = useRef(null);
  const topicContainerRef = useRef(null);
  const topics = getApiCategoryOrder();

  const initialTopics: TopicFilterValues = { topics: topicFilter };

  const topicClassNames = classNames('filter-topic-container', {
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

  return (
    <Formik
      className="explore-formik-container"
      initialValues={initialTopics}
      onSubmit={handleFormSubmit}
    >
      <FieldArray
        name="topics"
        render={(): JSX.Element => (
          <Form className="explore-filter-form medium-screen:vads-u-margin-right--2" noValidate>
            <button
              className="explore-filter-button vads-u-display--none medium-screen:vads-u-display--flex"
              type="button"
              onClick={toggleTopicOpen}
              ref={topicButtonRef}
            >
              <FontAwesomeIcon className="vads-u-margin-right--1" icon={faTag} />
              Topics{topicFilter.length > 0 && ` (${topicFilter.length})`}
              <FontAwesomeIcon
                className="filter-button-caret"
                icon={isTopicOpen ? faCaretUp : faCaretDown}
              />
            </button>
            <button
              className="explore-filter-button vads-u-display--flex medium-screen:vads-u-display--none"
              type="button"
              onClick={toggleTopicOpen}
              ref={topicButtonRef2}
            >
              <FontAwesomeIcon className="vads-u-margin-right--1" icon={faTag} />
              Topics{topicFilter.length > 0 && ` (${topicFilter.length})`}
              <FontAwesomeIcon
                className="filter-button-caret"
                icon={isTopicOpen ? faMinus : faPlus}
              />
            </button>
            <div className={topicClassNames} ref={topicContainerRef}>
              {topics.map((topic: string) => {
                const category = lookupApiCategory(topic);
                return (
                  <CheckboxRadioField
                    key={category.urlSlug}
                    label={`${category.name} (${category.apis.length})`}
                    name="topics"
                    type="checkbox"
                    value={category.urlSlug}
                  />
                );
              })}
              <button
                type="submit"
                aria-label="Apply filters to update the API list and close the filter menu"
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
