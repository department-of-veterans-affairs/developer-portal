import React from 'react';
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CodeBlock } from './CodeBlock';

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: jest.fn(),
  },
});

describe('CodeBlock', () => {
  afterEach(cleanup);

  it('displays the code that was passed in via the "code" prop', () => {
    const { container } = render(<CodeBlock code="Hello" language="plaintext" />);
    expect(container).toHaveTextContent('Hello');
  });

  describe('Copy to clipboard button', () => {
    it('displays a tooltip after the button clicked', () => {
      const { getByText } = render(<CodeBlock code="Hello" language="plaintext" />);
      const button = getByText('Copy code to clipboard');
      userEvent.click(button);
      expect(getByText('Code copied to clipboard!')).toBeInTheDocument();
    });

    it('copies the code snippet to the clipboard when clicked', () => {
      const { getByText } = render(<CodeBlock code="Hello" language="plaintext" />);
      const button = getByText('Copy code to clipboard');
      userEvent.click(button);
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Hello');
    });
  });
});
