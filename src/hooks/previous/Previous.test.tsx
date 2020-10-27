import { renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { usePrevious } from './Previous';
import 'jest';

describe('usePrevious', () => {
  let element: RenderHookResult<number, number | null>;

  const initialVal = 0;
  const newVal = 5;

  beforeEach(() => {
    element = renderHook(val => usePrevious(val), { initialProps: initialVal });
  });

  afterEach(() => {
    element.unmount();
  });

  it('initializes the previous value to null', () => {
    expect(element.result.current).toBeNull();
  });

  it('stores the previous value on updates', () => {
    element.rerender(newVal);
    expect(element.result.current).toBe(initialVal);
  });
});
