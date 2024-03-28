import * as React from 'react';
import { render } from '@testing-library/react';
import { TestingNotice } from './TestingNotice';

describe('TestingNotice', () => {
  it('should render', () => {
    render(<TestingNotice />);
  });

  it('should display notice text', () => {
    const { getByText } = render(<TestingNotice />);
    expect(getByText('VA API', { exact: false })).toBeInTheDocument();
  });

  it('should display a link to visit the developer portal', () => {
    const { getByRole } = render(<TestingNotice />);
    expect(getByRole('link')).toHaveTextContent('developer.va.gov');
  });
});
