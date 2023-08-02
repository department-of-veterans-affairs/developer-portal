import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { act } from 'react-dom/test-utils';
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

  it('should display tooltip on click', async () => {
    const { getByText } = render(<Tooltip {...defaultProps} />);
    fireEvent.click(getByText('Tooltip'));
    // Need to flush the microtask queue to give the tooltip time to be positioned
    // https://github.com/floating-ui/floating-ui/issues/1908#issuecomment-1301553793
    await act(async () => {
      // nothing here on purpose
    });
    expect(getByText('Here is a tooltip!')).toBeInTheDocument();
  });
});
