import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import 'jest';
import * as React from 'react';
import { usePrevious } from './Previous';

const TestComponent = (): JSX.Element => {
  const [count, setCount] = React.useState(5);
  const previousCount = usePrevious(count);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Current: { count }</p>
      <p>Previous: { previousCount === null ? 'null' : previousCount }</p>
      <div>
        <label htmlFor='increment-button'>Increment</label>
        <input id='increment-button' type="button" onClick={incrementCount} />
      </div>
    </div>
  );
};

describe('usePrevious', () => {

  beforeEach(() => {
    render(<TestComponent />);
  });

  afterEach(async () => {
    await cleanup();
  });

  it('initializes the previous value to null', async () => {
    expect(await screen.findByText('Previous: null')).toBeDefined();
  });

  it('stores the previous value on updates', async () => {

    const incrementButton = screen.getByLabelText('Increment');
    fireEvent.click(incrementButton);

    // Testing the current value isn't really testing the hook but more of a
    // sanity check that the custom test component output is correct
    expect(await screen.findByText('Current: 6')).toBeDefined();
    expect(await screen.findByText('Previous: 5')).toBeDefined();
  });
});
