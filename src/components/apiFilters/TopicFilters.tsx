import React, { useRef, useState } from 'react';
import { FieldArray, Form, Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faTag } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { CheckboxRadioField } from '../formField';
import { getApiCategoryOrder, lookupApiCategory } from '../../apiDefs/query';
import { useOutsideGroupClick } from '../../hooks';

interface TopicFilterValues {
  topics: string[];
}

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
  const topicContainerRef = useRef(null);
  const topics = getApiCategoryOrder();

  const initialTopics: TopicFilterValues = { topics: topicFilter };

  const topicClassNames = classNames('filter-topic-container', {
    'vads-u-display--block': isTopicOpen,
    'vads-u-display--none': !isTopicOpen,
  });

  const toggleTopicOpen = (): void => setIsTopicOpen(prevState => !prevState);

  useOutsideGroupClick([topicButtonRef, topicContainerRef], () => {
    if (isTopicOpen) {
      toggleTopicOpen();
    }
  });

  return (
    <Formik initialValues={initialTopics} onSubmit={handleTopicFilterSubmit}>
      <FieldArray
        name="topics"
        render={(): JSX.Element => (
          <Form className="explore-filter-form vads-u-margin-right--2" noValidate>
            <button
              className="explore-filter-button"
              type="button"
              onClick={toggleTopicOpen}
              ref={topicButtonRef}
            >
              <FontAwesomeIcon className="vads-u-margin-right--1" icon={faTag} />
              Topics{topicFilter.length > 0 && ` (${topicFilter.length})`}
              {isTopicOpen ? (
                <FontAwesomeIcon className="filter-button-caret" icon={faCaretUp} />
              ) : (
                <FontAwesomeIcon className="filter-button-caret" icon={faCaretDown} />
              )}
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
              <button type="submit">APPLY FILTERS</button>
            </div>
          </Form>
        )}
      />
    </Formik>
  );
};
