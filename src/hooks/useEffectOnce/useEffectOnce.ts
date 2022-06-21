import { useEffect, useRef, EffectCallback } from 'react';

export const useEffectOnce = (effect: EffectCallback): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const destroyFunc = useRef<EffectCallback | any>();
  const calledOnce = useRef(false);
  const renderAfterCalled = useRef(false);

  if (calledOnce.current) {
    renderAfterCalled.current = true;
  }

  useEffect((): undefined | (() => void) => {
    if (calledOnce.current) {
      return;
    }

    calledOnce.current = true;
    destroyFunc.current = effect();

    // eslint-disable-next-line consistent-return
    return (): void => {
      if (!renderAfterCalled.current) {
        return;
      }

      if (destroyFunc.current) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        destroyFunc.current();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
