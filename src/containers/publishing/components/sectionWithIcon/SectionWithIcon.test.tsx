import React from 'react';
import { render, screen } from '@testing-library/react';
import checkImage from '../../../../assets/check.svg';
import { SectionWithIcon } from './SectionWithIcon';

describe('SectionWithIcon', () => {
  beforeEach(() => {
    render(
      <SectionWithIcon imageFile={checkImage} header="Hobbits" headerId="hobbits">
        Frodo, Sam, Merry, and Pippin
      </SectionWithIcon>,
    );
  });

  it('renders successfully', () => {
    const region = screen.getByRole('region', { name: 'Hobbits' });
    expect(region).toBeInTheDocument();
  });

  it('contains the expected content', () => {
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();

    const header = screen.getByRole('heading', { level: 3, name: 'Hobbits' });
    expect(header).toBeInTheDocument();

    const child = screen.getByText('Frodo, Sam, Merry, and Pippin');
    expect(child).toBeInTheDocument();
  });
});
