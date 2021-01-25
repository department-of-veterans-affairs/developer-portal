import React from 'react';
import { render, screen } from '@testing-library/react';
import checkImage from '../../../../assets/check.svg';
import SectionWithIcon from './SectionWithIcon';

describe('SectionWithIcon', () => {
  beforeEach(() => {
    render(
      <SectionWithIcon imageFile={checkImage} header="Test">
        This is a child.
      </SectionWithIcon>,
    );
  });

  it('renders successfully', () => {
    const image = screen.getByRole('presentation');
    expect(image).toBeInTheDocument();

    const header = screen.getByRole('heading', { level: 3, name: 'Test' });
    expect(header).toBeInTheDocument();

    const child = screen.getByText('This is a child.');
    expect(child).toBeInTheDocument();
  });
});
