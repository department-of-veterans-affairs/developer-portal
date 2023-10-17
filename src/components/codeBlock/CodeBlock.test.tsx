import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { CodeBlock } from './CodeBlock';

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn(),
  },
});

describe('CodeBlock', () => {
  afterEach(cleanup);

  const defaultProps = { code: 'Hello', language: 'plaintext' };

  it('displays the code that was passed in via the "code" prop', () => {
    const { container } = render(<CodeBlock {...defaultProps} />);
    expect(container).toHaveTextContent('Hello');
  });

  describe('withCopyButton - Copy to clipboard button', () => {
    // set withCopy to true to enable the copy to clipboard button
    const props = { ...defaultProps, withCopyButton: true };

    it('displays a tooltip after the button is clicked', async () => {
      const { getByText } = render(<CodeBlock {...props} />);
      const button = getByText('Copy code to clipboard');
      await userEvent.click(button);
      expect(getByText('Code copied to clipboard!')).toBeInTheDocument();
    });

    it('copies the code snippet to the clipboard when clicked', async () => {
      const { getByText } = render(<CodeBlock {...props} />);
      const button = getByText('Copy code to clipboard');
      await userEvent.click(button);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Hello');
    });
  });
});
