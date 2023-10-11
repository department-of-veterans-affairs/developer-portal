import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { TopicFilters } from './TopicFilters';

describe('TopicFilters', () => {
  const handleTopicFilterSubmit = jest.fn();

  it('should render', () => {
    render(<TopicFilters handleTopicFilterSubmit={handleTopicFilterSubmit} topicFilter={[]} />);
    expect(document.querySelector('.explore-filter-form')).toBeInTheDocument();
  });

  it('submits the form when button is clicked', async () => {
    render(<TopicFilters handleTopicFilterSubmit={handleTopicFilterSubmit} topicFilter={[]} />);
    const submitButton = screen.getByRole('button', {
      name: 'Apply filters to update the API list and close the filter menu',
    });
    fireEvent.click(submitButton);
    await waitFor(() => expect(handleTopicFilterSubmit).toHaveBeenCalledTimes(1));
  });

  it('sets aria-expanded', async () => {
    render(
      <TopicFilters handleTopicFilterSubmit={handleTopicFilterSubmit} topicFilter={['health']} />,
    );
    const topicsButton = screen.getAllByRole('button', { name: 'Topics, 1 filter applied' })[0];
    fireEvent.click(topicsButton);
    await waitFor(() => expect(topicsButton).toHaveAttribute('aria-expanded', 'true'));
    fireEvent.click(topicsButton);
    await waitFor(() => expect(topicsButton).toHaveAttribute('aria-expanded', 'false'));
  });
});
