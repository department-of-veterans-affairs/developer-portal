import * as React from 'react';

// Use generics so that we can use this for any type
const usePrevious = <T extends unknown>(props?: T): T | null => {
  const theRef = React.useRef<T | null>(null);

  React.useEffect(() => {
    theRef.current = props ?? null;
  }, [props]);

  return theRef.current;
};

export { usePrevious };