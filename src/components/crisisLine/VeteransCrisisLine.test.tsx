import * as React from 'react';

import 'jest';
import '@testing-library/jest-dom/extend-expect';
import {  fireEvent, render, waitFor } from '@testing-library/react';

import VeteransCrisisLine from './VeteransCrisisLine';

describe('VeteransCrisisLine', () => {
  it('checks that modal button displays with correct information.', () => {
    const { queryByRole } = render(<VeteransCrisisLine  />);
    const modalButton = queryByRole('button');

    expect(modalButton).toBeInTheDocument();
    expect(modalButton).toHaveTextContent('Talk to the Veterans Crisis Line now');
    expect(modalButton).toHaveAttribute('data-show', '#crisis-line-modal');
  });

  it('checks open/close functionality of dialog works correctly.', async() => {
    const { getByRole, queryByRole, queryAllByRole } = render(<VeteransCrisisLine  />);

    expect(queryByRole('alertdialog')).not.toBeInTheDocument();

    const modalButton = getByRole('button');
    fireEvent.click(modalButton);
    await waitFor(() => expect(queryByRole('alertdialog')).toBeInTheDocument());

    const dialogCloseBtn = queryAllByRole('button')[1];
    fireEvent.click(dialogCloseBtn);
    await waitFor(() => expect(queryByRole('alertdialog')).not.toBeInTheDocument());
  });
});
