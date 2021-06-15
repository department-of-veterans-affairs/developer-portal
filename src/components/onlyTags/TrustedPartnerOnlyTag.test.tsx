import { render, screen } from '@testing-library/react';
import 'jest';
import * as React from 'react';

import TrustedPartnerOnlyTag from './TrustedPartnerOnlyTag';

describe('TrustedPartnerOnlyTag', () => {
  it('renders', () => {
    render(<TrustedPartnerOnlyTag />);
    expect(screen.getByText('Internal VA use only' /* Trusted Partner use only */))
      .toBeInTheDocument();
  });
});
