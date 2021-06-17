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

  it('renders each accordion (measured by button triggers)', () => {
    render(<GroupedAccordions title="title" panelContents={contents} />);
    const section = screen.getByRole('region', { name: 'title' });

    const accordionButton1 = getByRole(section, 'button', { name: 'The question?' });
    expect(accordionButton1).toBeInTheDocument();

    const accordionButton2 = getByRole(section, 'button', { name: 'The question 2?' });
    expect(accordionButton2).toBeInTheDocument();
  });

  it('should render the accordions all closed', () => {
    render(<GroupedAccordions title="title" panelContents={contents} />);
    const section = screen.getByRole('region', { name: 'title' });
    expect(queryByText(section, 'The answer')).toBeNull();
    expect(queryByText(section, 'The answer 2')).toBeNull();
  });

  it('should toggle panels when  expand all / collapse all clicked', () => {
    render(<GroupedAccordions title="title" panelContents={contents} />);
    const section = screen.getByRole('region', { name: 'title' });
    const toggleButton = getByRole(section, 'button', { name: 'Expand all' });
    expect(toggleButton).toBeInTheDocument();

    userEvent.click(toggleButton);
    const answer1 = queryByText(section, 'The answer');
    const answer2 = queryByText(section, 'The answer 2');
    expect(answer1).toBeInTheDocument();
    expect(answer2).toBeInTheDocument();

    userEvent.click(toggleButton);
    expect(queryByText(section, 'The answer')).toBeNull();
    expect(queryByText(section, 'The answer 2')).toBeNull();
  });
});
