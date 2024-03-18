import * as React from 'react';
import 'jest';
import { render, screen } from '@testing-library/react';
import { fakeCategories } from '../../../../__mocks__/fakeCategories';
import { SandboxAttestation } from './SandboxAttestation';

describe('SandboxAttestation', () => {
  it('renders', () => {
    render(<SandboxAttestation api={fakeCategories.lotr.apis[1]} />);
    expect(screen.getByText(/Rings API/)).toBeInTheDocument();
  });
});
