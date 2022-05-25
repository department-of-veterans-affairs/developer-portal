import React, { useEffect } from 'react';

type Handler = (event: MouseEvent) => void;

// Calls the event handler if a click event
// happens outside any of the elements passed in
export const useOutsideGroupClick = <T extends HTMLElement = HTMLElement>(
  elementRefs: Array<React.RefObject<T>>,
  handler: Handler,
): void => {
  useEffect(() => {
    const listener = (event: MouseEvent): void => {
      const clickWasInGroup: boolean = elementRefs.some((ref: React.RefObject<T>) => {
        const el = ref.current;

        if (el) {
          return el.contains(event.target as Node);
        }

        return false;
      });

      if (!clickWasInGroup) {
        // If none of the elements were clicked then call the handler
        handler(event);
      }
    };

    document.addEventListener('mousedown', listener);

    return (): void => {
      document.removeEventListener('mousedown', listener);
    };
  }, [handler, elementRefs]);
};
