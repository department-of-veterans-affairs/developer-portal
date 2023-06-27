import React from 'react';
import { render } from '@testing-library/react';
import { TopicFilters } from './TopicFilters';

describe('TopicFilters', () => {
  const handleTopicFilterSubmit = jest.fn();

  beforeEach(() => {
    render(<TopicFilters handleTopicFilterSubmit={handleTopicFilterSubmit} topicFilter={[]} />);
  });

  it('should render', () => {
    expect(document.querySelector('.explore-filter-form')).toBeInTheDocument();
  });
});
