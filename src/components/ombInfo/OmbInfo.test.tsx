import React from 'react';
import { render } from '@testing-library/react';
import { screen } from 'shadow-dom-testing-library';
import { OmbInfo } from './OmbInfo';

describe('OmbIndo', () => {
  it('should render', () => {
    const { container } = render(
      <OmbInfo expDate="11/30/2026" ombNumber="2900-0770" resBurden={8675309} />,
    );
    const expDate = screen.getByText('11/30/2026');
    expect(expDate).toBeInTheDocument();
    const ombNumber = screen.getByText('2900-0770');
    expect(ombNumber).toBeInTheDocument();
    const resBurden = screen.getByText('8675309 minutes');
    expect(resBurden).toBeInTheDocument();
    const vaButton = container.querySelector('va-button');
    expect(vaButton).toBeInTheDocument();
    const modal = container.querySelector('va-modal');
    expect(modal).toHaveAttribute('visible', 'false');
    (vaButton as HTMLElement).click();
    expect(modal).toHaveAttribute('visible', 'true');
  });
});
