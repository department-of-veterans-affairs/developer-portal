import { getByRole, queryByText, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'jest';
import * as React from 'react';

import { GroupedAccordions } from './GroupedAccordions';

const contents = [
  {
    body: 'The answer',
    title: 'The question?',
  },
  {
    body: 'The answer 2',
    title: 'The question 2?',
  },
];

describe('GroupedAccordions', () => {
  it('renders with title', () => {
    render(<GroupedAccordions title="title" panelContents={contents} />);
    const section = screen.getByRole('region', { name: 'title' });
    expect(section).toBeInTheDocument();

    const heading = getByRole(section, 'heading', { name: 'title' });
    expect(heading).toBeInTheDocument();
  });

  it('should toggle panels when  expand all / collapse all clicked', () => {
    render(<GroupedAccordions title="title" panelContents={contents} />);
    const section = screen.getByRole('region', { name: 'title' });
    const toggleButton = getByRole(section, 'button', { name: 'Expand all' });
    expect(toggleButton).toBeInTheDocument();

    userEvent.click(toggleButton);
    const answer1 = queryByText(section, 'The answer');
    const answer2 = queryByText(section, 'The answer 2');
    expect(answer1).toHaveAttribute('open', 'true');
    expect(answer2).toHaveAttribute('open', 'true');
    expect(toggleButton).toHaveTextContent('Collapse all');

    userEvent.click(toggleButton);
    expect(answer1).toHaveAttribute('open', 'false');
    expect(answer2).toHaveAttribute('open', 'false');
    expect(toggleButton).toHaveTextContent('Expand all');
  });
});
