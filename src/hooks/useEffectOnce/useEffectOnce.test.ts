import { renderHook } from '@testing-library/react-hooks';
import { useEffectOnce } from './useEffectOnce';

const mockEffectCleanup = jest.fn();
const mockEffectCallback = jest.fn().mockReturnValue(mockEffectCleanup);

it('should run provided effect only once', () => {
  const { rerender } = renderHook(() => useEffectOnce(mockEffectCallback));
  expect(mockEffectCallback).toHaveBeenCalledTimes(1);

  rerender();
  expect(mockEffectCallback).toHaveBeenCalledTimes(1);
});
