import { MutableRefObject, RefCallback, LegacyRef } from 'react';

export const mergeRefs =
  (refs: Array<MutableRefObject<HTMLElement> | LegacyRef<HTMLElement>>): RefCallback<HTMLElement> =>
  (value): void => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as MutableRefObject<HTMLElement | null>).current = value;
      }
    });
  };
