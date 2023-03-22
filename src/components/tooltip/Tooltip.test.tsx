import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { Tooltip, TooltipProps } from './Tooltip';

describe('Tooltip', () => {
  const defaultProps: TooltipProps = {
    children: <div>Tooltip</div>,
    label: 'Here is a tooltip!',
    placement: 'top',
  };

  it('should render', () => {
    const { getByText } = render(<Tooltip {...defaultProps} />);
    expect(getByText('Tooltip')).toBeInTheDocument();
  });

  it('should display tooltip on click', () => {
    const { getByText } = render(<Tooltip {...defaultProps} />);
    fireEvent.click(getByText('Tooltip'));
    expect(getByText('Here is a tooltip!')).toBeInTheDocument();
  });
});
