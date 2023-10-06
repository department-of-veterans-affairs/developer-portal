import * as React from 'react';
import 'jest';
import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import { VeteranResources } from './VeteranResources';

describe('VeteranResources', () => {
  it('checks that modal button displays with correct information.', () => {
    render(<VeteranResources />);
    const modalButton = screen.queryByRole('button');

    expect(modalButton).toBeInTheDocument();
    expect(modalButton).toHaveTextContent('Veteran resources');
  });

  it('checks open/close functionality of dialog works correctly using the X button.', async () => {
    render(<VeteranResources />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    const modalButton = screen.getByRole('button');
    fireEvent.click(modalButton);
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeInTheDocument());

    const dialogXButton = screen.getByLabelText('Close the undefined modal');
    fireEvent.click(dialogXButton);
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('checks open/close functionality of dialog works correctly using the Close button.', async () => {
    render(<VeteranResources />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    const modalButton = screen.getByRole('button');
    fireEvent.click(modalButton);
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeInTheDocument());

    const dialogCloseButton = screen.getByText('Close');
    fireEvent.click(dialogCloseButton);
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('checks open/close functionality of dialog works correctly clicking outside the modal.', async () => {
    render(<VeteranResources />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    const modalButton = screen.getByRole('button');
    fireEvent.click(modalButton);
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeInTheDocument());

    fireEvent.click(document.body);
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('checks open/close functionality of dialog works correctly pressing the ESC key.', async () => {
    render(<VeteranResources />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    const modalButton = screen.getByRole('button');
    fireEvent.click(modalButton);
    await waitFor(() => expect(screen.queryByRole('dialog')).toBeInTheDocument());

    fireEvent.keyDown(modalButton, { charCode: 27, code: 'Escape', key: 'Escape' });
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });
});
