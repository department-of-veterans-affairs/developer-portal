import { useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/*
  Sourced from: https://github.com/ncoughlin/scroll-to-hash-element
*/
const ScrollToHashElement = (): JSX.Element | null => {
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
      hashElement.scrollIntoView({
        behavior: 'smooth',
        // block: "end",
        inline: 'nearest',
      });
    }
  }, [hashElement]);

  return null;
};

export default ScrollToHashElement;
