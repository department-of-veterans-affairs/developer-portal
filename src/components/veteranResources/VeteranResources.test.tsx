import * as React from 'react';
import 'jest';
import { fireEvent, render, screen } from '@testing-library/react';
import { VeteranResources } from './VeteranResources';

describe('VeteranResources', () => {
  it('checks that modal button displays with correct information.', () => {
    render(<VeteranResources />);
    const modalButton = screen.queryByRole('button');

    expect(modalButton).toBeInTheDocument();
    expect(modalButton).toHaveTextContent('Veteran resources');
  });

  it('sets modal visible on button click', () => {
    const { container } = render(<VeteranResources />);

    const modal = container.querySelector('va-modal') as HTMLElement;
    expect(modal).toHaveAttribute('visible', 'false');

    const openModalButton = screen.getByRole('button');
    fireEvent.click(openModalButton);
    expect(modal).toHaveAttribute('visible', 'true');
  });
});
