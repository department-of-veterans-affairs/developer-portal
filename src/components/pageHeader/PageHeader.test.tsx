import { render, screen } from '@testing-library/react';
import 'jest';
import * as React from 'react';

import { PageHeader } from './PageHeader';

describe('PageHeader', () => {
  it('renders the header', () => {
    render(<PageHeader halo="Context" header="Big Idea" subText="A great idea" />);

    const heading = screen.getByRole('heading', { level: 1, name: 'Big Idea' });
    expect(heading).toBeInTheDocument();
  });

  it('renders the halo', () => {
    render(<PageHeader halo="Context" header="Big Idea" subText="A great idea" />);

    const halo = screen.getByText('Context');
    expect(halo).toBeInTheDocument();
  });

  it("doesn't render the halo if the halo prop is falsy", () => {
    render(<PageHeader header="Big Idea" subText="A great idea" />);

    // find the heading, make sure it doesn't have a previous sibling
    const heading = screen.getByRole('heading', { level: 1, name: 'Big Idea' });
    expect(heading.previousElementSibling).toBeNull();
  });

  it('renders the subText', () => {
    render(<PageHeader halo="Context" header="Big Idea" subText="A great idea" />);

    const subText = screen.getByText('A great idea');
    expect(subText).toBeInTheDocument();
  });

  it("doesn't render the subText if the subText prop is falsy", () => {
    render(<PageHeader header="Big Idea" />);
    expect(screen.queryByRole('heading', { level: 2 })).toBeNull();
  });
});
