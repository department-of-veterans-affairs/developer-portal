import 'jest';
import { ScrollPosition } from '../types';
import { getScrollPosition } from './scrollPosition';

describe('get scroll position', () => {
  it('should return scroll position value', () => {
    const state: ScrollPosition = {
      position: 300,
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    expect(getScrollPosition(state)).toEqual(300);
  });
});
