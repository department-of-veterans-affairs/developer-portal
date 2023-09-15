import { useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/*
  Sourced from: https://github.com/ncoughlin/scroll-to-hash-element
*/
export const ScrollToHashElement = (): JSX.Element | null => {
  const location = useLocation();

  const hashElement = useMemo(() => {
    const { hash } = location;

    const removeHashCharacter = (str: string): string => {
      const result = str.slice(1);
      return result;
    };

    if (hash) {
      const element = document.getElementById(removeHashCharacter(hash));
      return element;
    } else {
      return null;
    }
  }, [location]);

  useEffect(() => {
    if (hashElement) {
      /**
       * scrollIntoView options documentation:
       * https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
       */
      hashElement.scrollIntoView({
        behavior: 'smooth',
        inline: 'nearest',
      });
      /**
       * Manually setting focus on hash element.
       * Focus management was previously handled through https://github.com/rafgraph/react-router-hash-link
       * but that package is not compatible with React Router 6.
       */
      hashElement.focus();
    }
  }, [hashElement]);

  return null;
};
