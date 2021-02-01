import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { SubNav } from './SubNav';
import { SubNavEntry } from './SubNavEntry';

describe('SubNav', () => {
  const noop = (): void => undefined;

  beforeEach(() => {
    render(
      <Router>
        <SubNav name="Elves" alt="Expand Elves">
          <SubNavEntry onClick={noop} to="/legolas" key="legolas">
            Legolas
          </SubNavEntry>
          <SubNavEntry onClick={noop} to="/elrond" key="elrond">
            Elrond
          </SubNavEntry>
          <SubNavEntry onClick={noop} to="/galadriel" key="galadriel">
            Galadriel
          </SubNavEntry>
        </SubNav>
      </Router>,
    );
  });

  it('renders', () => {
    const button = screen.getByRole('button', { name: 'Elves Expand Elves' });
    expect(button).toBeInTheDocument();

    const img = screen.getByRole('img', { name: 'Expand Elves' });
    expect(img).toBeInTheDocument();
  });

  it('expands and hides the SubNavEntrys', () => {
    expect(screen.queryByRole('link', { name: 'Legolas' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Elrond' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Galadriel' })).not.toBeInTheDocument();

    const button = screen.getByRole('button', { name: 'Elves Expand Elves' });
    userEvent.click(button);

    const legolasLink = screen.getByRole('link', { name: 'Legolas' });
    expect(legolasLink).toBeInTheDocument();
    const elrondLink = screen.getByRole('link', { name: 'Elrond' });
    expect(elrondLink).toBeInTheDocument();
    const galadrielLink = screen.getByRole('link', { name: 'Galadriel' });
    expect(galadrielLink).toBeInTheDocument();

    userEvent.click(button);

    expect(screen.queryByRole('link', { name: 'Legolas' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Elrond' })).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Galadriel' })).not.toBeInTheDocument();
  });
});
