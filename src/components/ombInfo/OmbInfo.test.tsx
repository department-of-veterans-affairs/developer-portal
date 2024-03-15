import React from 'react';
import { render, screen } from '@testing-library/react';
import { OmbInfo } from './OmbInfo';

describe('OmbIndo', () => {
  it('should render', () => {
    const { getByText, getByTitle } = render(
      <OmbInfo expDate="11/30/2026" ombNumber="2900-0770" resBurden={8675309} />,
    );
    const expDate = getByText('11/30/2026');
    expect(expDate).toBeInTheDocument();
    const ombNumber = getByText('2900-0770');
    expect(ombNumber).toBeInTheDocument();
    const resBurden = getByText('8675309 minutes');
    expect(resBurden).toBeInTheDocument();
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    const modal = getByTitle('Privacy Act Statement');
    expect(modal).toHaveAttribute('visible', 'false');
    button.click();
    expect(modal).toHaveAttribute('visible', 'true');
  });
});
