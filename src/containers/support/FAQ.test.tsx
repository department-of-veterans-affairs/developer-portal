import { getByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SupportFAQ, { SupportQuestions } from './FAQ';

describe('SupportQuestions', () => {
  it('Accordion testing', () => {
    const questions = [
      {
        answer: 'This is a string answer',
        question: 'This is question 1',
      },
      {
        answer: <p data-testid="answer2">This is a JSX.Element answer</p>,
        question: 'This is question 2',
      },
    ];
    render(<SupportQuestions title="SupportQuestions Title" questions={questions} />);
    const section = screen.getByRole('region', { name: 'SupportQuestions Title' });
    expect(section).toBeInTheDocument();

    const heading = getByRole(section, 'heading', { name: 'SupportQuestions Title' });
    expect(heading).toBeInTheDocument();

    const toggleButton = getByRole(section, 'button', { name: 'Expand all' });
    expect(toggleButton).toBeInTheDocument();

    userEvent.click(toggleButton);
    const answer1 = screen.getByText('This is a string answer');
    // This will select the inner <p> tag so we need to use .parentElement to step up
    const answer2 = screen.getByTestId('answer2').parentElement;
    expect(answer1).toHaveAttribute('open', 'true');
    expect(answer2).toHaveAttribute('open', 'true');
    expect(toggleButton).toHaveTextContent('Collapse all');

    userEvent.click(toggleButton);
    expect(answer1).toHaveAttribute('open', 'false');
    expect(answer2).toHaveAttribute('open', 'false');
    expect(toggleButton).toHaveTextContent('Expand all');
  });
});
describe('SupportFAQ', () => {
  it('Page renders as expected', () => {
    render(
      <Router>
        <SupportFAQ />
      </Router>,
    );
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('FAQ');
  });
});
