import * as React from 'react';
import { render, screen } from '@testing-library/react';
import 'jest';
import { ApiTag } from './ApiTag';

describe('ApiTag', () => {
  it('renders', () => {
    render(<ApiTag tagName="Restricted Access" />);
    expect(screen.getByText(/Restricted Access/i)).toBeInTheDocument();
    expect(document.querySelector('.api-tag-fa-lock')).not.toBeInTheDocument();
  });

  it('renders with a lock icon', () => {
    render(<ApiTag tagName="Restricted Access" showLock />);
    expect(screen.getByText(/Restricted Access/i)).toBeInTheDocument();
    expect(document.querySelector('.api-tag-fa-lock')).toBeInTheDocument();
  });
});
