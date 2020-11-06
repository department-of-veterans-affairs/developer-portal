import * as React from 'react';

// Use generics so that we can use this for any type
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint -- necessary to compile
const usePrevious = <T extends unknown>(props: T): T | null => {
  const theRef = React.useRef<T | null>(null);

  React.useEffect(() => {
    theRef.current = props;
  }, [props]);

  return theRef.current;
};

export { usePrevious };
