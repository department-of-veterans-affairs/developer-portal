import * as React from 'react';

import 'jest';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import VeteransCrisisLinePanel from './VeteransCrisisLinePanel';

describe('VeteransCrisisLine', () => {
  it('checks that panel displays with correct information.', () => {
    const { getByRole, queryByText, queryAllByRole } = render(<VeteransCrisisLinePanel />);
    const title = getByRole('heading');
    expect(title).toHaveTextContent("We're here anytime, day or night - 24/7");
    expect(
      queryByText(
        'If you are a Veteran in crisis or concerned about one, connect with our caring, qualified responders for confidential help. Many of them are Veterans themselves.',
      ),
    ).toBeInTheDocument();

    const listItems = queryAllByRole('link');
    expect(listItems.length).toBe(5);
    expect(listItems[0]).toHaveTextContent('Call 1-800-273-8255 and press 1');
    expect(listItems[0]).toHaveAttribute('href', 'tel:18002738255');
    expect(listItems[1]).toHaveTextContent('Text 838255');
    expect(listItems[1]).toHaveAttribute('href', 'sms:838255');
    expect(listItems[2]).toHaveTextContent('Start a confidential chat');
    expect(listItems[2]).toHaveAttribute(
      'href',
      'https://www.veteranscrisisline.net/ChatTermsOfService.aspx?account=Veterans%20Chat',
    );
    expect(listItems[3]).toHaveTextContent('Call TTY if you have hearing loss 1-800-799-4889');
    expect(listItems[3]).toHaveAttribute('href', 'tel:18007994889');
    expect(listItems[4]).toHaveTextContent('VeteransCrisisLine.net');
    expect(listItems[4]).toHaveAttribute('href', 'https://www.veteranscrisisline.net/');
  });
});
