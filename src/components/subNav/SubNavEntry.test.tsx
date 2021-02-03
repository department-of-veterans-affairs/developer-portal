import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { SubNavEntry } from './SubNavEntry';

describe('SubNavEntry', () => {
  const onClick = jest.fn();

  beforeEach(() => {
    render(
      <Router>
        <SubNavEntry onClick={onClick} to="/mordor" id="mordor">
          Walk into Mordor
        </SubNavEntry>
      </Router>,
    );
  });

  it('renders successfully', () => {
    const navLink = screen.getByRole('link', { name: 'Walk into Mordor' });
    expect(navLink).toBeInTheDocument();
    expect(navLink).toHaveAttribute('href', '/mordor');
  });

  it('calls onClick', () => {
    const navLink = screen.getByRole('link', { name: 'Walk into Mordor' });
    userEvent.click(navLink);
    expect(onClick).toHaveBeenCalled();
  });
});
