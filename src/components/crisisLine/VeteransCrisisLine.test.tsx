import * as React from 'react';

import 'jest';
import { render, screen } from '@testing-library/react';

import VeteransCrisisLine from './VeteransCrisisLine';

describe('VeteransCrisisLine', () => {
  it('checks that modal button displays with correct information.', () => {
    render(<VeteransCrisisLine />);
    const modalButton = screen.queryByRole('button');

    expect(modalButton).toBeInTheDocument();
    expect(modalButton).toHaveTextContent('Talk to the Veterans Crisis Line now');
    expect(modalButton).toHaveAttribute('data-show', '#crisis-line-modal');
  });
});
