import * as React from 'react';

import 'jest';

import { render, screen } from '@testing-library/react';
import { AppVersion } from './AppVersion';

describe('AppVersion', () => {
  it('should render', () => {
    render(
      <AppVersion />
    );

    expect(screen.getByText('Commit Hash: 123456')).toBeInTheDocument();
  });
});
